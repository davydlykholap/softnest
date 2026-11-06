import express from 'express';
import { ExpressAuth, getSession } from '@auth/express';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { createAuthConfig, isMember } from './auth.mjs';
import { signInPage, authScript } from './signin.mjs';

export const appRoot = path.resolve(import.meta.dirname, '..');

export function createServer({ env = process.env, development = false } = {}) {
  const app = express();
  const configured = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET && env.AUTH_SECRET?.length >= 32);
  if (!development && !configured) throw new Error('Configure AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET and a random AUTH_SECRET (32+ characters) before starting SF0.');
  const origin = new URL(env.SF0_ORIGIN || 'http://127.0.0.1:4173');
  if (!development && origin.protocol !== 'https:') throw new Error('Production SF0_ORIGIN must use HTTPS.');
  const config = createAuthConfig(env, env.AUTH_SECRET || randomBytes(48).toString('hex'));
  config.useSecureCookies = origin.protocol === 'https:';
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.set({ 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY' });
    if (req.headers.host !== origin.host) return res.status(400).send('Invalid request host.');
    // OAuth host/protocol come from configured origin, never caller-controlled proxy headers.
    delete req.headers['x-forwarded-host'];
    delete req.headers['x-forwarded-proto'];
    req.headers.host = origin.host;
    Object.defineProperty(req, 'protocol', { value: origin.protocol.slice(0, -1), configurable: true });
    next();
  });
  app.get('/robots.txt', (_req, res) => res.type('text/plain').send('User-agent: *\nDisallow: /\n'));
  app.get('/auth-ui.js', (_req, res) => res.type('application/javascript').send(authScript));
  app.get(['/signin', '/signout'], (req, res) => {
    res.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; script-src 'self'; connect-src 'self'; form-action 'self' https://accounts.google.com; base-uri 'none'; frame-ancestors 'none'");
    res.type('html').send(signInPage({ ready: configured, error: req.query.error, signout: req.path === '/signout' }));
  });
  app.use(/^\/auth\/(.*)/, (req, res, next) => configured
    ? ExpressAuth(config)(req, res, next)
    : res.status(503).json({ error: 'Google sign-in is not configured.' }));
  app.use(async (req, res, next) => {
    const session = configured ? await getSession(req, config) : null;
    if (!session?.user || !isMember(session.user.email)) {
      return req.path.startsWith('/api/') ? res.status(401).json({ error: 'Sign in required.' }) : res.redirect(302, '/signin');
    }
    res.locals.session = session;
    next();
  });
  app.get('/api/session', (_req, res) => res.json({ user: res.locals.session.user, expires: res.locals.session.expires }));
  return app;
}
