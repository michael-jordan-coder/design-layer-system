import { useState } from 'react';
import { Sidebar, Topbar, PageLayout, CommandMenu, Icon, Card, Stat, Table, Dropdown, Badge, Tooltip, Button, Switch, Checkbox, RadioGroup, Tabs, Input, Textarea, Select, Avatar } from '@layers/components';
import type { CommandGroup, Column } from '@layers/components';
import { LayoutDashboard, BarChart2, Users, DollarSign, ShoppingBag, Settings, Sun, Moon, Search, MoreHorizontal, Plus } from 'lucide-react';
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
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (_, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Avatar name={row.name} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
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
  const [userQuery, setUserQuery]     = useState('');

  const filteredUsers = USERS.filter(u =>
    u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(userQuery.toLowerCase())
  );

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
        {active === 'settings' ? (
          <div className={styles.page}>
            <Card title="Profile" description="Your public profile information">
              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span className={['text-caption', styles.formLabel].join(' ')}>Display name</span>
                  <Input defaultValue="Alex Johnson" />
                </label>
                <label className={styles.formField}>
                  <span className={['text-caption', styles.formLabel].join(' ')}>Email</span>
                  <Input type="email" defaultValue="alex@example.com" />
                </label>
                <label className={styles.formField}>
                  <span className={['text-caption', styles.formLabel].join(' ')}>Timezone</span>
                  <Select
                    defaultValue="utc"
                    options={[
                      { value: 'pst', label: 'Pacific (PT)'  },
                      { value: 'est', label: 'Eastern (ET)'  },
                      { value: 'utc', label: 'UTC'           },
                      { value: 'cet', label: 'Central Europe' },
                      { value: 'jst', label: 'Japan (JST)'   },
                    ]}
                  />
                </label>
                <label className={styles.formField}>
                  <span className={['text-caption', styles.formLabel].join(' ')}>Bio</span>
                  <Textarea placeholder="Tell others a bit about yourself..." />
                </label>
                <div className={styles.formActions}>
                  <Button variant="primary" size="md">Save changes</Button>
                </div>
              </div>
            </Card>

            <Card title="Theme" description="Choose how the dashboard appears">
              <RadioGroup
                value={theme}
                onValueChange={v => {
                  document.documentElement.dataset.theme = v;
                  setTheme(v as 'dark' | 'light');
                }}
                options={[
                  { value: 'dark', label: 'Dark', description: 'Optimised for low-light environments' },
                  { value: 'light', label: 'Light', description: 'Clean and bright surface' },
                ]}
              />
            </Card>

            <Card title="Email categories" description="Pick which emails to receive">
              <div className={styles.settingsList}>
                <label className={styles.settingsRow}>
                  <div className={styles.settingsLabel}>
                    <span className="text-body">Product updates</span>
                    <span className={['text-caption', styles.settingsHint].join(' ')}>New features and changelog</span>
                  </div>
                  <Checkbox defaultChecked />
                </label>
                <label className={styles.settingsRow}>
                  <div className={styles.settingsLabel}>
                    <span className="text-body">Marketing</span>
                    <span className={['text-caption', styles.settingsHint].join(' ')}>Tips, offers, and announcements</span>
                  </div>
                  <Checkbox />
                </label>
              </div>
            </Card>

            <Card title="Notifications" description="Choose what updates you want to receive">
              <div className={styles.settingsList}>
                <div className={styles.settingsRow}>
                  <div className={styles.settingsLabel}>
                    <span className="text-body">Email notifications</span>
                    <span className={['text-caption', styles.settingsHint].join(' ')}>Receive updates by email</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className={styles.settingsRow}>
                  <div className={styles.settingsLabel}>
                    <span className="text-body">Push notifications</span>
                    <span className={['text-caption', styles.settingsHint].join(' ')}>Get pinged on your devices</span>
                  </div>
                  <Switch />
                </div>
                <div className={styles.settingsRow}>
                  <div className={styles.settingsLabel}>
                    <span className="text-body">Weekly digest</span>
                    <span className={['text-caption', styles.settingsHint].join(' ')}>A summary every Monday</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        ) : active === 'users' ? (
          <div className={styles.page}>
            <div className={styles.pageHeader}>
              <div className={styles.searchWrapper}>
                <Input
                  icon={Search}
                  placeholder="Search users..."
                  value={userQuery}
                  onChange={e => setUserQuery(e.target.value)}
                />
              </div>
              <div className={styles.pageHeaderActions}>
                <Button variant="secondary" size="sm">Export</Button>
                <Button variant="primary" size="sm" icon={Plus}>Invite user</Button>
              </div>
            </div>
            <Table
              columns={USER_COLUMNS}
              data={filteredUsers}
              rowKey={r => r.id}
              pageSize={5}
            />
          </div>
        ) : (
          <div className={styles.page}>
            <Tabs
              items={[
                {
                  id: 'today',
                  label: 'Today',
                  content: (
                    <div className={styles.cards}>
                      <Card title="Total Revenue" description="Compared to yesterday">
                        <Stat value="$1,240" label="today" />
                      </Card>
                      <Card title="Active Users" description="Right now">
                        <Stat value="384" label="online" />
                      </Card>
                      <Card title="New Orders" description="Today">
                        <Stat value="94" label="today" />
                      </Card>
                    </div>
                  ),
                },
                {
                  id: 'week',
                  label: 'This week',
                  content: (
                    <div className={styles.cards}>
                      <Card title="Total Revenue" description="Compared to last week">
                        <Stat value="$8,420" label="this week" />
                      </Card>
                      <Card title="Active Users" description="Unique visitors">
                        <Stat value="3,821" label="this week" />
                      </Card>
                      <Card title="New Orders" description="This week">
                        <Stat value="612" label="this week" />
                      </Card>
                    </div>
                  ),
                },
                {
                  id: 'month',
                  label: 'This month',
                  content: (
                    <div className={styles.cards}>
                      <Card title="Total Revenue" description="Compared to last month">
                        <Stat value="$12,450" label="this month" />
                      </Card>
                      <Card title="Active Users" description="Unique visitors">
                        <Stat value="15,204" label="this month" />
                      </Card>
                      <Card title="New Orders" description="This month">
                        <Stat value="2,418" label="this month" />
                      </Card>
                    </div>
                  ),
                },
              ]}
            />
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
