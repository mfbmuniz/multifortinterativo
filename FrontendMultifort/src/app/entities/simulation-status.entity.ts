export enum SimulationStatus {
  DRAFT = 'DRAFT',
  WAITING_FOR_LOGIN = 'WAITING_FOR_LOGIN',
  PENDING_ADMIN_ASSIGNMENT = 'PENDING_ADMIN_ASSIGNMENT',
  ASSIGNED_TO_SELLER = 'ASSIGNED_TO_SELLER',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export const SIMULATION_STATUS_LABELS: Record<SimulationStatus, string> = {
  [SimulationStatus.DRAFT]: 'Rascunho',
  [SimulationStatus.WAITING_FOR_LOGIN]: 'Aguardando login',
  [SimulationStatus.PENDING_ADMIN_ASSIGNMENT]: 'Analise pendente',
  [SimulationStatus.ASSIGNED_TO_SELLER]: 'Encaminhada',
  [SimulationStatus.IN_PROGRESS]: 'Em negociacao',
  [SimulationStatus.COMPLETED]: 'Concluida'
};
