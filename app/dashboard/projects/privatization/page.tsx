'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState('privatization');

  const privatizationData = [
    { month: 'Jan', progress: 65 },
    { month: 'Feb', progress: 72 },
    { month: 'Mar', progress: 80 },
    { month: 'Apr', progress: 85 }
  ];

  const outsourcingProjects = [
    { name: 'IT Services Migration', status: 'In Progress', completion: '75%' },
    { name: 'Facilities Management', status: 'Planning', completion: '25%' },
    { name: 'HR Operations', status: 'Completed', completion: '100%' }
  ];

  const governanceMetrics = [
    { name: 'Board Compliance', value: '92%' },
    { name: 'Risk Assessment', value: '85%' },
    { name: 'Audit Completion', value: '78%' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'privatization':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privatization Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={privatizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'outsourcing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Active Outsourcing Projects</h3>
            <div className="divide-y">
              {outsourcingProjects.map((project, index) => (
                <div key={index} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{project.name}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: project.completion}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'governance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Corporate Governance Metrics</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {governanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">{metric.name}</div>
                    <div className="text-2xl font-bold mt-1">{metric.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Project Management Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <nav className="flex space-x-4">
            {[
              { id: 'privatization', label: 'Privatization' },
              { id: 'outsourcing', label: 'Outsourcing' },
              { id: 'governance', label: 'Corporate Governance' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default ProjectDashboard;