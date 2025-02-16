'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Eye, Download, Filter } from "lucide-react";
import { sampleIncomeStatements} from './sample-data';
import { IncomeStatement } from '../types';
import { IncomeStatementForm } from '../income-form';

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  submitted: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

function StatementDetails({ statement }: { statement: IncomeStatement }) {
  const totalRevenue = statement.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = statement.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{statement.companyName}</h3>
          <p className="text-sm text-muted-foreground">
            Period: {format(new Date(statement.periodStart), 'MMM d, yyyy')} - {format(new Date(statement.periodEnd), 'MMM d, yyyy')}
          </p>
        </div>
        <Badge variant="outline" className={statusColors[statement.status]}>
          {statement.status.charAt(0).toUpperCase() + statement.status.slice(1)}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statement.revenue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {item.amount.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell>Total Revenue</TableCell>
                <TableCell className="text-right">
                  {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statement.expenses.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {item.amount.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell>Total Expenses</TableCell>
                <TableCell className="text-right">
                  {totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Net Income</span>
            <span className={netIncome >= 0 ? "text-green-600" : "text-red-600"}>
              {netIncome.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function IncomeStatementsPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedStatement, setSelectedStatement] = useState<IncomeStatement | null>(null);

  const filteredStatements = selectedCompany === 'all'
    ? sampleIncomeStatements
    : sampleIncomeStatements.filter(s => s.companyName === selectedCompany);

  const companies = Array.from(new Set(sampleIncomeStatements.map(s => s.companyName)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Income Statements</h1>
          <p className="text-muted-foreground">
            View and manage company income statements
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <IncomeStatementForm />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Net Income</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatements.map((statement) => {
                const totalRevenue = statement.revenue.reduce((sum, item) => sum + item.amount, 0);
                const totalExpenses = statement.expenses.reduce((sum, item) => sum + item.amount, 0);
                const netIncome = totalRevenue - totalExpenses;

                return (
                  <TableRow key={statement.id}>
                    <TableCell className="font-medium">{statement.companyName}</TableCell>
                    <TableCell>
                      {format(new Date(statement.periodStart), 'MMM yyyy')} - {format(new Date(statement.periodEnd), 'MMM yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                    </TableCell>
                    <TableCell className="text-right">
                      {totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                    </TableCell>
                    <TableCell className={`text-right ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netIncome.toLocaleString('en-US', { style: 'currency', currency: 'BWP' })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[statement.status]}>
                        {statement.status.charAt(0).toUpperCase() + statement.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedStatement(statement)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Income Statement Details</DialogTitle>
                          </DialogHeader>
                          {selectedStatement && <StatementDetails statement={selectedStatement} />}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}