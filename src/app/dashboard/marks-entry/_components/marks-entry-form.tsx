'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockExams, mockStudents, mockSubjects } from '@/lib/data';
import { Student } from '@/lib/types';
import { Save } from 'lucide-react';
import React, { useState } from 'react';

type Marks = {
    [studentId: string]: {
        theory: number | string;
        practical: number | string;
    }
}

export default function MarksEntryForm() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [marks, setMarks] = useState<Marks>({});
    const [showTable, setShowTable] = useState(false);

    const handleSearch = () => {
        if (selectedClass && selectedSection) {
            const classInfo = mockClasses.find(c => c.id === selectedClass);
            if (classInfo) {
                const className = classInfo.name.split(' ')[1];
                const filteredStudents = mockStudents.filter(s => s.class === className && s.section === selectedSection);
                setStudents(filteredStudents);
                
                const initialMarks: Marks = {};
                filteredStudents.forEach(student => {
                    initialMarks[student.id] = { theory: '', practical: '' };
                });
                setMarks(initialMarks);
                setShowTable(true);
            }
        }
    };

    const handleMarkChange = (studentId: string, type: 'theory' | 'practical', value: string) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [studentId]: {
                ...prevMarks[studentId],
                [type]: value === '' ? '' : Number(value)
            }
        }));
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
                        <SelectContent>
                            {mockExams.map(exam => (
                                <SelectItem key={exam.id} value={exam.id}>{exam.type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Medium</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select medium" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Urdu">Urdu</SelectItem>
                            <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Class & Section</Label>
                    <div className="flex gap-2">
                        <Select onValueChange={setSelectedClass}>
                            <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
                            <SelectContent>
                                {mockClasses.map(cls => (
                                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedSection}>
                            <SelectTrigger><SelectValue placeholder="Section" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                            {mockSubjects.map(subject => (
                                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-full flex justify-end">
                    <Button onClick={handleSearch}>Load Students</Button>
                </div>
            </div>

            {showTable && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Editable Student List</h3>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Roll No.</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead className="text-center">Theory Marks</TableHead>
                                    <TableHead className="text-center">Practical Marks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map(student => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.rollNumber}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>
                                            <Input type="number" placeholder="Enter marks" className="max-w-[150px] mx-auto text-center" value={marks[student.id]?.theory} onChange={(e) => handleMarkChange(student.id, 'theory', e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" placeholder="Enter marks" className="max-w-[150px] mx-auto text-center" value={marks[student.id]?.practical} onChange={(e) => handleMarkChange(student.id, 'practical', e.target.value)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Marks
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
