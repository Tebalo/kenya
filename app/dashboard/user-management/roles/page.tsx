'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import {
  Card,
  CardContent,

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
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Role {
    id: number;
    name: string;
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [newRoleName, setNewRoleName] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://172.236.179.13:8080/api/auth_app/roles/');
            const data = await response.json();
            setRoles(data.roles);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching roles:', error);
            toast({
                title: "Error",
                description: "Failed to fetch roles",
                variant: "destructive"
            });
            setLoading(false);
        }
    };

    const handleCreateRole = async (e: FormEvent) => {
        e.preventDefault();
        if (!newRoleName.trim()) return;

        try {
            const response = await fetch('http://172.236.179.13:8080/api/auth_app/roles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newRoleName.trim() })
            });

            if (response.ok) {
                const newRole = await response.json();
                setRoles([...roles, newRole]);
                setNewRoleName('');
                toast({
                    title: "Success",
                    description: "Role created successfully",
                });
            } else {
                throw new Error('Failed to create role');
            }
        } catch (error) {
            console.error('Error creating role:', error);
            toast({
                title: "Error",
                description: "Failed to create role",
                variant: "destructive"
            });
        }
    };

    const handleDeleteRole = async (roleId: number) => {
        
        try {
            const response = await fetch(`http://172.236.179.13:8080/api/auth_app/roles/${roleId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRoles(roles.filter(role => role.id !== roleId));
                toast({
                    title: "Success",
                    description: "Role deleted successfully",
                });
            } else {
                throw new Error('Failed to delete role');
            }
        } catch (error) {
            console.error('Error deleting role:', error);
            toast({
                title: "Error",
                description: "Failed to delete role",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
                    <p className="text-muted-foreground">Create, view, and manage system roles</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Role
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Role</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateRole} className="space-y-4">
                            <Input 
                                placeholder="Enter role name" 
                                value={newRoleName}
                                onChange={(e) => setNewRoleName(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full">Create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Role Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                                </TableRow>
                            ) : roles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No roles found</TableCell>
                                </TableRow>
                            ) : (
                                roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{role.id}</TableCell>
                                        <TableCell className="font-medium">{role.name}</TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleDeleteRole(role.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
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