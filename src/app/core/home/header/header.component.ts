import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '../../animations';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

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

  @Input() menuItem: { id: string, title: string, is_ativo: boolean }[] = [];
  @Output() onSelectMenu = new EventEmitter();

  isMobile = window.innerWidth <= 768;

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  alterarMenu(id: string) {
    this.menuItem.forEach(item => {
      item.is_ativo = item.id === id;
    });
    this.onSelectMenu.emit(id);
  }

  alterarRota(url: string){
    this.router.navigate([url]);
  }
}
