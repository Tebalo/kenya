import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, FileText} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IncomeStatementForm } from './income-form';

interface Statement {
  id: string;
  name: string;
  type: string;
  period: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const sampleStatements: Statement[] = [
  {
    id: '1',
    name: 'Water Utilities Corporation',
    type: 'Income Statement',
    period: 'Q4 2024',
    submissionDate: '2024-12-31',
    status: 'Approved'
  },
  {
    id: '2',
    name: 'Botswana Power Corporation',
    type: 'Income Statement',
    period: 'Q4 2024',
    submissionDate: '2024-12-30',
    status: 'Pending'
  },
  {
    id: '3',
    name: 'Air Botswana',
    type: 'Income Statement',
    period: 'Q4 2024',
    submissionDate: '2024-12-29',
    status: 'Rejected'
  }
];

export default function MonitoringPage() {
  return (
    <div className=''>
      <Tabs defaultValue="income" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="h-auto p-1 grid grid-cols-2 w-full sm:w-auto">
            <TabsTrigger value="income" className="gap-2 px-3 py-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Income Statements</span>
              <span className="sm:hidden">Income</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2 px-3 py-2" disabled>
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Statement Of Financial Position</span>
              <span className="sm:hidden">Balance Sheet</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* <Button size="sm" variant="outline" className="h-8 gap-2 flex-1 sm:flex-initial">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
            </Button> */}
            </div>
        </div>

        <TabsContent value="income">
          <Card>
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle>Income Statement</CardTitle>
                <CardDescription>
                  For the Years Ending December 31, 2023 and 2024
                </CardDescription>
              </div>
              <IncomeStatementForm />
            </div>
          </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleStatements.map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell className="font-medium">{statement.name}</TableCell>
                      <TableCell>{statement.type}</TableCell>
                      <TableCell>{statement.period}</TableCell>
                      <TableCell>{statement.submissionDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          statement.status === 'Approved' 
                            ? 'bg-green-100 text-green-800'
                            : statement.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {statement.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>
                Track and analyze organizational performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              Performance reporting content
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Alerts</CardTitle>
              <CardDescription>
                View system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              Alerts and notifications content
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}