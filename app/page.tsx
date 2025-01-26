'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Building2, Users, GraduationCap, CalendarDays } from 'lucide-react';
import { Navbar } from '@/components/nav-bar';
import Image from 'next/image';
import { Footer } from '@/components/footer';

const jobOpenings = [
  {
    id: 1,
    title: "Board Member",
    organization: "Water Utilities Corporation",
    type: "Board Position",
    deadline: "2024-02-28",
    requirements: [
      "15+ years of executive experience",
      "Strong understanding of public utilities",
      "Previous board experience preferred"
    ]
  },
  {
    id: 2,
    title: "Independent Director",
    organization: "Botswana Power Corporation",
    type: "Board Position",
    deadline: "2024-03-15",
    requirements: [
      "Financial expertise",
      "Energy sector knowledge",
      "Corporate governance experience"
    ]
  },
  {
    id: 3,
    title: "Advisory Board Member",
    organization: "Air Botswana",
    type: "Advisory Role",
    deadline: "2024-02-20",
    requirements: [
      "Aviation industry experience",
      "Strategic planning expertise",
      "International business exposure"
    ]
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Shaping Botswana&rsquo;s Public Enterprise Future
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join PEEPA in transforming state-owned enterprises through privatization, corporate governance, and performance excellence.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  View Opportunities
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image 
                src="/logopeepa_final-1.jpg"
                alt="PEEPA Logo"
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>
                <Building2 className="h-5 w-5 mb-2" />
                State Enterprises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">32+</div>
              <p className="text-muted-foreground">Monitored organizations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Users className="h-5 w-5 mb-2" />
                Board Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
              <p className="text-muted-foreground">Current openings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <GraduationCap className="h-5 w-5 mb-2" />
                Development Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-muted-foreground">Active programs</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Current Opportunities</h2>
        <Tabs defaultValue="board" className="space-y-8">
          <TabsList>
            <TabsTrigger value="board">Board Positions</TabsTrigger>
            <TabsTrigger value="advisory">Advisory Roles</TabsTrigger>
            <TabsTrigger value="executive">Executive Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-4">
            {jobOpenings.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                      <p className="text-muted-foreground">{job.organization}</p>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-muted-foreground">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <Footer/>
    </div>
  );
}