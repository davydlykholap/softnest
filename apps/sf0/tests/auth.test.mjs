import assert from 'node:assert/strict';
import test from 'node:test';
import { once } from 'node:events';
import { createServer as createHttpServer, request as httpRequest } from 'node:http';
import { encode } from '@auth/core/jwt';
import { createServer } from '../server/app.mjs';
import { isMember, permittedGoogleProfile, createAuthConfig } from '../server/auth.mjs';

const secret = 'test-only-secret-not-for-deployment-'.repeat(2);
const origin = 'http://127.0.0.1:4173';
const env = { SF0_ORIGIN: origin, AUTH_GOOGLE_ID: 'test-client', AUTH_GOOGLE_SECRET: 'test-client-secret', AUTH_SECRET: secret };

test('only verified Google identities in the exact three-address allowlist can sign in', async () => {
  const config = createAuthConfig(env, secret);
  for (const email of ['davydlykholap@gmail.com', 'avlikholap@gmail.com', 'softnestfabriccare@gmail.com']) {
    assert.equal(await config.callbacks.signIn({ account: { provider: 'google' }, profile: { email, email_verified: true } }), true);
    assert.equal(isMember(email.toUpperCase()), true);
  }
  for (const email of ['someone@gmail.com', 'davydlykholap@gmail.com.attacker.test', '', null]) {
    assert.equal(permittedGoogleProfile({ provider: 'google' }, { email, email_verified: true }), false);
  }
  assert.equal(permittedGoogleProfile({ provider: 'google' }, { email: 'davydlykholap@gmail.com', email_verified: false }), false);
  assert.equal(permittedGoogleProfile({ provider: 'credentials' }, { email: 'davydlykholap@gmail.com', email_verified: true }), false);
});

test('server blocks HTML, assets and APIs without a valid allowed session', async t => {
  const server = createHttpServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  const testOrigin = `http://127.0.0.1:${server.address().port}`;
  const app = createServer({ env: { ...env, SF0_ORIGIN: testOrigin }, development: true });
  app.get('/private-report', (_req, res) => res.send('private report'));
  server.on('request', app);
  const request = (route, options = {}) => fetch(`http://127.0.0.1:${server.address().port}${route}`, {
    ...options, redirect: 'manual', headers: options.headers,
  });
  for (const route of ['/', '/index.html', '/assets/index.js', '/src/App.jsx', '/private-report']) {
    const response = await request(route);
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), '/signin');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  assert.equal((await request('/api/session')).status, 401);
  assert.equal((await request('/private-report', { headers: { cookie: 'authjs.session-token=forged' } })).status, 302);
  for (const [token, maxAge, allowed] of [
    [{ email: 'davydlykholap@gmail.com', allowed: true }, 300, true],
    [{ email: 'intruder@gmail.com', allowed: true }, 300, false],
    [{ email: 'davydlykholap@gmail.com', allowed: false }, 300, false],
    [{ email: 'davydlykholap@gmail.com', allowed: true }, -60, false],
  ]) {
    const cookie = await encode({ token, secret, salt: 'authjs.session-token', maxAge });
    const response = await request('/private-report', { headers: { cookie: `authjs.session-token=${cookie}` } });
    assert.equal(response.status, allowed ? 200 : 302);
    if (allowed) assert.equal(await response.text(), 'private report');
  }
  const invalidHostStatus = await new Promise((resolve, reject) => {
    const req = httpRequest(`${testOrigin}/signin`, { headers: { host: 'attacker.test' } }, res => { res.resume(); resolve(res.statusCode); });
    req.on('error', reject); req.end();
  });
  assert.equal(invalidHostStatus, 400);
  const signin = await request('/signin');
  assert.equal(signin.status, 200);
  const html = await signin.text();
  assert.match(html, /Continue with Google/);
  assert.doesNotMatch(html, /davydlykholap@gmail.com|test-client-secret/);
  const csrf = await request('/auth/csrf');
  assert.equal(csrf.status, 200);
  const { csrfToken } = await csrf.json();
  assert.ok(csrfToken);
  assert.match(csrf.headers.get('set-cookie'), /HttpOnly/);
  const forgedPost = await request('/auth/signout', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'callbackUrl=/' });
  assert.match(forgedPost.headers.get('location'), /error=MissingCSRF/);
  const sessionToken = await encode({ token: { email: 'davydlykholap@gmail.com', allowed: true }, secret, salt: 'authjs.session-token', maxAge: 300 });
  const cookies = csrf.headers.getSetCookie().map(value => value.split(';')[0]);
  cookies.push(`authjs.session-token=${sessionToken}`);
  const signout = await request('/auth/signout', {
    method: 'POST', headers: { cookie: cookies.join('; '), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ csrfToken, callbackUrl: testOrigin }),
  });
  assert.equal(signout.status, 302);
  assert.match(signout.headers.get('set-cookie'), /authjs.session-token=;.*Max-Age=0/i);
});

test('missing credentials fail closed and production requires HTTPS configuration', async t => {
  assert.throws(() => createServer({ env: {} }), /Configure/);
  assert.throws(() => createServer({ env }), /HTTPS/);
  const server = createHttpServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  const testOrigin = `http://127.0.0.1:${server.address().port}`;
  server.on('request', createServer({ env: { SF0_ORIGIN: testOrigin }, development: true }));
  const response = await fetch(`${testOrigin}/signin`);
  assert.match(await response.text(), /disabled/);
});
