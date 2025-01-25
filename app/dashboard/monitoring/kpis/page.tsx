'use client';

import React, { useState } from 'react';
import { kpiGroups, timeFilters } from './kpiMetrics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Download, FileSpreadsheet } from 'lucide-react';
import * as Icons from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface Entity {
  id: string;
  name: string;
  code: string;
}

interface Metric {
  name: string;
  key: string;
  formula: string;
  description: string;
  category: string;
  value?: number;
  trend?: number;
  historicalData?: Array<{ date: string; value: number }>;
}

const entities: Entity[] = [
  { id: '1', name: 'Water Utilities Corporation', code: 'wuc' },
  { id: '2', name: 'Botswana Power Corporation', code: 'bpc' },
  { id: '3', name: 'Air Botswana', code: 'ab' },
];

// Mock data generator for demonstration
const generateMockData = (metric: Metric) => {
  const value = Math.random() * 100;
  const trend = Math.random() * 10 - 5; // Random value between -5 and 5
  const historicalData = Array.from({ length: 6 }, (_, i) => ({
    date: `${i + 1}/2024`,
    value: Math.random() * 100
  }));
  
  return {
    ...metric,
    value: parseFloat(value.toFixed(2)),
    trend: parseFloat(trend.toFixed(2)),
    historicalData
  };
};

const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => (
  <Card className="bg-muted/50">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex justify-between items-start">
        <span>{metric.name}</span>
        {metric.trend && (
          <span className={`text-sm px-2 py-1 rounded ${
            metric.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {metric.trend > 0 ? '+' : ''}{metric.trend}%
          </span>
        )}
      </CardTitle>
      <CardDescription className="text-xs">{metric.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="text-3xl font-bold">
          {metric.value ? `${metric.value}%` : '--'}
        </div>
        {metric.historicalData && (
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-2">
          Formula: {metric.formula}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function SingleEntityDashboard() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [timeRange, setTimeRange] = useState('month');
  const [dateRange, setDateRange] = useState<DateRange>();

  const handleExport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting as ${format} for ${selectedEntity?.name}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Entity Performance</h2>
          <p className="text-muted-foreground">
            Monitor key performance indicators
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedEntity?.code}
            onValueChange={(code) => {
              const entity = entities.find(e => e.code === code);
              setSelectedEntity(entity || null);
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an entity to view metrics" />
            </SelectTrigger>
            <SelectContent>
              {entities.map(entity => (
                <SelectItem key={entity.id} value={entity.code}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {timeRange === 'custom' && (
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                <Icons.File className="h-4 w-4 mr-2" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedEntity ? (
        <div className="space-y-6">
          {kpiGroups.map((group, index) => {
            const GroupIcon = Icons[group.icon as keyof typeof Icons];
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {GroupIcon && <Icons.UserCog2 className="h-5 w-5" />}
                    <CardTitle>{group.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.metrics.map((metric, mIndex) => (
                      <MetricCard
                        key={mIndex}
                        metric={generateMockData(metric)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Icons.BarChart2 className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              Select an entity to view its performance metrics
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}