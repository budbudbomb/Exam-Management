

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FilePlus2, PlusCircle, Trash2, ChevronRight, ArrowLeft } from 'lucide-react';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { mockClasses, getSubjects, addSubjects, updateSubjectsInData } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Subject } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';


type SubjectInputItem = {
    id: number;
    name: string;
    code: string;
    category: 'Compulsory' | 'Group subjects' | 'Language' | 'Vocational' | '';
}

const ExistingSubjectsList = ({ allSubjects, onSave }: { allSubjects: Subject[], onSave: (updatedSubjects: Subject[]) => void }) => {
    const [editableSubjects, setEditableSubjects] = useState<Subject[]>(allSubjects);
    const { toast } = useToast();

    useEffect(() => {
        setEditableSubjects(allSubjects);
    }, [allSubjects]);

    const handleSubjectChange = (id: string, field: 'name' | 'code' | 'category', value: string) => {
        setEditableSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleDeleteSubject = (id: string) => {
        setEditableSubjects(prev => prev.filter(s => s.id !== id));
    };

    const handleSaveChanges = () => {
        onSave(editableSubjects);
        toast({
            title: "Subjects Updated",
            description: "Your changes to the existing subjects have been saved.",
        });
    };
    
    const mapCategoryForDisplay = (category: 'Core' | 'Language' | 'Vocational'): SubjectInputItem['category'] => {
        if (category === 'Language') return 'Language';
        if (category === 'Vocational') return 'Vocational';
        // This is an assumption based on the add form logic. Might need refinement
        // if 'Core' needs to be split between Compulsory and Group. For now, defaulting to Compulsory.
        return 'Compulsory';
    }

    const mapCategoryForSaving = (category: SubjectInputItem['category']): 'Core' | 'Language' | 'Vocational' => {
        if (category === 'Language') return 'Language';
        if (category === 'Vocational') return 'Vocational';
        return 'Core';
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Existing Subjects</CardTitle>
                <CardDescription>Edit or remove subjects that are already in the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-end gap-4 font-medium text-sm text-muted-foreground">
                    <div className="flex-1 space-y-2"><Label>Subject Name</Label></div>
                    <div className="flex-1 space-y-2"><Label>Subject Code</Label></div>
                    <div className="flex-1 space-y-2"><Label>Subject Category</Label></div>
                    <div className="w-[40px]"></div>
                </div>
                <div className="space-y-2">
                    {editableSubjects.map(subject => (
                        <div key={subject.id} className="flex items-end gap-4">
                            <div className="flex-1">
                                <Input
                                    value={subject.name}
                                    onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    value={subject.code}
                                    onChange={(e) => handleSubjectChange(subject.id, 'code', e.target.value)}
                                />
                            </div>
                             <div className="flex-1">
                                <Select
                                    value={mapCategoryForDisplay(subject.category)}
                                    onValueChange={(value: SubjectInputItem['category']) => handleSubjectChange(subject.id, 'category', mapCategoryForSaving(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Compulsory">Compulsory</SelectItem>
                                        <SelectItem value="Group subjects">Group subjects</SelectItem>
                                        <SelectItem value="Language">Language</SelectItem>
                                        <SelectItem value="Vocational">Vocational</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteSubject(subject.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
    );
};


const AddSubjectsCard = ({ onSave }: { onSave: (newSubjects: Subject[]) => void }) => {
    const [subjectRows, setSubjectRows] = useState<SubjectInputItem[]>([{ id: Date.now(), name: '', code: '', category: '' }]);
    const { toast } = useToast();

    const handleInputChange = (id: number, field: keyof Omit<SubjectInputItem, 'id'>, value: string) => {
        setSubjectRows(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleAddRow = () => {
        setSubjectRows(prev => [...prev, { id: Date.now(), name: '', code: '', category: '' }]);
    };
    
    const handleRemoveRow = (id: number) => {
        setSubjectRows(prev => prev.filter(item => item.id !== id));
    };

    const handleSaveSubjects = () => {
        const newSubjects: Subject[] = [];
        let subjectAdded = false;

        subjectRows.forEach(subject => {
            if (subject.name && subject.code && subject.category) {
                 let cat: 'Core' | 'Language' | 'Vocational' = 'Core';
                 if (subject.category === 'Language' || subject.category === 'Vocational') {
                     cat = subject.category;
                 }
                
                newSubjects.push({
                    id: `S${Date.now()}-${subject.code}`,
                    name: subject.name,
                    code: subject.code,
                    category: cat,
                    maxMarks: 100,
                    minMarks: 0,
                    passingMarks: 33,
                    hasPractical: false,
                    hasProject: false,
                });
                subjectAdded = true;
            }
        });
        
        if (!subjectAdded) {
             toast({
                variant: "destructive",
                title: "Incomplete Information",
                description: "Please fill out all fields for at least one subject to save.",
            });
            return;
        }

        onSave(newSubjects);
        toast({
            title: "Subjects Saved",
            description: "The new subjects have been successfully saved.",
        });
        // Clear inputs after saving
        setSubjectRows([{ id: Date.now(), name: '', code: '', category: '' }]);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                     <div>
                        <CardTitle>Add Subjects</CardTitle>
                        <CardDescription>Add new subjects and their codes to the system independently of classes.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => (document.getElementById('existing-subjects-trigger') as HTMLButtonElement)?.click()}>
                            View & Edit Existing Subjects
                        </Button>
                         <Button variant="outline" size="icon" onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            params.delete('view');
                            window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
                         }}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {subjectRows.map((row, index) => (
                        <div key={row.id} className="flex items-end gap-2">
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Subject Name</Label>}
                                <Input 
                                    placeholder="Enter subject name" 
                                    value={row.name}
                                    onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                                />
                            </div>
                             <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Subject Code</Label>}
                                <Input 
                                    placeholder="Enter subject code"
                                    value={row.code}
                                    onChange={(e) => handleInputChange(row.id, 'code', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Subject Category</Label>}
                                <Select
                                    value={row.category}
                                    onValueChange={(value: SubjectInputItem['category']) => handleInputChange(row.id, 'category', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Compulsory">Compulsory</SelectItem>
                                        <SelectItem value="Group subjects">Group subjects</SelectItem>
                                        <SelectItem value="Language">Language</SelectItem>
                                        <SelectItem value="Vocational">Vocational</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveRow(row.id)} disabled={subjectRows.length === 1}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                 <div className="flex justify-between">
                    <Button variant="outline" onClick={handleAddRow}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another subject
                    </Button>
                    <Button onClick={handleSaveSubjects}>
                        <FilePlus2 className="mr-2 h-4 w-4" />
                        Save Subjects
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

type SubjectGroup = {
    id: number;
    groupName: string;
    groupCode: string;
};
const SubjectGroupForm = ({ onBack, allSubjects, subjectGroups, setSubjectGroups }: { onBack: () => void, allSubjects: Subject[], subjectGroups: SubjectGroup[], setSubjectGroups: React.Dispatch<React.SetStateAction<SubjectGroup[]>> }) => {

    const { toast } = useToast();

    const handleAddGroup = () => {
        setSubjectGroups(prev => [...prev, { id: Date.now(), groupName: '', groupCode: '' }]);
    };
    
    const handleRemoveGroup = (id: number) => {
        setSubjectGroups(prev => prev.filter(g => g.id !== id));
    };

    const handleGroupChange = (id: number, field: 'groupName' | 'groupCode', value: string) => {
        setSubjectGroups(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
    };

    const handleSave = () => {
        toast({
            title: "Groups Saved",
            description: "The subject groups have been saved.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Create subject groups for 11th and 12th</CardTitle>
                        <CardDescription>Define valid subject combinations (e.g. PCM, PCB) for higher secondary classes.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {subjectGroups.map((group, index) => (
                        <div key={group.id} className="flex items-end gap-2">
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Group Name</Label>}
                                <Input 
                                    placeholder="e.g. Science (Biology)" 
                                    value={group.groupName}
                                    onChange={(e) => handleGroupChange(group.id, 'groupName', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Group Code</Label>}
                                <Input 
                                    placeholder="e.g. SCI-BIO"
                                    value={group.groupCode}
                                    onChange={(e) => handleGroupChange(group.id, 'groupCode', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveGroup(group.id)} disabled={subjectGroups.length === 1}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={handleAddGroup}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another group
                    </Button>
                    <Button onClick={handleSave}>Save All Groups</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const MultiSelectDropdown = ({ title, options, selectedOptions, onSelectionChange }: { title: string, options: {id: string, name: string}[], selectedOptions: { [key: string]: boolean }, onSelectionChange: (subjectId: string, checked: boolean) => void }) => {
    const selectedCount = Object.values(selectedOptions).filter(Boolean).length;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between rounded-full">
                    <span>{selectedCount > 0 ? `${selectedCount} selected` : `Select subjects`}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.id}
                        checked={!!selectedOptions[option.id]}
                        onCheckedChange={(checked) => onSelectionChange(option.id, !!checked)}
                        onSelect={(e) => e.preventDefault()}
                    >
                        {option.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const AddSubjectsToGroupForm = ({ onBack }: { onBack: () => void }) => {
    type GroupRow = {
        id: number;
        groupId: string;
        selectedSubjects: { [key: string]: boolean };
    };

    const [groupRows, setGroupRows] = useState<GroupRow[]>([
        { id: Date.now(), groupId: '', selectedSubjects: {} }
    ]);

    const { toast } = useToast();

    const groupOptions = [
        { id: 'humanities', name: 'Humanities' },
        { id: 'science', name: 'Science' },
        { id: 'commerce', name: 'Commerce' },
        { id: 'agriculture', name: 'Agriculture' },
        { id: 'science-maths', name: 'Science Maths' },
        { id: 'science-bio', name: 'Science Bio' },
    ];
    
    const subjectOptions = [
        { id: 'physics', name: 'Physics' },
        { id: 'chemistry', name: 'Chemistry' },
        { id: 'maths', name: 'Maths' },
        { id: 'biology', name: 'Biology' },
        { id: 'accounts', name: 'Accounts' },
    ];

    const handleAddRow = () => {
        setGroupRows(prev => [...prev, { id: Date.now(), groupId: '', selectedSubjects: {} }]);
    };

    const handleRemoveRow = (id: number) => {
        setGroupRows(prev => prev.filter(row => row.id !== id));
    };

    const handleGroupChange = (id: number, groupId: string) => {
        setGroupRows(prev => prev.map(row => row.id === id ? { ...row, groupId } : row));
    };

    const handleSubjectSelection = (id: number, subjectId: string, checked: boolean) => {
        setGroupRows(prev => prev.map(row => {
            if (row.id === id) {
                const newSelectedSubjects = { ...row.selectedSubjects, [subjectId]: checked };
                return { ...row, selectedSubjects: newSelectedSubjects };
            }
            return row;
        }));
    };

    const handleSave = () => {
        toast({
            title: 'Assignments Saved',
            description: `Successfully saved subject assignments.`,
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Add Subjects in Subject Groups</CardTitle>
                        <CardDescription>Assign subjects to the groups you have created.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    {groupRows.map((row, index) => (
                        <div key={row.id} className="flex items-end gap-2">
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Group</Label>}
                                <Select value={row.groupId} onValueChange={(value) => handleGroupChange(row.id, value)}>
                                    <SelectTrigger className="rounded-full">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groupOptions.map(group => (
                                            <SelectItem key={group.id} value={group.id}>
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 space-y-1">
                                {index === 0 && <Label>Add Subjects</Label>}
                                <MultiSelectDropdown
                                    title="Subjects"
                                    options={subjectOptions}
                                    selectedOptions={row.selectedSubjects}
                                    onSelectionChange={(subjectId, checked) => handleSubjectSelection(row.id, subjectId, checked)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveRow(row.id)} disabled={groupRows.length === 1}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" onClick={handleAddRow}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another group
                    </Button>
                    <Button onClick={handleSave}>Save Assignments</Button>
                </div>
            </CardContent>
        </Card>
    );
};



type SubjectConfigRow = {
    id: number;
    subjectCategory: 'Compulsory' | 'Language' | 'Vocational' | 'CWSN' | 'Group subjects' | '';
    groupId?: string;
    subjectId: string;
    theorySubTypes: {
        basicStandard: boolean;
        none: boolean;
    };
    theoryMinMarks: string;
    theoryMaxMarks: string;
    assessmentType: 'Practical' | 'Project';
    assessmentMinMarks: string;
    assessmentMaxMarks: string;
};

const SubjectManagementCard = ({ onBack, allSubjects }: { onBack: () => void, allSubjects: Subject[] }) => {
    
    type ClassConfig = {
        id: number;
        classId: string;
        subjects: SubjectConfigRow[];
    };
    
    const [classConfigs, setClassConfigs] = useState<ClassConfig[]>([
        { id: Date.now(), classId: '', subjects: [{ id: Date.now(), subjectCategory: '', groupId: '', subjectId: '', theorySubTypes: { basicStandard: true, none: false }, theoryMinMarks: '', theoryMaxMarks: '', assessmentType: 'Practical', assessmentMinMarks: '', assessmentMaxMarks: '' }] }
    ]);
    
    const handleAddClassConfig = () => {
        setClassConfigs(prev => [
            ...prev,
            { id: Date.now(), classId: '', subjects: [{ id: Date.now(), subjectCategory: '', groupId: '', subjectId: '', theorySubTypes: { basicStandard: true, none: false }, theoryMinMarks: '', theoryMaxMarks: '', assessmentType: 'Practical', assessmentMinMarks: '', assessmentMaxMarks: '' }] }
        ]);
    };
    
    const handleRemoveClassConfig = (id: number) => {
        setClassConfigs(prev => prev.filter(c => c.id !== id));
    };

    const handleClassConfigChange = (id: number, field: 'classId', value: string) => {
        setClassConfigs(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };
    
    const handleAddSubject = (classConfigId: number) => {
        setClassConfigs(prev => prev.map(c => {
            if (c.id === classConfigId) {
                return {
                    ...c,
                    subjects: [
                        ...c.subjects,
                        { id: Date.now(), subjectCategory: '', groupId: '', subjectId: '', theorySubTypes: { basicStandard: true, none: false }, theoryMinMarks: '', theoryMaxMarks: '', assessmentType: 'Practical', assessmentMinMarks: '', assessmentMaxMarks: '' }
                    ]
                };
            }
            return c;
        }));
    };

    const handleRemoveSubject = (classConfigId: number, subjectId: number) => {
        setClassConfigs(prev => prev.map(c => {
            if (c.id === classConfigId) {
                return { ...c, subjects: c.subjects.filter(s => s.id !== subjectId) };
            }
            return c;
        }));
    };

    const handleSubjectChange = (classConfigId: number, subjectId: number, field: keyof Omit<SubjectConfigRow, 'id' | 'theorySubTypes'>, value: any) => {
        setClassConfigs(prev => prev.map(c => {
            if (c.id === classConfigId) {
                return {
                    ...c,
                    subjects: c.subjects.map(s => {
                        if (s.id === subjectId) {
                            if(field === 'subjectCategory') {
                                return { ...s, subjectCategory: value, subjectId: '', groupId: '' }; // Reset subject and group when category changes
                            }
                             if(field === 'groupId') {
                                return { ...s, groupId: value, subjectId: '' }; // Reset subject when group changes
                            }
                            return { ...s, [field]: value };
                        }
                        return s;
                    })
                };
            }
            return c;
        }));
    };
    
    const handleTheorySubTypeChange = (classConfigId: number, subjectId: number, subType: 'basicStandard' | 'none') => {
        setClassConfigs(prev => prev.map(c => {
            if (c.id === classConfigId) {
                return {
                    ...c,
                    subjects: c.subjects.map(s => {
                        if (s.id === subjectId) {
                            const newSubTypes = { ...s.theorySubTypes };
                            if (subType === 'none') {
                                newSubTypes.none = !newSubTypes.none;
                                if (newSubTypes.none) newSubTypes.basicStandard = false;
                            } else { // basicStandard
                                newSubTypes.basicStandard = !newSubTypes.basicStandard;
                                if (newSubTypes.basicStandard) newSubTypes.none = false;
                            }
                            return { ...s, theorySubTypes: newSubTypes };
                        }
                        return s;
                    })
                };
            }
            return c;
        }));
    };
    
    const getSubjectName = (subject: SubjectConfigRow, classId: string) => {
        if (!subject.subjectId || !subject.subjectCategory) return 'New Subject';
        
        const selectedClass = mockClasses.find(c => c.id === classId);
        const classSubjects = selectedClass?.subjects.length ? selectedClass.subjects : allSubjects;

        return classSubjects.find(s => s.id === subject.subjectId)?.name || 'New Subject';
    };

    const ClassConfigCard = ({ config }: { config: ClassConfig }) => {
        const selectedClass = mockClasses.find(c => c.id === config.classId);
        const selectedClassName = selectedClass?.name;
        
        const headerTitle = selectedClassName || "New Class Configuration";

        const categorizedClassSubjects = useMemo(() => {
            if (!config.classId) return { Core: [], Language: [], Vocational: [] };
            const selectedClass = mockClasses.find(c => c.id === config.classId);
            const classSubjects = selectedClass?.subjects.length ? selectedClass.subjects : allSubjects;
            
            return {
              Core: classSubjects.filter((s) => s.category === 'Core'),
              Language: classSubjects.filter((s) => s.category === 'Language'),
              Vocational: classSubjects.filter((s) => s.category === 'Vocational'),
            };
        }, [config.classId]);

        const getSubjectCategoryOptions = () => {
            if (!selectedClass) return [];
            const className = selectedClass.name;
            if (className === 'Class 9' || className === 'Class 10') {
                return [
                    { value: 'Compulsory', label: 'Compulsory' },
                    { value: 'Language', label: 'Language' },
                    { value: 'Vocational', label: 'Vocational' },
                    { value: 'CWSN', label: 'CWSN' },
                ];
            }
            if (className === 'Class 11' || className === 'Class 12') {
                 return [
                    { value: 'Group subjects', label: 'Group subjects' },
                    { value: 'Language', label: 'Language' },
                    { value: 'Vocational', label: 'Vocational' },
                    { value: 'CWSN', label: 'CWSN' },
                ];
            }
            return [];
        };

        const subjectCategoryOptions = getSubjectCategoryOptions();
        
        const groupOptions = [
            { id: 'science', name: 'Science' },
            { id: 'commerce', name: 'Commerce' },
            { id: 'arts', name: 'Arts' },
        ];


        return (
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1" className="border-none">
                    <Card>
                        <div className="flex items-center justify-between p-4 w-full">
                           <div className="flex-1">
                             <AccordionTrigger className="w-full p-0 hover:no-underline">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-1 text-lg font-semibold text-left">
                                       {headerTitle}
                                    </div>
                                </div>
                            </AccordionTrigger>
                           </div>
                            <div className="flex items-center gap-2 pl-4">
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); handleRemoveClassConfig(config.id); }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <AccordionContent className="p-4 pt-0">
                             <Accordion type="multiple" className="space-y-4" defaultValue={config.subjects.map(s => `item-${s.id}`)}>
                                {config.subjects.map((subject, index) => (
                                    <AccordionItem key={subject.id} value={`item-${subject.id}`} className="border-none">
                                        <Card className="bg-muted/30">
                                            <div className="flex items-center p-4">
                                                <AccordionTrigger className="w-full p-0 hover:no-underline flex-1">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex-1 text-lg font-semibold text-left">
                                                            {index + 1}. {getSubjectName(subject, config.classId)}
                                                        </div>
                                                    </div>
                                                </AccordionTrigger>
                                                <div className="flex items-center gap-2 pl-4">
                                                    {config.subjects.length > 1 && (
                                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); handleRemoveSubject(config.id, subject.id); }}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <AccordionContent className="p-4 pt-0">
                                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end">
                                                    <div className="space-y-2">
                                                        <Label>Class</Label>
                                                        <Select value={config.classId} onValueChange={(value) => handleClassConfigChange(config.id, 'classId', value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a class" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {mockClasses.map(cls => (
                                                                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Subject Category</Label>
                                                        <Select 
                                                            value={subject.subjectCategory} 
                                                            onValueChange={(value: 'Compulsory' | 'Language' | 'Vocational' | 'CWSN' | 'Group subjects') => handleSubjectChange(config.id, subject.id, 'subjectCategory', value)}
                                                            disabled={!config.classId}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subjectCategoryOptions.map(option => (
                                                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    {subject.subjectCategory === 'Group subjects' && (
                                                        <div className="space-y-2">
                                                            <Label>Group</Label>
                                                            <Select 
                                                                value={subject.groupId}
                                                                onValueChange={(value) => handleSubjectChange(config.id, subject.id, 'groupId', value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select group" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {groupOptions.map(option => (
                                                                        <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    )}
                                                    <div className="space-y-2">
                                                        <Label>Subject Name</Label>
                                                        <Select 
                                                            value={subject.subjectId} 
                                                            onValueChange={(value) => handleSubjectChange(config.id, subject.id, 'subjectId', value)}
                                                            disabled={!subject.subjectCategory || (subject.subjectCategory === 'Group subjects' && !subject.groupId)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select subject" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subject.subjectCategory && categorizedClassSubjects[subject.subjectCategory === 'Compulsory' || subject.subjectCategory === 'Group subjects' ? 'Core' : subject.subjectCategory].map(s => (
                                                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                                                    <div className="space-y-4">
                                                        <h4 className="font-medium text-base">Theory</h4>
                                                        <div className="space-y-2">
                                                            <Label>Sub-type</Label>
                                                            <div className="flex gap-4 items-center h-10">
                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={`basic-standard-${subject.id}`}
                                                                        checked={subject.theorySubTypes.basicStandard}
                                                                        onCheckedChange={() => handleTheorySubTypeChange(config.id, subject.id, 'basicStandard')}
                                                                    />
                                                                    <Label htmlFor={`basic-standard-${subject.id}`} className="font-normal">Basic - Standard</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={`none-${subject.id}`}
                                                                        checked={subject.theorySubTypes.none}
                                                                        onCheckedChange={() => handleTheorySubTypeChange(config.id, subject.id, 'none')}
                                                                    />
                                                                    <Label htmlFor={`none-${subject.id}`} className="font-normal">None</Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div className="space-y-2">
                                                            <Label>Marks</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Min Marks"
                                                                    value={subject.theoryMinMarks}
                                                                    onChange={e => handleSubjectChange(config.id, subject.id, 'theoryMinMarks', e.target.value)}
                                                                />
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Max Marks"
                                                                    value={subject.theoryMaxMarks}
                                                                    onChange={e => handleSubjectChange(config.id, subject.id, 'theoryMaxMarks', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                         <h4 className="font-medium text-base">Other assessment type</h4>
                                                         <div className="space-y-2">
                                                            <Label>Type</Label>
                                                            <RadioGroup
                                                                value={subject.assessmentType}
                                                                onValueChange={(value: 'Practical' | 'Project') => handleSubjectChange(config.id, subject.id, 'assessmentType', value)}
                                                                className="flex gap-4 h-10 items-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="Practical" id={`prac-${subject.id}`} />
                                                                    <Label htmlFor={`prac-${subject.id}`} className="font-normal">Practical</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="Project" id={`proj-${subject.id}`} />
                                                                    <Label htmlFor={`proj-${subject.id}`} className="font-normal">Project</Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>{subject.assessmentType} Marks</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Min Marks"
                                                                    value={subject.assessmentMinMarks}
                                                                    onChange={e => handleSubjectChange(config.id, subject.id, 'assessmentMinMarks', e.target.value)}
                                                                />
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Max Marks"
                                                                    value={subject.assessmentMaxMarks}
                                                                    onChange={e => handleSubjectChange(config.id, subject.id, 'assessmentMaxMarks', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                             <div className="flex justify-between items-center pt-4 mt-4 border-t">
                                <Button variant="outline" onClick={() => handleAddSubject(config.id)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Another Subject
                                </Button>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        )
    };


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
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {classConfigs.map(config => (
                        <ClassConfigCard key={config.id} config={config} />
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={handleAddClassConfig}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another class
                    </Button>
                    <Button>Save All Configurations</Button>
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
    const [allSubjects, setAllSubjects] = useState(() => getSubjects());
    const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);

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

    const handleSaveNewSubjects = (newSubjects: Subject[]) => {
        addSubjects(newSubjects);
        setAllSubjects(getSubjects()); 
    };

    const handleUpdateExistingSubjects = (updatedSubjects: Subject[]) => {
        updateSubjectsInData(updatedSubjects);
        setAllSubjects(getSubjects());
    }

    if (view === 'add-subjects') {
        return (
             <div className="space-y-6">
                <Sheet>
                    <AddSubjectsCard onSave={handleSaveNewSubjects} />
                    <SheetTrigger asChild>
                        <button id="existing-subjects-trigger" className="hidden">View & Edit Existing Subjects</button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-2xl">
                        <SheetHeader>
                            <SheetTitle>Existing Subjects</SheetTitle>
                            <SheetDescription>
                                Edit or remove subjects that are already in the system.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-4">
                            <ExistingSubjectsList allSubjects={allSubjects} onSave={handleUpdateExistingSubjects} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        );
    }

    if (view === 'subject-groups') {
        return <SubjectGroupForm onBack={handleBack} allSubjects={allSubjects} subjectGroups={subjectGroups} setSubjectGroups={setSubjectGroups} />;
    }
    
    if (view === 'add-subjects-to-group') {
        return <AddSubjectsToGroupForm onBack={handleBack} />;
    }

    if (view === 'subject-management') {
        return <SubjectManagementCard onBack={handleBack} allSubjects={allSubjects} />;
    }

    return (
        <div className="space-y-6">
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('add-subjects')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Add & Edit Subjects</CardTitle>
                        <CardDescription>Add new subjects to the system or edit existing ones.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('subject-groups')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Create subject groups for 11th and 12th</CardTitle>
                        <CardDescription>Define valid subject combinations (e.g. PCM, PCB) for higher secondary classes.</CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handleNavigate('add-subjects-to-group')}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Add subjects in Subject groups</CardTitle>
                        <CardDescription>Populate the created subject groups with specific subjects.</CardDescription>
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

    

    