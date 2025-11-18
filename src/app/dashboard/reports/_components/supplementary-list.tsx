

'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStudents, mockClasses } from '@/lib/data';
import { Student } from '@/lib/types';

// Mock data for supplementary students, linking to mockStudents
const supplementaryData: { [key: string]: any } = {
  '1': { 
    id: '1',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
      'S5': { theoryMin: 17, theoryMax: 50, theoryObtained: 15, practicalMin: 17, practicalMax: 50, practicalObtained: 20, subjectName: 'Computer Science' }
    }
  },
  '2': {
    id: '2',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
      'S2': { theoryMin: 25, theoryMax: 75, theoryObtained: 22, practicalMin: 8, practicalMax: 25, practicalObtained: 15, subjectName: 'Science' }
    }
  },
  '3': {
    id: '3',
    supplementarySubjects: 2,
    term: 'Half Yearly, Annual',
    subjects: {
      'S1': { theoryMin: 33, theoryMax: 100, theoryObtained: 30, practicalMin: null, practicalMax: null, practicalObtained: null, subjectName: 'Mathematics' },
      'S4': { theoryMin: 25, theoryMax: 75, theoryObtained: 20, practicalMin: 8, practicalMax: 25, practicalObtained: 9, subjectName: 'Social Science' }
    }
  },
  '4': {
    id: '4',
    supplementarySubjects: 1,
    term: 'Quarterly',
    subjects: {
      'S3': { theoryMin: 33, theoryMax: 100, theoryObtained: 31, practicalMin: null, practicalMax: null, practicalObtained: null, subjectName: 'English' }
    }
  },
  '5': { 
    id: '5',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
      'S2': { theoryMin: 25, theoryMax: 75, theoryObtained: 20, practicalMin: 8, practicalMax: 25, practicalObtained: 10, subjectName: 'Science' }
    }
  },
  '6': {
    id: '6',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
      'S1': { theoryMin: 33, theoryMax: 100, theoryObtained: 32, practicalMin: null, practicalMax: null, practicalObtained: null, subjectName: 'Mathematics' }
    }
  },
  '7': { 
    id: '7',
    supplementarySubjects: 2,
    term: 'Half Yearly, Annual',
    subjects: {
      'S1': { theoryMin: 33, theoryMax: 100, theoryObtained: 30, practicalMin: null, practicalMax: null, practicalObtained: null, subjectName: 'Mathematics' },
      'S4': { theoryMin: 25, theoryMax: 75, theoryObtained: 22, practicalMin: 8, practicalMax: 25, practicalObtained: 5, subjectName: 'Social Science' }
    }
  },
  '8': {
    id: '8',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
        'S5': { theoryMin: 17, theoryMax: 50, theoryObtained: 16, practicalMin: 17, practicalMax: 50, practicalObtained: 18, subjectName: 'Computer Science' }
    }
  },
  '9': {
    id: '9',
    supplementarySubjects: 1,
    term: 'Half Yearly',
    subjects: {
      'S2': { theoryMin: 25, theoryMax: 75, theoryObtained: 24, practicalMin: 8, practicalMax: 25, practicalObtained: 12, subjectName: 'Science' }
    }
  },
  '10': {
    id: '10',
    supplementarySubjects: 1,
    term: 'Annual',
    subjects: {
      'S4': { theoryMin: 25, theoryMax: 75, theoryObtained: 23, practicalMin: 8, practicalMax: 25, practicalObtained: 10, subjectName: 'Social Science' }
    }
  }
};


interface SupplementaryListProps {
  selectedClass: string;
}

export default function SupplementaryList({ selectedClass }: SupplementaryListProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSupplementaryDetails, setSelectedSupplementaryDetails] = useState<any>(null);


  const supplementaryStudents = useMemo(() => {
    const classInfo = mockClasses.find(c => c.id === selectedClass);
    if (!classInfo) return [];
    
    const className = classInfo.name.split(' ')[1];
    
    return getStudents()
      .filter(student => student.class === className && supplementaryData[student.id])
      .map(student => ({
        ...student,
        ...supplementaryData[student.id],
      }));
  }, [selectedClass]);

  const handleViewClick = (student: Student) => {
    setSelectedStudent(student);
    setSelectedSupplementaryDetails(supplementaryData[student.id]?.subjects);
    setModalOpen(true);
  };

  if (supplementaryStudents.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
            No supplementary students found for the selected class.
        </div>
      )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-orange-500 text-white hover:bg-orange-500/90">
              <TableHead className="w-[50px] text-white">S.no</TableHead>
              <TableHead className="text-white">Student Name</TableHead>
              <TableHead className="text-white">Roll No</TableHead>
              <TableHead className="text-white">Section</TableHead>
              <TableHead className="text-white">Term</TableHead>
              <TableHead className="text-white">No of subject supplementary in</TableHead>
              <TableHead className="text-right text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplementaryStudents.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.term}</TableCell>
                <TableCell>{student.supplementarySubjects}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" onClick={() => handleViewClick(student)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Supplementary Details for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Showing marks for subjects with supplementary exams.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-4">
            {selectedSupplementaryDetails && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead className="text-center">Theory Min</TableHead>
                    <TableHead className="text-center">Theory Max</TableHead>
                    <TableHead className="text-center">Theory Obtained</TableHead>
                    <TableHead className="text-center">Practical/Project Min</TableHead>
                    <TableHead className="text-center">Practical/Project Max</TableHead>
                    <TableHead className="text-center">Practical/Project Obtained</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(selectedSupplementaryDetails).map((details: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{details.subjectName}</TableCell>
                      <TableCell className="text-center">{details.theoryMin}</TableCell>
                      <TableCell className="text-center">{details.theoryMax}</TableCell>
                      <TableCell className="text-center text-red-500 font-bold">{details.theoryObtained}</TableCell>
                      <TableCell className="text-center">{details.practicalMin ?? 'N/A'}</TableCell>
                      <TableCell className="text-center">{details.practicalMax ?? 'N/A'}</TableCell>
                      <TableCell className="text-center text-red-500 font-bold">{details.practicalObtained ?? 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

    