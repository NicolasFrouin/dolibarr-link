import { login } from '@/actions/auth';
import { Anchor, Button, Group, Loader, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';

interface Props {
  postLoginAction?: () => void;
  toggle: () => void;
}

export default function LoginForm({ postLoginAction, toggle }: Props) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();

  const loginValidator = z.object({
    login: z.string(),
    password: z.string().min(12, t('form.password.requirements.length', { length: 12 })),
  });

  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validate: zodResolver(loginValidator),
  });

  function handleSubmit(values: typeof form.values) {
    if (loading) return;

    startTransition(async () => {
      await login('credentials', { ...values, redirect: true, redirectTo: '/' }).catch((e) => {
        if (isRedirectError(e)) {
          postLoginAction?.();
          revalidatePath('/', 'layout');
          return router.replace('/');
        }
        form.setErrors({ login: t('auth.credentials.invalid'), password: t('auth.credentials.invalid') });
      });
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
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
          {t('auth.noAccountRegister')}
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
            t('auth.login')
          )}
        </Button>
      </Group>
    </form>
  );
}
