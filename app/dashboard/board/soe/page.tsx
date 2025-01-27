'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent
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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface Organization {
    id: number;
    name: string;
    sector: string;
    board_size: number;
}

export default function OrganizationsPage() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Fetch organizations
    useEffect(() => {
        async function fetchOrganizations() {
            try {
                const response = await fetch('http://172.236.179.13:8080/api/governance/organizations/');
                const data = await response.json();
                setOrganizations(data.organizations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching organizations:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch organizations",
                    variant: "destructive"
                });
                setLoading(false);
            }
        }
        fetchOrganizations();
    }, []);

    const [userProfile, setUserProfile] = useState<{
        profile: {
            username: string
            email: string
        }
        roles: string[]
        currentRole: string
        } | null>(null)
    
        useEffect(() => {
        async function fetchUserProfile() {
            try {
            const response = await fetch('/api/user-profile')
            const data = await response.json()
            setUserProfile(data)
            } catch (error) {
            console.error('Error fetching user profile:', error)
            }
        }
        fetchUserProfile()
    }, [])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
                    <p className="text-muted-foreground">Manage and view organizations</p>
                </div>
                {(!userProfile?.currentRole || userProfile?.currentRole !== 'customer') && (
                <CreateOrganizationDialog 
                    onOrganizationCreated={(newOrg) => setOrganizations([...organizations, newOrg])}
                />)}
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Sector</TableHead>
                                <TableHead>Board Size</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                                </TableRow>
                            ) : organizations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No organizations found</TableCell>
                                </TableRow>
                            ) : (
                                organizations.map((org) => (
                                    <TableRow key={org.id}>
                                        <TableCell className="font-medium">{org.name}</TableCell>
                                        <TableCell>{org.sector}</TableCell>
                                        <TableCell>{org.board_size}</TableCell>
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

function CreateOrganizationDialog({ 
    onOrganizationCreated 
}: { 
    onOrganizationCreated: (org: Organization) => void 
}) {
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [boardSize, setBoardSize] = useState('');
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const tempId = Date.now(); // Generate a temporary unique ID

        try {
            const response = await fetch('http://172.236.179.13:8080/api/governance/organization/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    sector,
                    board_size: Number(boardSize)
                })
            });

            if (response.ok) {
                const newOrg = await response.json();
                // Use server-provided ID if available, otherwise use temp ID
                const orgToAdd = {
                    id: newOrg.id || tempId,
                    name,
                    sector,
                    board_size: Number(boardSize)
                };
                onOrganizationCreated(orgToAdd);
                
                // Reset form
                setName('');
                setSector('');
                setBoardSize('');

                toast({
                    title: "Success",
                    description: "Organization created successfully",
                });
            } else {
                throw new Error('Failed to create organization');
            }
        } catch (error) {
            console.error('Error creating organization:', error);
            toast({
                title: "Error",
                description: "Failed to create organization",
                variant: "destructive"
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Organization
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Organization</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Organization Name</Label>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <Label>Sector</Label>
                        <Input 
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <Label>Board Size</Label>
                        <Input 
                            type="number"
                            value={boardSize}
                            onChange={(e) => setBoardSize(e.target.value)}
                            required 
                        />
                    </div>                   
                    <Button type="submit" className="w-full">Create Organization</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}