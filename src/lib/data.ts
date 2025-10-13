import type { Student, Subject, Class, Exam, Grade } from './types';

export const mockStudents: Student[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: '10A-01', class: '10', section: 'A', medium: 'English', fatherName: 'Suresh Sharma', motherName: 'Sunita Sharma', dob: '15-04-2008', category: 'General', samagraId: '123456789', enrollmentNumber: 'ENR-2024-12345' },
  { id: '2', name: 'Vivaan Singh', rollNumber: '10A-02', class: '10', section: 'A', medium: 'English' },
  { id: '3', name: 'Aditya Kumar', rollNumber: '10A-03', class: '10', section: 'A', medium: 'English' },
  { id: '4', name: 'Diya Gupta', rollNumber: '10B-01', class: '10', section: 'B', medium: 'Hindi' },
  { id: '5', name: 'Ishaan Patel', rollNumber: '10B-02', class: '10', section: 'B', medium: 'Hindi' },
  { id: '6', name: 'Aanya Reddy', rollNumber: '9A-01', class: '9', section: 'A', medium: 'English' },
  { id: '7', name: 'Vihaan Verma', rollNumber: '9A-02', class: '9', section: 'A', medium: 'English' },
];

export const mockSubjects: Subject[] = [
  { id: 'S1', name: 'Mathematics', category: 'Core', subCategory: 'Standard', code: 'M-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S2', name: 'Science', category: 'Core', code: 'S-101', minMarks: 33, maxMarks: 100, hasPractical: true, practicalMinMarks: 10, practicalMaxMarks: 25 },
  { id: 'S3', name: 'English', category: 'Language', code: 'E-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S4', name: 'Social Science', category: 'Core', code: 'SS-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S5', name: 'Computer Science', category: 'Vocational', code: 'CS-101', minMarks: 40, maxMarks: 100, hasPractical: true, practicalMinMarks: 20, practicalMaxMarks: 50 },
];

export const mockClasses: Class[] = [
  { id: 'C1', name: 'Class 10', sections: ['A', 'B'], subjects: mockSubjects.slice(0, 4) },
  { id: 'C2', name: 'Class 9', sections: ['A'], subjects: mockSubjects.slice(1, 5) },
];

export const mockExams: Exam[] = [
  { id: 'E1', type: 'Quarterly', weightage: 20 },
  { id: 'E2', type: 'Half Yearly', weightage: 30 },
  { id: 'E3', type: 'Annual', weightage: 50 },
];

export const mockGrades: Grade[] = [
    { grade: 'A', rangeStart: 91, rangeEnd: 100 },
    { grade: 'B', rangeStart: 81, rangeEnd: 90 },
    { grade: 'C', rangeStart: 71, rangeEnd: 80 },
    { grade: 'D', rangeStart: 61, rangeEnd: 70 },
    { grade: 'E', rangeStart: 33, rangeEnd: 60 },
    { grade: 'F', rangeStart: 0, rangeEnd: 32 },
]
