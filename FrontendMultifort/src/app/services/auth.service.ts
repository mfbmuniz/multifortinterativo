import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../configs/local-storage-keys.config';
import { ROLE_HOME, ROLE_PRIORITY } from '../configs/role-priority.config';
import { LoginResponse } from '../entities/login-response.entity';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { SimulationService } from './simulation.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly storage: StorageService,
    private readonly userService: UserService,
    private readonly simulationService: SimulationService,
    private readonly router: Router
  ) {}

  login(email: string, password: string): LoginResponse {
    const user = this.userService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('E-mail ou senha invalidos.');
    }

    this.storage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, user);

    const pending = this.simulationService.getPendingSimulation();
    if (pending) {
      this.simulationService.createSimulation(user.id, pending);
      return { user, redirectUrl: '/painel/usuario' };
    }

    return { user, redirectUrl: this.getHomeByRole(user) };
  }

  logout(): void {
    this.storage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    this.router.navigateByUrl('/login');
  }

  getCurrentUser(): User | null {
    return this.storage.getItem<User>(LOCAL_STORAGE_KEYS.CURRENT_USER);
  }

  isLoggedIn(): boolean {
    return Boolean(this.getCurrentUser());
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return Boolean(user?.roles.some((role) => roles.includes(role)));
  }

  getPrimaryRole(user: User): UserRole {
    return ROLE_PRIORITY.find((role) => user.roles.includes(role)) ?? UserRole.USER;
  }

  getHomeByRole(user: User): string {
    return ROLE_HOME[this.getPrimaryRole(user)];
  }
}
