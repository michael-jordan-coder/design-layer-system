import { useState } from 'react';
import {
  Sidebar, Topbar, PageLayout, CommandMenu,
  Icon, Card, Stat, Tabs, Progress, Tooltip, Dropdown,
  Badge, Button, Select, Table, Avatar,
} from '@layers/components';
import type { CommandGroup, Column } from '@layers/components';
import { LayoutDashboard, Sun, Moon, Search, MoreHorizontal, Download } from 'lucide-react';
import styles from './App.module.css';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
];

type Range = 'today' | 'week' | 'month';

const STATS_BY_RANGE: Record<Range, { revenue: string; users: string; orders: string; revenueTrend: string; usersTrend: string; ordersTrend: string }> = {
  today: { revenue: '$1,240',  users: '384',    orders: '94',    revenueTrend: '+8%',  usersTrend: '+3%',  ordersTrend: '+12%' },
  week:  { revenue: '$8,420',  users: '3,821',  orders: '612',   revenueTrend: '+12%', usersTrend: '+7%',  ordersTrend: '+9%'  },
  month: { revenue: '$12,450', users: '15,204', orders: '2,418', revenueTrend: '+18%', usersTrend: '+15%', ordersTrend: '+22%' },
};

type Order = { id: string; customer: string; amount: string; status: string; date: string };

const RECENT_ORDERS: Order[] = [
  { id: '#3492', customer: 'Alex Johnson', amount: '$142.00', status: 'Paid',    date: '2 min ago'  },
  { id: '#3491', customer: 'Maria Chen',   amount: '$89.00',  status: 'Pending', date: '15 min ago' },
  { id: '#3490', customer: 'Tom Rivera',   amount: '$320.00', status: 'Paid',    date: '1 hr ago'   },
  { id: '#3489', customer: 'Sarah Kim',    amount: '$56.00',  status: 'Refunded',date: '3 hr ago'   },
  { id: '#3488', customer: 'James Liu',    amount: '$215.00', status: 'Paid',    date: '5 hr ago'   },
];

const ORDER_COLUMNS: Column<Order>[] = [
  { key: 'id', label: 'Order' },
  {
    key: 'customer',
    label: 'Customer',
    render: (_, row) => (
      <div className={styles.customerCell}>
        <Avatar name={row.customer} size="sm" />
        <span>{row.customer}</span>
      </div>
    ),
  },
  { key: 'amount', label: 'Amount' },
  {
    key: 'status',
    label: 'Status',
    render: value => <Badge label={String(value)} dot />,
  },
  { key: 'date', label: 'Date' },
];

type TopCustomer = { name: string; orders: number; spent: string };

const TOP_CUSTOMERS: TopCustomer[] = [
  { name: 'Alex Johnson',  orders: 12, spent: '$1,420' },
  { name: 'Maria Chen',    orders: 9,  spent: '$1,180' },
  { name: 'Tom Rivera',    orders: 7,  spent: '$890'   },
  { name: 'Sarah Kim',     orders: 6,  spent: '$740'   },
  { name: 'James Liu',     orders: 5,  spent: '$615'   },
];

