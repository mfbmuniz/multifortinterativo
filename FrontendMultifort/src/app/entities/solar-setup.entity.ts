export interface SolarSetup {
  id: string;
  name: string;
  category: string;
  panelQuantity: number;
  estimatedPower: number;
  estimatedGeneration: number;
  estimatedSavings: number;
  estimatedPrice: number;
  estimatedPaybackMonths: number;
  areaNeeded: number;
  inverter: string;
  description: string;
  benefits: string[];
  includedItems: string[];
  isRecommended?: boolean;
}
