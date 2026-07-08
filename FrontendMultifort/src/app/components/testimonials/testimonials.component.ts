import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-testimonials',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials = [
    { name: 'Carlos Almeida', text: 'A simulacao deixou claro qual setup fazia sentido para minha casa.' },
    { name: 'Juliana Castro', text: 'O vendedor recebeu meu lead com tudo organizado e respondeu rapido.' },
    { name: 'Condominio Bela Vista', text: 'A visao administrativa ajuda a acompanhar orcamentos e atribuir responsaveis.' }
  ];
}
