import { useState, useEffect, useCallback } from "react";
import { getAssignments, deleteAssignment } from "@/services/assignment.service";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { Assignment } from "@/types";

/**
 * Custom hook for managing assignments with caching and error handling
 * 
 * @returns Object containing assignments state, loading state, and CRUD operations
 */
export function useAssignments() {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches assignments from the API
   * Uses caching to avoid unnecessary API calls
   */
  const fetchAssignments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAssignments();
      setAssignments(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Deletes an assignment and refreshes the list
   * 
   * @param id - The ID of the assignment to delete
   */
  const removeAssignment = useCallback(
    async (id: string) => {
      try {
        await deleteAssignment(id);
        // Optimistically update the UI
        setAssignments((prev) => prev.filter((a) => a._id !== id));
        toast({
          title: "Success",
          description: "Assignment deleted successfully!",
        });
      } catch (err) {
        const errorMessage = handleApiError(err);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        // Refetch on error to ensure consistency
        await fetchAssignments();
      }
    },
    [toast, fetchAssignments]
  );

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    assignments,
    isLoading,
    error,
    refetch: fetchAssignments,
    deleteAssignment: removeAssignment,
  };
}

