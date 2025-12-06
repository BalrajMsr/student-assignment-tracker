"use client";

import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { AssignmentProvider } from './AssignmentContext';

/**
 * Combined provider component that wraps all context providers
 */
export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AssignmentProvider>
                {children}
            </AssignmentProvider>
        </AuthProvider>
    );
}
