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
    const [showPractical, setShowPractical] = React.useState(false);

    const handleAddSubject = () => {
        const newSubject: Subject = {
            id: `S${subjects.length + 1}`,
            name: '',
            category: 'Core',
            code: '',
            minMarks: 0,
            maxMarks: 100,
            hasPractical: false,
        };
        setSubjects([...subjects, newSubject]);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Add, edit, or remove subjects taught in the school.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {subjects.map((subject, index) => (
                        <Card key={subject.id} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor={`subject-name-${index}`}>Subject Name</Label>
                                    <Input id={`subject-name-${index}`} defaultValue={subject.name} placeholder="e.g. Mathematics" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`subject-category-${index}`}>Category</Label>
                                    <Select defaultValue={subject.category}>
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
                                    <Select defaultValue={subject.subCategory}>
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
                                    <Input id={`subject-code-${index}`} defaultValue={subject.code} placeholder="e.g. M-101" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`min-marks-${index}`}>Min Marks (Pass)</Label>
                                    <Input id={`min-marks-${index}`} type="number" defaultValue={subject.minMarks} placeholder="e.g. 33" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`max-marks-${index}`}>Max Marks</Label>
                                    <Input id={`max-marks-${index}`} type="number" defaultValue={subject.maxMarks} placeholder="e.g. 100" />
                                </div>
                                
                                <div className="flex items-center space-x-2 pt-6">
                                    <Checkbox id={`practical-check-${index}`} checked={subject.hasPractical} onCheckedChange={(checked) => {
                                        const newSubjects = [...subjects];
                                        newSubjects[index].hasPractical = !!checked;
                                        setSubjects(newSubjects);
                                    }}/>
                                    <Label htmlFor={`practical-check-${index}`}>Has Practical</Label>
                                </div>
                                
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>

                                {subject.hasPractical && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor={`practical-min-marks-${index}`}>Practical Min Marks</Label>
                                            <Input id={`practical-min-marks-${index}`} type="number" defaultValue={subject.practicalMinMarks} placeholder="e.g. 10" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`practical-max-marks-${index}`}>Practical Max Marks</Label>
                                            <Input id={`practical-max-marks-${index}`} type="number" defaultValue={subject.practicalMaxMarks} placeholder="e.g. 25" />
                                        </div>
                                    </>
                                )}
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
