
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockStudents, mockClasses, mockSubjects } from '@/lib/data';
import { ChevronDown, FilePlus2, Search, Upload, User as UserIcon, CheckCircle, Edit } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Student, Subject as SubjectType } from '@/lib/types';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type SelectedSubjects = {
    [key: string]: boolean;
};

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

const SelectedSubjectsDisplay = ({ title, subjects, selectedSubjects }: { title: string; subjects: SubjectType[]; selectedSubjects: SelectedSubjects }) => {
    const selectedSubjectItems = subjects
        .filter(s => selectedSubjects[s.id])
        .map(s => <div key={s.id}>{s.name}</div>);

    return (
        <div className="space-y-2">
            <Label>{title}</Label>
            <div className="p-2 border rounded-md bg-muted/50 min-h-[40px] text-sm space-y-1">
                {selectedSubjectItems.length > 0 ? selectedSubjectItems : <span className="text-muted-foreground">None selected</span>}
            </div>
        </div>
    );
};


export default function StudentsTable() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [showTable, setShowTable] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const categorizedSubjects = useMemo(() => {
        return {
          Mandatory: mockSubjects.filter((s) => s.category === 'Core'),
          Language: mockSubjects.filter((s) => s.category === 'Language'),
          Vocational: mockSubjects.filter((s) => s.category === 'Vocational'),
        };
    }, []);

    const handleSearch = () => {
        if (selectedClassId) {
            const selectedClass = mockClasses.find(c => c.id === selectedClassId);
            const className = selectedClass ? selectedClass.name.split(' ')[1] : '';
            setFilteredStudents(students.filter(student => student.class === className));
            setShowTable(true);
        } else {
            setFilteredStudents([]);
            setShowTable(false);
        }
    };
    
    const handleOpenUpdateModal = (student: Student) => {
        setSelectedStudent(student);
        setIsEditing(!student.isUpdated);
        setUpdateModalOpen(true);
    }
    
    const handleUpdateStudent = () => {
        if (!selectedStudent) return;

        const updatedStudent = { ...selectedStudent, isUpdated: true };

        const newStudents = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
        setStudents(newStudents);
        
        if (showTable && selectedClassId) {
            const selectedClass = mockClasses.find(c => c.id === selectedClassId);
            const className = selectedClass ? selectedClass.name.split(' ')[1] : '';
            setFilteredStudents(newStudents.filter(student => student.class === className));
        } else if (showTable) {
            setFilteredStudents(newStudents);
        }
        
        setUpdateModalOpen(false);
        setSelectedStudent(null);
    }

    const handleSubjectSelection = (subjectId: string, checked: boolean) => {
        setSelectedStudent(prev => {
            if (!prev) return null;
            const newSelectedSubjects = {
                ...(prev.assignedSubjects || {}),
                [subjectId]: checked
            };
            return { ...prev, assignedSubjects: newSelectedSubjects };
        });
    };

    const sortedClasses = [...mockClasses].sort((a, b) => {
        const aNum = parseInt(a.name.split(' ')[1]);
        const bNum = parseInt(b.name.split(' ')[1]);
        return aNum - bNum;
    });


    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
                    <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Select onValueChange={setSelectedYear} value={selectedYear}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2025-2026">2025-2026</SelectItem>
                                <SelectItem value="2024-2025">2024-2025</SelectItem>
                                <SelectItem value="2023-2024">2023-2024</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Filter by Class</Label>
                        <Select onValueChange={setSelectedClassId} value={selectedClassId}>
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
                     <Button onClick={handleSearch} disabled={!selectedClassId || !selectedYear}>
                        <Search className="mr-2 h-4 w-4" /> Search
                     </Button>
                </div>

                {showTable && (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
                                    <TableHead className="w-[50px] text-white">S.no</TableHead>
                                    <TableHead className="text-white">Student Name</TableHead>
                                    <TableHead className="text-white">Samagra ID</TableHead>
                                    <TableHead className="text-white">Father Name</TableHead>
                                    <TableHead className="text-white">Mother Name</TableHead>
                                    <TableHead className="text-white">Enrollment No</TableHead>
                                    <TableHead className="text-right text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.samagraId || 'N/A'}</TableCell>
                                        <TableCell>{student.fatherName || 'N/A'}</TableCell>
                                        <TableCell>{student.motherName || 'N/A'}</TableCell>
                                        <TableCell>{student.enrollmentNumber || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            {student.isUpdated ? (
                                                <Button
                                                    variant="outline"
                                                    className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
                                                    onClick={() => handleOpenUpdateModal(student)}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Updated
                                                </Button>
                                            ) : (
                                                <Button variant="outline" onClick={() => handleOpenUpdateModal(student)}>Update</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                
                {showTable && filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No students found for the selected class.
                    </div>
                )}

                <Dialog open={isUpdateModalOpen} onOpenChange={setUpdateModalOpen}>
                    <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Update Student Details</DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Update' : 'View'} details for {selectedStudent?.name}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[70vh] overflow-y-auto p-1 pr-4">
                            <div className="space-y-4 py-4">
                                <h3 className="text-lg font-medium">Profile Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="medium">Medium</Label>
                                        <Select 
                                            value={selectedStudent?.medium} 
                                            onValueChange={(value: 'English' | 'Hindi' | 'Urdu' | 'Sanskrit') => setSelectedStudent(prev => prev ? {...prev, medium: value} : null)}
                                            disabled={!isEditing}
                                        >
                                            <SelectTrigger id="medium">
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
                                    {selectedStudent?.class === '11' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="stream">Stream</Label>
                                            <Select 
                                                value={selectedStudent?.stream} 
                                                onValueChange={(value: 'PCB' | 'PCM' | 'Commerce' | 'Arts' | 'Vocational Courses') => setSelectedStudent(prev => prev ? {...prev, stream: value} : null)}
                                                disabled={!isEditing}
                                            >
                                                <SelectTrigger id="stream">
                                                    <SelectValue placeholder="Select a stream" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PCB">PCB</SelectItem>
                                                    <SelectItem value="PCM">PCM</SelectItem>
                                                    <SelectItem value="Commerce">Commerce</SelectItem>
                                                    <SelectItem value="Arts">Arts</SelectItem>
                                                    <SelectItem value="Vocational Courses">Vocational Courses</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="section">Section</Label>
                                        <Select 
                                            value={selectedStudent?.section}
                                            onValueChange={(value) => setSelectedStudent(prev => prev ? {...prev, section: value} : null)}
                                            disabled={!isEditing}
                                        >
                                            <SelectTrigger id="section">
                                                <SelectValue placeholder="Select a section" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="C">C</SelectItem>
                                            <SelectItem value="D">D</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rollNumber">Roll No.</Label>
                                        <Input 
                                            id="rollNumber" 
                                            value={selectedStudent?.rollNumber || ''} 
                                            onChange={(e) => setSelectedStudent(prev => prev ? {...prev, rollNumber: e.target.value} : null)} 
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="photo">Photo</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-md border border-dashed flex items-center justify-center bg-muted">
                                            <UserIcon className="w-12 h-12 text-muted-foreground" />
                                        </div>
                                        <Button variant="outline" disabled={!isEditing}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                                
                                <Separator className="my-6" />

                                <h3 className="text-lg font-medium">Assign Subjects</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {isEditing ? (
                                        <>
                                            <MultiSelectDropdown 
                                                title="Mandatory Subjects"
                                                subjects={categorizedSubjects.Mandatory}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                                onSubjectSelection={handleSubjectSelection}
                                                disabled={!isEditing}
                                            />
                                            <MultiSelectDropdown 
                                                title="Language Subjects"
                                                subjects={categorizedSubjects.Language}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                                onSubjectSelection={handleSubjectSelection}
                                                disabled={!isEditing}
                                            />
                                            <MultiSelectDropdown 
                                                title="Vocational Subjects"
                                                subjects={categorizedSubjects.Vocational}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                                onSubjectSelection={handleSubjectSelection}
                                                disabled={!isEditing}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <SelectedSubjectsDisplay
                                                title="Mandatory Subjects"
                                                subjects={categorizedSubjects.Mandatory}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                            />
                                             <SelectedSubjectsDisplay
                                                title="Language Subjects"
                                                subjects={categorizedSubjects.Language}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                            />
                                             <SelectedSubjectsDisplay
                                                title="Vocational Subjects"
                                                subjects={categorizedSubjects.Vocational}
                                                selectedSubjects={selectedStudent?.assignedSubjects || {}}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="pt-4 border-t">
                             {isEditing ? (
                                <Button type="submit" onClick={handleUpdateStudent}>Save Changes</Button>
                            ) : (
                                <Button type="button" onClick={() => setIsEditing(true)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>
    );
}

    

    