import manifest from './work.json';

export type Shot = {
  src: string;
  thumb: string;
  caption: string;
  width: number;
  height: number;
  /** Video slides carry a poster frame; images omit both fields. */
  type?: 'image' | 'video';
  poster?: string;
};

export type Gallery = {
  id: string;
  title: string;
  kind: string;
  icon: string;
  blurb: string;
  highlights: string[];
  shots: Shot[];
};

const shots = manifest as Record<string, Shot[]>;

export const galleries: Gallery[] = [
  {
    id: 'ghl-automation',
    title: 'GHL Automation',
    kind: 'GoHighLevel · CRM',
    icon: 'ph-flow-arrow',
    blurb:
      'Workflows that pick up the follow-up nobody has time for: missed calls, new leads, stale opportunities, reviews and reactivation, all firing on their own inside GoHighLevel.',
    highlights: ['Missed-call text back', 'New lead routing', 'Pipeline automation', 'Database reactivation'],
    shots: shots['ghl-automation'] ?? [],
  },
  {
    id: 'funnel',
    title: 'Funnels',
    kind: 'Funnel · Landing pages',
    icon: 'ph-funnel',
    blurb:
      'Two-step opt-in funnels, order forms and payment pages built end to end, every page wired to the automation that runs the moment someone converts.',
    highlights: ['Two-step opt-in', 'Order & payment forms', 'Thank-you pages', 'Post-submit automation'],
    shots: shots['funnel'] ?? [],
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    kind: 'SMM · Content',
    icon: 'ph-megaphone',
    blurb:
      'Social creative, video edits and long-form content for coaching and fitness brands: Instagram posts, a 60-second vertical promo edit, Facebook covers, LinkedIn articles and blogs published straight from the CRM.',
    highlights: ['Instagram creative', 'Video editing', 'Facebook covers', 'LinkedIn articles'],
    shots: shots['smm'] ?? [],
  },
];
