/* eslint-disable @typescript-eslint/no-explicit-any */

type QueryParams = ConstructorParameters<typeof URLSearchParams>[0];

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

type BaseRoute<TMethod extends Methods = Methods> = {
  url: (...args: any[]) => string;
  method?: TMethod;
  headers?: (...args: string[]) => Headers;
  data?: TMethod extends 'GET' ? (queryParams: QueryParams) => URLSearchParams : (...args: any[]) => any;
  options?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
};

const routes = {
  getProducts: {
    url: () => '/products',
    method: 'GET',
    data: (params: QueryParams) => new URLSearchParams(params),
  },
  postLogUser: {
    url: (type: string) => `/connect/login/${type}`,
    method: 'POST',
    headers: (contentType) => new Headers({ 'Content-Type': contentType }),
    data: (login: string, password: string, admin: boolean) => JSON.stringify({ login, password, admin }),
  },
  putUpdateUser: {
    url: (id: number) => `/connect/oauth/users/${id}`,
    method: 'PUT',
    headers: (accept, xForwardedFor) => new Headers({ Accept: accept, 'X-Forwarded-For': xForwardedFor }),
    data: (data: object) => JSON.stringify(data),
    options: {
      credentials: 'include',
    },
  },
  deleteDeleteUser: {
    url: (id: number) => `/users/${id}`,
    method: 'DELETE',
  },
} as const satisfies Record<string, BaseRoute>;

type Routes = typeof routes;

function fetcher(url: string, apiKey: string, apiHeaderName = 'DOLAPIKEY') {
  return async <TPath extends keyof Routes>(
    path: [TPath, ...Parameters<Routes[TPath]['url']>],
    // @ts-expect-error -- This is okay
    headerArgs: 'headers' extends keyof Routes[TPath] ? Parameters<Routes[TPath]['headers']> : [] = [],
    // @ts-expect-error -- This is okay
    dataArgs: 'data' extends keyof Routes[TPath] ? Parameters<Routes[TPath]['data']> : [] = [],
    options: BaseRoute['options'] = {}
  ) => {
    const [route, ...pathArgs] = path;

    const routeObject = routes[route];
    const routeOptions = {
      method: routeObject.method ?? 'GET',
      headers: new Headers(),
      body: null,
      ...options,
    } satisfies BaseRoute['options'] & { method: Methods; headers: Headers; body: BodyInit | null };

    // @ts-expect-error -- This is okay
    const uri = routeObject.url(...pathArgs);
    const fetchUrl = new URL(`${url}${uri}`);

    if ('headers' in routeObject) {
      // @ts-expect-error -- This is okay
      routeOptions.headers = routeObject.headers(...headerArgs);
    }
    routeOptions.headers.append(apiHeaderName, apiKey);

    if ('data' in routeObject) {
      // @ts-expect-error -- This is okay
      const routeData = routeObject.data(...dataArgs);
      if (routeOptions.method === 'GET') {
        if (routeData instanceof URLSearchParams) {
          routeData.forEach((value, key) => {
            fetchUrl.searchParams.append(key, value);
          });
        }
      } else {
        // @ts-expect-error -- This is okay
        routeOptions.body = routeData;
        if (!routeOptions.headers.has('Content-Type')) {
          routeOptions.headers.set('Content-Type', 'application/json');
        }
      }
    }

    return await fetch(fetchUrl, routeOptions)
      .then(async (res) => {
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

const dolifetch = fetcher('http://localhost:3000/api/aze', '1234', 'LOCALAPIKEY');

dolifetch(['postLogUser', '1'], ['application/json'], ['12', '', false], {
  credentials: 'include',
  referrerPolicy: 'no-referrer',
}).then(console.log);
dolifetch(['deleteDeleteUser', 2], [], [], { referrer: 'http://localhost:3000/' }).then(console.log);
dolifetch(['putUpdateUser', 2123123], ['oui', 'nope'], [{ foo: 'bar' }]).then(console.log);
dolifetch(['deleteDeleteUser', 2]);
