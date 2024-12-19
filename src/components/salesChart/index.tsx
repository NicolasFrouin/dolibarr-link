'use client';

import { ActionIcon, Group, Paper, PaperProps, Text, useMantineTheme } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import sales from '@/public/mocks/sales.json';
import { DonutChart } from '@mantine/charts';
import { CgMore } from 'react-icons/cg';

type SalesChartProps = PaperProps;

const SalesChart = ({ ...others }: SalesChartProps) => {
  const theme = useMantineTheme();

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
          Weekly sales
        </Text>
        <ActionIcon variant='subtle'>
          <CgMore size={16} />
        </ActionIcon>
      </Group>
      <DonutChart
        data={sales
          .slice(0, 4)
          .map((d) => ({ ...d, name: d.source, color: theme.colors[theme.primaryColor][d.id % 10] }))}
      />
      <DataTable
        highlightOnHover
        columns={[{ accessor: 'source' }, { accessor: 'revenue' }, { accessor: 'value' }]}
        records={sales.slice(0, 4)}
        height={200}
      />
    </Paper>
  );
};

export default SalesChart;
