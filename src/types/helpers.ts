import { Session } from 'next-auth';

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type Route = {
  icon: React.FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any -- Use any react-icon component
  label: string;
  constraint?: (props: { session: Session | null }) => boolean;
} & (
  | { initiallyOpened?: boolean; links: { label: string; link: string }[]; link?: never }
  | { link?: string; links?: never; initiallyOpened?: never }
);
