import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-chamada-usuario',
  templateUrl: './chamada-usuario.component.html',
  styleUrls: ['./chamada-usuario.component.css'],
  standalone: true,
  imports: [
    ButtonModule,
    TagModule
  ]
})
export class ChamadaUsuarioComponent{
  private readonly router = inject(Router);

  navigateCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
