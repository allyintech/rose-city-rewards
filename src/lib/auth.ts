import { supabase } from "@/lib/supabaseClient";

// Get Current User Data
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

// Sign Up Function
export async function signUp(name: string, email: string, password: string, redirectUrl: string) {
  if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Password must be at least 8 characters, include a number, and an uppercase letter.");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) throw error;

    // Manually refresh session after sign-up
    await refreshSession();

    return data.user;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
}

// Sign In Function
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    // **Ensure the session is updated after sign-in**
    await refreshSession();

    return data.user;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
}

// Request Password Reset
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

// Update User Password After Reset
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

// Listen to Authentication State Changes
export function listenToAuthChanges(callback: (session: any) => void) {
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth event: ${event}`);
    callback(session);
  });

  return () => listener?.subscription?.unsubscribe();
}

// **Refresh User Session**
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

// Sign Out Function
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
}
