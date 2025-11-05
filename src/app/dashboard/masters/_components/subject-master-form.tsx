
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockClasses, mockSubjects } from '@/lib/data';
import { Subject } from '@/lib/types';
import React, { useState, useMemo } from 'react';

export default function SubjectMasterForm() {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);

  const handleShowSubjects = () => {
    if (selectedClassId) {
      setShowSubjects(true);
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

  const renderSubjectTable = (subjects: Subject[]) => (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16">Select</TableHead>
            <TableHead>Subject Name</TableHead>
            <TableHead className="w-48">Subject Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell className="text-center">
                <Checkbox id={`subject-check-${subject.id}`} />
              </TableCell>
              <TableCell>
                <Label htmlFor={`subject-check-${subject.id}`} className="font-normal cursor-pointer">
                  {subject.name}
                </Label>
              </TableCell>
              <TableCell>{subject.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

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
          <Accordion type="multiple" defaultValue={['mandatory', 'language']} className="w-full space-y-4">
            <AccordionItem value="mandatory" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                Mandatory Subjects
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {renderSubjectTable(categorizedSubjects.Mandatory)}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="language" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                Language Subjects
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {renderSubjectTable(categorizedSubjects.Language)}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vocational" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                Vocational Subjects
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {renderSubjectTable(categorizedSubjects.Vocational)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-end">
            <Button>Save Subject Configuration</Button>
          </div>
        </div>
      )}
    </div>
  );
}
