import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PlanosPagamentoComponent } from './planos-pagamento/planos-pagamento.component';
import { FooterComponent } from './footer/footer.component';
import { PerguntaDecisivaComponent } from './pergunta-decisiva/pergunta-decisiva.component';
import { FeaturesSistemaComponent } from './features-sistema/features-sistema.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChamadaUsuarioComponent } from './chamada-usuario/chamada-usuario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    ChamadaUsuarioComponent,
    PlanosPagamentoComponent,
    FooterComponent,
    PerguntaDecisivaComponent,
    FeaturesSistemaComponent,
    ButtonModule,
    TagModule
  ]
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }

  menuItems = [
    {
      id: 'inicio',
      title: 'Início',
      is_ativo: true,
    },
    {
      id: 'precos',
      title: 'Preços',
      is_ativo: false,
    },
    {
      id: 'recursos',
      title: 'Recursos',
      is_ativo: false,
    }
  ]

  scrollToItem(event: string) {
    const element = document.getElementById(event);

    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 130;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
}
}
