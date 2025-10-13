'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockStudents } from '@/lib/data';
import { FilePlus2, MoreHorizontal, PlusCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from '@/lib/types';


export default function StudentsTable() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [isAddStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
    const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
        name: '',
        rollNumber: '',
        class: '',
        section: '',
        medium: 'English',
    });

    const handleFilterByClass = (classId: string) => {
        setSelectedClass(classId);
        if (classId === 'all') {
            setFilteredStudents(students);
        } else {
            const selectedClassName = mockClasses.find(c => c.id === classId)?.name.split(' ')[1];
            setFilteredStudents(students.filter(student => student.class === selectedClassName));
        }
    };
    
    const handleAddStudent = () => {
        const studentToAdd: Student = {
            id: `S${students.length + 1}`,
            ...newStudent
        };
        const newStudents = [...students, studentToAdd];
        setStudents(newStudents);
        handleFilterByClass(selectedClass);
        setAddStudentDialogOpen(false);
        setNewStudent({
            name: '',
            rollNumber: '',
            class: '',
            section: '',
            medium: 'English',
        });
    };
    
    const handleDeleteStudent = (studentId: string) => {
        const newStudents = students.filter(s => s.id !== studentId);
        setStudents(newStudents);
        if (selectedClass === 'all') {
            setFilteredStudents(newStudents);
        } else {
             const selectedClassName = mockClasses.find(c => c.id === selectedClass)?.name.split(' ')[1];
            setFilteredStudents(newStudents.filter(student => student.class === selectedClassName));
        }
    };


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
                        <Select onValueChange={handleFilterByClass} defaultValue="all">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Classes</SelectItem>
                                {mockClasses.map(cls => (
                                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <Dialog open={isAddStudentDialogOpen} onOpenChange={setAddStudentDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                                <DialogDescription>
                                    Fill in the details below to add a new student profile.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input id="name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rollNumber" className="text-right">Roll No.</Label>
                                    <Input id="rollNumber" value={newStudent.rollNumber} onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="class" className="text-right">Class</Label>
                                     <Select onValueChange={(value) => setNewStudent({...newStudent, class: value.split(' ')[1]})}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockClasses.map(cls => (
                                                <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="section" className="text-right">Section</Label>
                                     <Select onValueChange={(value) => setNewStudent({...newStudent, section: value})}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a section" />
                                        </SelectTrigger>
                                        <SelectContent>
                                           <SelectItem value="A">A</SelectItem>
                                           <SelectItem value="B">B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="medium" className="text-right">Medium</Label>
                                    <Select onValueChange={(value: any) => setNewStudent({...newStudent, medium: value})}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a medium" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Hindi">Hindi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddStudent}>Save student</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                            {filteredStudents.map(student => (
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
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteStudent(student.id)}>Delete</DropdownMenuItem>
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
