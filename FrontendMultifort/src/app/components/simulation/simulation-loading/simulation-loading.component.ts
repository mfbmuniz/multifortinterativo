import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-simulation-loading',
  imports: [LoadingComponent, RouterLink],
  templateUrl: './simulation-loading.component.html',
  styleUrl: './simulation-loading.component.scss'
})
export class SimulationLoadingComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Esta espera representa o tempo de processamento. No backend real, o redirecionamento dependera da resposta da API.
    window.setTimeout(() => this.router.navigateByUrl('/simulacao/resultado'), 2000);
  }
}
