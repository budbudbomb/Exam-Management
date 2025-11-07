
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FilePlus2, PlusCircle, Trash2, ChevronRight, ArrowLeft, ChevronDown } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Subject } from '@/lib/types';


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
}) => {
    return (
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
    );
});
SubjectColumn.displayName = 'SubjectColumn';


const AddSubjectsCard = ({ onBack }: { onBack: () => void }) => {
    const [subjects, setSubjects] = useState<SubjectInputs>({ mandatory: [], language: [], vocational: [] });

    const handleSubjectChange = useCallback((category: keyof SubjectInputs, id: number, field: 'name' | 'code', value: string) => {
        setSubjects(prev => {
            const newCategorySubjects = prev[category].map(subject => 
                subject.id === id ? { ...subject, [field]: value } : subject
            );
            return { ...prev, [category]: newCategorySubjects };
        });
    }, []);

    const handleAddSubject = useCallback((category: keyof SubjectInputs) => {
        setSubjects(prev => ({
            ...prev,
            [category]: [...prev[category], { id: Date.now(), name: '', code: '' }]
        }));
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
                        <CardDescription>Add new subjects and their codes to the system independently of classes.</CardDescription>
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
                    <Button>Save Subjects</Button>
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
                        <CardDescription>Add, edit, or remove existing subjects taught in the school.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>Subject management form will go here.</p>
            </CardContent>
        </Card>
    );
};

type SelectedSubjects = { [key: string]: boolean };

const MultiSelectDropdown = ({ title, subjects, selectedSubjects, onSubjectSelection }: { title: string, subjects: Subject[], selectedSubjects: SelectedSubjects, onSubjectSelection: (subjectId: string, checked: boolean) => void }) => {
    const selectedCount = subjects.filter(s => selectedSubjects[s.id]).length;
    
    return (
      <div className="space-y-2">
        <Label>{title}</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>{selectedCount > 0 ? `${selectedCount} selected` : `Select subjects`}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {subjects.map((subject) => (
              <DropdownMenuCheckboxItem
                key={subject.id}
                checked={!!selectedSubjects[subject.id]}
                onCheckedChange={(checked) => onSubjectSelection(subject.id, !!checked)}
                onSelect={(e) => e.preventDefault()}
              >
                {subject.name} ({subject.code})
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
};

type ClassConfig = {
    id: number;
    selectedClassId: string;
    selectedMedium: string;
    selectedSubjects: SelectedSubjects;
}

const AssignSubjectsToClassCard = ({ onBack }: { onBack: () => void }) => {
    const [configs, setConfigs] = useState<ClassConfig[]>([
        { id: Date.now(), selectedClassId: '', selectedMedium: '', selectedSubjects: {} }
    ]);

    const handleAddConfig = () => {
        setConfigs(prev => [...prev, { id: Date.now(), selectedClassId: '', selectedMedium: '', selectedSubjects: {} }]);
    }
    
    const handleRemoveConfig = (id: number) => {
        setConfigs(prev => prev.filter(c => c.id !== id));
    }

    const handleConfigChange = (id: number, field: keyof Omit<ClassConfig, 'id' | 'selectedSubjects'>, value: string) => {
        setConfigs(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    }

    const handleSubjectSelection = (id: number, subjectId: string, checked: boolean) => {
        setConfigs(prev => prev.map(c => c.id === id ? {
            ...c,
            selectedSubjects: { ...c.selectedSubjects, [subjectId]: checked }
        } : c));
    };

    const categorizedSubjects = React.useMemo(() => {
        return {
          Mandatory: mockSubjects.filter((s) => s.category === 'Core'),
          Language: mockSubjects.filter((s) => s.category === 'Language'),
          Vocational: mockSubjects.filter((s) => s.category === 'Vocational'),
        };
    }, []);

    const sortedClasses = [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Assign Subjects to Class</CardTitle>
                        <CardDescription>Create configurations to assign specific subjects to a class and medium.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {configs.map(config => (
                    <Card key={config.id} className="p-4 relative bg-muted/20">
                         {configs.length > 1 && (
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => handleRemoveConfig(config.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                         )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select value={config.selectedClassId} onValueChange={(value) => handleConfigChange(config.id, 'selectedClassId', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sortedClasses.map(cls => (
                                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label>Medium</Label>
                                <Select value={config.selectedMedium} onValueChange={(value) => handleConfigChange(config.id, 'selectedMedium', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a medium" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Hindi">Hindi</SelectItem>
                                        <SelectItem value="Urdu">Urdu</SelectItem>
                                        <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <MultiSelectDropdown 
                                title="Mandatory Subjects"
                                subjects={categorizedSubjects.Mandatory}
                                selectedSubjects={config.selectedSubjects}
                                onSubjectSelection={(subjectId, checked) => handleSubjectSelection(config.id, subjectId, checked)}
                            />
                            <MultiSelectDropdown 
                                title="Language Subjects"
                                subjects={categorizedSubjects.Language}
                                selectedSubjects={config.selectedSubjects}
                                onSubjectSelection={(subjectId, checked) => handleSubjectSelection(config.id, subjectId, checked)}
                            />
                            <MultiSelectDropdown 
                                title="Vocational Subjects"
                                subjects={categorizedSubjects.Vocational}
                                selectedSubjects={config.selectedSubjects}
                                onSubjectSelection={(subjectId, checked) => handleSubjectSelection(config.id, subjectId, checked)}
                            />
                        </div>
                    </Card>
                ))}
                 <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={handleAddConfig}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another class configuration
                    </Button>
                    <Button>Save All Assignments</Button>
                </div>

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
    
    if (view === 'assign-subjects') {
        return <AssignSubjectsToClassCard onBack={handleBack} />;
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
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('assign-subjects')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Assign Subjects to Class</CardTitle>
                        <CardDescription>Assign subjects from the available lists to a specific class.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('subject-management')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Subject Management</CardTitle>
                        <CardDescription>Edit, or remove existing subjects taught in the school.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
        </div>
    );
}
