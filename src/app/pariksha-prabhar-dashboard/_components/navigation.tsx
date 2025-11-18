
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  ClipboardEdit,
  LogOut,
  CircleUser,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navLinks = [
  {
    label: 'Main Menu',
    isHeading: true,
    items: [
        {
            href: '/pariksha-prabhar-dashboard',
            icon: <ClipboardEdit className="h-4 w-4" />,
            label: 'Marks verification',
            tooltip: 'Marks verification',
        },
    ]
  }
];

export default function ParikshaPrabharNavigation() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-4 lg:px-6 border-b border-sidebar-border bg-accent">
         <Link href="/pariksha-prabhar-dashboard" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <Logo className="h-8 w-8 text-primary" />
          {state === 'expanded' && <span className="text-lg font-bold text-sidebar-foreground">MP Education Portal 3.0</span>}
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
          {navLinks.map((section, sectionIndex) => (
             <div key={sectionIndex} className="space-y-1">
                {section.isHeading && state === 'expanded' && (
                  <h2 className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.label}
                  </h2>
                )}
                {section.items.map(link => (
                    <SidebarMenuItem key={link.href}>
                        <Link href={link.href}>
                            <SidebarMenuButton isActive={pathname === link.href} tooltip={link.tooltip}>
                                {link.icon}
                                {state === 'expanded' && <span>{link.label}</span>}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </div>
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
