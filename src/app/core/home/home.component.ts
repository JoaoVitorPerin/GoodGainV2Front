import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PlanosPagamentoComponent } from './planos-pagamento/planos-pagamento.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    PlanosPagamentoComponent
  ]
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }
}
