import { Component, OnInit } from '@angular/core';
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
}
