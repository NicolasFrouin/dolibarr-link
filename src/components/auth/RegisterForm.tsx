import { login } from '@/actions/auth';
import { Anchor, Button, Checkbox, Group, Loader, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';

interface Props {
  postRegisterAction?: () => void;
  toggle: () => void;
}

export default function RegisterForm({ postRegisterAction, toggle }: Props) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();

  const registerValidator = z.object({
    email: z.string().min(1),
    name: z.string().min(1),
    password: z.string().min(12, t('form.password.requirements.length', { length: 12 })),
    terms: z.literal<boolean>(true),
  });

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },
    validate: zodResolver(registerValidator),
  });

  function handleSubmit(values: typeof form.values) {
    if (loading) return;

    startTransition(async () => {
      await login('credentials', { ...values, type: 'register', redirect: true, redirectTo: '/' }).catch((e) => {
        if (isRedirectError(e)) {
          postRegisterAction?.();
          revalidatePath('/', 'layout');
          return router.replace('/');
        }
        form.setErrors({ email: t('auth.credentials.invalid'), password: t('auth.credentials.invalid') });
      });
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          radius='md'
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          {...form.getInputProps('name')}
        />
        <TextInput
          data-autofocus
          required
          radius='md'
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          radius='md'
          label={t('form.password.label')}
          placeholder={t('form.password.placeholder')}
          {...form.getInputProps('password')}
        />
        <Checkbox
          label={t.rich('form.terms.accept', {
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
          error={form.errors.terms ? t('form.terms.error') : null}
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
          {t('auth.haveAccountLogin')}
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
            t('auth.register')
          )}
        </Button>
      </Group>
    </form>
  );
}
