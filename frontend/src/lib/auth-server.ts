import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

/**
 * Server-side authentication utilities
 * For use in Server Components and Server Actions
 */

/**
 * Checks if user is authenticated on the server
 * 
 * @returns Promise<boolean> - True if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return false;
    }

    const decoded: any = jwtDecode(token);
    return decoded?.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

/**
 * Gets the current user from server-side cookies
 * 
 * @returns Promise<User | null> - User object or null if not authenticated
 */
export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    if (!userCookie) {
      return null;
    }

    return JSON.parse(userCookie);
  } catch {
    return null;
  }
}

