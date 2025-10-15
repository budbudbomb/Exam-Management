import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import SankoolHeader from './_components/header';
import SankoolNavigation from './_components/navigation';

export default function SankoolDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SankoolNavigation />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <SankoolHeader />
          <main className="flex-1 p-4 sm:p-6 bg-background">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
