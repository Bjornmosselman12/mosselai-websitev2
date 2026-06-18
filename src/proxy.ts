import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROOT_DOMAIN = "mosselai.com";
const isProduction = process.env.NODE_ENV === "production";
const cookieDomain = isProduction ? `.${ROOT_DOMAIN}` : undefined;

export async function proxy(request: NextRequest) {
  const { pathname, hostname } = new URL(request.url);

  // ─── Admin bescherming (bestaande logica) ────────────────────────────────
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin-")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) {
    const auth = request.cookies.get("mossel_admin");
    if (auth?.value !== "1") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ─── Publieke routes — geen auth nodig ──────────────────────────────────
  const publicPaths = ["/inloggen", "/auth/", "/_next/", "/favicon", "/logo", "/icon"];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ─── Supabase sessie doorzetten (cookie refresh) ─────────────────────────
  let response = NextResponse.next({ request });

  // Alleen initialiseren als de anon key beschikbaar is
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey || anonKey === "VUL_IN_VIA_SUPABASE_DASHBOARD") {
    // Auth nog niet geconfigureerd — marketing site gewoon doorlaten
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ─── Subdomain detectie → rewrite naar /portal/[slug] ───────────────────
  let clientSlug: string | null = null;

  if (isProduction && hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const sub = hostname.slice(0, -(`.${ROOT_DOMAIN}`.length));
    if (sub && sub !== "www") {
      clientSlug = sub;
    }
  }

  if (clientSlug) {
    if (!user) {
      const loginUrl = isProduction
        ? `https://${ROOT_DOMAIN}/inloggen`
        : `${request.nextUrl.origin}/inloggen`;
      return NextResponse.redirect(loginUrl);
    }
    const url = request.nextUrl.clone();
    url.pathname = `/portal/${clientSlug}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url, { headers: response.headers });
  }

  // ─── Portal routes beschermen (lokale dev via /portal/[slug]) ────────────
  if (pathname.startsWith("/portal")) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/inloggen";
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
