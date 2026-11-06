import { lazy, Suspense, useEffect, useState } from 'react';

const Workspace = lazy(() => import('./App.jsx').then(({ App }) => ({ default: App })));

export function SessionBoundary() {
  const [status, setStatus] = useState('checking');
  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const response = await fetch('/api/session', { credentials: 'same-origin', cache: 'no-store' });
        if (!response.ok) throw new Error('Session unavailable');
        const session = await response.json();
        if (!session.user?.email) throw new Error('Sign in required');
        if (active) setStatus('signed-in');
      } catch {
        if (active) setStatus('locked');
      }
    };
    check();
    const refresh = setInterval(check, 60_000);
    window.addEventListener('focus', check);
    return () => { active = false; clearInterval(refresh); window.removeEventListener('focus', check); };
  }, []);
  if (status !== 'signed-in') return (
    <main className="session-screen">
      <span className="session-brand">sf0</span>
      <h1>{status === 'checking' ? 'Checking your session…' : 'Sign in to SF0'}</h1>
      {status === 'locked' ? <>
        <p>The workspace requires its sign-in server. Open the local SF0 server to continue.</p>
        <a className="button primary" href="/signin">Go to sign in</a>
      </> : null}
    </main>
  );
  return <Suspense fallback={<main className="session-screen">Opening your workspace…</main>}><Workspace /></Suspense>;
}
