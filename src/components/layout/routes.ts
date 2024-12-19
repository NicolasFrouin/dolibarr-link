import { Route, Unpacked } from '@/types/helpers';
import { CiSettings } from 'react-icons/ci';
import { FaGaugeHigh, FaSatelliteDish, FaWifi } from 'react-icons/fa6';
import { GiEnergise } from 'react-icons/gi';
import { IoHelp } from 'react-icons/io5';
import { SiTarget } from 'react-icons/si';

export const routes = [
  { label: 'dashboard', icon: FaGaugeHigh, link: '/' },
  {
    label: 'reporting_and_analysis',
    icon: FaWifi,
    links: [
      { label: 'energy_reports', link: '' }, // TODO: link to /energy-reports
      { label: 'financial_reports', link: '' },
      { label: 'customizable_graphics', link: '' },
    ],
  },
  {
    label: 'custom_data_tools',
    icon: FaSatelliteDish,
    links: [
      { label: 'scenario_simulations', link: '' },
      { label: 'custom_data_models', link: '' },
      { label: 'export_generator', link: '' },
      { label: 'ai_insights', link: '' },
    ],
  },
  {
    label: 'operations',
    icon: SiTarget,
    links: [
      { label: 'dashboard', link: '' }, // TODO: link to /operations-dashboard
      { label: 'support_tickets', link: '' }, // TODO: link to /support-tickets
      { label: 'customer_management', link: '' },
      { label: 'contracts_and_pricing', link: '' },
      { label: 'billing_and_payments', link: '' },
    ],
  },
  {
    label: 'energy_and_production_management',
    icon: GiEnergise,
    links: [
      { label: 'energy_trading_and_market_prices', link: '' }, // TODO: link to /energy-trading-and-market-prices
      { label: 'site_monitoring', link: '' }, // TODO: link to /site-monitoring
      { label: 'virtual_power_plant', link: '' },
    ],
  },
  {
    label: 'settings',
    icon: CiSettings,
  },
  {
    label: 'help_and_documentation',
    icon: IoHelp,
  },
] as const satisfies Route[];

export type RoutesType = typeof routes;
export type UnpackedRoutes = Unpacked<RoutesType>;
