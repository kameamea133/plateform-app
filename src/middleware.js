import { NextResponse } from 'next/server';

export function middleware(req) {
  // Récupérer les cookies
  const token = req.cookies.get('auth-token')?.value;

  // Si le token est absent, rediriger vers la page de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continuer si l'utilisateur est authentifié
  return NextResponse.next();
}

// Appliquer le middleware à toutes les routes sauf certaines (comme /login)
export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'],
};
