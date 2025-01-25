'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X, Calculator, Building2, Receipt, CreditCard } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

export function IncomeStatementForm() {
  const [open, setOpen] = React.useState(false);
  const [revenueItems, setRevenueItems] = React.useState<LineItem[]>([]);
  const [expenseItems, setExpenseItems] = React.useState<LineItem[]>([]);

  const totalRevenue = revenueItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netIncome = totalRevenue - totalExpenses;

  const addItem = (type: 'revenue' | 'expense') => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      amount: 0
    };
    if (type === 'revenue') {
      setRevenueItems([...revenueItems, newItem]);
    } else {
      setExpenseItems([...expenseItems, newItem]);
    }
  };

  const removeItem = (id: string, type: 'revenue' | 'expense') => {
    if (type === 'revenue') {
      setRevenueItems(revenueItems.filter(item => item.id !== id));
    } else {
      setExpenseItems(expenseItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (
    id: string, 
    field: 'description' | 'amount', 
    value: string | number, 
    type: 'revenue' | 'expense'
  ) => {
    const items = type === 'revenue' ? revenueItems : expenseItems;
    const setItems = type === 'revenue' ? setRevenueItems : setExpenseItems;
    
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: field === 'amount' ? Number(value) || 0 : value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-2">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Statement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Receipt className="h-5 w-5" />
            New Income Statement
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Info Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5" />
                <h3 className="font-semibold">Company Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Company Name</Label>
                  <Input placeholder="Enter company name" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Period Start</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Period End</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Revenue</h3>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addItem('revenue')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Revenue
                </Button>
              </div>
              <div className="space-y-3">
                {revenueItems.map((item) => (
                  <div key={item.id} 
                    className="flex gap-2 items-start bg-muted/50 p-2 rounded-lg">
                    <Input
                      placeholder="Revenue description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value, 'revenue')}
                      className="flex-grow bg-white"
                    />
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={item.amount || ''}
                      onChange={(e) => updateItem(item.id, 'amount', e.target.value, 'revenue')}
                      className="w-32 bg-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id, 'revenue')}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {revenueItems.length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No revenue items added yet
                  </div>
                )}
                <div className="flex justify-end mt-2 font-medium">
                  Total Revenue: {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold">Expenses</h3>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addItem('expense')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
              <div className="space-y-3">
                {expenseItems.map((item) => (
                  <div key={item.id} 
                    className="flex gap-2 items-start bg-muted/50 p-2 rounded-lg">
                    <Input
                      placeholder="Expense description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value, 'expense')}
                      className="flex-grow bg-white"
                    />
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={item.amount || ''}
                      onChange={(e) => updateItem(item.id, 'amount', e.target.value, 'expense')}
                      className="w-32 bg-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id, 'expense')}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {expenseItems.length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No expense items added yet
                  </div>
                )}
                <div className="flex justify-end mt-2 font-medium">
                  Total Expenses: {totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span>{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Expenses</span>
                  <span>{totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Net Income</span>
                  <span className={netIncome >= 0 ? "text-green-600" : "text-red-600"}>
                    {netIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Statement</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}