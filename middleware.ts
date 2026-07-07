import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login');

  // Si on est sur la page de login et déjà connecté, on redirige vers l'accueil
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return;
  }

  // Si on n'est pas connecté et qu'on essaie d'accéder à une route protégée
  if (!isLoggedIn) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return Response.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
  }
});

// Le matcher permet de s'assurer que le middleware ne s'exécute pas sur les fichiers statiques ou l'API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
