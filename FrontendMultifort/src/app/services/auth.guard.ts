import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../entities/user-role.entity';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const roles = [UserRole.DEV, UserRole.ADMIN, UserRole.MANAGER, UserRole.SECRETARY];

  return authService.hasAnyRole(roles) ? true : router.createUrlTree(['/login']);
};

export const sellerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasAnyRole([UserRole.SELLER]) ? true : router.createUrlTree(['/login']);
};
