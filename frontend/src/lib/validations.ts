import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export const assignmentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(2, "Subject must be at least 2 characters")
    .max(50, "Subject must be less than 50 characters")
    .trim(),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      {
        message: "Due date must be today or in the future",
      }
    ),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "Overdue"]).optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AssignmentFormData = z.infer<typeof assignmentSchema>;

