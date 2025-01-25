// import { LucideIcon } from 'lucide-react';

export interface Metric {
  name: string;
  key: string;
  formula: string;
  description: string;
  category: string;
}

export interface Group {
  title: string;
  icon: keyof typeof import('lucide-react');
  metrics: Metric[];
}

export interface Entity {
  id: string;
  name: string;
  code: string;
}