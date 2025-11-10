

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSubjects } from '@/lib/data';
import { Subject } from '@/lib/types';
import { ArrowLeft, ChevronDown, PlusCircle } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type SelectedSubjects = { [key: string]: boolean };

type SubjectGroup = {
    id: number;
    classId: string;
    groupName: string;
    groupCode: string;
    mandatorySubjects: SelectedSubjects;
    languageSubjects: SelectedSubjects;
    vocationalSubjects: SelectedSubjects;
}

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

const GroupCard = ({ group, onGroupChange, onAddGroup }: { group: SubjectGroup, onGroupChange: (updatedGroup: SubjectGroup) => void, onAddGroup: () => void }) => {
    const categorizedSubjects = useMemo(() => {
        return {
          Mandatory: mockSubjects.filter((s) => s.category === 'Core'),
          Language: mockSubjects.filter((s) => s.category === 'Language'),
          Vocational: mockSubjects.filter((s) => s.category === 'Vocational'),
        };
    }, []);

    const handleFieldChange = (field: keyof Omit<SubjectGroup, 'id' | 'mandatorySubjects' | 'languageSubjects' | 'vocationalSubjects'>, value: string) => {
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

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Create Subject Group</CardTitle>
                <Button variant="outline" size="icon" onClick={onAddGroup}>
                    <PlusCircle className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Class</Label>
                        <Select value={group.classId} onValueChange={(value) => handleFieldChange('classId', value)}>
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
                        <Input id={`group-name-${group.id}`} value={group.groupName} onChange={(e) => handleFieldChange('groupName', e.target.value)} placeholder="e.g. Science (Biology)" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`group-code-${group.id}`}>Group Code</Label>
                        <Input id={`group-code-${group.id}`} value={group.groupCode} onChange={(e) => handleFieldChange('groupCode', e.target.value)} placeholder="e.g. SCI-BIO" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MultiSelectDropdown 
                        title="Mandatory Subjects"
                        subjects={categorizedSubjects.Mandatory}
                        selectedSubjects={group.mandatorySubjects}
                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('mandatorySubjects', subjectId, checked)}
                    />
                    <MultiSelectDropdown 
                        title="Language Subjects"
                        subjects={categorizedSubjects.Language}
                        selectedSubjects={group.languageSubjects}
                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('languageSubjects', subjectId, checked)}
                    />
                    <MultiSelectDropdown 
                        title="Vocational Subjects"
                        subjects={categorizedSubjects.Vocational}
                        selectedSubjects={group.vocationalSubjects}
                        onSubjectSelection={(subjectId, checked) => handleSubjectSelection('vocationalSubjects', subjectId, checked)}
                    />
                </div>
                 <div className="flex justify-end">
                    <Button>Save Group</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function SubjectGroupForm({ onBack }: { onBack: () => void }) {
    const [groups, setGroups] = useState<SubjectGroup[]>([
        { id: Date.now(), classId: '', groupName: '', groupCode: '', mandatorySubjects: {}, languageSubjects: {}, vocationalSubjects: {} }
    ]);
    
    const handleAddGroup = () => {
        setGroups(prev => [...prev, { id: Date.now(), classId: '', groupName: '', groupCode: '', mandatorySubjects: {}, languageSubjects: {}, vocationalSubjects: {} }]);
    };
    
    const handleGroupChange = (updatedGroup: SubjectGroup) => {
        setGroups(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    };

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
                {groups.map(group => (
                    <GroupCard 
                        key={group.id}
                        group={group}
                        onGroupChange={handleGroupChange}
                        onAddGroup={handleAddGroup}
                    />
                ))}
            </CardContent>
        </Card>
    );
}