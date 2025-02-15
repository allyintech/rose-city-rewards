import { supabase } from './supabaseClient';

/**
 * Sign in a user using email and password.
 * Returns user and session data or throws an error.
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return { user: data.user, session: data.session };
}

/**
 * Sign up a new user and store their name in Supabase metadata.
 * Returns user and session data or throws an error.
 */
export async function signUp(name: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // Store name in user metadata
    },
  });

  if (error) throw error;
  return { user: data.user, session: data.session };
}

/**
 * Sign out the currently authenticated user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get the current authenticated user.
 * Returns user data or null if no user is signed in.
 */
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  return data.user;
}

/**
 * Listen for authentication state changes.
 * Runs the callback function when the user logs in or out.
 */
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
