import Header from '@/components/layout/header';
import Navigation from '@/components/layout/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <Navigation />
      </Sidebar>
      <div className="flex-1 md:p-4">
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 sm:p-6 bg-background">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
