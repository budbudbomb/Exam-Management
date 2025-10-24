
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockExams } from '@/lib/data';
import { Exam } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function ExamsForm() {
    const [exams, setExams] = React.useState<Exam[]>(mockExams);

    const handleAddExam = () => {
        const newExam: Exam = { id: `E${exams.length + 1}`, type: 'Quarterly', weightage: 0 };
        setExams([...exams, newExam]);
    };
    
    const handleExamChange = (index: number, field: keyof Exam, value: any) => {
        const newExams = [...exams];
        if (field === 'weightage') {
            const numValue = parseInt(value, 10);
            (newExams[index] as any)[field] = isNaN(numValue) ? '' : numValue;
        } else {
            (newExams[index] as any)[field] = value;
        }
        setExams(newExams);
    };

    const handleDeleteExam = (index: number) => {
        const newExams = [...exams];
        newExams.splice(index, 1);
        setExams(newExams);
    };
    
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Exam Configuration</CardTitle>
                    <CardDescription>Define exam types and their weightage in the final report card.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {exams.map((exam, index) => (
                        <div key={index} className="flex items-end gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`exam-type-${index}`}>Exam Type</Label>
                                <Select value={exam.type} onValueChange={(value) => handleExamChange(index, 'type', value)}>
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
                                <Input id={`exam-weightage-${index}`} type="number" value={exam.weightage} onChange={(e) => handleExamChange(index, 'weightage', e.target.value)} placeholder="e.g. 20" />
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteExam(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddExam}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Exam Type
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button>
                    <FilePlus2 className="mr-2 h-4 w-4" /> Save Exam Changes
                </Button>
            </div>
        </div>
    );
}
