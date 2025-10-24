
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockStudents } from '@/lib/data';
import { FilePlus2, Search, Upload, User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Student } from '@/lib/types';


export default function StudentsTable() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [showTable, setShowTable] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleSearch = () => {
        if (selectedClass) {
            setFilteredStudents(students.filter(student => student.class === selectedClass));
            setShowTable(true);
        } else {
            setFilteredStudents(students);
            setShowTable(true);
        }
    };
    
    const handleOpenUpdateModal = (student: Student) => {
        setSelectedStudent(student);
        setUpdateModalOpen(true);
    }
    
    const handleUpdateStudent = () => {
        if (!selectedStudent) return;

        const newStudents = students.map(s => s.id === selectedStudent.id ? selectedStudent : s);
        setStudents(newStudents);
        
        // Re-filter students in case the updated student affects the filtered list
        if (showTable && selectedClass) {
            setFilteredStudents(newStudents.filter(student => student.class === selectedClass));
        } else if (showTable) {
            setFilteredStudents(newStudents);
        }
        
        setUpdateModalOpen(false);
        setSelectedStudent(null);
    }

    const classOptions = Array.from(new Set(mockStudents.map(s => s.class))).sort((a,b) => Number(a) - Number(b));


    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Student Master</CardTitle>
                        <CardDescription>Manage student profiles, including their class, section, and personal details.</CardDescription>
                    </div>
                    <div className="text-xl font-bold text-muted-foreground">Academic Year 2024-2025</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-4 mb-4">
                    <div className="space-y-2 flex-1">
                        <Label>Filter by Class</Label>
                        <Select onValueChange={setSelectedClass} value={selectedClass}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classOptions.map(cls => (
                                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <Button onClick={handleSearch} disabled={!selectedClass}>
                        <Search className="mr-2 h-4 w-4" /> Search
                     </Button>
                </div>

                {showTable && (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">S.no</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Samagra ID</TableHead>
                                    <TableHead>Father Name</TableHead>
                                    <TableHead>Mother Name</TableHead>
                                    <TableHead>Enrollment No</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.samagraId || 'N/A'}</TableCell>
                                        <TableCell>{student.fatherName || 'N/A'}</TableCell>
                                        <TableCell>{student.motherName || 'N/A'}</TableCell>
                                        <TableCell>{student.enrollmentNumber || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" onClick={() => handleOpenUpdateModal(student)}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                
                {showTable && filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No students found for Class {selectedClass}.
                    </div>
                )}

                <Dialog open={isUpdateModalOpen} onOpenChange={setUpdateModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Update Student Details</DialogTitle>
                            <DialogDescription>
                                Update details for {selectedStudent?.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="medium">Medium</Label>
                                <Select 
                                    value={selectedStudent?.medium} 
                                    onValueChange={(value: 'English' | 'Hindi' | 'Urdu' | 'Sanskrit') => setSelectedStudent(prev => prev ? {...prev, medium: value} : null)}
                                >
                                    <SelectTrigger id="medium">
                                        <SelectValue placeholder="Select a medium" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Hindi">Hindi</SelectItem>
                                        <SelectItem value="Urdu">Urdu</SelectItem>
                                        <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedClass === '11' && (
                                <div className="space-y-2">
                                    <Label htmlFor="stream">Stream</Label>
                                    <Select 
                                        value={selectedStudent?.stream} 
                                        onValueChange={(value: 'PCB' | 'PCM' | 'Commerce' | 'Arts' | 'Vocational Courses') => setSelectedStudent(prev => prev ? {...prev, stream: value} : null)}
                                    >
                                        <SelectTrigger id="stream">
                                            <SelectValue placeholder="Select a stream" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PCB">PCB</SelectItem>
                                            <SelectItem value="PCM">PCM</SelectItem>
                                            <SelectItem value="Commerce">Commerce</SelectItem>
                                            <SelectItem value="Arts">Arts</SelectItem>
                                            <SelectItem value="Vocational Courses">Vocational Courses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="section">Section</Label>
                                 <Select 
                                    value={selectedStudent?.section}
                                    onValueChange={(value) => setSelectedStudent(prev => prev ? {...prev, section: value} : null)}
                                >
                                    <SelectTrigger id="section">
                                        <SelectValue placeholder="Select a section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="A">A</SelectItem>
                                       <SelectItem value="B">B</SelectItem>
                                       <SelectItem value="C">C</SelectItem>
                                       <SelectItem value="D">D</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="rollNumber">Roll No.</Label>
                                <Input 
                                    id="rollNumber" 
                                    value={selectedStudent?.rollNumber || ''} 
                                    onChange={(e) => setSelectedStudent(prev => prev ? {...prev, rollNumber: e.target.value} : null)} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="photo">Photo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                                        <UserIcon className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                    <Button variant="outline">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleUpdateStudent}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>
    );
}
