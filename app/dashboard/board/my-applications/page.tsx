'use client';

import React, { useEffect, useState } from 'react';
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Users, GraduationCap, Contact, CalendarClock } from 'lucide-react';
import { Label } from "@/components/ui/label";

interface BoardApplication {
    id: number;
    applicant_name: string;
    email: string;
    vacancy: string;
    organization: string;
    reg_status: string;
    created_at: string;
  }

interface ApplicationDetails {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  reg_status: string;
  application_number: string;
  gender: string;
  nationality: string;
  omang: string;
  passport: string;
  date_of_birth: string;
  email: string;
  phone: string;
  physical_address: string;
  postal_address: string;
  highest_qualification: string;
  field_of_study: string;
  institution: string;
  year_completed: number;
  professional_memberships: string;
  current_employer: string;
  current_position: string;
  years_of_experience: number;
  previous_board_experience: string;
  other_expertise: string;
  criminal_record: boolean;
  conflicts: boolean;
  bankruptcy: boolean;
  declaration_text: string;
  created_at: string;
  documents: {
    document_type: string;
    file_url: string;
    uploaded_at: string;
  }[];
}

export default function VacanciesPage() {
    const [boardApplications, setBoardApplications] = useState<BoardApplication[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const email = 'johndoe@example.com'

    useEffect(() => {
        fetchBoardApplications();
    }, []);

    async function fetchBoardApplications() {
        try {
        const response = await fetch(`http://172.236.179.13:8080/api/governance/board-application-list/?email=${email}&count=10`, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.status === 'success') {
            setBoardApplications(data.applications);
        }
        } catch (error) {
        console.error('Error:', error);
        } finally {
        setLoading(false);
        }
    }

    const fetchApplicationDetails = async (id: number) => {
        try {
        const applicationNumber = `APL-01-25-${id.toString().padStart(5, '0')}`;
        const response = await fetch(`http://172.236.179.13:8080/api/governance/applications/${applicationNumber}/`, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.status === 'success') {
            setSelectedApplication(data.application);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-muted-foreground">View my board applications</p>
            </div>
        </div>

        <Card>
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vacancy</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
            {loading ? (
            <TableRow>
                <TableCell colSpan={7} className="text-center">Loading...</TableCell>
            </TableRow>
            ) : boardApplications.length === 0 ? (
            <TableRow>
                <TableCell colSpan={7} className="text-center">No applications found</TableCell>
            </TableRow>
            ) : (
            boardApplications.map((application) => (
                <TableRow key={application.id}>
                <TableCell>{application.applicant_name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.vacancy}</TableCell>
                <TableCell>{application.organization}</TableCell>
                <TableCell>
                    <Badge variant="outline">
                    {application.reg_status.toUpperCase()}
                    </Badge>
                </TableCell>
                <TableCell>{format(new Date(application.created_at), 'MMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                    <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => fetchApplicationDetails(application.id)}
                        >
                        <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    {selectedApplication && (
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                            Application Details - {selectedApplication.application_number}
                            </DialogTitle>
                        </DialogHeader>
                        <ApplicationDetails application={selectedApplication} />
                        </DialogContent>
                    )}
                    </Dialog>
                </TableCell>
                </TableRow>
            ))
            )}
        </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
    );
}

function ApplicationDetails({ application }: { application: ApplicationDetails }) {
  return (
    <div className="grid gap-6">
      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Contact className="h-5 w-5 text-primary" />
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-muted-foreground">Full Name</Label>
            <p className="font-medium">{application.title} {application.first_name} {application.last_name}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Date of Birth</Label>
            <p className="font-medium">{format(new Date(application.date_of_birth), 'PPP')}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Gender</Label>
            <p className="font-medium">{application.gender}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Nationality</Label>
            <p className="font-medium">{application.nationality}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">ID/Passport</Label>
            <p className="font-medium">{application.omang || application.passport}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{application.email}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Phone</Label>
            <p className="font-medium">{application.phone}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Physical Address</Label>
            <p className="font-medium">{application.physical_address}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Postal Address</Label>
            <p className="font-medium">{application.postal_address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <CardTitle>Professional Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">Highest Qualification</Label>
              <p className="font-medium">{application.highest_qualification}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Field of Study</Label>
              <p className="font-medium">{application.field_of_study}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Institution</Label>
              <p className="font-medium">{application.institution}</p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Year Completed</Label>
            <p className="font-medium">{application.year_completed}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Professional Memberships</Label>
            <p className="font-medium">{application.professional_memberships}</p>
          </div>
        </CardContent>
      </Card>

      {/* Current Employment */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Current Employment</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-muted-foreground">Current Employer</Label>
            <p className="font-medium">{application.current_employer}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Current Position</Label>
            <p className="font-medium">{application.current_position}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Years of Experience</Label>
            <p className="font-medium">{application.years_of_experience}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {application.documents.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{doc.document_type}</TableCell>
                  <TableCell>{format(new Date(doc.uploaded_at), 'PPP')}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(doc.file_url, '_blank')}
                    >
                      View Document
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Reject Application</Button>
        <Button>Approve Application</Button>
      </div>
    </div>
  );
}