import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'src/app/shared/components/toastr/toastr.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { ButtonModule } from 'primeng/button';
import { items } from 'src/app/shared/models/items.model';
import { confirmPasswordValidator, validatorSenhaForte } from 'src/app/shared/validator/validatorForm';
import { ValidadorSenhaForteComponent } from 'src/app/shared/components/validador-senha-forte/validador-senha-forte.component';
import { isValidCPF } from 'src/app/shared/ts/util';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormModule,
    ReactiveFormsModule,
    ButtonModule,
    ValidadorSenhaForteComponent
  ]
})
export class CadastroComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly autenticacaoService = inject(AutenticacaoService);
  private readonly cdr = inject(ChangeDetectorRef);

  formCadastro: FormGroup;
  loadingRequest = signal(false);
  erroCPF = signal<string>(null);

  opcoesOndeConheceu: items[] = [
    { value: 'google', label: 'Google' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'site', label: 'Site' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'amigo', label: 'Indicado por Amigo' },
    { value: 'outro', label: 'Outro' }
  ]
  
  subs: Subscription[] = [];
  
  ngOnInit(): void {
    this.tokenService.clearToken()

    this.formCadastro = this.formBuilder.group({
      nomeCompleto: [null, Validators.required],
      cpf: [null, Validators.required],
      username: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      password: [null, [Validators.required, validatorSenhaForte()]],
      confirmPassword: [null, Validators.required],
      ondeConheceu: [null, Validators.required]
    },
    { validators: confirmPasswordValidator }
    );
  }
  
  cadastro(): void {
    if(this.loadingRequest())
      return

    this.formCadastro.markAllAsTouched()

    if(this.formCadastro.valid){
      this.loadingRequest.set(true);
      this.subs.push(
        this.autenticacaoService.cadastroUsuario(this.formCadastro.getRawValue()).subscribe({
          next: (dados) => {
            if(dados.access){
              this.tokenService.setToken(dados);
              this.loadingRequest.set(false);
            }
          }, error: () => {
            this.loadingRequest.set(false);
          }
        })
      );
    } else {
      this.loadingRequest.set(false);
      this.toastrService.mostrarToastrDanger('Preencha todos os campos obrigatórios corretamente para prosseguir');
    }
  }

  mensagemErroConfirmarSenha(){
    if(this.formCadastro.get('confirmPassword').value === null || this.formCadastro.get('confirmPassword').value === ''){
      return 'Informe a confirmação da senha!';
    }
    if(this.formCadastro.hasError('notSame', 'confirmPassword')){
      return 'A confirmação de senha não confere!';
    }
    return null;
  }

  validarCPF(){
    if(this.formCadastro.get('cpf').value === null || this.formCadastro.get('cpf').value === ''){
      this.formCadastro.get('cpf').setErrors({required: true});
      this.formCadastro.get('cpf').markAsTouched();
      this.erroCPF.set('Informe o seu CPF!');
      return;
    }
    
    if(!isValidCPF(this.formCadastro.get('cpf').value)){
      this.formCadastro.get('cpf').invalid;
      this.formCadastro.get('cpf').setErrors({cpfExistente: true});
      this.formCadastro.get('cpf').setValue(null);
      this.formCadastro.get('cpf').markAsTouched();
      this.erroCPF.set('Digite um CPF válido!');
      return;
    }

    this.erroCPF.set('Informe o seu CPF!');
    return
  }

  validarDataValida(){
    const dataNascimento = this.formCadastro.get('dataNascimento').value;
        
    if(!dataNascimento || dataNascimento === ''){
      this.formCadastro.get('dataNascimento').setErrors({required: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      return;
    }

    // Verificar formato da data (DD/MM/YYYY)
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataNascimento.match(regexData);
    
    if(!match){
      this.formCadastro.get('dataNascimento').setErrors({formatoInvalido: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);
    const anoAtual = new Date().getFullYear();

    // Validar limites básicos
    if(dia < 1 || dia > 31){
      this.formCadastro.get('dataNascimento').setErrors({diaInvalido: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    if(mes < 1 || mes > 12){
      this.formCadastro.get('dataNascimento').setErrors({mesInvalido: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    if(ano > anoAtual){
      this.formCadastro.get('dataNascimento').setErrors({anoFuturo: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    // Criar objeto Date para validar se a data realmente existe
    const dataObj = new Date(ano, mes - 1, dia);
    
    if(dataObj.getFullYear() !== ano || 
       dataObj.getMonth() !== (mes - 1) || 
       dataObj.getDate() !== dia){
      this.formCadastro.get('dataNascimento').setErrors({dataInexistente: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    // Verificar se não é uma data futura
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if(dataObj > hoje){
      this.formCadastro.get('dataNascimento').setErrors({dataFutura: true});
      this.formCadastro.get('dataNascimento').markAsTouched();
      this.cdr.detectChanges();
      this.formCadastro.get('dataNascimento').setValue(null);
      return;
    }

    this.formCadastro.get('dataNascimento').setErrors(null);
    this.cdr.detectChanges();
  }
  
  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) {
    this.cadastro();
  }

  redirectLogin(): void {
    this.router.navigate(['login'])
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
