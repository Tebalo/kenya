/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getVacancies } from './actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Users, GraduationCap, Contact, CalendarClock } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { VacancyForm } from './new-vacancy-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface Vacancy {
    id: number,
    vacancy_number: string;
    position_title: string;
    organization_name: string;
    sector: string;
    board_size: number;
    term_length: number;
    reg_status: string;
    start_date: string;
    remuneration: string;
    meeting_frequency: string;
    qualifications: string;
    experience: string;
    additional_requirements: string;
    deadline: string;
    submission_method: string;
    contact_person: string;
    contact_email: string;
    contact_phone: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function VacanciesPage() {
const [vacancies, setVacancies] = useState<Vacancy[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVacancies();
        console.log('Fetched data:', data); // Debug log
        setVacancies(data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
   }, []);

return (
    <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
        <div>
        <h1 className="text-3xl font-bold tracking-tight">Board Vacancies</h1>
        <p className="text-muted-foreground">View available board positions</p>
        </div>
        <VacancyForm />
    </div>

    <Card>
        <CardContent className="p-0">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Vacancy Number</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {loading ? (
                <TableRow>
                <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                </TableRow>
            ) : vacancies.map((vacancy) => (
                <TableRow key={vacancy.vacancy_number}>
                    <TableCell className="font-medium">{vacancy.vacancy_number}</TableCell>
                    <TableCell>{vacancy.position_title}</TableCell>
                    <TableCell>{vacancy.organization_name}</TableCell>
                    <TableCell>{vacancy.sector}</TableCell>
                    <TableCell>{format(new Date(vacancy.deadline), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                        <Badge 
                        variant={vacancy.is_active ? "default" : "secondary"}
                        >
                        {vacancy.is_active ? 'Active' : 'Closed'}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                <DialogTitle>Vacancy Details - {vacancy.vacancy_number}</DialogTitle>
                                </DialogHeader>
                                <VacancyDetails vacancy={vacancy} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CardContent>
    </Card>
    </div>
);
}



function VacancyDetails({ vacancy }: { vacancy: Vacancy }) {
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    return (
      <div className="max-h-[80vh] overflow-y-auto pr-2">
        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Organization</Label>
                <p className="font-medium">{vacancy.organization_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Sector</Label>
                <p className="font-medium">{vacancy.sector}</p>
              </div>
            </CardContent>
          </Card>
   
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Board Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-muted-foreground">Board Size</Label>
                <p className="font-medium">{vacancy.board_size} members</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Term Length</Label>
                <p className="font-medium">{vacancy.term_length} years</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Meeting Frequency</Label>
                <p className="font-medium">{vacancy.meeting_frequency}</p>
              </div>
            </CardContent>
          </Card>
   
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Qualifications</Label>
                <p className="font-medium">{vacancy.qualifications}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Experience</Label>
                <p className="font-medium">{vacancy.experience}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Additional Requirements</Label>
                <p className="font-medium">{vacancy.additional_requirements}</p>
              </div>
            </CardContent>
          </Card>
   
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Contact className="h-5 w-5 text-primary" />
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-muted-foreground">Contact Person</Label>
                <p className="font-medium">{vacancy.contact_person}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{vacancy.contact_email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium">{vacancy.contact_phone}</p>
              </div>
            </CardContent>
          </Card>
   
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Submission Method</Label>
                <p className="font-medium">{vacancy.submission_method}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Deadline</Label>
                <p className="font-medium">{format(new Date(vacancy.deadline), 'PPP')}</p>
              </div>
            </CardContent>
          </Card>
   
          <div className="flex justify-end gap-4">
            <Button variant="outline">Download Details</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Apply Now</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Apply for {vacancy.position_title}-{vacancy.vacancy_number}</DialogTitle>
                </DialogHeader>
                <ApplicationForm 
                  vacancy={vacancy}
                  onSubmit={() => {
                    setOpen(false);
                    toast({
                      title: "Application Submitted",
                      description: "Your application has been successfully submitted.",
                    });
                    router.push('/dashboard/board/my-applications');
                  }} 
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
}

interface ApplicationFormProps {
  vacancy: Vacancy;
  onSubmit: () => void;
 }
 
 function ApplicationForm({ vacancy, onSubmit }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('http://172.236.179.13:8080/api/governance/board-application/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vacancy: vacancy.id,
          title: formData.get('title'),
          first_name: formData.get('first_name'), 
          last_name: formData.get('last_name'),
          gender: formData.get('gender'),
          nationality: formData.get('nationality'),
          omang: formData.get('omang'),
          passport: formData.get('passport'),
          date_of_birth: formData.get('date_of_birth'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          physical_address: formData.get('physical_address'),
          postal_address: formData.get('postal_address'),
          highest_qualification: formData.get('highest_qualification'),
          field_of_study: formData.get('field_of_study'),
          institution: formData.get('institution'),
          year_completed: Number(formData.get('year_completed')),
          professional_memberships: formData.get('professional_memberships'),
          current_employer: formData.get('current_employer'),
          current_position: formData.get('current_position'),
          years_of_experience: Number(formData.get('years_of_experience')),
          criminal_record: formData.get('criminal_record') === 'true',
          conflicts: formData.get('conflicts') === 'true',
          bankruptcy: formData.get('bankruptcy') === 'true'
        })
      });
 
      if (response.ok) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Title</Label>
              <Select name="title" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>First Name</Label>
              <Input name="first_name" required />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input name="last_name" required />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              <Select name="gender" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Nationality</Label>
              <Input name="nationality" required />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Omang Number</Label>
              <Input name="omang" />
            </div>
            <div>
              <Label>Passport Number</Label>
              <Input name="passport" />
            </div>
          </div>
 
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" name="date_of_birth" required />
          </div>
        </CardContent>
      </Card>
 
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" required />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" required />
            </div>
          </div>
 
          <div>
            <Label>Physical Address</Label>
            <Textarea name="physical_address" required />
          </div>
 
          <div>
            <Label>Postal Address</Label>
            <Textarea name="postal_address" required />
          </div>
        </CardContent>
      </Card>
 
      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Highest Qualification</Label>
              <Input name="highest_qualification" required />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input name="field_of_study" required />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Institution</Label>
              <Input name="institution" required />
            </div>
            <div>
              <Label>Year Completed</Label>
              <Input type="number" name="year_completed" required />
            </div>
          </div>
 
          <div>
            <Label>Professional Memberships</Label>
            <Textarea name="professional_memberships" />
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Employer</Label>
              <Input name="current_employer" required />
            </div>
            <div>
              <Label>Current Position</Label>
              <Input name="current_position" required />
            </div>
          </div>
 
          <div>
            <Label>Years of Experience</Label>
            <Input type="number" name="years_of_experience" required />
          </div>
        </CardContent>
      </Card>
 
      {/* Declarations */}
      <Card>
        <CardHeader>
          <CardTitle>Declarations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox name="criminal_record" />
            <Label>I declare that I have no criminal record</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox name="conflicts" />
            <Label>I declare that I have no conflicts of interest</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox name="bankruptcy" />
            <Label>I declare that I have never been declared bankrupt</Label>
          </div>
        </CardContent>
      </Card>
 
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
 }