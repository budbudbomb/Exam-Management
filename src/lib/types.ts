export interface Student {
    id: string;
    name: string;
    fatherName?: string;
    motherName?: string;
    dob?: string;
    category?: 'SC' | 'ST' | 'OBC' | 'General';
    gender?: 'Male' | 'Female' | 'Other';
    samagraId?: string;
    enrollmentNumber?: string;
    rollNumber: string;
    class: string;
    section: string;
    medium: 'English' | 'Hindi' | 'Urdu' | 'Sanskrit';
    photoUrl?: string;
    stream?: 'PCB' | 'PCM' | 'Commerce' | 'Arts' | 'Vocational Courses';
    schoolUdideCode?: string;
    scholarNumber?: string;
    assignedSubjects?: { [key: string]: boolean };
  }
  
  export interface Subject {
    id: string;
    name: string;
    category: 'Core' | 'Language' | 'Vocational';
    subCategory?: 'Standard' | 'Basic';
    code: string;
    minMarks: number;
    maxMarks: number;
    passingMarks: number;
    hasPractical: boolean;
    practicalMinMarks?: number;
    practicalMaxMarks?: number;
    practicalPassingMarks?: number;
    hasProject?: boolean;
    projectMinMarks?: number;
    projectMaxMarks?: number;
    projectPassingMarks?: number;
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

  export interface Remark {
    abbreviation: string;
    description: string;
  }

  export interface ExamSchedule {
    id: string;
    classId: string;
    examType: string;
    details: {
      subjectId: string;
      date: string;
      startTime: string;
      endTime: string;
    }[];
  }
