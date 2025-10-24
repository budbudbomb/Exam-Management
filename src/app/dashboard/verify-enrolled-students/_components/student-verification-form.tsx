
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockStudents } from '@/lib/data';
import { Student } from '@/lib/types';
import React, { useState } from 'react';

export default function StudentVerificationForm() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [classStudents, setClassStudents] = useState<Student[]>([]);
    const [showTable, setShowTable] = useState(false);
    const [isDeclared, setIsDeclared] = useState(false);

    const handleSearch = () => {
        if (selectedYear && selectedClass) {
            const classInfo = mockClasses.find(c => c.id === selectedClass);
            if (classInfo) {
                const className = classInfo.name.split(' ')[1];
                const filteredStudents = mockStudents.filter(s => s.class === className);
                setClassStudents(filteredStudents);
                setShowTable(true);
            }
        }
    };
    
    const handleSelectAll = (checked: boolean) => {
        // This would in a real app update all students' verification status
        console.log(`All students selected: ${checked}`);
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Select onValueChange={setSelectedYear}>
                        <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Class</Label>
                    <Select onValueChange={setSelectedClass}>
                        <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                        <SelectContent>
                            {mockClasses.map(cls => (
                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="col-span-full md:col-span-1 flex justify-end">
                    <Button onClick={handleSearch}>Load Students</Button>
                </div>
            </div>

            {showTable && classStudents.length > 0 && (
                <>
                    <div className="h-[400px] overflow-y-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center sticky top-0 bg-card">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Checkbox id="selectAll" onCheckedChange={handleSelectAll} />
                                            <Label htmlFor="selectAll" className="sr-only">Select All</Label>
                                            <span>Verify All</span>
                                        </div>
                                    </TableHead>
                                    <TableHead className="sticky top-0 bg-card">Name</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Gender</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Samagra ID</TableHead>
                                    <TableHead className="sticky top-0 bg-card">School UDISE</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Class</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Mother's Name</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Father's Name</TableHead>
                                    <TableHead className="sticky top-0 bg-card">DOB</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Category</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Enrollment #</TableHead>
                                    <TableHead className="sticky top-0 bg-card">Scholar #</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="text-center">
                                            <Checkbox defaultChecked={true} />
                                        </TableCell>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.gender}</TableCell>
                                        <TableCell>{student.samagraId}</TableCell>
                                        <TableCell>{student.schoolUdideCode}</TableCell>
                                        <TableCell>{student.class}</TableCell>
                                        <TableCell>{student.motherName}</TableCell>
                                        <TableCell>{student.fatherName}</TableCell>
                                        <TableCell>{student.dob}</TableCell>
                                        <TableCell>{student.category}</TableCell>
                                        <TableCell>{student.enrollmentNumber}</TableCell>
                                        <TableCell>{student.scholarNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     <div className="flex flex-col items-start gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="declaration" onCheckedChange={(checked) => setIsDeclared(!!checked)} />
                            <Label htmlFor="declaration" className="text-sm font-normal text-muted-foreground">
                                I hereby declare that I've verified the student's details and they are correct and latest.
                            </Label>
                        </div>
                        <Button disabled={!isDeclared}>Save Verified Students</Button>
                    </div>
                </>
            )}

            {showTable && classStudents.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                    No students found for the selected criteria.
                </div>
            )}
        </div>
    );
}
