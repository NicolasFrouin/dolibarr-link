import { noDoubleSlash } from './helpers';
import { routes, Routes } from './routes';

/**
 * Fetches data from a Dolibarr API endpoint.
 *
 * @param url - The base URL of the Dolibarr API.
 * @param apiKey - The API key used for authentication.
 * @param apiHeaderName - The name of the header used for the API key. Defaults to 'DOLAPIKEY'.
 * @returns A function that takes a path and options, and returns a promise that resolves with the fetched data.
 *
 * @template TPath - The type of the route path.
 * @param path - An array where the first element is the route key and the rest are the parameters for the route.
 * @param options - Optional fetch options to customize the request.
 *
 * @throws Will throw an error if the response is not ok.
 * @throws Will throw an error if there is a network error or other issue.
 *
 * @example
 * ```typescript
 * const fetchFromDolibarr = fetcher('https://api.example.com', 'your-api-key');
 * const data = await fetchFromDolibarr(['someRoute', param1, param2], { method: 'GET' });
 * ```
 */
export function fetcher(url: string, apiKey: string, apiHeaderName = 'DOLAPIKEY') {
  return async <TPath extends keyof Routes>(path: [TPath, ...Parameters<Routes[TPath]>], options: RequestInit = {}) => {
    const [route, ...args] = path;
    // @ts-expect-error -- We know this is a valid route
    const uri = routes[route](...args);

    const fetchUrl = new URL(noDoubleSlash(`${url}${uri}`));

    return await fetch(fetchUrl, {
      ...options,
      headers: {
        [apiHeaderName]: apiKey,
        'Content-Type': 'application/json',
        ...options.headers, // Allow headers to be overridden
      },
    })
      .then(async (res) => {
        console.log('FETCH RES', await res.clone().text());
        if (!res.ok) throw new Error(res.statusText);
        
        return res.json();
      })
      .catch((err) => {
        if (err instanceof Error) {
          // Dolibarr returns 404 when any resource is not found
          if (err.message === 'Not Found') return null;
        }
        throw new Error(err);
      });
  };
}
