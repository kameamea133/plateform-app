import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  // Envoyer la requête au backend Express pour authentification
  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    const res = NextResponse.json({ message: 'Connexion réussie' });

    // Définir le cookie HTTP-only avec le JWT
    res.cookies.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/', // Assure-toi que le cookie est défini pour toutes les routes
      maxAge: 60 * 60 * 1000,  // 1 heure
    });

    return res;
  } else {
    return NextResponse.json({ message: 'Erreur de connexion', error: data.error }, { status: 401 });
  }
}
