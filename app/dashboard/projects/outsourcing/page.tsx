'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Users, FileText, AlertCircle } from 'lucide-react';

interface Milestone {
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

interface Risk {
  type: string;
  description: string;
}

interface Project {
  id: number;
  name: string;
  vendor: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  startDate: string;
  duration: string;
  budget: string;
  completion: number;
  milestones: Milestone[];
  risks: Risk[];
}

interface PerformanceData {
  month: string;
  cost: number;
  quality: number;
  timeline: number;
}

const OutsourcingPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "IT Infrastructure Services",
      vendor: "TechCorp Solutions",
      status: "In Progress",
      startDate: "2024-11-15",
      duration: "12 months",
      budget: "P2,500,000",
      completion: 45,
      milestones: [
        { name: "Requirements Gathering", status: "Completed" },
        { name: "Vendor Selection", status: "Completed" },
        { name: "Implementation", status: "In Progress" },
        { name: "Testing", status: "Pending" }
      ],
      risks: [
        { type: "Technical", description: "System integration challenges" },
        { type: "Operational", description: "Staff training delays" }
      ]
    },
    {
      id: 2,
      name: "Facilities Management",
      vendor: "BuildCare Pro",
      status: "Planning",
      startDate: "2025-02-01",
      duration: "24 months",
      budget: "P4,800,000",
      completion: 15,
      milestones: [
        { name: "Scope Definition", status: "Completed" },
        { name: "Vendor RFP", status: "In Progress" },
        { name: "Contract Negotiation", status: "Pending" },
        { name: "Transition", status: "Pending" }
      ],
      risks: [
        { type: "Financial", description: "Budget overrun potential" },
        { type: "Compliance", description: "Regulatory requirements" }
      ]
    }
  ];

  const performanceData: PerformanceData[] = [
    { month: 'Nov', cost: 85, quality: 90, timeline: 88 },
    { month: 'Dec', cost: 82, quality: 87, timeline: 85 },
    { month: 'Jan', cost: 88, quality: 92, timeline: 90 }
  ];

  const getStatusColor = (status: Project['status'] | Milestone['status']): string => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Active Projects</div>
            <div className="text-3xl font-bold mt-2">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Budget</div>
            <div className="text-3xl font-bold mt-2">P12.5M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Vendors</div>
            <div className="text-3xl font-bold mt-2">8</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cost" stroke="#2563eb" name="Cost Efficiency" />
                    <Line type="monotone" dataKey="quality" stroke="#16a34a" name="Quality Score" />
                    <Line type="monotone" dataKey="timeline" stroke="#d97706" name="Timeline Adherence" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setActiveProject(project)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{project.name}</span>
                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">{project.vendor}</div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${project.completion}%`}}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {activeProject && (
        <Card>
          <CardHeader>
            <CardTitle>{activeProject.name} - Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">Vendor: {activeProject.vendor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">Start Date: {activeProject.startDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">Duration: {activeProject.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">Budget: {activeProject.budget}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Milestones</h4>
                <div className="space-y-2">
                  {activeProject.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{milestone.name}</span>
                      <span className={`px-2 py-1 rounded ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>

                <h4 className="font-medium mt-4 mb-2">Risk Assessment</h4>
                <div className="space-y-2">
                  {activeProject.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{risk.type}:</span> {risk.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OutsourcingPage;