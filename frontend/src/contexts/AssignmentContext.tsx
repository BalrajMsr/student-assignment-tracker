"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import * as assignmentService from '@/services/assignment.service';
import type { Assignment } from '@/types';


interface AssignmentContextType {
    assignments: Assignment[];
    isLoading: boolean;
    error: string | null;
    fetchAssignments: () => Promise<void>;
    createAssignment: (data: Partial<Assignment>) => Promise<void>;
    updateAssignment: (id: string, data: Partial<Assignment>) => Promise<void>;
    deleteAssignment: (id: string) => Promise<void>;
    getAssignmentById: (id: string) => Assignment | undefined;
}

// Create Context
const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

// Provider Component
export function AssignmentProvider({ children }: { children: ReactNode }) {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();

    // Fetch assignments when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchAssignments();
        }
    }, [isAuthenticated]);

    // Fetch all assignments
    const fetchAssignments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await assignmentService.getAssignments();
            setAssignments(response);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error?.message || 'Failed to fetch assignments';
            setError(errorMessage);
            console.error('Fetch assignments error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create new assignment
    const createAssignment = async (data: Partial<Assignment>) => {
        try {
            const newAssignment = await assignmentService.createAssignment(data as any);

            // Add to state
            setAssignments(prev => [newAssignment, ...prev]);

            toast({
                title: 'Success',
                description: 'Assignment created successfully',
            });
        } catch (err: any) {
            const errorMessage = err.response?.data?.error?.message || 'Failed to create assignment';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
            throw new Error(errorMessage);
        }
    };

    // Update assignment
    const updateAssignment = async (id: string, data: Partial<Assignment>) => {
        try {
            const updatedAssignment = await assignmentService.updateAssignment(id, data as any);

            // Update in state
            setAssignments(prev =>
                prev.map(assignment =>
                    assignment._id === id ? updatedAssignment : assignment
                )
            );

            toast({
                title: 'Success',
                description: 'Assignment updated successfully',
            });
        } catch (err: any) {
            const errorMessage = err.response?.data?.error?.message || 'Failed to update assignment';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
            throw new Error(errorMessage);
        }
    };

    // Delete assignment
    const deleteAssignment = async (id: string) => {
        try {
            await assignmentService.deleteAssignment(id);

            // Remove from state
            setAssignments(prev => prev.filter(assignment => assignment._id !== id));

            toast({
                title: 'Success',
                description: 'Assignment deleted successfully',
            });
        } catch (err: any) {
            const errorMessage = err.response?.data?.error?.message || 'Failed to delete assignment';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
            throw new Error(errorMessage);
        }
    };

    // Get assignment by ID
    const getAssignmentById = (id: string): Assignment | undefined => {
        return assignments.find(assignment => assignment._id === id);
    };

    const value: AssignmentContextType = {
        assignments,
        isLoading,
        error,
        fetchAssignments,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        getAssignmentById,
    };

    return (
        <AssignmentContext.Provider value={value}>
            {children}
        </AssignmentContext.Provider>
    );
}

// Custom hook to use assignment context
export function useAssignments() {
    const context = useContext(AssignmentContext);
    if (context === undefined) {
        throw new Error('useAssignments must be used within an AssignmentProvider');
    }
    return context;
}
