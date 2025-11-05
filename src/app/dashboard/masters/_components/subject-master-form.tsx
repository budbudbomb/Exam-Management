
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Subject } from '@/lib/types';
import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectedSubjects = {
  [key: string]: boolean;
};

export default function SubjectMasterForm() {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubjects>({});

  const handleShowSubjects = () => {
    if (selectedClassId) {
      setShowSubjects(true);
      // Reset selections when class changes
      setSelectedSubjects({});
    }
  };

  const categorizedSubjects = useMemo(() => {
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

  const handleSubjectSelection = (subjectId: string, checked: boolean) => {
    setSelectedSubjects(prev => ({
        ...prev,
        [subjectId]: checked,
    }));
  };

  const renderMultiSelectDropdown = (title: string, subjects: Subject[]) => {
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
          <DropdownMenuContent className="w-full">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {subjects.map((subject) => (
              <DropdownMenuCheckboxItem
                key={subject.id}
                checked={!!selectedSubjects[subject.id]}
                onCheckedChange={(checked) => handleSubjectSelection(subject.id, !!checked)}
              >
                {subject.name} ({subject.code})
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label>Class</Label>
          <Select onValueChange={setSelectedClassId}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {sortedClasses.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full md:col-span-1 flex justify-start">
          <Button onClick={handleShowSubjects}>Load Subjects</Button>
        </div>
      </div>

      {showSubjects && (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderMultiSelectDropdown('Mandatory Subjects', categorizedSubjects.Mandatory)}
                {renderMultiSelectDropdown('Language Subjects', categorizedSubjects.Language)}
                {renderMultiSelectDropdown('Vocational Subjects', categorizedSubjects.Vocational)}
            </div>
          
          <div className="flex justify-end pt-4">
            <Button>Save Subject Configuration</Button>
          </div>
        </div>
      )}
    </div>
  );
}
