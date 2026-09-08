/**
 * One-off asset pipeline for the Projects galleries.
 *
 * Reads the raw screenshot folders, sorts each file into a category, writes a
 * web-sized WebP plus a thumbnail into public/work/<category>/, and emits
 * src/data/work.json for the Projects page to render from.
 *
 * Run with: node scripts/build-work-gallery.mjs
 */
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCES = [path.join(ROOT, 'GHL workflows'), path.join(ROOT, 'GHLand SMM samples')];
const OUT_DIR = path.join(ROOT, 'public', 'work');

const CATEGORIES = ['ghl-automation', 'funnel', 'smm'];

/**
 * Funnel pages, listed in the order the gallery should walk through them:
 * the opt-in funnel front to back, then the paid order form.
 *
 * These are the pages themselves. The workflows that fire behind them
 * ("... Automation") stay in the GHL Automation card, since those are
 * workflow-builder screens, not funnel pages.
 */
const FUNNEL_ORDER = [
  'GHL 2 Step Funnel.png',
  '2 Step Funnel - Client Magnet Blueprint_Optin.png',
  '2 Step Funnel - Client Magnet Blueprint_Thank You Page.png',
  'Order Form Funnel.png',
  'Payment Form Automation Live Product Form.png',
];

function categorise(folder, file) {
  if (FUNNEL_ORDER.includes(file)) return 'funnel';
  if (/GHL workflows/i.test(folder)) return 'ghl-automation';
  if (/instagram|facebook|fb\.|linkedin|blog|cover|post/i.test(file)) return 'smm';
  return 'ghl-automation';
}

/** Filename typos worth fixing before they become visible captions. */
const FIXES = [
  [/\bOder\b/gi, 'Order'],
  [/\bClent\b/gi, 'Client'],
  [/\bTestiing\b/gi, 'Testing'],
  [/\bFollowUp\b/g, 'Follow-Up'],
];

/** Filenames whose auto-caption reads badly. */
const CAPTIONS = {
  'fb': 'Facebook Page Post',
  'email automation sample': 'Email Automation Sample',
  'Opportunities- Pipeline': 'Opportunities Pipeline',
  'GHL calendar UI': 'GHL Calendar UI',
  'Form': 'Lead Capture Form',
  'GHL Automation of Email 1': 'GHL Email Automation',
  'Black and Lime Green Modern Fitness Coaching Instagram Post': 'Fitness Coaching Instagram Post',
  'Green Black Gym Fitness Facebook Cover': 'Gym Fitness Facebook Cover',
  'GHL 2 Step Funnel': 'Two-Step Funnel Structure',
  '2 Step Funnel - Client Magnet Blueprint_Optin': 'Lead Magnet Opt-In Page',
  '2 Step Funnel - Client Magnet Blueprint_Thank You Page': 'Funnel Thank-You Page',
  'Order Form Funnel': 'Order Form Checkout',
  'Payment Form Automation Live Product Form': 'Order Form Payment Build',
};

function toCaption(file) {
  const raw = path.basename(file, path.extname(file)).replace(/\s*\(\d+\)$/, '');
  if (CAPTIONS[raw]) return CAPTIONS[raw];
  let name = path.basename(file, path.extname(file));
  name = name.replace(/[_]+/g, ' — ').replace(/\s*\(\d+\)$/, '').replace(/\s+/g, ' ').trim();
  for (const [from, to] of FIXES) name = name.replace(from, to);
  return name;
}

function slugify(file) {
  return path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Keep hand-placed media (the transcoded video and its poster) across rebuilds.
const KEEP = /fitness-mobile-video/;
const preserved = [];
try {
  for (const cat of await readdir(OUT_DIR)) {
    for (const f of await readdir(path.join(OUT_DIR, cat))) {
      if (KEEP.test(f)) preserved.push([path.join(OUT_DIR, cat, f), cat, f]);
    }
  }
} catch {}

const stash = new Map();
for (const [full, cat, f] of preserved) stash.set(`${cat}/${f}`, await readFile(full));

await rm(OUT_DIR, { recursive: true, force: true });

for (const [key, buf] of stash) {
  const [cat, f] = key.split('/');
  await mkdir(path.join(OUT_DIR, cat), { recursive: true });
  await writeFile(path.join(OUT_DIR, cat, f), buf);
}

const buckets = new Map(CATEGORIES.map((id) => [id, []]));

for (const dir of SOURCES) {
  const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const file of files) {
    const id = categorise(dir, file);
    const slug = slugify(file);
    const catDir = path.join(OUT_DIR, id);
    await mkdir(catDir, { recursive: true });

    const src = path.join(dir, file);
    const image = sharp(src);
    const { width, height } = await image.metadata();

    await image
      .clone()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(catDir, `${slug}.webp`));

    await image
      .clone()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(path.join(catDir, `${slug}-thumb.webp`));

    buckets.get(id).push({
      slug,
      src: `/work/${id}/${slug}.webp`,
      thumb: `/work/${id}/${slug}-thumb.webp`,
      caption: toCaption(file),
      width,
      height,
    });
  }
}

/**
 * Video is transcoded separately (see README note) because ffmpeg is not a
 * project dependency at build time. Its poster/thumbnail already live in
 * public/work/, so the entry is appended by hand.
 */
buckets.get('smm').push({
  src: '/work/smm/fitness-mobile-video.mp4',
  poster: '/work/smm/fitness-mobile-video.webp',
  thumb: '/work/smm/fitness-mobile-video-thumb.webp',
  caption: 'Fitness Promo Video Edit',
  type: 'video',
  width: 720,
  height: 1280,
});

for (const [id, shots] of buckets) {
  // The funnel gallery reads as a sequence, so it keeps FUNNEL_ORDER instead
  // of being alphabetised like the others.
  if (id === 'funnel') {
    const rank = new Map(FUNNEL_ORDER.map((f, i) => [slugify(f), i]));
    shots.sort((a, b) => rank.get(a.slug) - rank.get(b.slug));
  } else {
    shots.sort((a, b) => a.caption.localeCompare(b.caption));
  }
  for (const shot of shots) delete shot.slug;
}

const manifest = Object.fromEntries(buckets);
await writeFile(path.join(ROOT, 'src', 'data', 'work.json'), JSON.stringify(manifest, null, 2));

for (const [id, shots] of buckets) console.log(`${id}: ${shots.length} screenshots`);
