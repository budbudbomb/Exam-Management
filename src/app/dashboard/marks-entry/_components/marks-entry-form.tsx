
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockClasses, mockStudents, mockSubjects, mockExams } from '@/lib/data';
import { Student, Subject } from '@/lib/types';
import { Save } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type MarkDetail = {
    theory: string;
    practical: string;
    theoryAttendance: string;
    practicalAttendance: string;
    grace: string;
};

type Marks = {
    [subjectId: string]: MarkDetail;
}

interface MarksEntryFormProps {
    showDiseCode?: boolean;
    userRole?: 'school' | 'prabhari' | 'sankool';
}

const mockPreviousMarks = {
    quarterly: {
        'S1': { theory: 75, practical: 18, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S2': { theory: 60, practical: 22, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S3': { theory: 80, practical: 15, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S4': { theory: 65, practical: 20, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S5': { theory: 45, practical: 48, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
    },
    halfYearly: {
        'S1': { theory: 80, practical: 19, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S2': { theory: 68, practical: 23, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S3': { theory: 85, practical: 18, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S4': { theory: 72, practical: 22, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
        'S5': { theory: 48, practical: 49, theoryAttendance: 'Present', practicalAttendance: 'Present', grace: 0 },
    }
};

const PreviousMarksTable = ({ subjects, marks }: { subjects: Subject[], marks: any }) => {
    
    const calculatePercentage = (theory: string | number, practical: string | number, subject: Subject) => {
        const theoryMarks = Number(theory) || 0;
        const practicalMarks = Number(practical) || 0;
        const totalMarks = theoryMarks + practicalMarks;
        
        let maxPracticalOrProjectMarks = 0;
        if (subject.hasPractical) {
            maxPracticalOrProjectMarks = subject.practicalMaxMarks || 0;
        } else if (subject.hasProject) {
            maxPracticalOrProjectMarks = subject.projectMaxMarks || 0;
        }

        const maxTotal = subject.maxMarks + maxPracticalOrProjectMarks;
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
        <div className="rounded-md border my-4">
            <Table>
                <TableHeader>
                     <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                        <TableHead className="text-white">Subject</TableHead>
                        <TableHead className="text-center text-white">Theory</TableHead>
                        <TableHead className="text-center text-white">Practical/Project</TableHead>
                        <TableHead className="text-center text-white">Grace</TableHead>
                        <TableHead className="text-center text-white">Percentage</TableHead>
                        <TableHead className="text-center text-white">Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subjects.map((subject) => {
                        const subjectMarks = marks[subject.id];
                        const percentage = parseFloat(calculatePercentage(subjectMarks?.theory || 0, subjectMarks?.practical || 0, subject));
                        const grade = getGrade(percentage);

                        return (
                            <TableRow key={subject.id}>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell className="text-center">{subjectMarks?.theory}</TableCell>
                                <TableCell className="text-center">{subjectMarks?.practical}</TableCell>
                                <TableCell className="text-center">{subjectMarks?.grace}</TableCell>
                                <TableCell className="text-center font-medium">{percentage.toFixed(2)}%</TableCell>
                                <TableCell className="text-center font-semibold">{grade}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};


export default function MarksEntryForm({ showDiseCode = false, userRole = 'school' | 'prabhari' | 'sankool' }: MarksEntryFormProps) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedExamType, setSelectedExamType] = useState('');
    const [classStudents, setClassStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [marks, setMarks] = useState<Marks>({});
    const [showTable, setShowTable] = useState(false);
    const [isMarksModalOpen, setMarksModalOpen] = useState(false);
    const [isOtpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedStudentForMarks, setSelectedStudentForMarks] = useState<Student | null>(null);
    const { toast } = useToast();

    const handleSearch = () => {
        if (selectedClass && selectedSection) {
            const classInfo = mockClasses.find(c => c.id === selectedClass);
            if (classInfo) {
                const className = classInfo.name.split(' ')[1];
                const filteredStudents = mockStudents.filter(s => s.class === className && s.section === selectedSection);
                setClassStudents(filteredStudents);
                
                const studentSubjects = classInfo.subjects;
                setSubjects(studentSubjects);
                
                setShowTable(true);
            }
        }
    };
    
    const resetMarks = () => {
        const initialMarks: Marks = {};
        subjects.forEach(subject => {
            initialMarks[subject.id] = { theory: '', practical: '', theoryAttendance: 'Present', practicalAttendance: 'Present', grace: '' };
        });
        setMarks(initialMarks);
    }

    const handleOpenMarksModal = (student: Student) => {
        setSelectedStudentForMarks(student);
        resetMarks();
        setMarksModalOpen(true);
    };
    
    const handleMarkChange = (subjectId: string, type: 'theory' | 'practical' | 'theoryAttendance' | 'practicalAttendance' | 'grace', value: string) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [subjectId]: {
                ...prevMarks[subjectId],
                [type]: value
            }
        }));
    };
    
    const calculatePercentage = (theory: string | number, practical: string | number, subject: Subject) => {
        const theoryMarks = Number(theory) || 0;
        const practicalMarks = Number(practical) || 0;
        const totalMarks = theoryMarks + practicalMarks;
        
        let maxPracticalOrProjectMarks = 0;
        if (subject.hasPractical) {
            maxPracticalOrProjectMarks = subject.practicalMaxMarks || 0;
        } else if (subject.hasProject) {
            maxPracticalOrProjectMarks = subject.projectMaxMarks || 0;
        }

        const maxTotal = subject.maxMarks + maxPracticalOrProjectMarks;
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

    const overallSummary = useMemo(() => {
        let totalMarksObtained = 0;
        let maxTotalMarks = 0;
        let isFail = false;
        let allMarksEntered = true;

        subjects.forEach(subject => {
            const subjectMarks = marks[subject.id];
            if (subjectMarks) {
                const theory = Number(subjectMarks.theory);
                const practical = Number(subjectMarks.practical);
                
                if (subjectMarks.theory === '') {
                    allMarksEntered = false;
                }
                if ((subject.hasPractical || subject.hasProject) && subjectMarks.practical === '') {
                    allMarksEntered = false;
                }

                totalMarksObtained += (Number.isNaN(theory) ? 0 : theory) + (Number.isNaN(practical) ? 0 : practical) + (Number(subjectMarks.grace) || 0);

                let maxPracticalOrProject = 0;
                if(subject.hasPractical) maxPracticalOrProject = subject.practicalMaxMarks || 0;
                else if (subject.hasProject) maxPracticalOrProject = subject.projectMaxMarks || 0;
                maxTotalMarks += subject.maxMarks + maxPracticalOrProject;
                
                if (allMarksEntered) {
                    const passingMarks = subject.passingMarks;
                    if (theory < passingMarks) {
                        isFail = true;
                    }
                    if(subject.hasPractical && practical < (subject.practicalPassingMarks || 0)) {
                        isFail = true;
                    }
                    if(subject.hasProject && practical < (subject.projectPassingMarks || 0)) {
                        isFail = true;
                    }
                }
            } else {
                allMarksEntered = false;
            }
        });
        
        const overallPercentage = maxTotalMarks > 0 ? (totalMarksObtained / maxTotalMarks) * 100 : 0;
        
        let overallGrade = '';
        let result = '';
        let division = '-';

        if (allMarksEntered) {
            overallGrade = getGrade(overallPercentage);
            result = isFail ? 'FAIL' : 'PASS';
            if (result === 'PASS') {
                if (overallPercentage >= 60) division = 'First Division';
                else if (overallPercentage >= 45) division = 'Second Division';
                else if (overallPercentage >= 33) division = 'Third Division';
            }
        }

        return {
            totalMarksObtained,
            maxTotalMarks,
            overallPercentage,
            overallGrade,
            result,
            division,
            allMarksEntered
        }

    }, [marks, subjects]);

    const handleOtpSubmit = () => {
        setOtpModalOpen(false);
        if (userRole === 'prabhari') {
            toast({
                title: "Success",
                description: "Marks sent to Sankool for final verification",
            });
        }
    }
    
    const handleSaveAndNext = () => {
        if (!selectedStudentForMarks) return;

        // Mock saving the marks
        console.log(`Saving marks for ${selectedStudentForMarks.name}`, marks);
        toast({
            title: `Marks Saved for ${selectedStudentForMarks.name}`,
            description: "The student's marks have been successfully saved.",
        });

        const currentIndex = classStudents.findIndex(s => s.id === selectedStudentForMarks.id);
        const isLastStudent = currentIndex === classStudents.length - 1;

        if (isLastStudent) {
            setMarksModalOpen(false);
            toast({
                title: "All students updated!",
                description: "You have entered marks for all students in this class.",
            });
        } else {
            const nextStudent = classStudents[currentIndex + 1];
            setSelectedStudentForMarks(nextStudent);
            resetMarks();
        }
    };

    const sortedClasses = [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    });


    return (
        <div className="space-y-8">
            <div className="flex items-end gap-4">
                {showDiseCode && (
                    <div className="space-y-2">
                        <Label>DISE Code</Label>
                        <Input placeholder="Enter DISE code" />
                    </div>
                )}
                <div className="space-y-2">
                    <Label>Class & Section</Label>
                    <div className="flex gap-2">
                        <Select onValueChange={setSelectedClass}>
                            <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
                            <SelectContent>
                                {sortedClasses.map(cls => (
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
                <div className="ml-auto">
                    <Button onClick={handleSearch}>Load Students</Button>
                </div>
            </div>

            {showTable && classStudents.length > 0 && (
                <>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                                    <TableHead className="w-[50px] text-white">S.No</TableHead>
                                    <TableHead className="text-white">Student Name</TableHead>
                                    <TableHead className="text-white">Father's Name</TableHead>
                                    <TableHead className="text-white">Mother's Name</TableHead>
                                    <TableHead className="text-white">Samagra ID</TableHead>
                                    <TableHead className="text-right text-white">Marks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classStudents.map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.fatherName || 'N/A'}</TableCell>
                                        <TableCell>{student.motherName || 'N/A'}</TableCell>
                                        <TableCell>{student.samagraId || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" onClick={() => handleOpenMarksModal(student)}>
                                                {userRole === 'school' ? 'Update' : 'Verify'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {userRole === 'prabhari' && (
                        <div className="flex justify-end">
                            <Button onClick={() => setOtpModalOpen(true)}>Verify & Forward to Sankool</Button>
                        </div>
                    )}
                    {userRole === 'sankool' && (
                        <div className="flex justify-end">
                            <Button>DSC and generate result</Button>
                        </div>
                    )}
                </>
            )}

            {showTable && classStudents.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                    No students found for the selected class and section.
                </div>
            )}

            <Dialog open={isMarksModalOpen} onOpenChange={setMarksModalOpen}>
                <DialogContent className="max-w-7xl">
                    <DialogHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <DialogTitle>Entering Marks for: <span className="text-primary">{selectedStudentForMarks?.name}</span></DialogTitle>
                                <DialogDescription>
                                    Enter theory and practical marks for each subject. Grades and percentages will be calculated automatically.
                                </DialogDescription>
                            </div>
                            <div className="space-y-2 w-1/4">
                                <Label>Exam Type</Label>
                                <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                                    <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
                                    <SelectContent>
                                        {mockExams.map(exam => (
                                            <SelectItem key={exam.id} value={exam.type}>{exam.type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-4">
                        {(selectedExamType === 'Half Yearly' || selectedExamType === 'Annual') && (
                            <Accordion type="single" collapsible className="w-full">
                                {selectedExamType === 'Annual' && (
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>View Half-Yearly Marks</AccordionTrigger>
                                        <AccordionContent>
                                            <PreviousMarksTable subjects={subjects} marks={mockPreviousMarks.halfYearly} />
                                        </AccordionContent>
                                    </AccordionItem>
                                )}
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>View Quarterly Marks</AccordionTrigger>
                                    <AccordionContent>
                                    <PreviousMarksTable subjects={subjects} marks={mockPreviousMarks.quarterly} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}


                        {selectedStudentForMarks && (
                            <div className="space-y-4 py-4">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                                                <TableHead className="w-[50px] text-white">S.No</TableHead>
                                                <TableHead className="text-white">Subject Name</TableHead>
                                                <TableHead colSpan={4} className="text-center border-l text-white">Theory</TableHead>
                                                <TableHead colSpan={4} className="text-center border-l text-white">Practical / Project</TableHead>
                                                <TableHead className="text-center border-l text-white">Grace</TableHead>
                                                <TableHead className="text-center border-l text-white">Percentage</TableHead>
                                                <TableHead className="text-center text-white">Grade</TableHead>
                                                <TableHead className="text-center border-l text-white">Remark</TableHead>
                                            </TableRow>
                                            <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                                                <TableHead className="text-white"></TableHead>
                                                <TableHead className="text-white"></TableHead>
                                                <TableHead className="text-center border-l text-xs font-medium text-white">Attendance</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Min</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Max</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Enter</TableHead>
                                                <TableHead className="text-center border-l text-xs font-medium text-white">Attendance</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Min</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Max</TableHead>
                                                <TableHead className="text-center text-xs font-medium text-white">Enter</TableHead>
                                                <TableHead className="text-white"></TableHead>
                                                <TableHead className="text-white"></TableHead>
                                                <TableHead className="text-white"></TableHead>
                                                <TableHead className="text-white"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {subjects.map((subject, index) => {
                                                const percentage = parseFloat(calculatePercentage(marks[subject.id]?.theory || '0', marks[subject.id]?.practical || '0', subject));
                                                const grade = getGrade(percentage);

                                                return (
                                                <TableRow key={subject.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{subject.name}</TableCell>
                                                    
                                                    {/* Theory Section */}
                                                    <TableCell className="border-l">
                                                        <Select value={marks[subject.id]?.theoryAttendance} onValueChange={(value) => handleMarkChange(subject.id, 'theoryAttendance', value)}>
                                                            <SelectTrigger className="max-w-[120px] mx-auto text-center">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Present">Present</SelectItem>
                                                                <SelectItem value="Absent">Absent</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className="text-center">{Math.round(subject.maxMarks * 0.33)}</TableCell>
                                                    <TableCell className="text-center">{subject.maxMarks}</TableCell>
                                                    <TableCell>
                                                        <Input type="text" placeholder="--" className="max-w-[100px] mx-auto text-center" value={marks[subject.id]?.theory} onChange={(e) => handleMarkChange(subject.id, 'theory', e.target.value)} />
                                                    </TableCell>
                                                    
                                                    {/* Practical/Project Section */}
                                                    <TableCell className="border-l">
                                                        <Select value={marks[subject.id]?.practicalAttendance} onValueChange={(value) => handleMarkChange(subject.id, 'practicalAttendance', value)} disabled={!subject.hasPractical && !subject.hasProject}>
                                                            <SelectTrigger className="max-w-[120px] mx-auto text-center">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Present">Present</SelectItem>
                                                                <SelectItem value="Absent">Absent</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className="text-center">{subject.hasPractical ? Math.round((subject.practicalMaxMarks || 0) * 0.33) : subject.hasProject ? Math.round((subject.projectMaxMarks || 0) * 0.33) : ''}</TableCell>
                                                    <TableCell className="text-center">{subject.hasPractical ? subject.practicalMaxMarks : subject.hasProject ? subject.projectMaxMarks : ''}</TableCell>
                                                    <TableCell>
                                                        <Input type="text" placeholder="--" className="max-w-[100px] mx-auto text-center" value={marks[subject.id]?.practical} onChange={(e) => handleMarkChange(subject.id, 'practical', e.target.value)} disabled={!subject.hasPractical && !subject.hasProject} />
                                                    </TableCell>
                                                   
                                                    {/* Grace and Final Marks */}
                                                    <TableCell className="border-l">
                                                        <Input type="text" placeholder="--" className="max-w-[100px] mx-auto text-center" value={marks[subject.id]?.grace} onChange={(e) => handleMarkChange(subject.id, 'grace', e.target.value)} />
                                                    </TableCell>
                                                    <TableCell className="text-center border-l font-medium">{percentage.toFixed(2)}%</TableCell>
                                                    <TableCell className="text-center font-semibold">{grade}</TableCell>
                                                    <TableCell className="text-center border-l"></TableCell>
                                                </TableRow>
                                            )})}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow className="bg-muted/50 font-semibold">
                                                 <TableCell colSpan={14} className="text-left">
                                                    <div className='flex gap-4'>
                                                        <span>Overall Summary:</span>
                                                        <span>{overallSummary.totalMarksObtained} / {overallSummary.maxTotalMarks}</span>
                                                        <span>({overallSummary.overallPercentage.toFixed(2)}%)</span>
                                                         {overallSummary.allMarksEntered && (
                                                            <>
                                                                <span>Grade: {overallSummary.overallGrade}</span>
                                                                <span>Result: {overallSummary.result}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="bg-muted/50 font-semibold">
                                                <TableCell colSpan={14} className="text-left">
                                                    Division: {overallSummary.division}
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveAndNext}>
                            <Save className="mr-2 h-4 w-4" />
                            Save and Next
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isOtpModalOpen} onOpenChange={setOtpModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogDescription>
                            An OTP has been sent to your registered mobile number/email. Please enter it to verify.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">One-Time Password</Label>
                            <Input id="otp" type="text" placeholder="Enter OTP" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleOtpSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

    
    

    

    

    
