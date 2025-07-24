import { validarDataValida } from './../../shared/ts/util';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { ToastrService } from 'src/app/shared/components/toastr/toastr.service';
import * as dayjs from 'dayjs'
import { PerfilService } from './perfil.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { confirmPasswordValidator, validatorSenhaForte } from 'src/app/shared/validator/validatorForm';
import { ModalConfirmacaoService } from 'src/app/shared/components/modal-confirmacao/modal-confirmacao.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { ValidadorSenhaForteComponent } from 'src/app/shared/components/validador-senha-forte/validador-senha-forte.component';
import { items } from 'src/app/shared/models/items.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule,
    ValidadorSenhaForteComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly tokenService = inject(TokenService);
  private readonly perfilService = inject(PerfilService);
  private readonly modalService = inject(ModalService);
  private readonly modalConfirmacaoService = inject(ModalConfirmacaoService);
  private readonly router = inject(Router);

  formPerfil: FormGroup;
  formPreferencias: FormGroup;
  formNovaSenha: FormGroup;
  dayjs = dayjs;

  buttonSalvar = signal<boolean>(null);
  username = signal<string>(null);
  cpfUser = signal<string>(null);

  disableCampos = signal(true);
  
  itemsEsporte: any = [];
  itemsTipoAposta: any = [];
  itemsCampeonatos: any = [];

  opcoesGenero: items[] = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao_informado', label: 'Não especificado' }
  ];

  validarDataValida = validarDataValida;

  @ViewChild('modalRedefinirSenha') modalRedefinirSenha: TemplateRef<any>;

  ngOnInit(){
    this.formPreferencias = this.formBuilder.group({
      esporte: [null],
      opcoes_apostas: [null],
      opcoes_campeonatos : [null]
    });

    this.formNovaSenha = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      password: [null, [Validators.required, validatorSenhaForte()]],
      confirmPassword: [null, [Validators.required]]
    },{ validators: confirmPasswordValidator });

    this.formPerfil = this.formBuilder.group({
      nomeCompleto: [null, Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      email: [null, Validators.required],
      genero: [null, Validators.required],
    })

    this.buttonSalvar.set(false);
    this.buscarInfosPerfil();
  }

  buscarInfosPerfil(){
    const cpfUser = this.tokenService.getJwtDecodedAccess().cli_info.cli_info.cpf;

    this.perfilService.buscarUserByCpf(cpfUser).subscribe({
      next: (dados) => {
        this.username.set(dados.cliente.username);
        this.cpfUser.set(dados.cliente.cpf);
    
        this.buscarPreferencias();

        const data = { ...dados.cliente };
        data.data_nascimento = data.data_nascimento ? dayjs(data.data_nascimento, 'YYYYMMDD').format('DD/MM/YYYY') : null;
        this.formPerfil.patchValue(data);
      }, error: () => {
        this.toastrService.mostrarToastrDanger('Nao foi possivel buscar os dados do username, contate o suporte!')
      }
    })
  }

  buscarPreferencias(){
    this.perfilService.buscarPreferencias(this.cpfUser).subscribe({
      next: (dados) => {
        this.formPreferencias.get('esporte').setValue(dados.preferencia_user?.esporte?.map(item => item));
        this.formPreferencias.get('opcoes_apostas').setValue(dados.preferencia_user?.opcoes_apostas?.map(item => item));
        this.formPreferencias.get('opcoes_campeonatos').setValue(dados.preferencia_user?.opcoes_campeonatos?.map(item => item));
        this.itemsEsporte = dados.dados.esporte?.map(item => ({
          value: item.id,
          label: item.nome
        }));

        this.itemsTipoAposta = dados.dados.opcoes_apostas?.map(item => ({
          value: item.id.toString(),
          label: item.informacao
        }));
      }, error: () => {
        this.toastrService.mostrarToastrDanger('Nao foi possivel buscar as preferencias, contate o suporte!')
      }
    })

    this.perfilService.buscarCampeonatos().subscribe({
      next: (dados) => {
        this.itemsCampeonatos = dados?.campeonatos.map(item => ({
          value: item.id,
          label: item.nome
        }));
      }, error: () => {
        this.toastrService.mostrarToastrDanger('Nao foi possivel buscar os campeonatos, contate o suporte!')
      }
    })
  }

  toggleCamposDisable() {
    this.disableCampos.set(!this.disableCampos());
    this.buttonSalvar.set(!this.buttonSalvar());
  }

  onSubmit(){
    if (this.formPerfil.getRawValue().invalid) {
      this.formPerfil?.markAllAsTouched()
      return;
    }

    const dados = {
      ...this.formPerfil.getRawValue(),
      data_nascimento: dayjs(this.formPerfil.value.data_nascimento, 'DD/MM/YYYY').format('YYYYMMDD')
    }

    this.perfilService.editarUser(dados).subscribe((res) => {
      if(res.status){
        this.toastrService.mostrarToastrSuccess('Usuário editado com sucesso!');
        this.toggleCamposDisable();
      }else{
        this.toastrService.mostrarToastrDanger('Erro ao editar usuário!')
      }
    }, error => {
      this.toastrService.mostrarToastrDanger('Erro ao editar usuário!');
    });
  }

  onSubmitPreferencias(){
    if (this.formPreferencias.getRawValue().invalid) {
      this.formPreferencias?.markAllAsTouched()
      return;
    }

    const dados = {
      ...this.formPreferencias.getRawValue(),
      cpf: this.cpfUser
    }

    this.perfilService.enviarPreferencias(dados).subscribe((res) => {
      if(res.status){
        this.toastrService.mostrarToastrSuccess('Preferências editadas com sucesso!');
      }else{
        this.toastrService.mostrarToastrDanger('Erro ao editar preferências!')
      }
    }, error => {
      this.toastrService.mostrarToastrDanger('Erro ao editar preferências!');
    });
  }

  abrirModalRedefinirSenha(){
    this.modalService.abrirModal('Redefinir senha', this.modalRedefinirSenha, [], {larguraDesktop: '50'});
  }

  onSubmitNovaSenha(){
    const dados = {
      ...this.formNovaSenha.getRawValue(),
      cpf: this.cpfUser
    }
    this.perfilService.redefinirSenha(dados).subscribe((res) => {
      if(res.status){
        this.toastrService.mostrarToastrSuccess('Senha redefinida com sucesso!');
        this.modalService.fecharModal();
      }else{
        this.toastrService.mostrarToastrDanger('Erro ao redefinir senha!')
      }
    }, error => {
      this.toastrService.mostrarToastrDanger('Erro ao redefinir senha!');
    });
  }

  excluirConta(){
    this.modalConfirmacaoService.abrirModalConfirmacao(
      'Atenção',
      `Deseja realmente excluir sua conta?`,
      {
        callbackAceitar: () => {
          const dados = {
            cpf: this.cpfUser,
          }
          this.perfilService.excluirConta(dados).subscribe((data: any) => {
            if(data.status){
              this.toastrService.mostrarToastrSuccess(data.descricao ? data.descricao : 'Conta excluída com sucesso!');
              this.router.navigate(['/login']);
            }
          }, error => {
            this.toastrService.mostrarToastrDanger(`Erro ao exluir a conta!`);
          });
        }
      }
    );
  }
}
