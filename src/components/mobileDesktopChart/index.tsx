'use client';

import { ActionIcon, Group, Paper, PaperProps, Text } from '@mantine/core';
import { CgMore } from 'react-icons/cg';
import { BarChart } from '@mantine/charts';

type MobileDesktopChartProps = PaperProps;
const MobileDesktopChart = ({ ...others }: MobileDesktopChartProps) => {
  const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

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
          Mobile/Desktop
        </Text>
        <ActionIcon variant='subtle'>
          <CgMore size={16} />
        </ActionIcon>
      </Group>
      <BarChart
        h={300}
        data={data}
        dataKey='month'
        series={[
          { name: 'Smartphones', color: 'violet.6' },
          { name: 'Laptops', color: 'blue.6' },
          { name: 'Tablets', color: 'teal.6' },
        ]}
        tickLine='y'
      />
    </Paper>
  );
};

export default MobileDesktopChart;
