'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

   
    const contentType = res.headers.get('content-type');
   
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Réponse non JSON');
    }

    const data = await res.json();
    console.log(data);
    if (res.ok) {
        console.log('Redirection vers le profil')
      router.push('/profile');
    } else {
      setError(data.message || 'Erreur de connexion');
    }
  } catch (err) {
    setError('Erreur lors de la connexion. Veuillez réessayer.');
    console.error(err);
  }
};


  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
