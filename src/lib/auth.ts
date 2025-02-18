import { supabase } from "@/lib/supabaseClient";

// ✅ Get Current Session
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

// ✅ Sign Up Function (Handles Email Confirmation & Metadata)
export async function signUp(name: string, email: string, password: string) {
  if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Password must be at least 8 characters, include a number, and an uppercase letter.");
  }

  try {
    // Sign up user without metadata first
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    // If user is created, update metadata separately
    if (data?.user) {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { name },
      });

      if (metadataError) {
        console.error("Metadata update error:", metadataError);
        throw metadataError;
      }
    }

    return data.user;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
}

// ✅ Sign In Function (Ensures Fresh Login)
export async function signIn(email: string, password: string) {
  try {
    // Ensure no conflicting session exists before signing in
    await supabase.auth.signOut();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
}

// ✅ Request Password Reset (Updated Naming Convention)
export async function requestPasswordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Password reset request error:", error);
    throw error;
  }
}

// ✅ Update User Password After Reset
export async function updatePassword(newPassword: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Password update error:", error);
    throw error;
  }
}

// ✅ Get Current User Data
export async function getUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// ✅ Listen to Authentication State Changes
export function listenToAuthChanges(callback: (session: any) => void) {
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth event: ${event}`);
    callback(session);
  });

  return () => listener?.subscription?.unsubscribe();
}

// ✅ Refresh User Session (Ensures Persisted Authentication)
export async function refreshSession() {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error("Error refreshing session:", error);
    throw error;
  }
}

// ✅ Sign Out Function
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
}
