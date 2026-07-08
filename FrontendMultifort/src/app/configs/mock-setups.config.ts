import { SolarSetup } from '../entities/solar-setup.entity';

export const MOCK_SETUPS: SolarSetup[] = [
  {
    id: 'setup-basic',
    name: 'Setup Basico',
    category: 'Basico',
    panelQuantity: 6,
    estimatedPower: 3.3,
    estimatedGeneration: 380,
    estimatedSavings: 85,
    estimatedPrice: 16200,
    estimatedPaybackMonths: 42,
    areaNeeded: 15,
    inverter: 'Microinversor Hoymiles',
    description: 'Opcao enxuta para reduzir a conta de luz com investimento controlado.',
    benefits: ['Boa economia mensal', 'Instalacao compacta', 'Ideal para residencias menores'],
    includedItems: ['6 placas de 550W', 'Microinversor', 'Estrutura de fixacao', 'Projeto homologado']
  },
  {
    id: 'setup-ideal',
    name: 'Setup Ideal',
    category: 'Ideal',
    panelQuantity: 8,
    estimatedPower: 4.4,
    estimatedGeneration: 460,
    estimatedSavings: 95,
    estimatedPrice: 22500,
    estimatedPaybackMonths: 36,
    areaNeeded: 20,
    inverter: 'Inversor Growatt 5kW',
    description: 'Configuracao equilibrada para cobrir quase todo o consumo mensal.',
    benefits: ['Melhor relacao custo-beneficio', 'Alta geracao', 'Mais margem para consumo futuro'],
    includedItems: ['8 placas de 550W', 'Inversor Growatt', 'String box', 'Monitoramento remoto'],
    isRecommended: true
  },
  {
    id: 'setup-future',
    name: 'Setup Futuro',
    category: 'Avancado',
    panelQuantity: 11,
    estimatedPower: 6.05,
    estimatedGeneration: 600,
    estimatedSavings: 100,
    estimatedPrice: 38000,
    estimatedPaybackMonths: 48,
    areaNeeded: 28,
    inverter: 'Inversor Deye 8kW',
    description: 'Solucao preparada para crescimento de consumo e novos equipamentos.',
    benefits: ['Compensa consumo maior', 'Suporta expansao', 'Maior autonomia energetica'],
    includedItems: ['11 placas de 550W', 'Inversor Deye', 'Protecoes eletricas', 'App de acompanhamento']
  }
];
