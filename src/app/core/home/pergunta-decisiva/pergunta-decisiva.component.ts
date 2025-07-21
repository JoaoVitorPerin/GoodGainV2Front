import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pergunta-decisiva',
  templateUrl: './pergunta-decisiva.component.html',
  styleUrls: ['./pergunta-decisiva.component.css'],
  standalone: true,
  imports: [
    ButtonModule
  ]
})
export class PerguntaDecisivaComponent {
  private readonly router = inject(Router);
  
  navigateCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
