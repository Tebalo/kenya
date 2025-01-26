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
import { Contact} from 'lucide-react';
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

export default function MyApplicationsPage() {
    const [boardApplications, setBoardApplications] = useState<BoardApplication[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await fetch('/api/user-profile');
                const data = await response.json();
                setUserEmail(data.profile.email);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userEmail) {
            fetchBoardApplications();
        }
    }, [userEmail]);

    async function fetchBoardApplications() {
        try {
            const response = await fetch(`http://172.236.179.13:8080/api/governance/board-application-list/?email=${userEmail}&count=10`, {
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
                                                        <ApplicationDetailsView application={selectedApplication} />
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

function ApplicationDetailsView({ application }: { application: ApplicationDetails }) {
  return (
    <div className="grid gap-6">
      {/* Rest of the component remains the same as in the original code */}
      {/* Personal Information, Contact Details, etc. */}
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
          {/* Rest of the content */}
        </CardContent>
      </Card>
      {/* Other sections remain the same */}
    </div>
  );
}