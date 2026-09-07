'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import FramerCarouselThumbnails, { type CarouselItem } from '@/components/ui/framer-thumnbails';

export type Gallery = {
  id: string;
  title: string;
  shots: { src: string; thumb: string; caption: string; type?: 'image' | 'video'; poster?: string }[];
};

/**
 * Owns the modal shell. The Projects cards stay plain HTML buttons carrying a
 * `data-gallery` id; this island listens for their clicks and opens the
 * matching gallery in a centred overlay.
 */
export default function WorkCarouselModal({ galleries }: { galleries: Gallery[] }) {
  const [open, setOpen] = useState<Gallery | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const byId = new Map(galleries.map((g) => [g.id, g]));

    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-gallery]');
      if (!trigger) return;
      const gallery = byId.get(trigger.dataset.gallery!);
      if (!gallery?.shots.length) return;
      e.preventDefault();
      setIndex(0);
      setOpen(gallery);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [galleries]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const data: CarouselItem[] =
    open?.shots.map((shot, i) => ({
      id: `${open.id}-${i}`,
      url: shot.src,
      thumb: shot.thumb,
      title: shot.caption,
      type: shot.type ?? 'image',
      poster: shot.poster,
    })) ?? [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title} screenshots`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div className="absolute inset-0 bg-[#023336]/85 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            className="relative flex max-h-[96vh] w-full max-w-[min(1180px,94vw)] flex-col overflow-hidden rounded-2xl border border-[#4DA674]/45 bg-[#023336] shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <header className="flex shrink-0 items-center gap-4 border-b border-[#C1E6BA]/18 px-4 py-2.5">
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#4DA674]">
                  {open.title}
                </p>
                <p className="truncate font-semibold text-[#D6EFD0]">
                  {data[index]?.title}
                </p>
              </div>
              <p className="ml-auto shrink-0 text-sm tabular-nums text-[#8FBFA0]">
                {index + 1} / {data.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#C1E6BA]/20 bg-[#C1E6BA]/10 text-[#D6EFD0] transition hover:bg-[#4DA674] hover:text-[#023336]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div className="min-h-0 flex-1 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
              <FramerCarouselThumbnails
                data={data}
                fit="contain"
                index={index}
                onIndexChange={setIndex}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
