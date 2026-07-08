import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';

export const MOCK_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Marcos Felipe Batista Muniz',
    email: 'filips8@hotmail.com',
    password: '123456',
    roles: [UserRole.ADMIN, UserRole.SELLER],
    gender: 'Masculino',
    phone: '(11) 98765-4321',
    city: 'Sao Paulo, SP',
    createdAt: '2026-01-08T10:00:00.000Z'
  },
  {
    id: 'user-client',
    name: 'Joao Silva',
    email: 'cliente@multifort.com',
    password: '123456',
    roles: [UserRole.USER],
    gender: 'Masculino',
    phone: '(11) 91234-5678',
    city: 'Sao Paulo, SP',
    createdAt: '2026-02-11T12:00:00.000Z'
  },
  {
    id: 'user-seller',
    name: 'Maria Souza',
    email: 'vendedor@multifort.com',
    password: '123456',
    roles: [UserRole.SELLER],
    gender: 'Feminino',
    phone: '(19) 99876-1234',
    city: 'Campinas, SP',
    createdAt: '2026-03-15T09:00:00.000Z'
  }
];
