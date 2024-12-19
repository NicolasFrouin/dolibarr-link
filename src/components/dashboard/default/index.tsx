'use client';

import StatsGrid from '@/components/statsGrid';
import { Button, Container, Grid, Group, Paper, PaperProps, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import projects from '@/public/mocks/projects.json';
import statsGrid from '@/public/mocks/statsGrid.json';
import ProjectsTable from '@/components/table/projectsTable';
import RevenueChart from '@/components/revenueChart';
import SalesChart from '@/components/salesChart';
import MobileDesktopChart from '@/components/mobileDesktopChart';
import PageHeader from '@/components/pageHeader';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
  style: { height: '100%' },
};

export const PATH_TASKS = {
  root: '/tasks',
};

export default function DefaultDashboard() {
  const { data: statsData } = statsGrid;

  return (
    <Container fluid>
      <Stack gap='lg'>
        {
          <PageHeader
            title='Default dashboard'
            withActions={true}
          />
        }
        <StatsGrid
          data={statsData}
          paperProps={PAPER_PROPS}
        />
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={8}>
            <RevenueChart {...PAPER_PROPS} />
          </Grid.Col>
          <Grid.Col span={4}>
            <SalesChart {...PAPER_PROPS} />
          </Grid.Col>
          <Grid.Col span={4}>
            <MobileDesktopChart {...PAPER_PROPS} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Paper {...PAPER_PROPS}>
              <Group
                justify='space-between'
                mb='md'
              >
                <Text
                  size='lg'
                  fw={600}
                >
                  Tasks
                </Text>
                <Button
                  variant='subtle'
                  component={Link}
                  href={PATH_TASKS.root}
                  rightSection={<BiChevronRight size={18} />}
                >
                  View all
                </Button>
              </Group>
              <ProjectsTable data={projects.slice(0, 8)} />
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
