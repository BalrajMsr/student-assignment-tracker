"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignmentSchema, type AssignmentFormData } from "@/lib/validations";
import { createAssignment } from "@/services/assignment.service";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

// Dynamic import for code splitting
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

/**
 * Create Assignment page component
 * 
 * Allows users to create new assignments with validation and error handling.
 * 
 * @returns JSX.Element - The create assignment page
 */
export default function CreateAssignment() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Handle authentication redirect
  useAuthRedirect();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      status: undefined as AssignmentFormData["status"],
      priority: undefined as AssignmentFormData["priority"],
    },
  });

  /**
   * Handles form submission with validation and error handling
   * 
   * @param data - Validated assignment form data
   */
  const onSubmit = useCallback(
    async (data: AssignmentFormData) => {
      try {
        setIsLoading(true);
        await createAssignment(data);
        toast({
          title: "Success",
          description: "Assignment created successfully!",
        });
        router.push("/dashboard");
      } catch (error) {
        toast({
          title: "Error",
          description: handleApiError(error),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [router, toast]
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl p-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
            <CardDescription>
              Add a new assignment to track your work
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Math Homework Chapter 5"
                  {...register("title")}
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
                {errors.title && (
                  <p
                    id="title-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  {...register("subject")}
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  {...register("dueDate")}
                  aria-invalid={errors.dueDate ? "true" : "false"}
                  aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
                />
                {errors.dueDate && (
                  <p
                    id="dueDate-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.dueDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Add any additional details..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.priority && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Assignment"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
