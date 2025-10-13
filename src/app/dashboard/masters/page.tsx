import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import SubjectsForm from './_components/subjects-form';
import ExamsForm from './_components/exams-form';
import ClassesForm from './_components/classes-form';
import StudentsTable from './_components/students-table';


export default function MastersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Masters Configuration</h1>
        <p className="text-muted-foreground">
          Configure the core entities of the school management system.
        </p>
      </div>
      <Tabs defaultValue="subjects" className="space-y-4">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm -mx-6 px-6 py-2 border-b">
          <TabsList>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="subjects" className="space-y-4 mt-0">
          <SubjectsForm />
        </TabsContent>
        <TabsContent value="exams" className="space-y-4 mt-0">
          <ExamsForm />
        </TabsContent>
        <TabsContent value="classes" className="space-y-4 mt-0">
          <ClassesForm />
        </TabsContent>
        <TabsContent value="students" className="space-y-4 mt-0">
          <StudentsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
