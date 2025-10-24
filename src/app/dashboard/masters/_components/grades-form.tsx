
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockGrades } from '@/lib/data';
import { Grade } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function GradesForm() {
    const [grades, setGrades] = React.useState<Grade[]>(mockGrades);
    
    const handleAddGrade = () => {
        const newGrade: Grade = { grade: '', rangeStart: 0, rangeEnd: 0 };
        setGrades([...grades, newGrade]);
    };
    
    const handleGradeChange = (index: number, field: keyof Grade, value: any) => {
        const newGrades = [...grades];
        if (field === 'rangeStart' || field === 'rangeEnd') {
            const numValue = parseInt(value, 10);
            (newGrades[index] as any)[field] = isNaN(numValue) ? '' : numValue;
        } else {
            (newGrades[index] as any)[field] = value;
        }
        setGrades(newGrades);
    };

    const handleDeleteGrade = (index: number) => {
        const newGrades = [...grades];
        newGrades.splice(index, 1);
        setGrades(newGrades);
    };

    return (
        <div className="space-y-4">
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
                                <Input id={`grade-${index}`} value={grade.grade} onChange={(e) => handleGradeChange(index, 'grade', e.target.value)} placeholder="e.g. A" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`range-start-${index}`}>Range Start (%)</Label>
                                <Input id={`range-start-${index}`} type="number" value={grade.rangeStart} onChange={(e) => handleGradeChange(index, 'rangeStart', e.target.value)} placeholder="e.g. 91" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`range-end-${index}`}>Range End (%)</Label>
                                <Input id={`range-end-${index}`} type="number" value={grade.rangeEnd} onChange={(e) => handleGradeChange(index, 'rangeEnd', e.target.value)} placeholder="e.g. 100" />
                            </div>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteGrade(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddGrade}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Grade Rule
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>
                    <FilePlus2 className="mr-2 h-4 w-4" /> Save Grade Changes
                </Button>
            </div>
        </div>
    );
}
