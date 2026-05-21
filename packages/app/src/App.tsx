import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Sidebar, Topbar, PageLayout, CommandMenu,
  Icon, Card, Stat, Tabs, Progress, Tooltip, Dropdown,
  Badge, Button, Select, Table, Avatar, ChatComposer, ChatMessage, SuggestedPrompts,
  ThinkingDisclosure, Citation, SourceRail,
} from '@layers/components';
import type { CommandGroup, Column, SuggestedPrompt, Source } from '@layers/components';
import {
  LayoutDashboard, Sun, Moon, Search, MoreHorizontal, Download, Sparkles,
  Code2, Lightbulb, PenLine, Globe, Telescope, Image as ImageIcon,
  TrendingUp, Trash2, HelpCircle, Paperclip, FileText, Link2, Camera,
} from 'lucide-react';
import styles from './App.module.css';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard               },
  { id: 'ai',       label: 'AI',       icon: Sparkles,        ai: true     },
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

type ChatMsg = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinkingTime?: number;
  thoughtTrace?: string;
  cited?: boolean;
  sources?: Source[];
};

type CitedPart = { text: string } | { citation: number };

const CITED_PARTS: CitedPart[] = [
  { text: 'AI in 2026 is shaped by three big shifts. First, agent frameworks moved from research demos to production — Anthropic ' },
  { citation: 1 },
  { text: ' and OpenAI ' },
  { citation: 2 },
  { text: ' both ship long-running agents that browse, code, and use real tools on the user\'s behalf.\n\nSecond, on-device inference is closing the gap. Apple\'s on-device models ' },
  { citation: 3 },
  { text: ' handle most everyday queries without a network round-trip, changing latency expectations across the industry.\n\nThird, the design language is consolidating. Citation chips, thinking disclosures, and streaming shimmer ' },
  { citation: 4 },
  { text: ' have become the default vocabulary for AI surfaces — users now scan for them the way they once scanned for a search icon.' },
];

const CITED_SOURCES: Source[] = [
  { id: 's1', number: 1, title: 'Claude ships a real long-running agent',     domain: 'anthropic.com', url: 'https://www.anthropic.com' },
  { id: 's2', number: 2, title: 'Inside OpenAI\'s autonomous task runner',    domain: 'openai.com',    url: 'https://www.openai.com'    },
  { id: 's3', number: 3, title: 'Apple Intelligence on-device benchmarks',    domain: 'apple.com',     url: 'https://www.apple.com'     },
  { id: 's4', number: 4, title: 'The new AI UX patterns of 2026',             domain: 'shapeof.ai',    url: 'https://www.shapeof.ai'    },
];

const THOUGHT_TRACES = [
  'Considering the user\'s intent — they\'re asking conceptually, not for code.\nDeciding on a balance: definition first, then one concrete example, then a note on why it matters.',
  'Checking the framing — the question presupposes some JavaScript familiarity.\nSkipping basic syntax and going straight to behavior.\nPicking one canonical example rather than three weaker ones.',
  'This sits at the intersection of typography and product UX.\nDeciding to lead with the visual problem (ragged columns), then the technical fix, then the tradeoff.',
];

const MOCK_RESPONSES = [
  `Closures are functions that "remember" the variables from the scope in which they were created, even after that scope has exited. They're a natural consequence of how JavaScript handles lexical scoping.\n\nA common example is a counter:\n\n  function makeCounter() {\n    let count = 0;\n    return () => ++count;\n  }\n\nThe returned function still has access to count even though makeCounter has finished executing. Each call to makeCounter creates a fresh closure with its own count.\n\nClosures are foundational to many patterns: data privacy, the module pattern, and partial application all rely on them.`,
  `Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their enclosing scope before execution. The rules differ by declaration type.\n\nvar declarations are hoisted and initialized to undefined. You can reference them before the line they're declared on without an error — they'll just be undefined.\n\nfunction declarations are fully hoisted, both the declaration and the body. You can call them before they appear in source order.\n\nlet and const are hoisted too, but not initialized. References before the declaration line throw a ReferenceError. This window is called the "temporal dead zone." It's one reason modern code prefers const and let — the errors are louder.`,
  `Tabular numerals (also called "tnum" via font-feature-settings) make every digit the same width. By default, most fonts use proportional digits — 1 is narrower than 5, which is narrower than 8.\n\nThis causes problems when numbers stack vertically, like in financial data tables or metric dashboards. The right edge of $1,111 sits at a different horizontal position from $9,999, making columns look ragged.\n\nEnabling tnum forces every digit to occupy the same advance width, so columns align perfectly. The cost is that single numbers in prose can look slightly mechanical, which is why it's typically applied only to numeric UI surfaces, not body copy.`,
  `React's useEffect handles side effects in function components. It runs after the component renders, when its dependency array changes.\n\nThe common pitfall is forgetting that the effect runs after every render unless you provide a dependency array. Pass [] to run it only on mount; pass [foo, bar] to re-run only when those values change.\n\nCleanup happens by returning a function from the effect. React calls it before re-running the effect, and on unmount. This is where you remove event listeners, clear intervals, and cancel subscriptions.\n\nIf you find yourself fighting useEffect, the answer is often that you don't need it — derived state, event handlers, or refs may be the right tool.`,
];

