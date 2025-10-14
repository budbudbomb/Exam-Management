import type { Student, Subject, Class, Exam, Grade } from './types';

export const mockStudents: Student[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: '10A-01', class: '10', section: 'A', medium: 'English', fatherName: 'Suresh Sharma', motherName: 'Sunita Sharma', dob: '15-04-2008', category: 'General', samagraId: '123456789', enrollmentNumber: 'ENR-2024-12345', photoUrl: 'https://i.pravatar.cc/96?u=1' },
  { id: '2', name: 'Vivaan Singh', rollNumber: '10A-02', class: '10', section: 'A', medium: 'English', fatherName: 'Rajesh Singh', motherName: 'Priya Singh', dob: '22-08-2008', category: 'General', samagraId: '234567890', enrollmentNumber: 'ENR-2024-12346', photoUrl: 'https://i.pravatar.cc/96?u=2' },
  { id: '3', name: 'Aditya Kumar', rollNumber: '10A-03', class: '10', section: 'A', medium: 'English', fatherName: 'Manoj Kumar', motherName: 'Rina Kumar', dob: '05-11-2008', category: 'OBC', samagraId: '345678901', enrollmentNumber: 'ENR-2024-12347', photoUrl: 'https://i.pravatar.cc/96?u=3' },
  { id: '4', name: 'Diya Gupta', rollNumber: '10B-01', class: '10', section: 'B', medium: 'Hindi', fatherName: 'Sanjay Gupta', motherName: 'Anita Gupta', dob: '12-01-2009', category: 'General', samagraId: '456789012', enrollmentNumber: 'ENR-2024-12348', photoUrl: 'https://i.pravatar.cc/96?u=4' },
  { id: '5', name: 'Ishaan Patel', rollNumber: '10B-02', class: '10', section: 'B', medium: 'Hindi', fatherName: 'Jignesh Patel', motherName: 'Heena Patel', dob: '30-07-2008', category: 'OBC', samagraId: '567890123', enrollmentNumber: 'ENR-2024-12349', photoUrl: 'https://i.pravatar.cc/96?u=5' },
  { id: '6', name: 'Aanya Reddy', rollNumber: '9A-01', class: '9', section: 'A', medium: 'English', fatherName: 'Prakash Reddy', motherName: 'Lakshmi Reddy', dob: '18-09-2009', category: 'General', samagraId: '678901234', enrollmentNumber: 'ENR-2024-12350', photoUrl: 'https://i.pravatar.cc/96?u=6' },
  { id: '7', name: 'Vihaan Verma', rollNumber: '9A-02', class: '9', section: 'A', medium: 'English', fatherName: 'Anil Verma', motherName: 'Suman Verma', dob: '03-03-2009', category: 'SC', samagraId: '789012345', enrollmentNumber: 'ENR-2024-12351', photoUrl: 'https://i.pravatar.cc/96?u=7' },
  { id: '8', name: 'Saanvi Iyer', rollNumber: '11A-01', class: '11', section: 'A', medium: 'English', fatherName: 'Krishna Iyer', motherName: 'Padma Iyer', dob: '14-02-2007', category: 'General', samagraId: '890123456', enrollmentNumber: 'ENR-2024-12352', photoUrl: 'https://i.pravatar.cc/96?u=8' },
  { id: '9', name: 'Arjun Nair', rollNumber: '11A-02', class: '11', section: 'A', medium: 'English', fatherName: 'Gopalakrishnan Nair', motherName: 'Shanti Nair', dob: '25-06-2007', category: 'General', samagraId: '901234567', enrollmentNumber: 'ENR-2024-12353', photoUrl: 'https://i.pravatar.cc/96?u=9' },
  { id: '10', name: 'Kavya Mishra', rollNumber: '12B-01', class: '12', section: 'B', medium: 'Hindi', fatherName: 'Rakesh Mishra', motherName: 'Poonam Mishra', dob: '19-05-2006', category: 'General', samagraId: '012345678', enrollmentNumber: 'ENR-2024-12354', photoUrl: 'https://i.pravatar.cc/96?u=10' },
];

export const mockSubjects: Subject[] = [
  { id: 'S1', name: 'Mathematics', category: 'Core', subCategory: 'Standard', code: 'M-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S2', name: 'Science', category: 'Core', code: 'S-101', minMarks: 33, maxMarks: 75, hasPractical: true, practicalMinMarks: 10, practicalMaxMarks: 25 },
  { id: 'S3', name: 'English', category: 'Language', code: 'E-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S4', name: 'Social Science', category: 'Core', code: 'SS-101', minMarks: 33, maxMarks: 100, hasPractical: false },
  { id: 'S5', name: 'Computer Science', category: 'Vocational', code: 'CS-101', minMarks: 20, maxMarks: 50, hasPractical: true, practicalMinMarks: 20, practicalMaxMarks: 50 },
];

export const mockClasses: Class[] = [
  { id: 'C1', name: 'Class 10', sections: ['A', 'B'], subjects: mockSubjects.slice(0, 5) },
  { id: 'C2', name: 'Class 9', sections: ['A'], subjects: mockSubjects.slice(0, 4) },
  { id: 'C3', name: 'Class 11', sections: ['A'], subjects: mockSubjects.slice(0, 5) },
  { id: 'C4', name: 'Class 12', sections: ['B'], subjects: mockSubjects.slice(0, 5) },
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
