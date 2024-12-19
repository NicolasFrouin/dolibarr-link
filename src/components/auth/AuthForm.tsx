'use client';

import { Button, Divider, Group, Paper, PaperProps, Text } from '@mantine/core';
import { upperFirst, useToggle } from '@mantine/hooks';
import { getProviders, LiteralUnion } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { BuiltInProviderType, ProviderType } from 'next-auth/providers';
import { login } from '@/actions/auth';
import * as Icons from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { app } from '@/lib/app';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
      {type === 'login' ? (
        <LoginForm
          toggle={toggle}
          postLoginAction={handleLogin}
        />
      ) : (
        <RegisterForm
          toggle={toggle}
          postRegisterAction={handleLogin}
        />
      )}
    </Paper>
  );
}
