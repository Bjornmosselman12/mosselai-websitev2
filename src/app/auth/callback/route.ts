import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const isProduction = process.env.NODE_ENV === "production";
const ROOT_DOMAIN = "mosselai.com";
const cookieDomain = isProduction ? `.${ROOT_DOMAIN}` : undefined;

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/inloggen?error=missing_code`);
  }

  const response = NextResponse.redirect(`${origin}/inloggen?error=auth_failed`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...options,
              ...(cookieDomain ? { domain: cookieDomain } : {}),
            })
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession error:", error.message);
    return response;
  }

  // Gebruiker ophalen en uitzoeken welk subdomein zij horen
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return response;
  }

  // Klant subdomain opzoeken via service role (want RLS blokkeert dit nog voor de client)
  const { createClient: createAdmin } = await import("@supabase/supabase-js");
  const admin = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: clientUser } = await admin
    .from("client_users")
    .select("clients(subdomain)")
    .eq("user_id", user.id)
    .single();

  const subdomain = (clientUser?.clients as { subdomain?: string } | null)?.subdomain;

  // Redirect naar het subdomein van de klant
  let destination: string;
  if (isProduction && subdomain) {
    destination = `https://${subdomain}.${ROOT_DOMAIN}`;
  } else if (subdomain) {
    // Lokale dev: naar /portal/[slug]
    destination = `${origin}/portal/${subdomain}`;
  } else {
    // Fallback: geen gekoppelde klant gevonden
    destination = `${origin}/inloggen?error=no_client`;
  }

  const successResponse = NextResponse.redirect(destination);

  // Cookies kopiëren naar de success response
  response.cookies.getAll().forEach((cookie) => {
    successResponse.cookies.set(cookie.name, cookie.value, {
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });
  });

  return successResponse;
}
