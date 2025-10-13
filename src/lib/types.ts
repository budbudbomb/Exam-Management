export interface Student {
    id: string;
    name: string;
    fatherName?: string;
    motherName?: string;
    dob?: string;
    category?: 'SC' | 'ST' | 'OBC' | 'General';
    samagraId?: string;
    enrollmentNumber?: string;
    rollNumber: string;
    class: string;
    section: string;
    medium: 'English' | 'Hindi' | 'Urdu' | 'Sanskrit';
    photoUrl?: string;
  }
  
  export interface Subject {
    id: string;
    name: string;
    category: 'Core' | 'Language' | 'Vocational';
    subCategory?: 'Standard' | 'Basic';
    code: string;
    minMarks: number;
    maxMarks: number;
    hasPractical: boolean;
    practicalMinMarks?: number;
    practicalMaxMarks?: number;
  }
  
  export interface Exam {
    id: string;
    type: 'Quarterly' | 'Half Yearly' | 'Annual' | 'Practicals' | 'Supplementary';
    weightage: number;
  }
  
  export interface Class {
    id: string;
    name: string;
    sections: string[];
    subjects: Subject[];
  }
  
  export interface Grade {
      grade: string;
      rangeStart: number;
      rangeEnd: number;
  }
  
