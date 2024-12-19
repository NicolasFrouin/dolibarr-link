import { DefaultSession } from 'next-auth';

// Typescript will merge these modules with the existing NextAuth types
// to add the `api_key` field to the user object

declare module 'next-auth' {
  interface Session {
    user: {
      api_key?: string;
      admin?: number;
    } & DefaultSession['user'];
  }
  interface User {
    api_key?: string;
    admin?: number;
  }
}

declare module 'next-auth/jwt' {
  // Returned by the `jwt` callback and `useSession`, when using JWT sessions
  interface JWT {
    api_key?: string;
    admin?: number;
  }
}
