'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockStudents } from '@/lib/data';
import { FilePlus2, MoreHorizontal, PlusCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function StudentsTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Master</CardTitle>
                <CardDescription>Manage student profiles, including their class, section, and personal details.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-4 mb-4">
                    <div className="space-y-2 flex-1">
                        <Label>Filter by Class</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockClasses.map(cls => (
                                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Roll Number</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Medium</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockStudents.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/40?u=${student.id}`} alt={student.name} />
                                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {student.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{student.rollNumber}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>{student.section}</TableCell>
                                    <TableCell>{student.medium}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end mt-4">
                     <Button>
                        <FilePlus2 className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
