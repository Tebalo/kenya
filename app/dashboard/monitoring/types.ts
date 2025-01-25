export interface IncomeStatement {
    id: string;
    companyName: string;
    periodStart: string;
    periodEnd: string;
    revenue: {
      id: string;
      description: string;
      amount: number;
    }[];
    expenses: {
      id: string;
      description: string;
      amount: number;
    }[];
    createdAt: string;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
  }