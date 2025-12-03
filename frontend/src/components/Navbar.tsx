"use client";

import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
            aria-label="Assignment Tracker Home"
          >
            <BookOpen className="h-5 w-5" />
            Assignment Tracker
          </Link>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            aria-label="Logout"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
