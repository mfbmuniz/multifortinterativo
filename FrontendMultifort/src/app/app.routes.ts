import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FaqComponent } from './components/faq/faq.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { UploadInvoiceComponent } from './components/simulation/upload-invoice/upload-invoice.component';
import { SimulationLoadingComponent } from './components/simulation/simulation-loading/simulation-loading.component';
import { SimulationResultComponent } from './components/simulation/simulation-result/simulation-result.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SetupManagementComponent } from './components/setup-management/setup-management.component';
import { adminGuard, authGuard, sellerGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegistrationComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'depoimentos', component: TestimonialsComponent },
  { path: 'simulacao/upload', component: UploadInvoiceComponent },
  { path: 'simulacao/processando', component: SimulationLoadingComponent },
  { path: 'simulacao/resultado', component: SimulationResultComponent },
  { path: 'simulacao/detalhes/:id', redirectTo: 'simulacao/resultado', pathMatch: 'full' },
  { path: 'painel/usuario', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'painel/admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'painel/vendedor', component: SellerDashboardComponent, canActivate: [sellerGuard] },
  { path: 'admin/setups', component: SetupManagementComponent, canActivate: [adminGuard] },
  { path: 'admin/simulacoes', redirectTo: 'painel/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
