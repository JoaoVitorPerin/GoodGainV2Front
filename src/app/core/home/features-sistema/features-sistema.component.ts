import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-features-sistema',
  templateUrl: './features-sistema.component.html',
  styleUrls: ['./features-sistema.component.css'],
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    TagModule
  ]
})
export class FeaturesSistemaComponent {
    features = [
    {
      title: "Recomendações Personalizadas",
      description: "Automatize tarefas e fluxos de trabalho repetitivos para economizar tempo e reduzir erros em análises.",
      icon: "bolt",
    },
    {
      title: "Análise Avançada",
      description: "Obtenha insights valiosos com visualização de dados em tempo real e relatórios.",
      icon: "users",
    },
    {
      title: "Dashboards Comparativos",
      description: "Compare o desempenho de diferentes estratégias e métodos com facilidade.",
      icon: "chart-bar",
    },
  ]
}
