import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-planos-pagamento',
  templateUrl: './planos-pagamento.component.html',
  styleUrls: ['./planos-pagamento.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class PlanosPagamentoComponent{
  private readonly router = inject(Router);

  redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}
