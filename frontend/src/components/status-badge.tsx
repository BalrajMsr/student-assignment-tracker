"use client";

import { memo } from "react";
import { CheckCircle2, Clock, AlertCircle, AlertTriangle } from "lucide-react";
import { Assignment } from "@/types";

interface StatusBadgeProps {
  status?: Assignment["status"];
}

/**
 * Memoized status badge component
 * Displays assignment status with appropriate icon and styling
 */
export const StatusBadge = memo(function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </span>
      );
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Clock className="h-3 w-3" />
          In Progress
        </span>
      );
    case "Overdue":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
          <AlertTriangle className="h-3 w-3" />
          Overdue
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          <AlertCircle className="h-3 w-3" />
          Pending
        </span>
      );
  }
});

