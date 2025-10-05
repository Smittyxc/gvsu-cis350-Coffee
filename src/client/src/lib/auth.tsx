import { supabase } from "./client";

export const signUpNewUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password: password,
  });
  // You can add more robust error handling here
  if (error) console.error("Error signing up:", error.message);
  return { data, error };
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password: password,
  });
  // You can add more robust error handling here
  if (error) console.error("Error signing in:", error.message);
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  } 
};