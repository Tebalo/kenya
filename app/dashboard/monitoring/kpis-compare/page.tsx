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
import { Badge } from "@/components/ui/badge";
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
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, FileSpreadsheet, Share2, X } from 'lucide-react';
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
}

// interface Group {
//   title: string;
//   icon: keyof typeof Icons;
//   metrics: Metric[];
// }

interface ComparisonChartProps {
  metric: Metric;
  entities: Entity[];
}

interface MetricCardProps {
  metric: Metric;
  entities: Entity[];
}

const entities: Entity[] = [
  { id: '1', name: 'Botswana Power Corporation', code: 'bpc' },
  { id: '2', name: 'Botswana Savings Bank', code: 'bsb' },
  { id: '3', name: 'Bank of Botswana', code: 'bob' },
  { id: '4', name: 'Botswana Stock Exchange', code: 'bse' },
  { id: '5', name: 'National Development Bank', code: 'ndb' },
  { id: '6', name: 'Botswana Unified Revenue Service', code: 'burs' },
  { id: '7', name: 'Motor Vehicle Accident Fund', code: 'mvaf' }
];

export default function EnhancedKPIDashboard() {
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);
  const [timeRange, setTimeRange] = useState('month');
  const [dateRange, setDateRange] = useState<DateRange>();
  const [comparisonMode, setComparisonMode] = useState(false);

  const handleExport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting as ${format}`);
  };

  const handleShare = () => {
    console.log('Sharing dashboard');
  };

  const handleEntitySelect = (entityCode: string) => {
    const entity = entities.find(e => e.code === entityCode);
    if (entity && !selectedEntities.find(e => e.id === entity.id)) {
      setSelectedEntities([...selectedEntities, entity]);
    }
  };

  const handleEntityRemove = (entityId: string) => {
    setSelectedEntities(selectedEntities.filter(e => e.id !== entityId));
  };

  const generateMockData = (entity: Entity) => {
    return Array.from({ length: 6 }, (_, i) => ({
      date: `2024-${i + 1}`,
      value: Math.random() * 100,
      entityId: entity.id
    }));
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ComparisonChart: React.FC<ComparisonChartProps> = ({ metric, entities }) => {
    // Generate mock data for each entity
    const data = entities.flatMap(entity => generateMockData(entity));
    
    return (
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => value.split('-')[1]}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => value.toFixed(2)}
              labelFormatter={(label) => `Month ${label.split('-')[1]}`}
            />
            <Legend />
            {entities.map((entity, index) => (
              <Line
                key={entity.id}
                type="monotone"
                dataKey="value"
                data={data.filter(d => d.entityId === entity.id)}
                name={entity.name}
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
                dot={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const MetricCard: React.FC<MetricCardProps> = ({ metric, entities }) => {
    const mockCurrentValue = Math.random() * 100;
    const mockTrend = Math.random() * 10 - 5; // Random value between -5 and 5
  
    return (
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-start">
            <span>{metric.name}</span>
            {!comparisonMode && (
              <span className={`text-sm px-2 py-1 rounded ${
                mockTrend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {mockTrend > 0 ? '+' : ''}{mockTrend.toFixed(2)}%
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-xs">{metric.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {comparisonMode ? (
            <ComparisonChart metric={metric} entities={entities} />
          ) : (
            <>
              <div className="text-3xl font-bold">
                {mockCurrentValue.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Formula: {metric.formula}
              </div>
              {entities.length === 1 && (
                <div className="mt-4 h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateMockData(entities[0])}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => value.split('-')[1]}
                        fontSize={10}
                      />
                      <YAxis fontSize={10} />
                      <Tooltip 
                        formatter={(value: number) => value.toFixed(2)}
                        labelFormatter={(label) => `Month ${label.split('-')[1]}`}
                      />
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
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">KPI Dashboard</h2>
          <p className="text-muted-foreground">
            Compare performance metrics across entities
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
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

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Entity Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Compare Entities</CardTitle>
          <CardDescription>Select entities to compare performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={handleEntitySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select an entity to compare" />
            </SelectTrigger>
            <SelectContent>
              {entities
                .filter(entity => !selectedEntities.find(e => e.id === entity.id))
                .map(entity => (
                  <SelectItem key={entity.id} value={entity.code}>
                    {entity.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2">
            {selectedEntities.map(entity => (
              <Badge key={entity.id} variant="secondary">
                {entity.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                  onClick={() => handleEntityRemove(entity.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          {selectedEntities.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComparisonMode(!comparisonMode)}
            >
              {comparisonMode ? "Hide Comparison" : "Compare Metrics"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Metrics Display */}
      {kpiGroups.map((group, index) => {
        const GroupIcon = Icons[group.icon as keyof typeof Icons];
        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {GroupIcon && <Icons.User2 className="h-5 w-5" />}
                <CardTitle>{group.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.metrics.map((metric, mIndex) => (
                  <MetricCard
                    key={mIndex}
                    metric={metric}
                    entities={selectedEntities}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}