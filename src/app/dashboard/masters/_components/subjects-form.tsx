'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSubjects } from '@/lib/data';
import { Subject } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function SubjectsForm() {
    const [subjects, setSubjects] = React.useState<Subject[]>(mockSubjects);

    const handleAddSubject = () => {
        const newSubject: Subject = {
            id: `S${subjects.length + 1}`,
            name: '',
            category: 'Core',
            code: '',
            minMarks: 0,
            maxMarks: 100,
            passingMarks: 33,
            hasPractical: false,
            hasProject: false,
        };
        setSubjects([...subjects, newSubject]);
    };
    
    const handleDeleteSubject = (index: number) => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const handleSubjectChange = (index: number, field: keyof Subject, value: any) => {
        const newSubjects = [...subjects];
        const updatedSubject = { ...newSubjects[index] };

        if (['minMarks', 'maxMarks', 'passingMarks', 'practicalMinMarks', 'practicalMaxMarks', 'practicalPassingMarks', 'projectMinMarks', 'projectMaxMarks', 'projectPassingMarks'].includes(field)) {
            const numValue = parseInt(value, 10);
            (updatedSubject as any)[field] = isNaN(numValue) ? '' : numValue;
        } else {
            (updatedSubject as any)[field] = value;
        }

        if (field === 'hasPractical' && value === true) {
            updatedSubject.hasProject = false;
        }
        if (field === 'hasProject' && value === true) {
            updatedSubject.hasPractical = false;
        }
        
        newSubjects[index] = updatedSubject;
        setSubjects(newSubjects);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Add, edit, or remove subjects taught in the school.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {subjects.map((subject, index) => (
                        <Card key={index} className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-2 flex-grow">
                                    <Label htmlFor={`subject-name-${index}`}>Subject Name</Label>
                                    <Input id={`subject-name-${index}`} value={subject.name} onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} placeholder="e.g. Mathematics" />
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive ml-4" onClick={() => handleDeleteSubject(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Column 1: General */}
                                <div className="space-y-4 border-r pr-6">
                                    <h4 className="font-medium text-sm text-muted-foreground">General</h4>
                                    <div className="space-y-2">
                                        <Label htmlFor={`subject-category-${index}`}>Category</Label>
                                        <Select value={subject.category} onValueChange={(value) => handleSubjectChange(index, 'category', value)}>
                                            <SelectTrigger id={`subject-category-${index}`}>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Core">Core</SelectItem>
                                                <SelectItem value="Language">Language</SelectItem>
                                                <SelectItem value="Vocational">Vocational</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`subject-subcategory-${index}`}>Sub Category</Label>
                                        <Select value={subject.subCategory} onValueChange={(value) => handleSubjectChange(index, 'subCategory', value)}>
                                            <SelectTrigger id={`subject-subcategory-${index}`}>
                                                <SelectValue placeholder="Select sub-category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Standard">Standard</SelectItem>
                                                <SelectItem value="Basic">Basic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`subject-code-${index}`}>Subject Code</Label>
                                        <Input id={`subject-code-${index}`} value={subject.code} onChange={(e) => handleSubjectChange(index, 'code', e.target.value)} placeholder="e.g. M-101" />
                                    </div>
                                </div>

                                {/* Column 2: Theory */}
                                <div className="space-y-4 border-r pr-6">
                                     <h4 className="font-medium text-sm text-muted-foreground">Theory</h4>
                                     <div className="space-y-2">
                                        <Label htmlFor={`min-marks-${index}`}>Min Marks</Label>
                                        <Input id={`min-marks-${index}`} type="number" value={subject.minMarks} onChange={(e) => handleSubjectChange(index, 'minMarks', e.target.value)} placeholder="e.g. 0" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`max-marks-${index}`}>Max Marks</Label>
                                        <Input id={`max-marks-${index}`} type="number" value={subject.maxMarks} onChange={(e) => handleSubjectChange(index, 'maxMarks', e.target.value)} placeholder="e.g. 100" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`passing-marks-${index}`}>Passing Marks</Label>
                                        <Input id={`passing-marks-${index}`} type="number" value={subject.passingMarks} onChange={(e) => handleSubjectChange(index, 'passingMarks', e.target.value)} placeholder="e.g. 33" />
                                    </div>
                                </div>

                                {/* Column 3: Practical/Projects */}
                                <div className="space-y-4">
                                     <h4 className="font-medium text-sm text-muted-foreground">Practical/Projects</h4>
                                    <div className="flex items-center space-x-4 pt-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id={`practical-check-${index}`} checked={subject.hasPractical} onCheckedChange={(checked) => handleSubjectChange(index, 'hasPractical', !!checked)}/>
                                            <Label htmlFor={`practical-check-${index}`}>Has Practical</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id={`project-check-${index}`} checked={subject.hasProject} onCheckedChange={(checked) => handleSubjectChange(index, 'hasProject', !!checked)}/>
                                            <Label htmlFor={`project-check-${index}`}>Has Project</Label>
                                        </div>
                                    </div>

                                    {(subject.hasPractical || subject.hasProject) && (
                                        <div className="space-y-4 pt-2">
                                            <div className="space-y-2">
                                                <Label htmlFor={`prac-proj-min-marks-${index}`}>Min Marks</Label>
                                                <Input id={`prac-proj-min-marks-${index}`} type="number" value={subject.hasPractical ? subject.practicalMinMarks ?? '' : subject.projectMinMarks ?? ''} onChange={(e) => handleSubjectChange(index, subject.hasPractical ? 'practicalMinMarks' : 'projectMinMarks', e.target.value)} placeholder="e.g. 0" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`prac-proj-max-marks-${index}`}>Max Marks</Label>
                                                <Input id={`prac-proj-max-marks-${index}`} type="number" value={subject.hasPractical ? subject.practicalMaxMarks ?? '' : subject.projectMaxMarks ?? ''} onChange={(e) => handleSubjectChange(index, subject.hasPractical ? 'practicalMaxMarks' : 'projectMaxMarks', e.target.value)} placeholder="e.g. 25" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`prac-proj-passing-marks-${index}`}>Passing Marks</Label>
                                                <Input id={`prac-proj-passing-marks-${index}`} type="number" value={subject.hasPractical ? subject.practicalPassingMarks ?? '' : subject.projectPassingMarks ?? ''} onChange={(e) => handleSubjectChange(index, subject.hasPractical ? 'practicalPassingMarks' : 'projectPassingMarks', e.target.value)} placeholder="e.g. 8" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={handleAddSubject}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
                    </Button>
                    <Button>
                        <FilePlus2 className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
