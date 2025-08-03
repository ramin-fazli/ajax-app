import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const protectedMatcher = createRouteMatcher([
  // Dashboard routes
  '/:locale/dashboard(.*)',
  '/dashboard(.*)',
  '/:locale/dashboards(.*)',
  '/dashboards(.*)',
  '/:locale/agents(.*)',
  '/agents(.*)',
  '/:locale/search(.*)',
  '/search(.*)',
  '/:locale/history(.*)',
  '/history(.*)',
  '/:locale/share(.*)',
  '/share(.*)',
  '/:locale/user-profile(.*)',
  '/user-profile(.*)',
  '/:locale/organization-profile(.*)',
  '/organization-profile(.*)',
  // API protected routes
  '/:locale/api/protected(.*)',
  '/api/protected(.*)',
]);

function isProtectedRoute(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow access to sign-in, sign-up, landing page, and organization-selection
  if (
    path.includes('/sign-in')
    || path.includes('/sign-up')
    || path.includes('/organization-selection')
    || path.match(/^\/[a-z]{2}\/?$/) // Match /{locale}/ or /{locale}
    || path === '/' // Match root path
  ) {
    return false;
  }

  // Check if it's a protected route (auth routes)
  return protectedMatcher(req);
}

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Always run Clerk middleware for sign-in/sign-up pages and protected routes
  if (
    request.nextUrl.pathname.includes('/sign-in')
    || request.nextUrl.pathname.includes('/sign-up')
    || isProtectedRoute(request)
  ) {
    return clerkMiddleware((auth, req) => {
      const authObj = auth();

      if (isProtectedRoute(req)) {
        // Extract locale from path
        const locale = req.nextUrl.pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1] ?? AppConfig.defaultLocale;

        // Create sign-in URL with proper locale
        const signInUrl = new URL(`/${locale}/sign-in`, req.url);

        authObj.protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      // Redirect authenticated users without organization to organization selection
      if (
        authObj.userId
        && !authObj.orgId
        && req.nextUrl.pathname.includes('/')
        && !req.nextUrl.pathname.endsWith('/organization-selection')
      ) {
        const locale = req.nextUrl.pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1] ?? AppConfig.defaultLocale;
        const orgSelection = new URL(
          `/${locale}/onboarding/organization-selection`,
          req.url,
        );

        return NextResponse.redirect(orgSelection);
      }

      return intlMiddleware(req);
    })(request, event);
  }

  // For authenticated users visiting root path, redirect to dashboard
  return clerkMiddleware((auth, req) => {
    const authObj = auth();
    const path = req.nextUrl.pathname;

    if (
      authObj.userId
      && authObj.orgId
      && (path === '/' || path.match(/^\/[a-z]{2}\/?$/))
    ) {
      const locale = path.match(/^\/([a-z]{2})(\/|$)/)?.[1] ?? AppConfig.defaultLocale;
      const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    return intlMiddleware(req);
  })(request, event);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};
