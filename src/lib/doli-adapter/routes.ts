export const routes = {
  logUser: () => '/connect/login',
  registerUser: () => '/connect/register',
  createUser: () => '/connect/oauth/register',
  getUser: (id) => `/connect/oauth/users/${id}`,
  getUserByEmail: (email) => `/connect/oauth/users/email/${email}`,
  getUserByAccount: (providerAccountId, provider) =>
    `/connect/oauth/authaccounts/user/${providerAccountId}/${provider}`,
  updateUser: (id) => `/connect/oauth/users/${id}`,
  deleteUser: (id) => `/users/${id}`,
  linkAccount: () => '/connect/oauth/authaccounts',
  unlinkAccount: (providerAccountId) => `/connect/oauth/authaccounts/${providerAccountId}`,
  getSessionAndUser: (sessionToken) => `/connect/oauth/sessions/anduser/${sessionToken}`,
  createSession: () => '/connect/oauth/sessions',
  updateSession: (id) => `/connect/oauth/sessions/${id}`,
  deleteSession: (sessionToken) => `/connect/sessions/${sessionToken}`,
  createVerificationToken: () => '/connect/oauth/verificationtokens',
  useVerificationToken: (identifier, token) => `/connect/oauth/verificationtokens/use/${identifier}/${token}`,
  getAccount: (providerAccountId, provider) => `/connect/oauth/authaccounts/${providerAccountId}/${provider}`,
} as const satisfies Record<string, (...args: string[]) => string>;

export type Routes = typeof routes;
