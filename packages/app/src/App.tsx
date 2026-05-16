import { useState } from 'react';
import { Sidebar, Topbar, PageLayout, CommandMenu, Icon, Card, Stat, Table, Dropdown, Badge, Tooltip } from '@layers/components';
import type { CommandGroup, Column } from '@layers/components';
import { LayoutDashboard, BarChart2, Users, DollarSign, ShoppingBag, Settings, Sun, Moon, Search, MoreHorizontal } from 'lucide-react';
import styles from './App.module.css';

const NAV = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart2       },
  { id: 'users',     label: 'Users',     icon: Users           },
  { id: 'revenue',   label: 'Revenue',   icon: DollarSign      },
  { id: 'orders',    label: 'Orders',    icon: ShoppingBag     },
];

const FOOTER_NAV = [{ id: 'settings', label: 'Settings', icon: Settings }];

type User = { id: string; name: string; email: string; role: string; joined: string; status: string };

const USERS: User[] = [
  { id: '1', name: 'Alex Johnson',  email: 'alex@example.com',   role: 'Admin',  joined: 'Jan 2024', status: 'Active'   },
  { id: '2', name: 'Maria Chen',    email: 'maria@example.com',  role: 'Editor', joined: 'Feb 2024', status: 'Active'   },
  { id: '3', name: 'Tom Rivera',    email: 'tom@example.com',    role: 'Viewer', joined: 'Mar 2024', status: 'Inactive' },
  { id: '4', name: 'Sarah Kim',     email: 'sarah@example.com',  role: 'Admin',  joined: 'Apr 2024', status: 'Active'   },
  { id: '5', name: 'James Liu',     email: 'james@example.com',  role: 'Editor', joined: 'May 2024', status: 'Active'   },
  { id: '6', name: 'Priya Patel',   email: 'priya@example.com',  role: 'Viewer', joined: 'Jun 2024', status: 'Active'   },
  { id: '7', name: 'Luca Ferrari',  email: 'luca@example.com',   role: 'Editor', joined: 'Jul 2024', status: 'Inactive' },
  { id: '8', name: 'Emma Wilson',   email: 'emma@example.com',   role: 'Admin',  joined: 'Aug 2024', status: 'Active'   },
];

const USER_COLUMNS: Column<User>[] = [
  { key: 'name',   label: 'Name',   sortable: true  },
  { key: 'email',  label: 'Email'                   },
  { key: 'role',   label: 'Role',   sortable: true  },
  { key: 'joined', label: 'Joined', sortable: true  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: value => <Badge label={String(value)} dot />,
  },
];

export default function App() {
  const [active, setActive]           = useState('overview');
  const [theme, setTheme]             = useState<'dark' | 'light'>('dark');
  const [commandOpen, setCommandOpen] = useState(false);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  const commandGroups: CommandGroup[] = [
    {
      label: 'Navigation',
      items: [...NAV, ...FOOTER_NAV].map(n => ({
        id: n.id,
        label: n.label,
        onSelect: () => setActive(n.id),
      })),
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

  return (
    <>
      <PageLayout
        sidebar={
          <Sidebar
            logo={<span className="text-body font-semibold">Layers</span>}
            items={NAV}
            footer={FOOTER_NAV}
            activeId={active}
            onSelect={setActive}
          />
        }
        topbar={
          <Topbar
            title={[...NAV, ...FOOTER_NAV].find(n => n.id === active)?.label}
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
                    { id: 'export', label: 'Export data', onSelect: () => {} },
                    { id: 'settings', label: 'Settings', onSelect: () => setActive('settings') },
                    { type: 'separator' },
                    { id: 'logout', label: 'Log out', danger: true, onSelect: () => {} },
                  ]}
                />
              </>
            }
          />
        }
      >
        {active === 'users' ? (
          <div className={styles.page}>
            <Table
              columns={USER_COLUMNS}
              data={USERS}
              rowKey={r => r.id}
              pageSize={5}
            />
          </div>
        ) : (
          <div className={styles.cards}>
            <Card title="Total Revenue" description="Compared to last month">
              <Stat value="$12,450" label="this month" />
            </Card>
            <Card title="Active Users" description="Unique visitors this week">
              <Stat value="3,821" label="this week" />
            </Card>
            <Card title="New Orders" description="Orders placed today">
              <Stat value="94" label="today" />
            </Card>
          </div>
        )}
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
