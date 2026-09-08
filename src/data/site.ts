export const site = {
  name: 'John Lloyd Mamauag',
  // Short form for the sidebar; `location` is the long version used on About and Contact.
  base: 'Philippines · Remote',
  role: 'AI Automation · GHL CRM Builder · Web Dev · SMM',
  tagline: 'Build it once. Run it forever.',
  // Short line for the hero; `intro` stays the long version used for meta + About.
  hook: 'AI automations, GoHighLevel CRMs and websites that keep working long after the call ends.',
  intro:
    'I build the systems that keep working after the call ends: automations that chase the follow-up, GoHighLevel CRMs that never drop a lead, websites that convert, and social content that feeds them all.',
  url: 'https://johnlloydmamauag.com',
  email: 'mamauagjohnlloyd98@gmail.com',
  calendly: 'https://calendly.com/mamauagjohnlloyd98/onboarding-call',
  location: 'Philippines · working with clients worldwide',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/johnlloyd.mamauag', icon: 'ph-facebook-logo' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-lloyd-mamauag', icon: 'ph-linkedin-logo' },
    { label: 'GitHub', href: 'https://github.com/JohnLloydMamauag', icon: 'ph-github-logo' },
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
    title: 'Automation & Integrations',
    icon: 'ph-plugs-connected',
    blurb:
      'Pipelines that move data between the tools you already pay for, so nothing gets retyped and nothing gets missed.',
    points: [
      'Make and Zapier multi-app pipelines',
      'Webhooks between forms, sheets and your CRM',
      'Automated reporting and recaps',
      'Notion and Google Sheets as the back office',
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

/** `logo` overrides the inline brand mark with a bitmap in public/logos/. */
export const tools: { id: string; name: string; logo?: string }[] = [
  { id: 'notion', name: 'Notion' },
  { id: 'zapier', name: 'Zapier' },
  { id: 'ghl', name: 'GoHighLevel', logo: '/logos/ghl.png' },
  { id: 'canva', name: 'Canva', logo: '/logos/canva.png' },
  { id: 'claude', name: 'Claude' },
  { id: 'openai', name: 'ChatGPT' },
  { id: 'vscode', name: 'VS Code' },
];
