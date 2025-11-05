
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Subject } from '@/lib/types';
import React, { useState, useMemo } from 'react';
import { ChevronDown, PlusCircle, Trash2 } from 'lucide-react';

type SelectedSubjects = {
  [key: string]: boolean;
};

type Config = {
    id: number;
    selectedClassId: string;
    selectedSubjects: SelectedSubjects;
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
              >
                {subject.name} ({subject.code})
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
};

const ConfigCard = ({ config, onConfigChange, onRemove, classList }: { config: Config, onConfigChange: (newConfig: Config) => void, onRemove: () => void, classList: any[] }) => {
    
    const categorizedSubjects = useMemo(() => {
        return {
          Mandatory: mockSubjects.filter((s) => s.category === 'Core'),
          Language: mockSubjects.filter((s) => s.category === 'Language'),
          Vocational: mockSubjects.filter((s) => s.category === 'Vocational'),
        };
      }, []);

    const handleClassChange = (classId: string) => {
        onConfigChange({ ...config, selectedClassId: classId, selectedSubjects: {} });
    }

    const handleSubjectSelection = (subjectId: string, checked: boolean) => {
        const newSelectedSubjects = {
            ...config.selectedSubjects,
            [subjectId]: checked
        };
        onConfigChange({ ...config, selectedSubjects: newSelectedSubjects });
    };

    const selectedClassName = classList.find(c => c.id === config.selectedClassId)?.name || 'New Configuration';

    return (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1" className="border-none">
                <Card>
                    <AccordionTrigger className="w-full p-0 hover:no-underline">
                        <div className="flex items-center justify-between p-4 w-full cursor-pointer">
                            <div className="flex-1 text-lg font-semibold text-left">
                               {selectedClassName}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Class</Label>
                                    <Select value={config.selectedClassId} onValueChange={handleClassChange}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {classList.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id}>
                                            {cls.name}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <MultiSelectDropdown 
                                    title="Mandatory Subjects"
                                    subjects={categorizedSubjects.Mandatory}
                                    selectedSubjects={config.selectedSubjects}
                                    onSubjectSelection={handleSubjectSelection}
                                />
                                <MultiSelectDropdown 
                                    title="Language Subjects"
                                    subjects={categorizedSubjects.Language}
                                    selectedSubjects={config.selectedSubjects}
                                    onSubjectSelection={handleSubjectSelection}
                                />
                                <MultiSelectDropdown 
                                    title="Vocational Subjects"
                                    subjects={categorizedSubjects.Vocational}
                                    selectedSubjects={config.selectedSubjects}
                                    onSubjectSelection={handleSubjectSelection}
                                />
                            </div>
                        </CardContent>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    )
}

export default function SubjectMasterForm() {
  const [configs, setConfigs] = useState<Config[]>([{ id: Date.now(), selectedClassId: '', selectedSubjects: {} }]);

  const handleAddConfig = () => {
    setConfigs(prev => [...prev, { id: Date.now(), selectedClassId: '', selectedSubjects: {} }]);
  }

  const handleUpdateConfig = (id: number, newConfig: Config) => {
    setConfigs(prev => prev.map(c => c.id === id ? newConfig : c));
  }

  const handleRemoveConfig = (id: number) => {
    setConfigs(prev => prev.filter(c => c.id !== id));
  }
  
  const sortedClasses = [...mockClasses].sort((a, b) => {
    const aNum = parseInt(a.name.split(' ')[1]);
    const bNum = parseInt(b.name.split(' ')[1]);
    return aNum - bNum;
  });


  return (
    <div className="space-y-4">
        <div className="space-y-4">
            {configs.map(config => (
                <ConfigCard
                    key={config.id}
                    config={config}
                    onConfigChange={(newConfig) => handleUpdateConfig(config.id, newConfig)}
                    onRemove={() => handleRemoveConfig(config.id)}
                    classList={sortedClasses}
                />
            ))}
        </div>
      
        <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handleAddConfig}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add another class
            </Button>
            <Button>Save All Configurations</Button>
        </div>
    </div>
  );
}
