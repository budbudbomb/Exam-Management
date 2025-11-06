'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import {
  Gauge,
  GraduationCap,
  UserCheck,
  CalendarDays,
  ClipboardEdit,
  FileText,
  User,
  LogOut,
  CircleUser,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';

const navLinks = [
  {
    label: 'Main Menu',
    isHeading: true,
    items: [
      {
        href: '/dashboard',
        icon: <Gauge className="h-4 w-4" />,
        label: 'Dashboard',
      },
      {
        isAccordion: true,
        label: 'Exam Management',
        icon: <GraduationCap className="h-4 w-4" />,
        subLinks: [
          {
            href: '/dashboard/verify-enrolled-students',
            icon: <UserCheck className="h-4 w-4" />,
            label: 'Verify Enrolled Students',
          },
          {
            href: '/dashboard/student-details-update',
            icon: <User className="h-4 w-4" />,
            label: 'Update Students Details',
          },
          {
            href: '/dashboard/view-exam-schedule',
            icon: <CalendarDays className="h-4 w-4" />,
            label: 'View Exam Schedule',
          },
          {
            href: '/dashboard/marks-entry',
            icon: <ClipboardEdit className="h-4 w-4" />,
            label: 'Marks Entry',
          },
          {
            href: '/dashboard/reports',
            icon: <FileText className="h-4 w-4" />,
            label: 'Report Cards',
          },
        ],
      },
    ]
  }
];

export default function Navigation() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const renderNav = (items: any[]) => {
    return items.map((link) => {
      if (link.isHeading) {
        return (
          <div key={link.label} className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {link.label}
          </div>
        )
      }
      
      if (link.isAccordion && link.subLinks) {
        return (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            key={link.label}
            defaultValue={link.subLinks.some((sub: { href: string; }) => pathname.startsWith(sub.href)) ? link.label : undefined}
          >
            <AccordionItem value={link.label} className="border-b-0">
              <AccordionTrigger 
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
                  isCollapsed && "justify-center px-2 gap-0",
                  isCollapsed && "[&>svg]:hidden",
                  link.subLinks.some((sub: { href: string; }) => pathname.startsWith(sub.href)) && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                {link.icon}
                {!isCollapsed && <span>{link.label}</span>}
              </AccordionTrigger>
              <AccordionContent 
                className={cn(
                  "ml-4 border-l border-border pl-4",
                  isCollapsed && "ml-0 border-0 pl-0 mt-1"
                )}
              >
                <nav className="grid gap-1 py-1">
                  {link.subLinks.map((subLink: { href: string, icon: React.ReactNode, label: string }) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      className={cn(
                        'flex items-center gap-3 rounded-full px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        isCollapsed && "justify-center px-2 gap-0",
                        pathname.startsWith(subLink.href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                      )}
                    >
                      {subLink.icon}
                      {!isCollapsed && <span>{subLink.label}</span>}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      
      return (
        <Link
          key={link.href}
          href={link.href!}
          className={cn(
            'flex items-center gap-3 rounded-full px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            isCollapsed && "justify-center px-2 gap-0",
            pathname === link.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
        >
          {link.icon}
          {!isCollapsed && <span>{link.label}</span>}
        </Link>
      );
    });
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className={cn(
        "flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border",
        isCollapsed && "justify-center"
      )}>
         <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-8 text-primary" />
          {!isCollapsed && <span className="text-lg font-bold">EduReport Pro</span>}
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
          {navLinks.map((section) => (
             <div key={section.label} className="space-y-1">
              {section.isHeading && !isCollapsed && (
                <h2 className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </h2>
              )}
              {renderNav(section.items)}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-full",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <CircleUser className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                {!isCollapsed && <span>My Account</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-2 w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </div>
  );
}
