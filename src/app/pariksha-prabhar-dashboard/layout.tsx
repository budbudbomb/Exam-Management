import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import ParikshaPrabharHeader from './_components/header';
import ParikshaPrabharNavigation from './_components/navigation';

export default function ParikshaPrabharDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <ParikshaPrabharNavigation />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <ParikshaPrabharHeader />
          <main className="flex-1 p-4 sm:p-6 bg-background">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
