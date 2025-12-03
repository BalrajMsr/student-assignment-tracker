import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

/**
 * Server-side authentication check
 * Uses cookies for SSR-compatible auth verification
 */
async function checkAuth(): Promise<boolean> {
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
 * Root page with server-side rendering
 * Performs authentication check on the server and redirects accordingly
 */
export default async function Home() {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
