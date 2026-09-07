export const site = {
  name: 'John Lloyd Mamauag',
  handle: '@johnlloydbuilds',
  role: 'AI Automation · GHL CRM Builder · Web Dev · SMM',
  tagline: 'Build it once. Run it forever.',
  // Short line for the hero; `intro` stays the long version used for meta + About.
  hook: 'AI automations, GoHighLevel CRMs and websites that keep working long after the call ends.',
  intro:
    'I build the systems that keep working after the call ends: AI automations that qualify leads, GoHighLevel CRMs that never drop a follow-up, websites that convert, and social content that feeds them all.',
  url: 'https://johnlloydmamauag.com',
  email: 'hello@johnlloydmamauag.com',
  location: 'Philippines · working with clients worldwide',
  socials: [
    { label: 'Facebook', href: 'https://facebook.com/', icon: 'ph-facebook-logo' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'ph-linkedin-logo' },
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'ph-instagram-logo' },
    { label: 'GitHub', href: 'https://github.com/', icon: 'ph-github-logo' },
  ],
};

export const nav = [
  { label: 'Home', href: '/', icon: 'ph-house' },
  { label: 'Projects', href: '/projects', icon: 'ph-folder' },
  { label: 'Services', href: '/services', icon: 'ph-stack' },
  { label: 'About', href: '/about', icon: 'ph-user' },
  { label: 'Contact', href: '/contact', icon: 'ph-chat-circle' },
];

export const services = [
  {
    n: '01',
    title: 'AI Automation',
    icon: 'ph-robot',
    blurb:
      'Agents and workflows that answer, qualify and route leads day and night, wired into the tools you already pay for.',
    points: [
      'AI lead qualification and booking bots',
      'RAG chatbots trained on your own docs',
      'Zapier / Make multi-app pipelines',
      'Automated reporting and recaps',
    ],
  },
  {
    n: '02',
    title: 'GHL CRM Build',
    icon: 'ph-flow-arrow',
    blurb:
      'GoHighLevel set up the way an operator would build it: clean pipelines, tidy snapshots, and follow-up that fires itself.',
    points: [
      'Pipelines, stages and custom fields',
      'SMS and email nurture workflows',
      'Calendars, forms and funnels',
      'Reusable agency snapshots',
    ],
  },
  {
    n: '03',
    title: 'Web Development',
    icon: 'ph-code',
    blurb:
      'Fast, accessible, SEO-first sites and landing pages, coded rather than dragged together, so they load and they rank.',
    points: [
      'Conversion-focused landing pages',
      'Astro, static and headless builds',
      'Core Web Vitals tuning',
      'Analytics and tracking setup',
    ],
  },
  {
    n: '04',
    title: 'Social Media Marketing',
    icon: 'ph-megaphone',
    blurb:
      'Content systems, not one-off posts, just a repeatable calendar with creative, scheduling and reporting handled.',
    points: [
      'Content strategy and calendars',
      'Short-form creative in Canva',
      'Scheduling and community replies',
      'Paid social support and reporting',
    ],
  },
];

export const projects = [
  {
    title: 'Coach Onboarding Engine',
    kind: 'GHL Build · Automation',
    year: '2026',
    icon: 'ph-graduation-cap',
    summary:
      'End-to-end GoHighLevel snapshot for a coaching business: application form, AI qualification, calendar booking and a 21-day nurture that runs without a VA.',
    stack: ['GoHighLevel', 'Zapier', 'OpenAI'],
    result: 'Booked-call rate up, zero manual follow-up',
  },
  {
    title: 'Agency Lead Router',
    kind: 'AI Automation',
    year: '2026',
    icon: 'ph-git-branch',
    summary:
      'An AI intake agent that reads inbound messages across forms, DMs and email, scores them, and drops each lead into the right pipeline stage with a written summary.',
    stack: ['Claude', 'Make', 'Notion'],
    result: 'Response time cut from hours to seconds',
  },
  {
    title: 'Local Services Funnel',
    kind: 'Web Dev · Funnel',
    year: '2025',
    icon: 'ph-storefront',
    summary:
      'Coded landing page and quote funnel for a home-services brand, wired straight into GHL with call tracking and instant SMS confirmation.',
    stack: ['Astro', 'GoHighLevel', 'Twilio'],
    result: '98+ Lighthouse across the board',
  },
  {
    title: 'Content Ops Dashboard',
    kind: 'SMM · Ops',
    year: '2025',
    icon: 'ph-calendar-check',
    summary:
      'A Notion command centre for a social team: briefs, Canva templates, approvals and scheduling on one board, with weekly performance pulled in automatically.',
    stack: ['Notion', 'Canva', 'Zapier'],
    result: 'Publishing cadence doubled',
  },
  {
    title: 'Knowledge Base Chatbot',
    kind: 'AI Build',
    year: '2025',
    icon: 'ph-brain',
    summary:
      'A retrieval chatbot on top of an agency SOP library, so the team stops asking the same five questions in Slack.',
    stack: ['RAG', 'Claude', 'VS Code'],
    result: 'Internal support pings down sharply',
  },
  {
    title: 'Reactivation Campaign Kit',
    kind: 'GHL · Automation',
    year: '2025',
    icon: 'ph-arrows-clockwise',
    summary:
      'A drop-in database reactivation workflow: segmented SMS and email sequences with AI reply handling and automatic handoff to a human once intent shows up.',
    stack: ['GoHighLevel', 'OpenAI'],
    result: 'Dormant lists turned into booked calls',
  },
];

export const testimonials = [
  {
    quote:
      'John Lloyd rebuilt our whole GoHighLevel account. The pipelines actually make sense now and nothing slips through, the follow-up just happens.',
    name: 'Client 1',
    role: 'Agency Owner',
    tags: ['GHL Build', 'Automation'],
  },
  {
    quote:
      'The AI intake agent he set up answers leads faster than we ever could. It writes a summary for every enquiry before we even open the tab.',
    name: 'Client 2',
    role: 'Operations Manager',
    tags: ['AI Automation', 'CRM'],
  },
  {
    quote:
      'Clean site, fast site, and it ranks. He handled the build, the copy structure and the tracking without me chasing anything.',
    name: 'Client 3',
    role: 'Coach and Consultant',
    tags: ['Web Dev', 'SEO'],
  },
];

export const process = [
  {
    n: '01',
    title: 'Map',
    icon: 'ph-map-trifold',
    text: 'We find where your leads go cold.',
  },
  {
    n: '02',
    title: 'Build',
    icon: 'ph-wrench',
    text: 'One connected system, not four separate tools.',
  },
  {
    n: '03',
    title: 'Test',
    icon: 'ph-flask',
    text: 'Every branch fired with real data before launch.',
  },
  {
    n: '04',
    title: 'Hand over',
    icon: 'ph-handshake',
    text: 'Docs, walkthroughs, and the keys are yours.',
  },
];

export const tools = [
  { id: 'notion', name: 'Notion' },
  { id: 'zapier', name: 'Zapier' },
  { id: 'ghl', name: 'GoHighLevel' },
  { id: 'canva', name: 'Canva' },
  { id: 'claude', name: 'Claude' },
  { id: 'openai', name: 'ChatGPT' },
  { id: 'vscode', name: 'VS Code' },
];
