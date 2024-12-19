'use client';

import { DataTable } from 'mantine-datatable';
import { Badge, MantineColor, Notification } from '@mantine/core';
import { ReactNode } from 'react';

type Status = 'In Progress' | 'Cancelled' | 'Completed' | 'Pending' | string;

const StatusBadge = ({ status }: { status: Status }) => {
  let color: MantineColor = '';

  switch (status) {
    case 'In Progress':
      color = 'blue';
      break;
    case 'Cancelled':
      color = 'red';
      break;
    case 'Completed':
      color = 'green';
      break;
    case 'Pending':
      color = 'orange';
      break;
    default:
      color = 'gray';
  }

  return (
    <Badge
      color={color}
      variant='filled'
      radius='sm'
    >
      {status}
    </Badge>
  );
};

type ProjectItem = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  state: Status;
  assignee: string;
};

type ProjectsTableProps = {
  data?: ProjectItem[];
  error?: ReactNode;
  loading?: boolean;
};
const ProjectsTable = ({ data = [], error = null, loading = false }: ProjectsTableProps) => {
  return error ? (
    <Notification title='Error loading projects'>{error.toString()}</Notification>
  ) : (
    <DataTable
      verticalSpacing='sm'
      highlightOnHover
      columns={[
        { accessor: 'name' },
        { accessor: 'start_date' },
        { accessor: 'end_date' },
        {
          accessor: 'state',
          render: ({ state }) => <StatusBadge status={state} />,
        },
        { accessor: 'assignee' },
      ]}
      records={data}
      fetching={loading}
    />
  );
};

export default ProjectsTable;
