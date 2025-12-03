"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthContainerProps {
  children: ReactNode;
  type: "login" | "register";
  welcomeTitle: string;
  welcomeSubtitle: string;
  switchButtonText: string;
  switchLink: string;
}

/**
 * Animated split-screen authentication container
 * Provides a modern, animated UI for login and register pages
 */
export function AuthContainer({
  children,
  type,
  welcomeTitle,
  welcomeSubtitle,
  switchButtonText,
  switchLink,
}: AuthContainerProps) {
  const isLogin = type === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 py-8">
      <div className="w-full max-w-5xl">        
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            {/* Form Panel */}
            <div
              className={cn(
                "flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out",
                isLogin ? "order-1" : "order-2"
              )}
            >
              {children}
            </div>

            {/* Welcome Panel */}
            <div
              className={cn(
                "flex-1 bg-gradient-to-br from-[#090979] to-[#00D4FF] p-6 md:p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden transition-all duration-700 ease-in-out min-h-[300px] md:min-h-auto",
                isLogin ? "order-2" : "order-1"
              )}
            >
              {/* Animated background shapes */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
              </div>

              <div className="relative z-10 text-center space-y-4 md:space-y-6 animate-in fade-in slide-in-from-right duration-700">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {welcomeTitle}
                </h2>
                <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-md px-4">
                  {welcomeSubtitle}
                </p>
                <Link href={switchLink} className="mt-4 md:mt-8">
                  <Button
                    variant="outline"
                    className="bg-white text-[#090979] hover:bg-gray-100 border-0 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {switchButtonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

