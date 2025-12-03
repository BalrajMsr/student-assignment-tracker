"use client";

import { memo } from "react";
import Link from "next/link";
import { Assignment } from "@/types";
import { formatDate, getDaysUntilDue, getDueDateStatusText, getStatusColorClass } from "@/lib/utils/date";
import { StatusBadge } from "@/components/status-badge";
import { PriorityBadge } from "@/components/priority-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, BookOpen, Edit, Trash2, Loader2 } from "lucide-react";

interface AssignmentCardProps {
  assignment: Assignment;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

/**
 * Memoized assignment card component
 * Prevents unnecessary re-renders when parent updates
 */
export const AssignmentCard = memo(function AssignmentCard({
  assignment,
  isDeleting,
  onDelete,
}: AssignmentCardProps) {
  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
  const statusText = getDueDateStatusText(daysUntilDue);
  const statusColorClass = getStatusColorClass(daysUntilDue);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{assignment.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          {assignment.subject}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(assignment.dueDate)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <StatusBadge status={assignment.status} />
          <PriorityBadge priority={assignment.priority} />
        </div>
        <p className={`text-sm font-medium mb-2 ${statusColorClass}`}>
          {statusText}
        </p>
        {assignment.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {assignment.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link href={`/assignments/${assignment._id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting}
              aria-label={`Delete assignment ${assignment.title}`}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                assignment "{assignment.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(assignment._id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
});