const STARTER_PROMPTS: SuggestedPrompt[] = [
  { id: 'ai-2026',   icon: TrendingUp, label: 'What\'s currently happening in AI?', prompt: 'What\'s currently happening in AI?' },
  { id: 'closures',  icon: Code2,      label: 'Explain JavaScript closures',        prompt: 'Explain JavaScript closures'        },
  { id: 'tnum',      icon: Lightbulb,  label: 'Why use tabular numerals in UIs?',   prompt: 'Why use tabular numerals in UIs?'   },
  { id: 'useEffect', icon: PenLine,    label: 'How does React useEffect work?',     prompt: 'How does React useEffect work?'     },
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
  const [messages, setMessages]       = useState<ChatMsg[]>([]);
  const [streaming, setStreaming]     = useState(false);
  const streamTimeoutRef              = useRef<number | null>(null);
  const messagesRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function streamInto(asstId: string) {
    const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    const tokens = response.split(/(\s+)/);
    let i = 0;

    const tick = () => {
      if (i >= tokens.length) {
        setStreaming(false);
        streamTimeoutRef.current = null;
        return;
      }
      const token = tokens[i];
      setMessages(prev => prev.map(m => m.id === asstId ? { ...m, content: m.content + token } : m));
      i++;
      streamTimeoutRef.current = window.setTimeout(tick, 28);
    };
    tick();
  }

  function sendChat(text: string) {
    const userId = `u-${Date.now()}`;
    const asstId = `a-${Date.now() + 1}`;
    const isCited      = /\bai\b/i.test(text) && /(current|happening|2026|trend|state)/i.test(text);
    const thinkingTime = 2 + Math.floor(Math.random() * 11);
    const thoughtTrace = THOUGHT_TRACES[Math.floor(Math.random() * THOUGHT_TRACES.length)];

    if (isCited) {
      setMessages(prev => [
        ...prev,
        { id: userId, role: 'user',      content: text },
        {
          id: asstId,
          role: 'assistant',
          content: CITED_PARTS.map(p => 'text' in p ? p.text : `[${p.citation}]`).join(''),
          thinkingTime,
          thoughtTrace,
          cited: true,
          sources: CITED_SOURCES,
        },
      ]);
      return;
    }

    setMessages(prev => [
      ...prev,
      { id: userId, role: 'user',      content: text },
      { id: asstId, role: 'assistant', content: '', thinkingTime, thoughtTrace },
    ]);
    setStreaming(true);
    streamInto(asstId);
  }

  function regenerateLast() {
    if (streamTimeoutRef.current !== null) return;
    const lastAsstIdx = [...messages].reverse().findIndex(m => m.role === 'assistant');
    if (lastAsstIdx === -1) return;
    const idx     = messages.length - 1 - lastAsstIdx;
    const asstMsg = messages[idx];
    setMessages(prev => prev.map(m => m.id === asstMsg.id ? { ...m, content: '' } : m));
    setStreaming(true);
    streamInto(asstMsg.id);
  }

  function stopChat() {
    if (streamTimeoutRef.current !== null) {
      clearTimeout(streamTimeoutRef.current);
      streamTimeoutRef.current = null;
    }
    setStreaming(false);
  }

  function runSlashCommand(id: string) {
    if (id === 'clear') {
      stopChat();
      setMessages([]);
      return;
    }
    if (id === 'help') {
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'Available commands:\n\n  /clear   — clear the conversation\n  /help    — show this list\n  /image   — generate an image\n  /search  — web search\n  /code    — code-focused answer\n  /attach  — attach a file',
        },
      ]);
      return;
    }
    sendChat(`Switched to ${id} mode.`);
  }

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
        {active === 'ai' ? (
          <div className={styles.aiPage}>
            {messages.length === 0 ? (
              <div className={styles.aiEmpty}>
                <SuggestedPrompts
                  prompts={STARTER_PROMPTS}
                  onSelect={p => sendChat(p.prompt)}
                />
              </div>
            ) : (
              <div className={styles.aiMessages} ref={messagesRef}>
                {messages.map((m, i) => {
                  const isLast      = i === messages.length - 1;
                  const isStreaming = streaming && isLast && m.role === 'assistant';
                  const canRegen    = !streaming && isLast && m.role === 'assistant';
                  const header = m.role === 'assistant' && m.thoughtTrace ? (
                    <ThinkingDisclosure
                      summary={isStreaming ? 'Thinking…' : `Thought for ${m.thinkingTime ?? 0}s`}
                      thinking={isStreaming}
                    >
                      {m.thoughtTrace}
                    </ThinkingDisclosure>
                  ) : undefined;

                  const footer = m.cited && m.sources ? (
                    <SourceRail sources={m.sources} />
                  ) : undefined;

                  if (m.cited) {
                    return (
                      <ChatMessage
                        key={m.id}
                        role={m.role}
                        streaming={isStreaming}
                        header={header}
                        footer={footer}
                        onRegenerate={canRegen ? regenerateLast : undefined}
                      >
                        {CITED_PARTS.map((p, idx) =>
                          'text' in p ? (
                            <Fragment key={idx}>{p.text}</Fragment>
                          ) : (
                            <Citation
                              key={idx}
                              number={p.citation}
                              href={m.sources?.find(s => s.number === p.citation)?.url}
                              title={m.sources?.find(s => s.number === p.citation)?.title}
                            />
                          ),
                        )}
                      </ChatMessage>
                    );
                  }

                  return (
                    <ChatMessage
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      streaming={isStreaming}
                      header={header}
                      footer={footer}
                      onRegenerate={canRegen ? regenerateLast : undefined}
                    />
                  );
                })}
              </div>
            )}
            <div className={styles.aiComposer}>
              <ChatComposer
                placeholder="Ask anything... type / for commands"
                streaming={streaming}
                onSend={sendChat}
                onStop={stopChat}
                attachmentItems={[
                  { id: 'upload-file',  label: 'Upload file',  icon: <Icon icon={FileText} scale="caption" /> },
                  { id: 'upload-image', label: 'Upload image', icon: <Icon icon={ImageIcon} scale="caption" /> },
                  { id: 'add-url',      label: 'Add from URL', icon: <Icon icon={Link2} scale="caption" />    },
                  { type: 'separator' },
                  { id: 'screenshot',   label: 'Take screenshot', icon: <Icon icon={Camera} scale="caption" /> },
                ]}
                slashCommands={[
                  { id: 'clear',  name: 'clear',  description: 'Clear the conversation',  icon: Trash2     },
                  { id: 'help',   name: 'help',   description: 'Show available commands', icon: HelpCircle },
                  { id: 'image',  name: 'image',  description: 'Generate an image',       icon: ImageIcon  },
                  { id: 'search', name: 'search', description: 'Web search',              icon: Globe      },
                  { id: 'code',   name: 'code',   description: 'Code-focused answer',     icon: Code2      },
                  { id: 'attach', name: 'attach', description: 'Attach a file',           icon: Paperclip  },
                ]}
                onSlashCommand={runSlashCommand}
                modes={[
                  { id: 'search',   label: 'Search',   icon: Globe     },
                  { id: 'research', label: 'Research', icon: Telescope },
                  { id: 'code',     label: 'Code',     icon: Code2     },
                  { id: 'image',    label: 'Image',    icon: ImageIcon },
                ]}
              />
            </div>
          </div>
        ) : (
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
