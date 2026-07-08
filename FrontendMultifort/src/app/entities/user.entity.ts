import { UserRole } from './user-role.entity';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  gender?: string;
  phone?: string;
  city?: string;
  createdAt?: string;
}
