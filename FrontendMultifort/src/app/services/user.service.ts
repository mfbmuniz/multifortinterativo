import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../configs/mock-users.config';
import { LOCAL_STORAGE_KEYS } from '../configs/local-storage-keys.config';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly storage: StorageService) {}

  getUsers(): User[] {
    const storedUsers = this.storage.getItem<User[]>(LOCAL_STORAGE_KEYS.USERS);
    if (storedUsers?.length) {
      return storedUsers;
    }

    this.storage.setItem(LOCAL_STORAGE_KEYS.USERS, MOCK_USERS);
    return MOCK_USERS;
  }

  saveUsers(users: User[]): void {
    this.storage.setItem(LOCAL_STORAGE_KEYS.USERS, users);
  }

  createUser(user: Omit<User, 'id' | 'roles' | 'createdAt'>): User {
    if (this.findByEmail(user.email)) {
      throw new Error('E-mail ja cadastrado.');
    }

    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      roles: [UserRole.USER],
      createdAt: new Date().toISOString()
    };

    this.saveUsers([...this.getUsers(), newUser]);
    return newUser;
  }

  findByEmail(email: string): User | undefined {
    return this.getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: string): User | undefined {
    return this.getUsers().find((user) => user.id === id);
  }

  getSellers(): User[] {
    return this.getUsers().filter((user) => user.roles.includes(UserRole.SELLER));
  }
}
