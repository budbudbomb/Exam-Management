
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FilePlus2, PlusCircle, Trash2, ChevronRight, ArrowLeft } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type SubjectInputItem = {
    id: number;
    name: string;
    code: string;
}

type SubjectInputs = {
    mandatory: SubjectInputItem[];
    language: SubjectInputItem[];
    vocational: SubjectInputItem[];
}

const SubjectColumn = React.memo(({
    category,
    title,
    subjects,
    onSubjectChange,
    onAddSubject,
    onRemoveSubject
}: {
    category: keyof SubjectInputs,
    title: string,
    subjects: SubjectInputItem[],
    onSubjectChange: (category: keyof SubjectInputs, id: number, field: 'name' | 'code', value: string) => void,
    onAddSubject: (category: keyof SubjectInputs) => void,
    onRemoveSubject: (category: keyof SubjectInputs, id: number) => void
}) => (
    <div className="space-y-2">
        <h4 className="font-medium text-center">{title}</h4>
        <div className="space-y-2 rounded-md border p-4 min-h-[100px] bg-muted/20">
             {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input
                            type="text"
                            placeholder="Subject Name"
                            value={subject.name}
                            onChange={(e) => onSubjectChange(category, subject.id, 'name', e.target.value)}
                        />
                         <Input
                            type="text"
                            placeholder="Code"
                            value={subject.code}
                            onChange={(e) => onSubjectChange(category, subject.id, 'code', e.target.value)}
                        />
                    </div>
                     <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={() => onRemoveSubject(category, subject.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => onAddSubject(category)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
        </div>
    </div>
));
SubjectColumn.displayName = 'SubjectColumn';


const AddSubjectsCard = ({ onBack }: { onBack: () => void }) => {
    const [subjects, setSubjects] = useState<SubjectInputs>({ mandatory: [], language: [], vocational: [] });

    const handleAddSubject = useCallback((category: keyof SubjectInputs) => {
        setSubjects(prev => ({
            ...prev,
            [category]: [...prev[category], { id: Date.now(), name: '', code: '' }]
        }));
    }, []);
    
    const handleSubjectChange = useCallback((category: keyof SubjectInputs, id: number, field: 'name' | 'code', value: string) => {
        setSubjects(prev => {
            const newCategorySubjects = prev[category].map(subject => 
                subject.id === id ? { ...subject, [field]: value } : subject
            );
            return {
                ...prev,
                [category]: newCategorySubjects
            };
        });
    }, []);
    
    const handleRemoveSubject = useCallback((category: keyof SubjectInputs, id: number) => {
        setSubjects(prev => ({
            ...prev,
            [category]: prev[category].filter(subject => subject.id !== id)
        }));
    }, []);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Add Subjects</CardTitle>
                        <CardDescription>Add new subjects and their codes to the system.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SubjectColumn
                            category="mandatory"
                            title="Mandatory Subjects"
                            subjects={subjects.mandatory}
                            onSubjectChange={handleSubjectChange}
                            onAddSubject={handleAddSubject}
                            onRemoveSubject={handleRemoveSubject}
                        />
                        <SubjectColumn
                            category="language"
                            title="Language Subjects"
                            subjects={subjects.language}
                            onSubjectChange={handleSubjectChange}
                            onAddSubject={handleAddSubject}
                            onRemoveSubject={handleRemoveSubject}
                        />
                        <SubjectColumn
                            category="vocational"
                            title="Vocational Subjects"
                            subjects={subjects.vocational}
                            onSubjectChange={handleSubjectChange}
                            onAddSubject={handleAddSubject}
                            onRemoveSubject={handleRemoveSubject}
                        />
                    </div>
                </div>
                 <div className="flex justify-end pt-4">
                    <Button>Save Class Subjects</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const SubjectManagementCard = ({ onBack }: { onBack: () => void }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Subject Management</CardTitle>
                        <CardDescription>Add, edit, or remove subjects taught in the school.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>Subject management form will go here.</p>
            </CardContent>
        </Card>
    );
};


export default function SubjectsForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const view = searchParams.get('view');

    const handleNavigate = (view: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', view);
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleBack = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('view');
        router.push(`${pathname}?${params.toString()}`);
    }

    if (view === 'add-subjects') {
        return <AddSubjectsCard onBack={handleBack} />;
    }

    if (view === 'subject-management') {
        return <SubjectManagementCard onBack={handleBack} />;
    }

    return (
        <div className="space-y-6">
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('add-subjects')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Add Subjects</CardTitle>
                        <CardDescription>Add new subjects and their codes to the system.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('subject-management')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Subject Management</CardTitle>
                        <CardDescription>Add, edit, or remove subjects taught in the school.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
        </div>
    );
}
