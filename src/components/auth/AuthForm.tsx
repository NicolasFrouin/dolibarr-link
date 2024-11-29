'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Loader,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { z } from 'zod';
import { getProviders, LiteralUnion } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { BuiltInProviderType, ProviderType } from 'next-auth/providers';
import { login } from '@/actions/auth';
import * as Icons from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { app } from '@/lib/app';
import Link from 'next/link';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface ClientSafeProvider {
  id: LiteralUnion<BuiltInProviderType>;
  name: string;
  type: ProviderType;
  signinUrl: string;
  callbackUrl: string;
  redirectTo: string;
}

type ProvidersType = Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;

interface Props extends PaperProps {
  handleLogin?: () => void;
}

export default function AuthForm({ handleLogin, ...paperProps }: Props) {
  const [providers, setProviders] = useState<ProvidersType | null>(null);
  const [type, toggle] = useToggle<'login' | 'register'>(['login', 'register']);
  const [loading, startTransition] = useTransition();
  const t = useTranslations();
  const router = useRouter();

  const loginValidator = z.object({
    login: z.string(),
    password: z.string().min(12, t('form.password.requirements.length', { length: 12 })),
  });

  const form = useForm({
    initialValues: {
      login: '',
      name: '',
      password: '',
      terms: false,
    },
    validate: zodResolver(loginValidator),
  });

  function handleSubmit(values: typeof form.values) {
    if (loading) return;

    startTransition(async () => {
      await login('credentials', { ...values, redirect: true, redirectTo: '/' }).catch((e) => {
        handleLogin?.();
        if (isRedirectError(e)) {
          revalidatePath('/', 'layout');
          return router.replace('/');
        }
        form.setErrors({ login: t('auth.credentials.invalid'), password: t('auth.credentials.invalid') });
      });
    });
  }

  function handleOAuthLogin(provider: string) {
    if (loading) return;

    startTransition(async () => {
      await login(provider, { redirect: true, redirectTo: '/' });
    });
  }

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const OAuthProviderButtons = () => {
    if (!providers) return null;

    const oAuthProviders = Object.values(providers).filter((provider) => provider.type === 'oauth');

    return (
      <>
        <Group
          grow
          my='md'
          justify='center'
        >
          {oAuthProviders.map((provider) => {
            const providerIconName = `Fa${upperFirst(provider.id)}` as keyof typeof Icons;
            const ProviderIconElement = Icons[providerIconName] ?? null;

            return (
              <Button
                key={provider.id}
                radius='xl'
                variant='default'
                maw={200}
                leftSection={ProviderIconElement ? <ProviderIconElement /> : null}
                onClick={() => handleOAuthLogin(provider.id)}
                disabled={loading}
              >
                {provider.name}
              </Button>
            );
          })}
        </Group>
        <Divider
          label={t('auth.orContinueWith')}
          labelPosition='center'
          my='lg'
        />
      </>
    );
  };

  return (
    <Paper
      radius='md'
      p='xl'
      withBorder
      maw={600}
      mx='auto'
      {...paperProps}
    >
      <Text
        size='lg'
        fw={500}
      >
        {t('auth.welcomeToApp', { appName: app.name, action: type })}
      </Text>
      <OAuthProviderButtons />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              radius='md'
              label={t('form.name.label')}
              placeholder={t('form.name.placeholder')}
              {...form.getInputProps('name')}
            />
          )}
          <TextInput
            data-autofocus
            required
            radius='md'
            label={t('form.email.label')}
            placeholder={t('form.email.placeholder')}
            {...form.getInputProps('login')}
          />
          <PasswordInput
            required
            radius='md'
            label={t('form.password.label')}
            placeholder={t('form.password.placeholder')}
            {...form.getInputProps('password')}
          />
          {type === 'register' && (
            <Checkbox
              label={t.rich('form.acceptTermsAndConditions', {
                a: (text) => (
                  <Link
                    href='/terms'
                    className='underline text-blue-600'
                  >
                    {text}
                  </Link>
                ),
              })}
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>
        <Group
          justify='space-between'
          mt='xl'
        >
          <Anchor
            component='button'
            type='button'
            c='dimmed'
            onClick={() => toggle()}
            size='md'
          >
            {type === 'register' ? t('auth.haveAccountLogin') : t('auth.noAccountRegister')}
          </Anchor>
          <Button
            type='submit'
            radius='xl'
            px={30}
            disabled={loading}
          >
            {loading ? (
              <Loader
                color='gray'
                size={16}
              />
            ) : (
              t(`auth.${type}`)
            )}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
