import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

/**
 * Custom hook to handle authentication redirects
 * 
 * @param redirectTo - The path to redirect to if not authenticated (default: "/login")
 * @param requireAuth - Whether authentication is required (default: true)
 */
export function useAuthRedirect(redirectTo = "/login", requireAuth = true) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const authenticated = isLoggedIn();

    if (requireAuth && !authenticated) {
      router.push(redirectTo);
    } else if (!requireAuth && authenticated) {
      router.push("/dashboard");
    }
  }, [router, redirectTo, requireAuth]);
}

