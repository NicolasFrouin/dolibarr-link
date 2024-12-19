# Dolibarr Adapter & Provider for NextAuth.js

This package provides a Dolibarr adapter for NextAuth.js, allowing you to use Dolibarr as an authentication provider in your Next.js applications.

## Requirements

You need to have a Dolibarr instance running and accessible from your Next.js application.

On your Dolibarr instance, you must handle [every routes](./routes.ts) according to the NextAuth.js documentation.  
It is recommended to use the [Connect Dolibarr module](https://github.com/digital-dgrp/dolibarr_connect_oauth).

A `.env.example` file is provided in the root of this package to help you configure your environment variables in your `.env.local` file.

Finnaly, you need to have the `next-auth` package installed in your Next.js application.

## Configuration

Both the adapter and the provider will use, in this order :

- An `option` object passed to the function with the following properties :
  - `apiUrl` : The URL of your **Dolibarr instance API**
  - `apiKey` : The API key of the Dolibarr user to use as a service account
  - `apiHeaderName` : The name of the header to use for the API key, defaults to `DOLAPIKEY`
- The environment variables :
  - `AUTH_DOLIBARR_API_URL` : The URL of your **Dolibarr instance API**
    - `AUTH_DOLIBARR_URL` : If `AUTH_DOLIBARR_API_URL` is not set, the URL of your **Dolibarr instance** to which `/api/index.php` will be appended
  - `AUTH_DOLIBARR_KEY` : The API key of the Dolibarr user to use as a service account

## Usage

In the `auth.ts` file of your Next.js application, you can use the `DolibarrAdapter` and/or the `DolibarrProvider` class to handle connection.

```typescript
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DolibarrAdapter } from './lib/dolibarr-adapter';
import { DolibarrCredentials } from './lib/dolibarr-adapter/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DolibarrAdapter(),
  session: { strategy: 'jwt' },
  providers: [DolibarrCredentials],
});
```

## Extending the User

If you need your user to have more information than the default ones, [uncomment and modify this file](./types/next-auth.d.ts) to your needs and update your `auth.ts`.

Here is an example of how to add the `api_key` to the user :

```typescript
import NextAuth from 'next-auth';
import { DolibarrAdapter } from './lib/dolibarr-adapter';
import { DolibarrCredentials } from './lib/dolibarr-adapter/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: DolibarrAdapter(),
  providers: [DolibarrCredentials],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.api_key = user.api_key;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub ?? '';
      session.user.api_key = (token.api_key as string) ?? '';

      return session;
    },
  },
});

