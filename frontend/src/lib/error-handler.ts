import { AxiosError } from "axios";
import { ApiError } from "@/types";

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    if (apiError?.message) {
      return apiError.message;
    }
    if (apiError?.errors) {
      const errorMessages = Object.values(apiError.errors).flat();
      return errorMessages.join(", ");
    }
    if (error.response?.status === 401) {
      return "Unauthorized. Please login again.";
    }
    if (error.response?.status === 403) {
      return "You don't have permission to perform this action.";
    }
    if (error.response?.status === 404) {
      return "Resource not found.";
    }
    if (error.response?.status === 500) {
      return "Server error. Please try again later.";
    }
    return error.message || "An unexpected error occurred.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
}

