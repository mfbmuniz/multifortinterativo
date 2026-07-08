import { Injectable } from '@angular/core';
import { MOCK_SETUPS } from '../configs/mock-setups.config';
import { LOCAL_STORAGE_KEYS } from '../configs/local-storage-keys.config';
import { SolarSetup } from '../entities/solar-setup.entity';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(private readonly storage: StorageService) {}

  getSetups(): SolarSetup[] {
    const setups = this.storage.getItem<SolarSetup[]>(LOCAL_STORAGE_KEYS.SETUPS);
    if (setups?.length) {
      return setups;
    }

    this.storage.setItem(LOCAL_STORAGE_KEYS.SETUPS, MOCK_SETUPS);
    return MOCK_SETUPS;
  }

  getSetupById(id: string): SolarSetup | undefined {
    return this.getSetups().find((setup) => setup.id === id);
  }

  saveSetup(setup: SolarSetup): SolarSetup {
    const setups = this.getSetups();
    const normalized = setup.isRecommended ? this.clearRecommended(setups) : setups;
    const existingIndex = normalized.findIndex((item) => item.id === setup.id);

    if (existingIndex >= 0) {
      normalized[existingIndex] = setup;
    } else {
      normalized.push({ ...setup, id: crypto.randomUUID() });
    }

    this.storage.setItem(LOCAL_STORAGE_KEYS.SETUPS, normalized);
    return setup;
  }

  deleteSetup(id: string): void {
    this.storage.setItem(
      LOCAL_STORAGE_KEYS.SETUPS,
      this.getSetups().filter((setup) => setup.id !== id)
    );
  }

  private clearRecommended(setups: SolarSetup[]): SolarSetup[] {
    return setups.map((setup) => ({ ...setup, isRecommended: false }));
  }
}
