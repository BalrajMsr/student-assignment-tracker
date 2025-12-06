import { API } from "./api";
import { Assignment } from "@/types";
import { type AssignmentFormData } from "@/lib/validations";

// Simple in-memory cache for assignments
const cache = new Map<string, { data: Assignment[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Gets all assignments with caching
 * 
 * @returns Promise<Assignment[]> - Array of assignments
 */
export const getAssignments = async (): Promise<Assignment[]> => {
  const cacheKey = "all-assignments";
  const cached = cache.get(cacheKey);

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const res = await API.get("api/v1/assignments");
  const data = res.data?.data;

  // Update cache
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
};

/**
 * Gets a single assignment by ID
 * 
 * @param id - Assignment ID
 * @returns Promise<Assignment> - Assignment object
 */
export const getAssignment = async (id: string): Promise<Assignment> => {
  const res = await API.get(`api/v1/assignments/${id}`);
  return res.data?.data;
};

/**
 * Creates a new assignment
 * 
 * @param data - Assignment form data
 * @returns Promise<Assignment> - Created assignment
 */
export const createAssignment = async (
  data: AssignmentFormData
): Promise<Assignment> => {
  const res = await API.post("api/v1/assignments", data);

  // Invalidate cache
  cache.delete("all-assignments");

  return res.data?.data;
};

/**
 * Updates an existing assignment
 * 
 * @param id - Assignment ID
 * @param data - Updated assignment form data
 * @returns Promise<Assignment> - Updated assignment
 */
export const updateAssignment = async (
  id: string,
  data: AssignmentFormData
): Promise<Assignment> => {
  const res = await API.put(`api/v1/assignments/${id}`, data);

  // Invalidate cache
  cache.delete("all-assignments");

  return res.data?.data;
};

/**
 * Deletes an assignment
 * 
 * @param id - Assignment ID
 * @returns Promise<void>
 */
export const deleteAssignment = async (id: string): Promise<void> => {
  await API.delete(`api/v1/assignments/${id}`);

  // Invalidate cache
  cache.delete("all-assignments");
};

/**
 * Clears the assignments cache
 * Useful for manual cache invalidation
 */
export const clearAssignmentsCache = (): void => {
  cache.clear();
};
