'use server';

import { signIn, signOut } from '@/auth';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

async function credentialsLogin(options?: { redirect?: boolean; redirectTo?: string } & Record<string, unknown>) {
  try {
    await signIn('credentials', options);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error('Invalid credentials');
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function login(
  provider?: string,
  options?: { redirect?: boolean; redirectTo?: string } & Record<string, unknown>
) {
  if (provider === 'credentials') {
    return await credentialsLogin(options);
  }

  return await signIn(provider, options);
}

export async function logout() {
  try {
    await signOut();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We just need the 'finally' block
  } catch (error) {
  } finally {
    revalidatePath('/', 'layout');
    redirect('/');
  }
}
