import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { auth } from '@/auth';
import AppLayout from '@/components/layout/AppLayout';
import { app } from '@/lib/app';
// import { Raleway } from 'next/font/google';

// const raleway = Raleway({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// });

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
};

export default async function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  const session = await auth();
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  const lightTheme = createTheme({
    autoContrast: true,
    // fontFamily: raleway.style.fontFamily,
    fontFamily: 'Open Sans, sans-serif',
    colors: {
      primary: [
        '#FFF2E9',
        '#FFD8C0',
        '#FFB892',
        '#FF9864',
        '#FF7F3C',
        '#FF6418',
        '#E55A15',
        '#CC5012',
        '#B2460F',
        '#993D0C',
      ],
      secondary: [
        '#F5F5F5',
        '#EBEBEB',
        '#D6D6D6',
        '#C2C2C2',
        '#ADADAD',
        '#999999',
        '#858585',
        '#707070',
        '#5C5C5C',
        '#474747',
      ],
      accent: [
        '#E9F3FF',
        '#C9E0FF',
        '#A6CBFF',
        '#82B6FF',
        '#5FA2FF',
        '#3D8EFF',
        '#3278E5',
        '#2963CC',
        '#1F4FB2',
        '#163B99',
      ],
      text: [
        '#333333',
        '#4F4F4F',
        '#666666',
        '#808080',
        '#999999',
        '#B3B3B3',
        '#CCCCCC',
        '#E6E6E6',
        '#F2F2F2',
        '#FFFFFF',
      ],
      background: [
        '#FFFFFF',
        '#FAFAFA',
        '#F0F0F0',
        '#E0E0E0',
        '#D1D1D1',
        '#C2C2C2',
        '#B3B3B3',
        '#A4A4A4',
        '#959595',
        '#868686',
      ],
    },
    primaryColor: 'primary',
    primaryShade: 5, // Base orange
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Will be used later
  const darkTheme = createTheme({
    colors: {
      primary: [
        '#FFD9B3',
        '#FFBA8F',
        '#FF9A6B',
        '#FF7A47',
        '#FF6418',
        '#E55A15',
        '#CC5012',
        '#B2460F',
        '#993D0C',
        '#993D0C',
      ],
      secondary: [
        '#1E1E1E',
        '#242424',
        '#2C2C2C',
        '#333333',
        '#3C3C3C',
        '#474747',
        '#515151',
        '#5C5C5C',
        '#666666',
        '#707070',
      ],
      accent: [
        '#00D6C1',
        '#00BFA5',
        '#00A593',
        '#009382',
        '#008271',
        '#007061',
        '#00635A',
        '#005652',
        '#004849',
        '#003A40',
      ],
      text: [
        '#E0E0E0',
        '#CCCCCC',
        '#B3B3B3',
        '#999999',
        '#808080',
        '#666666',
        '#4F4F4F',
        '#333333',
        '#1A1A1A',
        '#000000',
      ],
      background: [
        '#121212',
        '#181818',
        '#202020',
        '#2C2C2C',
        '#373737',
        '#424242',
        '#4D4D4D',
        '#585858',
        '#636363',
        '#6E6E6E',
      ],
    },
    primaryColor: 'primary',
    primaryShade: 5, // Base orange
  });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body className={'antialiased'}>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <MantineProvider
              theme={lightTheme}
              defaultColorScheme='light'
            >
              <AppLayout session={session}>
                <div>
                  {modal}
                  {children}
                </div>
              </AppLayout>
            </MantineProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
