import { IncomeStatement } from "../types";

export const sampleIncomeStatements: IncomeStatement[] = [
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

