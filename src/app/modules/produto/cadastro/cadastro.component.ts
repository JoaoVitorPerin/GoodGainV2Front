import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/components/toastr/toastr.service';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-cadastro', 
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  formProduto: FormGroup;
  idProduto: string;
  items: any[];
  marcas: any[] = [];
  home: any;

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private router: Router,
              private produtoService: ProdutoService,
              private activatedRoute: ActivatedRoute){
                this.formProduto = this.formBuilder.group({
                  produto_id: [null],
                  nome: [null, Validators.required],
                  marca__id: [null],
                  descricao: [null],
                  preco_compra: [null, Validators.required],
                  preco_venda: [null, Validators.required]
                })

                this.idProduto = this.activatedRoute.snapshot.paramMap.get('id');
                this.formProduto.patchValue({produto_id: this.idProduto});

                if (this.idProduto) {
                  this.formProduto.get('produto_id').disable();
                  this.buscarProdutoById(this.idProduto);
                }

                this.items = [
                  { label: 'Gestão Admin' }, 
                  { label: 'Produtos' }, 
                  { label: 'Cadastro' }
                ];
      
                this.home = { icon: 'pi pi-home', routerLink: '/' };

                this.buscarMarcas()
                }

  buscarProdutoById(id: string): void {
    this.produtoService.buscarProdutoById(id).subscribe({
      next: (dados) => {
        this.formProduto.patchValue(dados.produtos);
      }, error: () => {
        this.toastrService.mostrarToastrDanger('Erro ao buscar produto');
      }
    })
  }

  buscarMarcas(): void {
    this.produtoService.buscarTodasMarcas().subscribe({
      next: (dados) => {
        this.marcas = dados.marcas.map((marca) => {
          return {  label: marca.nome, value: marca.id }
        })
      }, error: () => {
        this.toastrService.mostrarToastrDanger('Erro ao buscar marcas');
      }
    })
  }

  cadastrarProduto(): void {
    this.formProduto.markAllAsTouched();
    if(this.formProduto.valid){
      this.produtoService.cadastrarProduto(this.formProduto.getRawValue()).subscribe({
        next: (response) => {
          this.toastrService.mostrarToastrSuccess('Produto cadastrado com sucesso');
          this.router.navigate(['produto/cadastro', response.produto_id]);
        }, error: () => {
          this.toastrService.mostrarToastrDanger('Erro ao cadastrar produto');
        }
      })
    }
  }
}
