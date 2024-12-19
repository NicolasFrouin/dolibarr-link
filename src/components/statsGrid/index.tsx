'use client';

import { Notification, PaperProps, SimpleGrid, Skeleton } from '@mantine/core';
import classes from './index.module.css';
import { ReactNode } from 'react';
import StatsCard from '../statsCard';

type StatsGridProps = {
  data?: { title: string; value: string; diff: number; period?: string }[];
  paperProps?: PaperProps;
  error?: ReactNode;
  loading?: boolean;
};

export default function StatsGrid({ data, loading, error, paperProps }: StatsGridProps) {
  const stats = data?.map((stat) => (
    <StatsCard
      key={stat.title}
      data={stat}
      {...paperProps}
    />
  ));

  return (
    <div className={classes.root}>
      {error ? (
        <Notification title='Error loading stats'>{error.toString()}</Notification>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          {loading
            ? Array.from({ length: 4 }).map((o, i) => (
                <Skeleton
                  key={`stats-loading-${i}`}
                  visible={true}
                  height={200}
                />
              ))
            : stats}
        </SimpleGrid>
      )}
    </div>
  );
}
