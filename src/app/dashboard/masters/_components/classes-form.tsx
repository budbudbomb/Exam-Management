'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Class, Subject } from '@/lib/types';
import { FilePlus2, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

export default function ClassesForm() {
    const [classes, setClasses] = React.useState<Class[]>(mockClasses);

    const handleAddClass = () => {
        const newClass: Class = {
            id: `C${classes.length + 1}`,
            name: '',
            sections: ['A'],
            subjects: [],
        };
        setClasses([...classes, newClass]);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Class & Subject Management</CardTitle>
                <CardDescription>Define classes, sections, and map subjects to them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {classes.map((cls, classIndex) => (
                        <Card key={cls.id} className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`class-name-${classIndex}`}>Class Name</Label>
                                    <Input id={`class-name-${classIndex}`} defaultValue={cls.name} placeholder="e.g. Class 10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`class-sections-${classIndex}`}>Sections (comma-separated)</Label>
                                    <Input id={`class-sections-${classIndex}`} defaultValue={cls.sections.join(', ')} placeholder="e.g. A, B, C" />
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive self-end justify-self-end">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Class to Subject Mapper</h4>
                                <div className="border rounded-md p-4">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Checkbox id={`same-subjects-${classIndex}`} />
                                        <Label htmlFor={`same-subjects-${classIndex}`}>Every section has the same subjects</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subjects for {cls.name}</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {cls.subjects.map(subject => (
                                                <span key={subject.id} className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md text-sm">
                                                    {subject.name}
                                                    <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive hover:text-destructive">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-2 mt-4">
                                        <div className="flex-1">
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Add a subject..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {mockSubjects.map(subject => (
                                                        <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button variant="outline">
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={handleAddClass}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Class
                    </Button>
                    <Button>
                        <FilePlus2 className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
