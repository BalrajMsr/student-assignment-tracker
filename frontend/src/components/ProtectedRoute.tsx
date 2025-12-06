"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 * Redirects to dashboard if authenticated and on public route
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated && !isPublicRoute) {
                // Not authenticated and trying to access protected route -> redirect to login
                router.push('/login');
            } else if (isAuthenticated && isPublicRoute) {
                // Authenticated and on public route -> redirect to dashboard
                router.push('/dashboard');
            }
        }
    }, [isAuthenticated, isLoading, isPublicRoute, router, pathname]);

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Don't render protected content if not authenticated
    if (!isAuthenticated && !isPublicRoute) {
        return null;
    }

    // Don't render public routes if already authenticated (will redirect)
    if (isAuthenticated && isPublicRoute) {
        return null;
    }

    return <>{children}</>;
}
