
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import DpiHeader from './_components/header';
import DpiNavigation from './_components/navigation';

export default function DpiDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DpiNavigation />
      </Sidebar>
      <div className="flex-1 md:p-4">
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <DpiHeader />
            <main className="flex-1 p-4 sm:p-6 bg-background">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
