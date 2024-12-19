import type { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from '@auth/core/adapters';
import { noDoubleSlash, stripUndefined } from './helpers';
import { fetcher } from './fetcher';
import { DolibarrAdapterOptions } from './types/adapter';

/**
 * Creates a DolibarrAdapter instance.
 *
 * The adapter will use its `options` to connect to the Dolibarr API but will fallback to environment variables if not provided such as:
 * - `AUTH_DOLIBARR_API_URL` - The URL of the Dolibarr API
 * - `AUTH_DOLIBARR_URL` (fallback of `AUTH_DOLIBARR_API_URL`) - The URL of the Dolibarr (trailling slash allowed) (`/api/index.php` will be appended)
 * - `AUTH_DOLIBARR_KEY` - The API key for the Dolibarr API
 *
 * @param {Partial<DolibarrAdapterOptions>} [options] - Optional configuration for the adapter.
 *
 * @returns {Adapter} The DolibarrAdapter instance.
 *
 * @throws {Error} If the Dolibarr URL or API key is not provided.
 */
export function DolibarrAdapter(options?: Partial<DolibarrAdapterOptions>): Adapter {
  const apiUrl =
    options?.apiUrl ||
    process.env.AUTH_DOLIBARR_API_URL ||
    (process.env.AUTH_DOLIBARR_URL ? noDoubleSlash(`${process.env.AUTH_DOLIBARR_URL}/api/index.php`) : undefined);
  const apiKey = options?.apiKey || process.env.AUTH_DOLIBARR_KEY;
  const apiHeaderName = options?.apiHeaderName || 'DOLAPIKEY';

  if (!apiUrl) {
    throw new Error('Dolibarr URL not provided');
  }

  if (!apiKey) {
    throw new Error('Dolibarr API key not provided');
  }

  const doliFetch = fetcher(apiUrl, apiKey, apiHeaderName);

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We let Dolibarr manage the ID
    async createUser({ id, ...userData }): Promise<AdapterUser> {
      // @url POST /connect/oauth/register
      return await doliFetch(['createUser'], {
        method: 'POST',
        body: JSON.stringify(stripUndefined(userData)),
      });
    },
    async getUser(id): Promise<AdapterUser | null> {
      // @url GET /connect/oauth/users/{id}
      return await doliFetch(['getUser', id]).catch(() => null);
    },
    async getUserByEmail(email): Promise<AdapterUser | null> {
      // @url GET /connect/oauth/users/email/{email}
      return await doliFetch(['getUserByEmail', email]).catch(() => null);
    },
    async getUserByAccount({ provider, providerAccountId }): Promise<AdapterUser | null> {
      // @url GET /connect/oauth/authaccounts/user/{providerAccountId}/{provider}
      return await doliFetch(['getUserByAccount', providerAccountId, provider]).catch(() => null);
    },
    async updateUser({ id, ...userData }): Promise<AdapterUser> {
      // @url PUT /connect/oauth/users/{id}
      return await doliFetch(['updateUser', id], {
        method: 'PUT',
        body: JSON.stringify(stripUndefined(userData)),
      });
    },
    async deleteUser(id): Promise<AdapterUser | null | undefined> {
      // @url DELETE /users/{id}
      return await doliFetch(['deleteUser', id], { method: 'DELETE' }).then(() => undefined);
    },
    async linkAccount(data): Promise<AdapterAccount | null | undefined> {
      // @url POST /connect/oauth/authaccounts
      return await doliFetch(['linkAccount'], {
        method: 'POST',
        body: JSON.stringify(stripUndefined(data)),
      });
    },
    async unlinkAccount(providerAccountId): Promise<AdapterAccount | undefined> {
      // @url DELETE /connect/oauth/authaccounts/{providerAccountId}
      return await doliFetch(['unlinkAccount', providerAccountId as unknown as string], { method: 'DELETE' }).then(
        () => undefined
      );
    },
    async getSessionAndUser(sessionToken): Promise<{ user: AdapterUser; session: AdapterSession } | null> {
      // @url GET /connect/oauth/sessions/anduser/{sessionToken}
      return await doliFetch(['getSessionAndUser', sessionToken]).catch(() => null);
    },
    async createSession(data): Promise<AdapterSession> {
      // @url POST /connect/oauth/sessions
      return await doliFetch(['createSession'], {
        method: 'POST',
        body: JSON.stringify(stripUndefined(data)),
      });
    },
    async updateSession(data): Promise<AdapterSession | null | undefined> {
      // @url PUT /connect/oauth/sessions/{id}
      return await doliFetch(['updateSession', data.sessionToken], {
        method: 'PUT',
        body: JSON.stringify(stripUndefined(data)),
      });
    },
    async deleteSession(sessionToken): Promise<AdapterSession | null | undefined> {
      // @url DELETE /connect/sessions/{sessionToken}
      return await doliFetch(['deleteSession', sessionToken], { method: 'DELETE' }).then(() => null);
    },
    async createVerificationToken(data): Promise<VerificationToken | null | undefined> {
      // @url POST /connect/oauth/verificationtokens
      return await doliFetch(['createVerificationToken'], {
        method: 'POST',
        body: JSON.stringify(stripUndefined(data)),
      });
    },
    async useVerificationToken({ identifier, token }): Promise<VerificationToken | null> {
      // @url POST /connect/oauth/verificationtokens/use/{identifier}/{token}
      return await doliFetch(['useVerificationToken', identifier, token]).catch(() => null);
    },
    async getAccount(providerAccountId, provider): Promise<AdapterAccount | null> {
      // @url	GET /connect/oauth/authaccounts/{providerAccountId}/{provider}
      return await doliFetch(['getAccount', providerAccountId, provider]).catch(() => null);
    },
  };
}
