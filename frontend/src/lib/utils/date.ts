/**
 * Utility functions for date operations
 * Memoized and optimized for performance
 */

/**
 * Formats a date string to a human-readable format
 * 
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates the number of days until a due date
 * 
 * @param dateString - ISO date string
 * @returns Number of days until due (negative if overdue)
 */
export function getDaysUntilDue(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  const diffTime = dueDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets a human-readable status text based on days until due
 * 
 * @param daysUntilDue - Number of days until due
 * @returns Status text string
 */
export function getDueDateStatusText(daysUntilDue: number): string {
  if (daysUntilDue < 0) return "Overdue";
  if (daysUntilDue === 0) return "Due today";
  if (daysUntilDue === 1) return "Due tomorrow";
  return `${daysUntilDue} days remaining`;
}

/**
 * Gets the appropriate CSS class for status color based on days until due
 * 
 * @param daysUntilDue - Number of days until due
 * @returns CSS class name for status color
 */
export function getStatusColorClass(daysUntilDue: number): string {
  if (daysUntilDue < 0) return "text-destructive";
  if (daysUntilDue <= 3) return "text-orange-500";
  return "text-muted-foreground";
}

