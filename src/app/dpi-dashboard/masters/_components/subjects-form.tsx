
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FilePlus2, PlusCircle, Trash2, ChevronRight, ArrowLeft, ChevronDown, Edit } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Subject } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


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

const AddSubjectsCard = ({ onBack }: { onBack: () => void }) => {
    const [inputs, setInputs] = useState<SubjectInputs>({
        mandatory: [{ id: 1, name: '', code: '' }],
        language: [{ id: 1, name: '', code: '' }],
        vocational: [{ id: 1, name: '', code: '' }],
    });

    const handleInputChange = (category: keyof SubjectInputs, id: number, field: 'name' | 'code', value: string) => {
        setInputs(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleAddItem = (category: keyof SubjectInputs) => {
        setInputs(prev => ({
            ...prev,
            [category]: [...prev[category], { id: Date.now(), name: '', code: '' }],
        }));
    };
    
    const handleRemoveItem = (category: keyof SubjectInputs, id: number) => {
        setInputs(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item.id !== id),
        }));
    };

    const renderCategory = (category: keyof SubjectInputs, title: string) => (
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">{title}</h3>
            {inputs[category].map(item => (
                <div key={item.id} className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor={`name-${category}-${item.id}`}>Subject Name</Label>
                        <Input
                            id={`name-${category}-${item.id}`}
                            value={item.name}
                            onChange={(e) => handleInputChange(category, item.id, 'name', e.target.value)}
                            placeholder="e.g. Mathematics"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor={`code-${category}-${item.id}`}>Subject Code</Label>
                        <Input
                            id={`code-${category}-${item.id}`}
                            value={item.code}
                            onChange={(e) => handleInputChange(category, item.id, 'code', e.target.value)}
                            placeholder="e.g. M-101"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveItem(category, item.id)}
                        disabled={inputs[category].length === 1}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => handleAddItem(category)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
            </Button>
        </div>
    );

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {renderCategory('mandatory', 'Mandatory Subjects')}
                    {renderCategory('language', 'Language Subjects')}
                    {renderCategory('vocational', 'Vocational Subjects')}
                </div>
                <div className="flex justify-end">
                    <Button>
                        <FilePlus2 className="mr-2 h-4 w-4" /> Save Subjects
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};


type SubjectConfigRow = {
    id: number;
    subjectId: string;
    theorySubType: 'Basic' | 'Standard';
    theoryMaxMarks: string;
    assessmentType: 'Practical' | 'Project';
    assessmentMaxMarks: string;
};

const SubjectManagementCard = ({ onBack }: { onBack: () => void }) => {
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedMedium, setSelectedMedium] = useState('');
    const [subjects, setSubjects] = useState<SubjectConfigRow[]>([
        { id: Date.now(), subjectId: '', theorySubType: 'Standard', theoryMaxMarks: '', assessmentType: 'Practical', assessmentMaxMarks: '' }
    ]);

    const classSubjects = useMemo(() => {
        if (!selectedClassId) return [];
        const selectedClass = mockClasses.find(c => c.id === selectedClassId);
        return selectedClass ? selectedClass.subjects : [];
    }, [selectedClassId]);
    
    const handleAddSubject = () => {
        setSubjects(prev => [
            ...prev,
            { id: Date.now(), subjectId: '', theorySubType: 'Standard', theoryMaxMarks: '', assessmentType: 'Practical', assessmentMaxMarks: '' }
        ]);
    };

    const handleRemoveSubject = (id: number) => {
        setSubjects(prev => prev.filter(s => s.id !== id));
    };

    const handleSubjectChange = (id: number, field: keyof Omit<SubjectConfigRow, 'id'>, value: string) => {
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Class</Label>
                        <Select value={selectedClassId} onValueChange={setSelectedClassId}>
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
                        <Label>Medium</Label>
                         <Select value={selectedMedium} onValueChange={setSelectedMedium}>
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

                <div className="space-y-4">
                    {subjects.map(subject => (
                        <Card key={subject.id} className="p-4 bg-muted/30 relative">
                             <div className="flex justify-end absolute top-2 right-2">
                                {subjects.length > 1 && (
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-7 w-7" onClick={() => handleRemoveSubject(subject.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Subject Name</Label>
                                    <Select 
                                        value={subject.subjectId} 
                                        onValueChange={(value) => handleSubjectChange(subject.id, 'subjectId', value)}
                                        disabled={!selectedClassId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classSubjects.map(s => (
                                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2 col-span-1 lg:col-span-2">
                                    <Label>Theory</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 space-y-2">
                                            <Label className="text-xs text-muted-foreground">Sub-type</Label>
                                            <RadioGroup
                                                value={subject.theorySubType}
                                                onValueChange={(value: 'Basic' | 'Standard') => handleSubjectChange(subject.id, 'theorySubType', value)}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Basic" id={`basic-${subject.id}`} />
                                                    <Label htmlFor={`basic-${subject.id}`} className="font-normal">Basic</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Standard" id={`standard-${subject.id}`} />
                                                    <Label htmlFor={`standard-${subject.id}`} className="font-normal">Standard</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                         <div className="flex-1 space-y-2">
                                            <Label className="text-xs text-muted-foreground">Max Marks</Label>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 75"
                                                value={subject.theoryMaxMarks}
                                                onChange={e => handleSubjectChange(subject.id, 'theoryMaxMarks', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Additional Assessment</Label>
                                    <RadioGroup
                                        value={subject.assessmentType}
                                        onValueChange={(value: 'Practical' | 'Project') => handleSubjectChange(subject.id, 'assessmentType', value)}
                                        className="flex gap-4"
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
                                    <Label>{subject.assessmentType} Max Marks</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 25"
                                        value={subject.assessmentMaxMarks}
                                        onChange={e => handleSubjectChange(subject.id, 'assessmentMaxMarks', e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={handleAddSubject}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Another Subject
                    </Button>
                    <Button>Save Configuration</Button>
                </div>
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
    const [savedConfigs, setSavedConfigs] = useState<ClassConfig[]>([]);
    const [editingConfig, setEditingConfig] = useState<ClassConfig[] | null>(null);

    const categorizedSubjects = useMemo(() => {
        return {
          Mandatory: mockSubjects.filter((s) => s.category === 'Core'),
          Language: mockSubjects.filter((s) => s.category === 'Language'),
          Vocational: mockSubjects.filter((s) => s.category === 'Vocational'),
        };
    }, []);

    const sortedClasses = useMemo(() => [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    }), []);
    
    const getSubjectName = (id: string) => mockSubjects.find(s => s.id === id)?.name || id;

    // View component for saved configurations
    const ViewSavedConfigs = () => (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Assign Subjects to Class</CardTitle>
                        <CardDescription>Review and manage subject assignments for each class and medium.</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => setEditingConfig([{ id: Date.now(), selectedClassId: '', selectedMedium: '', selectedSubjects: {} }])}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create New
                        </Button>
                         <Button variant="outline" size="icon" onClick={onBack}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {savedConfigs.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        No configurations saved yet. Click "Create New" to get started.
                    </div>
                ) : (
                    savedConfigs.map(config => (
                        <Card key={config.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{sortedClasses.find(c => c.id === config.selectedClassId)?.name} - {config.selectedMedium}</h3>
                                    <div className="mt-2 space-y-2 text-sm">
                                        <div>
                                            <h4 className="font-medium text-muted-foreground">Mandatory Subjects</h4>
                                            <p>{Object.keys(config.selectedSubjects).filter(key => config.selectedSubjects[key] && categorizedSubjects.Mandatory.some(s => s.id === key)).map(getSubjectName).join(', ') || 'None'}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-muted-foreground">Language Subjects</h4>
                                            <p>{Object.keys(config.selectedSubjects).filter(key => config.selectedSubjects[key] && categorizedSubjects.Language.some(s => s.id === key)).map(getSubjectName).join(', ') || 'None'}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-muted-foreground">Vocational Subjects</h4>
                                            <p>{Object.keys(config.selectedSubjects).filter(key => config.selectedSubjects[key] && categorizedSubjects.Vocational.some(s => s.id === key)).map(getSubjectName).join(', ') || 'None'}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setEditingConfig([config])}><Edit className="mr-2 h-4 w-4" />Edit</Button>
                            </div>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    );

    // Edit/Create component
    const EditConfig = () => {
        const [configs, setConfigs] = useState<ClassConfig[]>(editingConfig || []);
        
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
        
        const handleSave = () => {
            // In a real app, you'd check for new vs updated configs
            setSavedConfigs(prev => {
                const newSaved = [...prev];
                configs.forEach(currentConfig => {
                    const index = newSaved.findIndex(sc => sc.id === currentConfig.id);
                    if (index > -1) {
                        newSaved[index] = currentConfig; // Update existing
                    } else {
                        newSaved.push(currentConfig); // Add new
                    }
                });
                return newSaved;
            });
            setEditingConfig(null);
        };


        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setEditingConfig(null)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <CardTitle>{editingConfig && editingConfig.length === 1 ? 'Edit Configuration' : 'Create New Configurations'}</CardTitle>
                            <CardDescription>Assign specific subjects to a class and medium.</CardDescription>
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
                        <Button onClick={handleSave}>Save All Assignments</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    return editingConfig ? <EditConfig /> : <ViewSavedConfigs />;
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

