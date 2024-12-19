'use client';

import { ActionIcon, Group, Paper, PaperProps, Text } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { CgMore } from 'react-icons/cg';
import { data } from './data';

type RevenueChartProps = PaperProps;

const RevenueChart = ({ ...others }: RevenueChartProps) => {
  return (
    <Paper {...others}>
      <Group
        justify='space-between'
        mb='md'
      >
        <Text
          size='lg'
          fw={600}
        >
          Total revenue
        </Text>
        <ActionIcon variant='subtle'>
          <CgMore size={16} />
        </ActionIcon>
      </Group>
      {/* <Chart
        options={options}
        series={series}
        type='area'
        height={350}
        width={'100%'}
      /> */}

      <LineChart
        h={300}
        data={data}
        dataKey='date'
        series={[
          { name: 'Apples', color: 'indigo.6' },
          { name: 'Oranges', color: 'blue.6' },
          { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType='natural'
      />
    </Paper>
  );
};

export default RevenueChart;
