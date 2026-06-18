"use server";

import { createClient } from "@/lib/supabase-server";

export async function sendMagicLink(email: string) {
  // Geeft altijd success terug: we lekken nooit of een account bestaat (security),
  // én het inlogscherm mag niet crashen als de database nog niet is gekoppeld.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Portal/database nog niet geconfigureerd — toon dezelfde bevestiging zonder call.
  if (!url || !anonKey || anonKey === "VUL_IN_VIA_SUPABASE_DASHBOARD") {
    return { success: true };
  }

  try {
    const supabase = await createClient();

    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://mosselai.com/auth/callback"
      : `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`;

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: false, // Alleen bestaande gebruikers kunnen inloggen
      },
    });
  } catch {
    // Stil afhandelen — geen details lekken, geen crash.
  }

  return { success: true };
}
