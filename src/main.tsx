import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ensureAuthSession } from '@/lib/supabase';

import App from './App.tsx';
import './index.css';

await ensureAuthSession().catch(error => {
  console.error('Erreur lors de la vérification de la session:', error);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
