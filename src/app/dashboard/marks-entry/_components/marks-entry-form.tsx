'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClasses, mockStudents, mockSubjects, mockExams } from '@/lib/data';
import { Student, Subject } from '@/lib/types';
import { ArrowRight, Save } from 'lucide-react';
import React, { useState } from 'react';

type MarkDetail = {
    theory: number | string;
    practical: number | string;
};

type Marks = {
    [subjectId: string]: MarkDetail;
}

export default function MarksEntryForm() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [classStudents, setClassStudents] = useState<Student[]>([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [marks, setMarks] = useState<Marks>({});
    const [showTable, setShowTable] = useState(false);

    const handleSearch = () => {
        if (selectedClass && selectedSection) {
            const classInfo = mockClasses.find(c => c.id === selectedClass);
            if (classInfo) {
                const className = classInfo.name.split(' ')[1];
                const filteredStudents = mockStudents.filter(s => s.class === className && s.section === selectedSection);
                setClassStudents(filteredStudents);
                setCurrentStudentIndex(0);
                
                if (filteredStudents.length > 0) {
                    const studentSubjects = classInfo.subjects;
                    setSubjects(studentSubjects);
                    
                    const initialMarks: Marks = {};
                    studentSubjects.forEach(subject => {
                        initialMarks[subject.id] = { theory: '', practical: '' };
                    });
                    setMarks(initialMarks);
                    setShowTable(true);
                } else {
                    setShowTable(false);
                }
            }
        }
    };
    
    const handleNextStudent = () => {
        if(currentStudentIndex < classStudents.length - 1) {
            setCurrentStudentIndex(prev => prev + 1);
            // Reset marks for the next student
            const initialMarks: Marks = {};
            subjects.forEach(subject => {
                initialMarks[subject.id] = { theory: '', practical: '' };
            });
            setMarks(initialMarks);
        }
    }

    const handleMarkChange = (subjectId: string, type: 'theory' | 'practical', value: string) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [subjectId]: {
                ...prevMarks[subjectId],
                [type]: value === '' ? '' : Number(value)
            }
        }));
    };
    
    const currentStudent = classStudents[currentStudentIndex];

    const calculatePercentage = (theory: string | number, practical: string | number, maxTheory: number, maxPractical?: number) => {
        const theoryMarks = Number(theory) || 0;
        const practicalMarks = Number(practical) || 0;
        const totalMarks = theoryMarks + practicalMarks;
        const maxTotal = maxTheory + (maxPractical || 0);
        if (maxTotal === 0) return '0.00';
        return ((totalMarks / maxTotal) * 100).toFixed(2);
    }
    
    const getGrade = (percentage: number) => {
        if (percentage >= 91) return 'A';
        if (percentage >= 81) return 'B';
        if (percentage >= 71) return 'C';
        if (percentage >= 61) return 'D';
        if (percentage >= 33) return 'E';
        return 'F';
    }


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                 <div className="col-span-full flex justify-end">
                    <Button onClick={handleSearch}>Load Students</Button>
                </div>
            </div>

            {showTable && currentStudent && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">
                            Entering Marks for: <span className="text-primary">{currentStudent.name}</span> (Roll No: {currentStudent.rollNumber})
                        </h3>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-muted-foreground">
                                Student {currentStudentIndex + 1} of {classStudents.length}
                            </span>
                             <Button onClick={handleNextStudent} disabled={currentStudentIndex >= classStudents.length - 1}>
                                Next Student <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">S.No</TableHead>
                                    <TableHead className="w-[100px]">Roll No.</TableHead>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead colSpan={3} className="text-center border-l">Theory</TableHead>
                                    <TableHead colSpan={3} className="text-center border-l">Practical</TableHead>
                                    <TableHead className="text-center border-l">Percentage</TableHead>
                                    <TableHead className="text-center">Grade</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead className="text-center border-l text-xs font-medium">Min</TableHead>
                                    <TableHead className="text-center text-xs font-medium">Max</TableHead>
                                    <TableHead className="text-center text-xs font-medium">Enter</TableHead>
                                    <TableHead className="text-center border-l text-xs font-medium">Min</TableHead>
                                    <TableHead className="text-center text-xs font-medium">Max</TableHead>
                                    <TableHead className="text-center text-xs font-medium">Enter</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.map((subject, index) => {
                                    const percentage = parseFloat(calculatePercentage(marks[subject.id]?.theory || 0, marks[subject.id]?.practical || 0, subject.maxMarks, subject.practicalMaxMarks));
                                    const grade = getGrade(percentage);

                                    return (
                                    <TableRow key={subject.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{currentStudent.rollNumber}</TableCell>
                                        <TableCell>{subject.name}</TableCell>
                                        
                                        <TableCell className="text-center border-l">{subject.minMarks}</TableCell>
                                        <TableCell className="text-center">{subject.maxMarks}</TableCell>
                                        <TableCell>
                                            <Input type="number" placeholder="--" className="max-w-[100px] mx-auto text-center" value={marks[subject.id]?.theory} onChange={(e) => handleMarkChange(subject.id, 'theory', e.target.value)} />
                                        </TableCell>

                                        {subject.hasPractical ? (
                                            <>
                                                <TableCell className="text-center border-l">{subject.practicalMinMarks}</TableCell>
                                                <TableCell className="text-center">{subject.practicalMaxMarks}</TableCell>
                                                <TableCell>
                                                    <Input type="number" placeholder="--" className="max-w-[100px] mx-auto text-center" value={marks[subject.id]?.practical} onChange={(e) => handleMarkChange(subject.id, 'practical', e.target.value)} />
                                                </TableCell>
                                            </>
                                        ) : (
                                            <TableCell colSpan={3} className="text-center border-l bg-muted/50">N/A</TableCell>
                                        )}
                                        <TableCell className="text-center border-l font-medium">{percentage.toFixed(2)}%</TableCell>
                                        <TableCell className="text-center font-semibold">{grade}</TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Marks for {currentStudent.name}
                        </Button>
                    </div>
                </div>
            )}
            {showTable && classStudents.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                    No students found for the selected class and section.
                </div>
            )}
        </div>
    );
}
