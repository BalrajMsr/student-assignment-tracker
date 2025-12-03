"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { registerUser } from "@/services/auth.service";
import { handleApiError } from "@/lib/error-handler";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContainer } from "@/components/auth-container";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      toast({
        title: "Success",
        description: "Account created successfully! Please login.",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      type="register"
      welcomeTitle="Welcome Back!"
      welcomeSubtitle="To keep connected with us please login with your personal info."
      switchButtonText="SIGN IN"
      switchLink="/login"
    >
      <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-left duration-700">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className="h-12 rounded-lg"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-sm text-destructive mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="h-12 rounded-lg"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="h-12 rounded-lg"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-sm text-destructive mt-1"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#090979] to-[#00D4FF] hover:from-[#090979] hover:to-[#00D4FF] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "SIGN UP"
            )}
          </Button>
        </form>
      </div>
    </AuthContainer>
  );
}
