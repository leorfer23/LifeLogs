import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This route needs to be dynamic for OAuth callbacks
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(
        `/auth/signup?error=${encodeURIComponent(errorDescription || error)}`,
        requestUrl.origin
      )
    );
  }

  // Handle OAuth success
  if (code) {
    try {
      const { data, error: sessionError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error("Session exchange error:", sessionError);
        return NextResponse.redirect(
          new URL(
            `/auth/signup?error=${encodeURIComponent(sessionError.message)}`,
            requestUrl.origin
          )
        );
      }

      if (data.session) {
        // Successful authentication - redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
      }
    } catch (err) {
      console.error("Unexpected callback error:", err);
      return NextResponse.redirect(
        new URL("/auth/signup?error=Authentication failed", requestUrl.origin)
      );
    }
  }

  // No code or error - redirect to signup
  return NextResponse.redirect(new URL("/auth/signup", requestUrl.origin));
}
