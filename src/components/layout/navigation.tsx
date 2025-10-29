
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
import { Logo } from '../icons/logo';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuSubItem } from '../ui/sidebar';

const navLinks = [
  {
    label: 'Main Menu',
    isHeading: true,
    items: [
      {
        href: '/dashboard',
        icon: <Gauge className="h-4 w-4" />,
        label: 'Dashboard',
        tooltip: 'Dashboard',
      },
      {
        isAccordion: true,
        label: 'Exam Management',
        icon: <GraduationCap className="h-4 w-4" />,
        tooltip: 'Exam Management',
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

  const isLinkActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border">
         <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-8 text-primary" />
          {state === 'expanded' && <span className="text-lg font-bold">EduReport Pro</span>}
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="px-2 lg:px-4 py-4 gap-1 text-sm font-medium">
          {navLinks.map((section, sectionIndex) => (
            <SidebarGroup key={sectionIndex}>
              {section.isHeading && state === 'expanded' && (
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                {section.items.map((link, linkIndex) => {
                  if (link.isAccordion && link.subLinks) {
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        key={linkIndex}
                        defaultValue={link.subLinks.some(sub => isLinkActive(sub.href)) ? 'item-1' : undefined}
                      >
                        <AccordionItem value="item-1" className="border-b-0">
                          <SidebarMenuItem>
                            <AccordionTrigger asChild>
                                <SidebarMenuButton 
                                    className="w-full justify-between rounded-full"
                                    isActive={link.subLinks.some(sub => isLinkActive(sub.href))}
                                    tooltip={link.tooltip}
                                >
                                    <div className="flex flex-grow items-center gap-3">
                                        {link.icon}
                                        {state === 'expanded' && <span className="text-left">{link.label}</span>}
                                    </div>
                                    {state === 'expanded' && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
                                </SidebarMenuButton>
                            </AccordionTrigger>
                          </SidebarMenuItem>
                          <AccordionContent className="p-0">
                            <SidebarMenuSub>
                              {link.subLinks.map((subLink, subLinkIndex) => (
                                <SidebarMenuSubItem key={subLinkIndex}>
                                  <Link href={subLink.href} legacyBehavior>
                                    <SidebarMenuSubButton isActive={isLinkActive(subLink.href)}>
                                      {subLink.icon}
                                      {state === 'expanded' && <span>{subLink.label}</span>}
                                    </SidebarMenuSubButton>
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  
                  return (
                    <SidebarMenuItem key={linkIndex}>
                      <Link href={link.href!} passHref>
                        <SidebarMenuButton asChild isActive={isLinkActive(link.href!)} tooltip={link.tooltip} className="rounded-full">
                          <a>
                            {link.icon}
                            {state === 'expanded' && <span>{link.label}</span>}
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </div>
       <div className="mt-auto p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-full"
              >
                <CircleUser className="mr-2 h-5 w-5" />
                {state === 'expanded' && <span>My Account</span>}
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

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
)
