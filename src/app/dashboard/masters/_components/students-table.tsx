
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockStudents, mockClasses } from '@/lib/data';
import { FilePlus2, Search, Upload, User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Student } from '@/lib/types';


export default function StudentsTable() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [showTable, setShowTable] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleSearch = () => {
        if (selectedClassId) {
            const selectedClass = mockClasses.find(c => c.id === selectedClassId);
            const className = selectedClass ? selectedClass.name.split(' ')[1] : '';
            setFilteredStudents(students.filter(student => student.class === className));
            setShowTable(true);
        } else {
            setFilteredStudents(students);
            setShowTable(false);
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
        if (showTable && selectedClassId) {
            const selectedClass = mockClasses.find(c => c.id === selectedClassId);
            const className = selectedClass ? selectedClass.name.split(' ')[1] : '';
            setFilteredStudents(newStudents.filter(student => student.class === className));
        } else if (showTable) {
            setFilteredStudents(newStudents);
        }
        
        setUpdateModalOpen(false);
        setSelectedStudent(null);
    }

    const sortedClasses = [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    });


    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
                    <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Select onValueChange={setSelectedYear} value={selectedYear}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2025-2026">2025-2026</SelectItem>
                                <SelectItem value="2023-2024">2023-2024</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Filter by Class</Label>
                        <Select onValueChange={setSelectedClassId} value={selectedClassId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortedClasses.map(cls => (
                                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <Button onClick={handleSearch} disabled={!selectedClassId || !selectedYear}>
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
                        No students found for the selected class.
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
                            {selectedStudent?.class === '11' && (
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
