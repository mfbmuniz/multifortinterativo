import { SimulationStatus } from './simulation-status.entity';

export interface InvoiceFileInfo {
  name: string;
  type: string;
  size: number;
}

export interface Simulation {
  id: string;
  userId: string;
  selectedSetupId: string;
  invoiceFileName?: string;
  invoiceFileType?: string;
  invoiceFileSize?: number;
  consumptionKwh: number;
  currentBillValue: number;
  solarBillValue: number;
  status: SimulationStatus;
  assignedSellerId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PendingSimulation {
  selectedSetupId: string;
  invoiceFile?: InvoiceFileInfo;
  consumptionKwh: number;
  currentBillValue: number;
  solarBillValue: number;
}
