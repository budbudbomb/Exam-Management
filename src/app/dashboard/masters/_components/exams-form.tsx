'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockExams, mockGrades } from '@/lib/data';
import { Exam, Grade } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function ExamsForm() {
    const [exams, setExams] = React.useState<Exam[]>(mockExams);
    const [grades, setGrades] = React.useState<Grade[]>(mockGrades);

    const handleAddExam = () => {
        const newExam: Exam = { id: `E${exams.length + 1}`, type: 'Quarterly', weightage: 0 };
        setExams([...exams, newExam]);
    };
    
    const handleAddGrade = () => {
        const newGrade: Grade = { grade: '', rangeStart: 0, rangeEnd: 0 };
        setGrades([...grades, newGrade]);
    };

    return (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Exam Configuration</CardTitle>
                    <CardDescription>Define exam types and their weightage in the final report card.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {exams.map((exam, index) => (
                        <div key={exam.id} className="flex items-end gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`exam-type-${index}`}>Exam Type</Label>
                                <Select defaultValue={exam.type}>
                                    <SelectTrigger id={`exam-type-${index}`}>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                                        <SelectItem value="Half Yearly">Half Yearly</SelectItem>
                                        <SelectItem value="Annual">Annual</SelectItem>
                                        <SelectItem value="Practicals">Practicals</SelectItem>
                                        <SelectItem value="Supplementary">Supplementary</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`exam-weightage-${index}`}>Weightage (%)</Label>
                                <Input id={`exam-weightage-${index}`} type="number" defaultValue={exam.weightage} placeholder="e.g. 20" />
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddExam}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Exam Type
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Grade Calculation</CardTitle>
                    <CardDescription>Set the percentage ranges for each grade.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {grades.map((grade, index) => (
                        <div key={index} className="flex items-end gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`grade-${index}`}>Grade</Label>
                                <Input id={`grade-${index}`} defaultValue={grade.grade} placeholder="e.g. A" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`range-start-${index}`}>Range Start (%)</Label>
                                <Input id={`range-start-${index}`} type="number" defaultValue={grade.rangeStart} placeholder="e.g. 91" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`range-end-${index}`}>Range End (%)</Label>
                                <Input id={`range-end-${index}`} type="number" defaultValue={grade.rangeEnd} placeholder="e.g. 100" />
                            </div>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddGrade}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Grade Rule
                    </Button>
                </CardContent>
            </Card>
            
            <div className="lg:col-span-2 flex justify-end">
                <Button>
                    <FilePlus2 className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>
        </div>
    );
}
