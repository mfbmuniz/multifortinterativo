import { UserRole } from '../entities/user-role.entity';

export const ROLE_PRIORITY: UserRole[] = [
  UserRole.DEV,
  UserRole.ADMIN,
  UserRole.MANAGER,
  UserRole.SELLER,
  UserRole.SECRETARY,
  UserRole.USER
];

export const ROLE_HOME: Record<UserRole, string> = {
  [UserRole.DEV]: '/painel/admin',
  [UserRole.ADMIN]: '/painel/admin',
  [UserRole.MANAGER]: '/painel/admin',
  [UserRole.SELLER]: '/painel/vendedor',
  [UserRole.SECRETARY]: '/painel/admin',
  [UserRole.USER]: '/painel/usuario'
};
