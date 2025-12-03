"use client";

import { memo } from "react";
import { Assignment } from "@/types";

interface PriorityBadgeProps {
  priority?: Assignment["priority"];
}

/**
 * Memoized priority badge component
 * Displays assignment priority with color-coded styling
 */
export const PriorityBadge = memo(function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  switch (priority) {
    case "High":
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
          High
        </span>
      );
    case "Medium":
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Medium
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          Low
        </span>
      );
  }
});

