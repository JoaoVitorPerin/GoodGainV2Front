import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validador-senha-forte',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './validador-senha-forte.component.html',
  styleUrl: './validador-senha-forte.component.css'
})
export class ValidadorSenhaForteComponent {
  @Input() senha: string;

  possuiNumero(): boolean {
    const regex = /\d/;
    return regex.test(this.senha);
  }

  possuiLetraMaiuscula(): boolean{
    const regex = /[A-Z]/;
    return regex.test(this.senha);
  }
  
  possuiMinuscula(): boolean {
    if (!this.senha)
      return false
    
    const regex = /[a-z]/;
    return regex.test(this.senha);
  }
  
  possuiMinimoOitoCaracteres(): boolean {
    return this.senha?.length >= 8;
  }
  
  possuiCaracterEspecial(): boolean {
    const regex = /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]/`~;]/;
    return regex.test(this.senha);
  }
}
