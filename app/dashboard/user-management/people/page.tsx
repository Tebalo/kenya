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
import { AlertCircle, Eye, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, Mail, Phone, Tag, UserCircle, Contact, Home } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    address: string | null;
    roles: string[];
}

interface Role {
    id: number;
    name: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const [usersResponse, rolesResponse] = await Promise.all([
                    fetch('http://172.236.179.13:8080/api/auth_app/users/'),
                    fetch('http://172.236.179.13:8080/api/auth_app/roles/')
                ]);
                
                const usersData = await usersResponse.json();
                const rolesData = await rolesResponse.json();
                
                setUsers(usersData.users);
                setAvailableRoles(rolesData.roles);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch users or roles",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleRoleAssignment = async (username: string, selectedRoles: string[]) => {
        try {
            const response = await fetch(`http://172.236.179.13:8080/api/auth_app/assign-role/${username}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role_names: selectedRoles })
            });

            if (response.ok) {
                // Update local state to reflect new roles
                setUsers(users.map(user => 
                    user.username === username 
                    ? { ...user, roles: selectedRoles } 
                    : user
                ));

                toast({
                    title: "Success",
                    description: "Roles updated successfully",
                });
            } else {
                throw new Error('Failed to update roles');
            }
        } catch (error) {
            console.error('Error updating roles:', error);
            toast({
                title: "Error",
                description: "Failed to update roles",
                variant: "destructive"
            });
        }
    };

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
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">View and manage user accounts</p>
            </div>
        {userProfile?.currentRole === 'customer' || userProfile?.currentRole === '' ? (
            <Card className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">You don&#39;t have permission to view this page</p>
            </Card>
        ) : (
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.username}</TableCell>
                                        <TableCell>{user.email || 'N/A'}</TableCell>
                                        <TableCell>
                                            {user.roles.length > 0 ? (
                                                <div className="flex gap-1">
                                                    {user.roles.map((role) => (
                                                        <Badge key={role} variant="secondary">{role}</Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Badge variant="outline">No Roles</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>User Profile</DialogTitle>
                                                    </DialogHeader>
                                                    <UserDetails user={user} />
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                                        <UserPlus className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Assign Roles to {user.username}</DialogTitle>
                                                    </DialogHeader>
                                                    <RoleAssignmentForm 
                                                        user={user} 
                                                        availableRoles={availableRoles}
                                                        onRoleAssign={handleRoleAssignment}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}
        </div>
    );
}

function UserDetails({ user }: { user: UserProfile }) {
    return (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
            <div className="grid gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <UserCircle className="h-5 w-5 text-primary" />
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">Username</Label>
                            <p className="font-medium">{user.username}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Full Name</Label>
                            <p className="font-medium">
                                {user.first_name} {user.last_name || ''}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Contact className="h-5 w-5 text-primary" />
                        <CardTitle>Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">Email</Label>
                            <p className="font-medium">{user.email || 'Not provided'}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Phone</Label>
                            <p className="font-medium">{user.phone || 'Not provided'}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <CardTitle>Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user.roles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.roles.map((role) => (
                                    <Badge key={role} variant="default">{role}</Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No roles assigned</p>
                        )}
                    </CardContent>
                </Card>

                {user.address && (
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Home className="h-5 w-5 text-primary" />
                            <CardTitle>Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{user.address}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function RoleAssignmentForm({ 
    user, 
    availableRoles, 
    onRoleAssign 
}: { 
    user: UserProfile, 
    availableRoles: Role[], 
    onRoleAssign: (username: string, roles: string[]) => void 
}) {
    const [selectedRoles, setSelectedRoles] = useState<string[]>(user.roles);

    const handleRoleToggle = (roleName: string) => {
        setSelectedRoles(prev => 
            prev.includes(roleName) 
            ? prev.filter(role => role !== roleName)
            : [...prev, roleName]
        );
    };

    const handleSubmit = () => {
        onRoleAssign(user.username, selectedRoles);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {availableRoles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`role-${role.id}`}
                            checked={selectedRoles.includes(role.name)}
                            onCheckedChange={() => handleRoleToggle(role.name)}
                        />
                        <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSubmit}>Update Roles</Button>
            </div>
        </div>
    );
}