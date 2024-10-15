'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('auth-token');
        setIsAuthenticated(!!token);
      }, []);

      const handleLogin = () => {
        router.push('/login');
      };

      const handleLogout = async () => {
        try {
          const res = await fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            credentials: 'include', 
          });
          
          if (res.ok) {
            
            Cookies.remove('auth-token');
            setIsAuthenticated(false);
            console.log('Déconnexion réussie');
           
            router.push('/login');
          } else {
            console.error('Erreur lors de la déconnexion');
          }
        } catch (err) {
          console.error('Erreur lors de la déconnexion', err);
        }
      };

     

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1>Mon Application</h1>
      <div>
        {!isAuthenticated ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar