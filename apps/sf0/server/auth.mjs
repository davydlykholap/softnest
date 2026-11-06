import Google from '@auth/express/providers/google';

// Server-side only. Never import this file from src/ or expose it as public config.
const members = new Set([
  'davydlykholap@gmail.com',
  'avlikholap@gmail.com',
  'softnestfabriccare@gmail.com',
]);
export const isMember = email => typeof email === 'string' && members.has(email.toLowerCase());
export const permittedGoogleProfile = (account, profile) =>
  account?.provider === 'google' && profile?.email_verified === true && isMember(profile.email);

export function createAuthConfig(env, secret) {
  return {
    secret,
    basePath: '/auth',
    trustHost: true,
    logger: {
      error: error => console.error(`[sf0-auth] ${error.type || 'AuthenticationError'}`),
      warn: code => console.warn(`[sf0-auth] ${code}`),
    },
    providers: [Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      authorization: { params: { scope: 'openid email profile', prompt: 'select_account' } },
      checks: ['pkce', 'state'],
    })],
    session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
    pages: { signIn: '/signin', error: '/signin', signOut: '/signout' },
    callbacks: {
      signIn: async ({ account, profile }) => permittedGoogleProfile(account, profile),
      jwt: async ({ token, account, profile }) => {
        if (account) {
          token.allowed = permittedGoogleProfile(account, profile);
          token.email = profile?.email;
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.allowed === true && isMember(token.email)
          ? { email: token.email } : undefined;
        return session;
      },
      redirect: async ({ url, baseUrl }) => {
        const target = new URL(url, baseUrl);
        return target.origin === new URL(baseUrl).origin ? target.href : baseUrl;
      },
    },
  };
}
