import { supabase } from "./supabase";
import type { AuthError, User, Session } from "@supabase/supabase-js";

export type AuthProvider = "google" | "apple" | "github";

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignInWithEmailResponse {
  error: AuthError | null;
}

/**
 * Modern passwordless authentication using magic links
 * This is the primary auth method for ultra modern apps
 */
export async function signInWithMagicLink(
  email: string
): Promise<SignInWithEmailResponse> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Custom email template with modern design
        emailRedirectTo: `${window.location.origin}/api/google-auth/callback`,
        shouldCreateUser: true, // Allow new user registration
      },
    });

    return { error };
  } catch {
    return {
      error: {
        message: "An unexpected error occurred",
        name: "UnknownError",
      } as AuthError,
    };
  }
}

/**
 * Social sign-on with popular providers
 * Following modern UX patterns with provider priority
 */
export async function signInWithProvider(
  provider: AuthProvider
): Promise<SignInWithEmailResponse> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/google-auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        // Request additional scopes based on provider
        ...(provider === "google" && {
          scopes:
            "email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly",
        }),
        ...(provider === "github" && {
          scopes: "user:email read:user",
        }),
      },
    });

    return { error };
  } catch {
    return {
      error: {
        message: "An unexpected error occurred",
        name: "UnknownError",
      } as AuthError,
    };
  }
}

/**
 * Traditional email/password signup (fallback option)
 * Only shown if user explicitly requests it
 */
export async function signUpWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/google-auth/callback`,
      },
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  } catch {
    return {
      user: null,
      session: null,
      error: {
        message: "An unexpected error occurred",
        name: "UnknownError",
      } as AuthError,
    };
  }
}

/**
 * Traditional email/password sign in (fallback option)
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  } catch {
    return {
      user: null,
      session: null,
      error: {
        message: "An unexpected error occurred",
        name: "UnknownError",
      } as AuthError,
    };
  }
}

/**
 * Sign out user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch {
    return {
      error: {
        message: "An unexpected error occurred",
        name: "UnknownError",
      } as AuthError,
    };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}

/**
 * Check if email looks like a work email
 * Used for B2B user segmentation
 */
export function isWorkEmail(email: string): boolean {
  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "hey.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? !personalDomains.includes(domain) : false;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
