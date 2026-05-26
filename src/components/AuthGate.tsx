"use client";

import { useState } from "react";
import { Eye, EyeOff, Wallet } from "lucide-react";
import {
  getFirebaseAuthErrorMessage,
  useAuth,
} from "./AuthProvider";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";

type AuthView = "login" | "register";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading, login, register, resetPassword } = useAuth();
  const [view, setView] = useState<AuthView>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchView = (newView: AuthView) => {
    setView(newView);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Fill in all fields to create an account.");
      return;
    }

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email.trim(), password);
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Enter your email first, then request a password reset.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSuccess("Password reset email has been sent.");
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-700 dark:border-t-blue-400" />
          Loading account
        </div>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-2xl">
        <CardHeader className="space-y-4 pb-8 pt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              FinanceDash
            </CardTitle>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {view === "login" ? "Welcome back" : "Create your account"}
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 bg-zinc-50 px-4 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-11 bg-zinc-50 px-4 pr-10 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-50"
                      onClick={handleResetPassword}
                      disabled={isSubmitting}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="text-sm font-medium text-red-500">{error}</p>
                )}
                {success && (
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {success}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-md bg-zinc-900 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jan Kowalski"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-11 bg-zinc-50 px-4 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                    autoComplete="name"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="register-email"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Email
                  </label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 bg-zinc-50 px-4 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="register-password"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-11 bg-zinc-50 px-4 pr-10 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-100"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      className="h-11 bg-zinc-50 px-4 pr-10 focus-visible:ring-zinc-900 dark:bg-zinc-950/50 dark:focus-visible:ring-zinc-300"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((visible) => !visible)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      title={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="text-sm font-medium text-red-500">{error}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-md bg-zinc-900 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            {view === "login" ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchView("register")}
                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
