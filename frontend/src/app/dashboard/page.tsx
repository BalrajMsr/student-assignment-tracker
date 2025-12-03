"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { isLoggedIn } from "@/lib/auth";
import { useAssignments } from "@/hooks/use-assignments";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, BookOpen } from "lucide-react";
import Link from "next/link";

// Dynamic imports for code splitting - only load when needed
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

const AssignmentCard = dynamic(
  () => import("@/components/assignment-card").then((mod) => ({ default: mod.AssignmentCard })),
  {
    loading: () => (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    ),
  }
);

const LoadingSpinner = dynamic(
  () => import("@/components/loading").then((mod) => ({ default: mod.Loading })),
  { ssr: false }
);

/**
 * Dashboard page component
 * 
 * Displays all assignments in a responsive grid layout with filtering and sorting capabilities.
 * Uses custom hooks for data management and memoized components for optimal performance.
 * 
 * @returns JSX.Element - The dashboard page
 */
export default function Dashboard() {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { assignments, isLoading, deleteAssignment } = useAssignments();

  // Redirect if not authenticated
  if (typeof window !== "undefined" && !isLoggedIn()) {
    router.push("/login");
    return null;
  }

  /**
   * Handles assignment deletion with optimistic UI updates
   * 
   * @param id - The ID of the assignment to delete
   */
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAssignment(id);
    } finally {
      setDeletingId(null);
    }
  };

  // Memoize empty state to prevent unnecessary re-renders
  const emptyState = useMemo(
    () => (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No assignments yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            Get started by creating your first assignment
          </p>
          <Button asChild>
            <Link href="/assignments/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Link>
          </Button>
        </CardContent>
      </Card>
    ),
    []
  );

  // Memoize assignments grid to prevent unnecessary re-renders
  const assignmentsGrid = useMemo(
    () => (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            isDeleting={deletingId === assignment._id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    ),
    [assignments, deletingId]
  );

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" text="Loading assignments..." />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between sm:flex-row sm:gap-4 gap-2 flex-col sm:items-start items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your assignments and track your progress
            </p>
          </div>
          <Button asChild>
            <Link href="/assignments/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Assignment
            </Link>
          </Button>
        </div>

        {assignments.length === 0 ? emptyState : assignmentsGrid}
      </div>
    </>
  );
}
