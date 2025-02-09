import { DolibarrAdapterOptions } from './types/adapter';

/**
 * Removes consecutive slashes from a URL, except for the protocol part.
 *
 * @param url - The URL string to be processed.
 *
 * @returns The URL string with consecutive slashes removed.
 */
export function noDoubleSlash(url: string) {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Removes properties with `undefined` values from an object.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object from which to remove `undefined` properties.
 *
 * @returns {T} A new object with the same properties as the input object, except those with `undefined` values.
 */
export function stripUndefined<T>(obj: T): T {
  const data = {} as T;
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key];
  return data;
}

/**
 * Gets the Dolibarr configuration options.
 *
 * The function will process `options` to connect to the Dolibarr API but will fallback to environment variables if not provided such as:
 * - `AUTH_DOLIBARR_API_URL` - The URL of the Dolibarr API
 * - `AUTH_DOLIBARR_URL` (fallback of `AUTH_DOLIBARR_API_URL`) - The URL of the Dolibarr (trailling slash allowed) (`/api/index.php` will be appended)
 * - `AUTH_DOLIBARR_KEY` - The API key for the Dolibarr API
 *
 * @param {Partial<DolibarrAdapterOptions>} [options] - Optional configuration for the adapter.
 *
 * @returns {DolibarrAdapterOptions} The Dolibarr configuration options.
 *
 * @throws {Error} If the Dolibarr URL or API key is not provided.
 */
export function getDolibarrConf(options?: Partial<DolibarrAdapterOptions>): DolibarrAdapterOptions {
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

  return { apiUrl, apiKey, apiHeaderName };
}
