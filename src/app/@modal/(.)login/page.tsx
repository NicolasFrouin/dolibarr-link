'use client';

import AuthForm from '@/components/auth/AuthForm';
import { Modal, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [opened, setOpened] = useState(false);
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    // Delay opening the modal to have the transition effect
    setTimeout(() => setOpened(true), 1);
  }, []);

  return (
    <div>
      <Modal
        opened={opened}
        centered
        title={
          <Text
            size='30px'
            fw='bolder'
          >
            {t('auth.connection')}
          </Text>
        }
        onClose={router.back}
        overlayProps={{ blur: 2 }}
        transitionProps={{ transition: 'fade', duration: 200, timingFunction: 'linear' }}
      >
        <AuthForm
          withBorder={false}
          p='md'
          pt={10}
          handleLogin={router.back}
        />
      </Modal>
    </div>
  );
}
