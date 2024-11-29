import { Route, Unpacked } from '@/types/helpers';
import { Session } from 'next-auth';
import { CgProfile } from 'react-icons/cg';
import { FaGaugeHigh, FaRegNewspaper } from 'react-icons/fa6';
import { MdAdminPanelSettings } from 'react-icons/md';

export const routes = [
  { label: 'dashboard', icon: FaGaugeHigh, link: '/' },
  {
    label: 'admin',
    icon: MdAdminPanelSettings,
    link: '/admin',
    constraint: ({ session }: { session: Session | null }) => Boolean(session?.user.admin),
  },
  {
    label: 'profile',
    icon: CgProfile,
    link: '/profile',
    constraint: ({ session }: { session: Session | null }) => Boolean(session?.user.id),
  },
  {
    label: 'news',
    icon: FaRegNewspaper,
    initiallyOpened: true,
    links: [
      { label: 'overview', link: '/overview' },
      { label: 'forecasts', link: '/login' },
      { label: 'outlook', link: '#' },
      { label: 'realTime', link: '/test' },
    ],
  },
] as const satisfies Route[];

export type RoutesType = typeof routes;
export type UnpackedRoutes = Unpacked<RoutesType>;
