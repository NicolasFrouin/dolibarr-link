import Credentials, { CredentialInput, CredentialsConfig } from 'next-auth/providers/credentials';
import { fetcher } from './fetcher';
import { getDolibarrConf } from './helpers';
import { DolibarrAdapterOptions } from './types/adapter';
import { User } from 'next-auth';

type DolibarrCredentialsInputs = {
  login: CredentialInput;
  password: CredentialInput;
};

/**
 * Creates a configuration object for Dolibarr credentials.
 *
 * The credentials will use its `options` to connect to the Dolibarr API but will fallback to environment variables if not provided such as:
 * - `AUTH_DOLIBARR_API_URL` - The URL of the Dolibarr API
 * - `AUTH_DOLIBARR_URL` (fallback of `AUTH_DOLIBARR_API_URL`) - The URL of the Dolibarr (trailling slash allowed) (`/api/index.php` will be appended)
 * - `AUTH_DOLIBARR_KEY` - The API key for the Dolibarr API
 *
 * @param {Partial<DolibarrAdapterOptions>} [options] - Optional configuration for the adapter.
 *
 * @returns {CredentialsConfig} A configuration object for Dolibarr credentials.
 *
 * This function sets up the necessary credentials for Dolibarr authentication,
 * including login and password fields. It also handles the authorization process
 * by making a POST request to the Dolibarr API with the provided credentials.
 *
 * @example
 * ```typescript
 * const credentialsConfig = DolibarrCredentials({
 *   apiKey: 'your-api-key',
 *   apiUrl: 'https://your-dolibarr-instance.com/api',
 *   apiHeaderName: 'DOLAPIKEY',
 * });
 * ```
 */
export function DolibarrCredentials(
  options?: Partial<CredentialsConfig<DolibarrCredentialsInputs> & DolibarrAdapterOptions>
): CredentialsConfig {
  const { apiKey, apiUrl, apiHeaderName } = getDolibarrConf(options);

  const doliFetch = fetcher(apiUrl, apiKey, apiHeaderName);

  return Credentials({
    credentials: {
      login: { label: 'Login', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(
      credentials: Partial<Record<keyof DolibarrCredentialsInputs, unknown> & { type: string }>
    ): Promise<User | null> {
      if (credentials.type && credentials.type === 'register') {
        await doliFetch(['registerUser'], { method: 'POST', body: JSON.stringify(credentials) }).catch(() => null);
      }

      return await doliFetch(['logUser'], { method: 'POST', body: JSON.stringify(credentials) }).catch(() => null);
    },
    ...options,
  });
}
