import { Component, inject, OnInit } from '@angular/core';
import { inOutAnimation } from '../../animations';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  animations: [inOutAnimation]
})
export class HeaderComponent{
  private readonly router = inject(Router);
  menuItem = [
    {
      title: 'Home',
      is_ativo: true,
    },
    {
      title: 'Sobre nós',
      is_ativo: false,
    },
    {
      title: 'Planos',
      is_ativo: false,
    },
    {
      title: 'Contato',
      is_ativo: false,
    }
  ]

  alterarMenu(index: number) {
    this.menuItem.forEach((item, i) => {
      item.is_ativo = i === index;
    });
  }

  alterarRota(url: string){
    this.router.navigate([url]);
  }
}
