import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-faq',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  questions = [
    ['Preciso estar logado para simular?', 'Nao. O login e exigido apenas ao enviar a proposta comercial.'],
    ['O PDF e lido de verdade?', 'Nesta versao academica, o sistema guarda informacoes basicas e usa mocks para simular o resultado.'],
    ['Onde os dados ficam salvos?', 'Os dados ficam no localStorage do navegador, centralizados pelos services.'],
    ['Como o backend sera integrado?', 'Os services foram separados para substituir mocks por chamadas HTTP futuramente.']
  ];
}
