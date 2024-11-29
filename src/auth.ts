import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DolibarrAdapter } from './lib/dolibarr-adapter';
import { DolibarrCredentials } from './lib/dolibarr-adapter/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: DolibarrAdapter(),
  providers: [DolibarrCredentials, GitHub],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.api_key = user.api_key;
        token.admin = Number(user.admin);
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub ?? '';
      session.user.api_key = (token.api_key as string) ?? '';
      session.user.admin = (token.admin as number) ?? 0;

      return session;
    },
  },
});
