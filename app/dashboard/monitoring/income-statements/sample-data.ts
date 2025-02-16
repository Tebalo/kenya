import { IncomeStatement } from "../types";

export const sampleIncomeStatements: IncomeStatement[] = [
  {
    id: '1',
    companyName: 'Botswana Power Corporation (BPC)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Electricity Generation', amount: 110000 },
      { id: 'r2', description: 'Power Distribution', amount: 25000 },
      { id: 'r3', description: 'Connection Services', amount: 45000 }
    ],
    expenses: [
      { id: 'e1', description: 'Power Plant Maintenance', amount: 45000 },
      { id: 'e2', description: 'Staff Salaries', amount: 55000 },
      { id: 'e3', description: 'Transmission Costs', amount: 42660 }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    status: 'approved'
  },
  {
    id: '2',
    companyName: 'Botswana Savings Bank (BSB)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Interest Income', amount: 180000 },
      { id: 'r2', description: 'Banking Services', amount: 35000 }
    ],
    expenses: [
      { id: 'e1', description: 'Interest Expenses', amount: 85000 },
      { id: 'e2', description: 'Operating Costs', amount: 45000 },
      { id: 'e3', description: 'Employee Benefits', amount: 35000 }
    ],
    createdAt: '2024-01-16T14:20:00Z',
    status: 'submitted'
  },
  {
    id: '3',
    companyName: 'Motor Vehicle Accident Fund (MVAF)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Insurance Premiums', amount: 250000 },
      { id: 'r2', description: 'Investment Income', amount: 75000 },
      { id: 'r3', description: 'Recovery Income', amount: 25000 }
    ],
    expenses: [
      { id: 'e1', description: 'Claim Settlements', amount: 95000 },
      { id: 'e2', description: 'Administrative Costs', amount: 120000 },
      { id: 'e3', description: 'Staff Costs', amount: 65000 },
      { id: 'e4', description: 'Prevention Programs', amount: 35000 }
    ],
    createdAt: '2024-01-17T09:15:00Z',
    status: 'draft'
  },
  {
    id: '4',
    companyName: 'Bank of Botswana (BOB)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Investment Returns', amount: 320000 },
      { id: 'r2', description: 'Foreign Exchange Operations', amount: 145000 },
      { id: 'r3', description: 'Treasury Services', amount: 88000 }
    ],
    expenses: [
      { id: 'e1', description: 'Currency Production', amount: 125000 },
      { id: 'e2', description: 'Monetary Policy Operations', amount: 95000 },
      { id: 'e3', description: 'Staff Costs', amount: 78000 },
      { id: 'e4', description: 'Research and Development', amount: 42000 }
    ],
    createdAt: '2024-01-18T11:45:00Z',
    status: 'approved'
  },
  {
    id: '5',
    companyName: 'Botswana Stock Exchange (BSE)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Listing Fees', amount: 165000 },
      { id: 'r2', description: 'Trading Commissions', amount: 98000 },
      { id: 'r3', description: 'Market Data Services', amount: 45000 }
    ],
    expenses: [
      { id: 'e1', description: 'Technology Infrastructure', amount: 76000 },
      { id: 'e2', description: 'Market Operations', amount: 58000 },
      { id: 'e3', description: 'Staff Costs', amount: 52000 },
      { id: 'e4', description: 'Regulatory Compliance', amount: 38000 }
    ],
    createdAt: '2024-01-19T13:20:00Z',
    status: 'submitted'
  },
  {
    id: '6',
    companyName: 'Botswana Unified Revenue Service (BURS)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Tax Collection Fees', amount: 280000 },
      { id: 'r2', description: 'Customs Duties', amount: 195000 },
      { id: 'r3', description: 'Penalties and Interest', amount: 65000 }
    ],
    expenses: [
      { id: 'e1', description: 'Tax Administration', amount: 145000 },
      { id: 'e2', description: 'Customs Operations', amount: 125000 },
      { id: 'e3', description: 'Staff Costs', amount: 98000 },
      { id: 'e4', description: 'IT Systems', amount: 75000 }
    ],
    createdAt: '2024-01-20T15:10:00Z',
    status: 'draft'
  },
  {
    id: '7',
    companyName: 'National Development Bank (NDB)',
    periodStart: '2024-01-01',
    periodEnd: '2024-12-31',
    revenue: [
      { id: 'r1', description: 'Loan Interest Income', amount: 225000 },
      { id: 'r2', description: 'Development Project Fees', amount: 112000 },
      { id: 'r3', description: 'Advisory Services', amount: 55000 }
    ],
    expenses: [
      { id: 'e1', description: 'Funding Costs', amount: 135000 },
      { id: 'e2', description: 'Project Development', amount: 95000 },
      { id: 'e3', description: 'Staff Costs', amount: 72000 },
      { id: 'e4', description: 'Risk Management', amount: 48000 }
    ],
    createdAt: '2024-01-21T16:30:00Z',
    status: 'approved'
  }
];
export const sampleIncomeStatements1: IncomeStatement[] = [
    {
      id: '1',
      companyName: 'Water Utilities Corporation',
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
      revenue: [
        { id: 'r1', description: 'Water Supply Services', amount: 110000 },
        { id: 'r2', description: 'Connection Fees', amount: 25000 },
        { id: 'r3', description: 'Maintenance Services', amount: 45000 }
      ],
      expenses: [
        { id: 'e1', description: 'Infrastructure Maintenance', amount: 45000 },
        { id: 'e2', description: 'Staff Salaries', amount: 55000 },
        { id: 'e3', description: 'Operational Costs', amount: 42660 }
      ],
      createdAt: '2024-01-15T10:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      companyName: 'Botswana Power Corporation',
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
      revenue: [
        { id: 'r1', description: 'Electricity Supply', amount: 180000 },
        { id: 'r2', description: 'Installation Services', amount: 35000 }
      ],
      expenses: [
        { id: 'e1', description: 'Power Generation', amount: 85000 },
        { id: 'e2', description: 'Grid Maintenance', amount: 45000 },
        { id: 'e3', description: 'Employee Benefits', amount: 35000 }
      ],
      createdAt: '2024-01-16T14:20:00Z',
      status: 'submitted'
    },
    {
      id: '3',
      companyName: 'Air Botswana',
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
      revenue: [
        { id: 'r1', description: 'Passenger Tickets', amount: 250000 },
        { id: 'r2', description: 'Cargo Services', amount: 75000 },
        { id: 'r3', description: 'Additional Services', amount: 25000 }
      ],
      expenses: [
        { id: 'e1', description: 'Aircraft Maintenance', amount: 95000 },
        { id: 'e2', description: 'Fuel Costs', amount: 120000 },
        { id: 'e3', description: 'Staff Costs', amount: 65000 },
        { id: 'e4', description: 'Airport Fees', amount: 35000 }
      ],
      createdAt: '2024-01-17T09:15:00Z',
      status: 'draft'
    }
];

