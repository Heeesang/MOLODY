import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export async function signInWithGoogle(): Promise<string> {
  const redirectTo = process.env.NEXT_PUBLIC_AUTH_REDIRECT || "http://localhost:3000/api/auth";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      scopes: "email profile openid",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw new Error(`OAuth initiation failed: ${error.message}`);
  }
  return data.url;
}

export async function subscribeUser(user: User): Promise<void> {
  if (!user) {
    throw new Error("User must be logged in to subscribe");
  }

  const { error } = await supabase
    .from("subscribers")
    .insert({ email: user.email, user_id: user.id });

  if (error) {
    throw new Error(`Subscription failed: ${error.message}`);
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
}