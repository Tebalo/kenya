'use client';

import React, { useState, useEffect } from 'react';
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
import { PlusCircle, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface Organization {
  id: number;
  name: string;
  sector: string;
  board_size: number;
}

export function VacancyForm() {
  const [open, setOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    organization_id: '',
    position_title: '',
    committee_name: '',
    term_length: '',
    start_date: '',
    remuneration: '',
    meeting_frequency: '',
    qualifications: '',
    experience: '',
    additional_requirements: '',
    deadline: '',
    submission_method: '',
    contact_person: '',
    contact_email: '',
    contact_phone: ''
  });

  // Fetch organizations on component mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://172.236.179.13:8080/api/governance/organizations/');
        const data = await response.json();
        if (data.status === 'success') {
          setOrganizations(data.organizations);
        }
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.organization_id) {
      alert('Please select an organization');
      return;
    }

    try {
      const response = await fetch('http://172.236.179.13:8080/api/governance/vacancy/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(`Vacancy created successfully. Vacancy Number: ${result.vacancy_number}`);
        setOpen(false);
        // Reset form
        setFormData({
          organization_id: '',
          position_title: '',
          committee_name: '',
          term_length: '',
          start_date: '',
          remuneration: '',
          meeting_frequency: '',
          qualifications: '',
          experience: '',
          additional_requirements: '',
          deadline: '',
          submission_method: '',
          contact_person: '',
          contact_email: '',
          contact_phone: ''
        });
        toast({
          title: "Vacancy Created",
          description: "Your vacancy has been successfully submitted.",
        });
        router.push('/dashboard/board/vacancies');
      } else {
        alert('Failed to create vacancy');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the vacancy');
      toast({
        title: "Failed",
        description: "failed to create.",
      });
      router.push('/dashboard/board/vacancies');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-2">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Create Vacancy</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" />
            Create New Vacancy
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Selection */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Select Organization</Label>
                  <select
                    name="organization_id"
                    value={formData.organization_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mt-1"
                    required
                  >
                    <option value="">Select an organization</option>
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name} ({org.sector})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vacancy Details */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Position Title</Label>
                  <Input
                    name="position_title"
                    value={formData.position_title}
                    onChange={handleInputChange}
                    placeholder="e.g. Board Member"
                    required
                  />
                </div>
                <div>
                  <Label>Committee Name</Label>
                  <Input
                    name="committee_name"
                    value={formData.committee_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Finance Committee"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Term Length (Years)</Label>
                  <Input
                    name="term_length"
                    type="number"
                    value={formData.term_length}
                    onChange={handleInputChange}
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Remuneration</Label>
                  <Input
                    name="remuneration"
                    value={formData.remuneration}
                    onChange={handleInputChange}
                    placeholder="e.g. Stipend provided"
                  />
                </div>
                <div>
                  <Label>Meeting Frequency</Label>
                  <Input
                    name="meeting_frequency"
                    value={formData.meeting_frequency}
                    onChange={handleInputChange}
                    placeholder="e.g. Monthly"
                  />
                </div>
              </div>

              <div>
                <Label>Qualifications</Label>
                <Input
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  placeholder="e.g. Master's degree in Finance"
                />
              </div>

              <div>
                <Label>Experience</Label>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g. 5 years of board experience"
                />
              </div>

              <div>
                <Label>Additional Requirements</Label>
                <Input
                  name="additional_requirements"
                  value={formData.additional_requirements}
                  onChange={handleInputChange}
                  placeholder="e.g. Good communication skills"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Application Deadline</Label>
                  <Input
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Submission Method</Label>
                  <Input
                    name="submission_method"
                    value={formData.submission_method}
                    onChange={handleInputChange}
                    placeholder="e.g. Email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contact Person</Label>
                  <Input
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input
                    name="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    placeholder="e.g. johndoe@example.com"
                  />
                </div>
              </div>

              <div>
                <Label>Contact Phone</Label>
                <Input
                  name="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 1234567890"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Vacancy</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}