const CUSTOMER_COLUMNS: Column<TopCustomer>[] = [
  {
    key: 'name',
    label: 'Customer',
    render: (_, row) => (
      <div className={styles.customerCell}>
        <Avatar name={row.name} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
  { key: 'orders', label: 'Orders' },
  { key: 'spent',  label: 'Total spent' },
];

function CardMenu() {
  return (
    <Dropdown
      align="end"
      trigger={
        <button className={styles.cardMenuBtn} aria-label="Card options">
          <Icon icon={MoreHorizontal} scale="caption" />
        </button>
      }
      items={[
        { id: 'refresh', label: 'Refresh' },
        { id: 'export',  label: 'Export'  },
        { type: 'separator' },
        { id: 'hide',    label: 'Hide card' },
      ]}
    />
  );
}

export default function App() {
  const [active, setActive]           = useState('overview');
  const [theme, setTheme]             = useState<'dark' | 'light'>('dark');
  const [commandOpen, setCommandOpen] = useState(false);
  const [range, setRange]             = useState<Range>('month');

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  const commandGroups: CommandGroup[] = [
    {
      label: 'Navigation',
      items: NAV.map(n => ({ id: n.id, label: n.label, onSelect: () => setActive(n.id) })),
    },
    {
      label: 'Actions',
      items: [
        {
          id: 'toggle-theme',
          label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
          onSelect: toggleTheme,
        },
      ],
    },
  ];

  const s = STATS_BY_RANGE[range];

  return (
    <>
      <PageLayout
        sidebar={
          <Sidebar
            logo={<span className="text-body font-semibold">Layers</span>}
            items={NAV}
            activeId={active}
            onSelect={setActive}
          />
        }
        topbar={
          <Topbar
            title={NAV.find(n => n.id === active)?.label}
            actions={
              <>
                <Tooltip content="Search" side="bottom">
                  <button className={styles.iconBtn} onClick={() => setCommandOpen(true)} aria-label="Open command menu">
                    <Icon icon={Search} scale="body" />
                  </button>
                </Tooltip>
                <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'} side="bottom">
                  <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
                    <Icon icon={theme === 'dark' ? Sun : Moon} scale="body" />
                  </button>
                </Tooltip>
                <Dropdown
                  trigger={
                    <button className={styles.iconBtn} aria-label="More options">
                      <Icon icon={MoreHorizontal} scale="body" />
                    </button>
                  }
                  align="end"
                  items={[
                    { id: 'export', label: 'Export data' },
                    { type: 'separator' },
                    { id: 'logout', label: 'Log out', danger: true },
                  ]}
                />
              </>
            }
          />
        }
      >
        <div className={styles.page}>
          <div className={styles.pageHeader}>
            <div className={styles.rangeSelect}>
              <Select
                size="sm"
                value={range}
                onValueChange={v => setRange(v as Range)}
                options={[
                  { value: 'today', label: 'Today'      },
                  { value: 'week',  label: 'This week'  },
                  { value: 'month', label: 'This month' },
                ]}
              />
            </div>
            <Button variant="secondary" size="sm" icon={Download}>Export</Button>
          </div>

          <div className={styles.cards}>
            <Card title="Total Revenue" description="Compared to previous period" action={<CardMenu />}>
              <Stat value={s.revenue} label={range === 'today' ? 'today' : range === 'week' ? 'this week' : 'this month'} trend={<Badge label={s.revenueTrend} dot />} />
            </Card>
            <Card title="Active Users" description="Unique visitors" action={<CardMenu />}>
              <Stat value={s.users} label={range === 'today' ? 'online now' : range === 'week' ? 'this week' : 'this month'} trend={<Badge label={s.usersTrend} dot />} />
            </Card>
            <Card title="New Orders" description="Compared to previous period" action={<CardMenu />}>
              <Stat value={s.orders} label={range === 'today' ? 'today' : range === 'week' ? 'this week' : 'this month'} trend={<Badge label={s.ordersTrend} dot />} />
              {range === 'month' && <Progress value={81} />}
            </Card>
          </div>

          <Tabs
            items={[
              {
                id: 'orders',
                label: 'Recent orders',
                content: (
                  <Table
                    columns={ORDER_COLUMNS}
                    data={RECENT_ORDERS}
                    rowKey={r => r.id}
                    pageSize={5}
                  />
                ),
              },
              {
                id: 'customers',
                label: 'Top customers',
                content: (
                  <Table
                    columns={CUSTOMER_COLUMNS}
                    data={TOP_CUSTOMERS}
                    rowKey={r => r.name}
                    pageSize={5}
                  />
                ),
              },
            ]}
          />
        </div>
      </PageLayout>

      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={commandGroups}
        placeholder="Search or jump to..."
      />
    </>
  );
}
