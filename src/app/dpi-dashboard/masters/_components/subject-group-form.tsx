

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Subject as SubjectType } from '@/lib/types';
import { ArrowLeft, ChevronDown, PlusCircle, Edit, Trash2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';


type SelectedSubjects = { [key: string]: boolean };

type SubjectGroup = {
    id: number;
    classId: string;
    groupName: string;
    groupCode: string;
    mandatorySubjects: SelectedSubjects;
    languageSubjects: SelectedSubjects;
    vocationalSubjects: SelectedSubjects;
    isSaved: boolean;
}

const MultiSelectDropdown = ({ title, subjects, selectedSubjects, onSubjectSelection, disabled }: { title: string, subjects: SubjectType[], selectedSubjects: SelectedSubjects, onSubjectSelection: (subjectId: string, checked: boolean) => void, disabled?: boolean }) => {
    const selectedCount = subjects.filter(s => selectedSubjects[s.id]).length;
    
    return (
      <div className="space-y-2">
        <Label>{title}</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between" disabled={disabled}>
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

const SelectedSubjectsDisplay = ({ title, allSubjects, selectedSubjects }: { title: string; allSubjects: SubjectType[]; selectedSubjects: SelectedSubjects }) => {
    const selectedSubjectItems = allSubjects
        .filter(s => selectedSubjects[s.id])
        .map(s => <div key={s.id} className="text-sm text-muted-foreground">{s.name}</div>);

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium">{title}</h4>
            <div className="space-y-1">
                {selectedSubjectItems.length > 0 ? selectedSubjectItems : <div className="text-sm text-muted-foreground/80">None selected</div>}
            </div>
        </div>
    );
};

const GroupCard = ({ group, onGroupChange, onRemoveGroup, allSubjects }: { group: SubjectGroup, onGroupChange: (updatedGroup: SubjectGroup) => void, onRemoveGroup: () => void, allSubjects: SubjectType[] }) => {
    const [isEditing, setIsEditing] = useState(!group.isSaved);

    const categorizedSubjects = useMemo(() => {
        return {
          Mandatory: allSubjects.filter((s) => s.category === 'Core'),
          Language: allSubjects.filter((s) => s.category === 'Language'),
          Vocational: allSubjects.filter((s) => s.category === 'Vocational'),
        };
    }, [allSubjects]);

    const handleFieldChange = (field: keyof Omit<SubjectGroup, 'id' | 'mandatorySubjects' | 'languageSubjects' | 'vocationalSubjects' | 'isSaved'>, value: string) => {
        onGroupChange({ ...group, [field]: value });
    };

    const handleSubjectSelection = (category: 'mandatorySubjects' | 'languageSubjects' | 'vocationalSubjects', subjectId: string, checked: boolean) => {
        onGroupChange({
            ...group,
            [category]: {
                ...group[category],
                [subjectId]: checked
            }
        });
    };
    
    const handleSave = () => {
        onGroupChange({ ...group, isSaved: true });
        setIsEditing(false);
    }
    
    const handleEdit = () => {
        setIsEditing(true);
    }

    const selectedClassName = mockClasses.find(c => c.id === group.classId)?.name || '';
    const headerTitle = [selectedClassName, group.groupName].filter(Boolean).join(' - ') || 'New Subject Group';

    return (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full border-none">
            <AccordionItem value="item-1" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="p-4 hover:no-underline bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-lg">{headerTitle}</span>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); onRemoveGroup(); }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                             <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select value={group.classId} onValueChange={(value) => handleFieldChange('classId', value)} disabled={!isEditing}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="C3">Class 11</SelectItem>
                                        <SelectItem value="C4">Class 12</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`group-name-${group.id}`}>Group Name</Label>
                                <Input id={`group-name-${group.id}`} value={group.groupName} onChange={(e) => handleFieldChange('groupName', e.target.value)} placeholder="e.g. Science (Biology)" readOnly={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`group-code-${group.id}`}>Group Code</Label>
                                <Input id={`group-code-${group.id}`} value={group.groupCode} onChange={(e) => handleFieldChange('groupCode', e.target.value)} placeholder="e.g. SCI-BIO" readOnly={!isEditing} />
                            </div>
                        </div>
                        
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {isEditing ? (
                                <>
                                    <MultiSelectDropdown 
                                        title="Mandatory and group subjects"
                                        subjects={categorizedSubjects.Mandatory}
                                        selectedSubjects={group.mandatorySubjects}
                                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('mandatorySubjects', subjectId, checked)}
                                        disabled={!isEditing}
                                    />
                                    <MultiSelectDropdown 
                                        title="Language Subjects"
                                        subjects={categorizedSubjects.Language}
                                        selectedSubjects={group.languageSubjects}
                                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('languageSubjects', subjectId, checked)}
                                        disabled={!isEditing}
                                    />
                                    <MultiSelectDropdown 
                                        title="Vocational Subjects"
                                        subjects={categorizedSubjects.Vocational}
                                        selectedSubjects={group.vocationalSubjects}
                                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('vocationalSubjects', subjectId, checked)}
                                        disabled={!isEditing}
                                    />
                                </>
                            ) : (
                                <>
                                    <SelectedSubjectsDisplay title="Mandatory and group subjects" allSubjects={categorizedSubjects.Mandatory} selectedSubjects={group.mandatorySubjects} />
                                    <SelectedSubjectsDisplay title="Language Subjects" allSubjects={categorizedSubjects.Language} selectedSubjects={group.languageSubjects} />
                                    <SelectedSubjectsDisplay title="Vocational Subjects" allSubjects={categorizedSubjects.Vocational} selectedSubjects={group.vocationalSubjects} />
                                </>
                            )}
                        </div>
                         <div className="flex justify-end">
                            {isEditing ? (
                                <Button onClick={handleSave}>Save Group</Button>
                            ) : (
                                <Button variant="outline" onClick={handleEdit}><Edit className="mr-2 h-4 w-4" /> Edit Group</Button>
                            )}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default function SubjectGroupForm({ onBack, allSubjects }: { onBack: () => void, allSubjects: SubjectType[] }) {
    const [groups, setGroups] = useState<SubjectGroup[]>([
        { id: Date.now(), classId: '', groupName: '', groupCode: '', mandatorySubjects: {}, languageSubjects: {}, vocationalSubjects: {}, isSaved: false }
    ]);
    
    const handleAddGroup = () => {
        setGroups(prev => [...prev, { id: Date.now(), classId: '', groupName: '', groupCode: '', mandatorySubjects: {}, languageSubjects: {}, vocationalSubjects: {}, isSaved: false }]);
    };

    const handleRemoveGroup = (id: number) => {
        setGroups(prev => prev.filter(g => g.id !== id));
    };
    
    const handleGroupChange = (updatedGroup: SubjectGroup) => {
        setGroups(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={onBack}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <CardTitle>Create subject groups for 11th and 12th</CardTitle>
                            <CardDescription>Define valid subject combinations (e.g. PCM, PCB) for higher secondary classes.</CardDescription>
                        </div>
                    </div>
                    <Button onClick={handleAddGroup}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Group
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {groups.map(group => (
                    <GroupCard 
                        key={group.id}
                        group={group}
                        onGroupChange={handleGroupChange}
                        onRemoveGroup={() => handleRemoveGroup(group.id)}
                        allSubjects={allSubjects}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
