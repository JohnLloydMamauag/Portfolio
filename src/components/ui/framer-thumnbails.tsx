'use client';
import { animate, motion, useMotionValue } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

export type CarouselItem = {
  id: number | string;
  url: string;
  title: string;
  /** Optional smaller source used for the thumbnail strip. */
  thumb?: string;
  /** 'video' renders a player instead of an image. */
  type?: 'image' | 'video';
  /** Still frame shown before a video plays. */
  poster?: string;
};

export const items: CarouselItem[] = [
  {
    id: 1,
    url: 'https://cdn.21st.dev/assets/mirror/9f/9ff0e940308d62089e45cc7e886701c469b9d8bdefe1083ea4961f3afc5d8071.jpg',
    title: 'MAXX PHAM',
  },
  {
    id: 2,
    url: 'https://cdn.21st.dev/assets/mirror/a9/a95655f582827d22bb12101d1880394c78249f9057d12d043d7b3c1354c83025.jpg',
    title: 'BOXIEN BAY',
  },
  {
    id: 3,
    url: 'https://cdn.21st.dev/assets/mirror/41/418af4c54ec899f6e14404033548eff30e17ac34f8a6ecd0fa386736664ab098.jpg',
    title: 'AUSIZE MAM',
  },
];

const FULL_WIDTH_PX = 96;
const COLLAPSED_WIDTH_PX = 26;
const GAP_PX = 2;
const MARGIN_PX = 2;

type Props = {
  /** Defaults to the bundled demo set so the component works standalone. */
  data?: CarouselItem[];
  /** Screenshots need `contain`; photography looks better with `cover`. */
  fit?: 'cover' | 'contain';
  index?: number;
  onIndexChange?: (index: number) => void;
};

function FramerCarouselThumbnails({
  data = items,
  fit = 'cover',
  index: controlledIndex,
  onIndexChange,
}: Props) {
  const [uncontrolled, setUncontrolled] = useState<number>(0);
  const index = controlledIndex ?? uncontrolled;
  const setIndex = (i: number) => {
    setUncontrolled(i);
    onIndexChange?.(i);
  };

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  // Arrow keys drive the carousel wherever it is mounted.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex(Math.min(data.length - 1, index + 1));
      if (e.key === 'ArrowLeft') setIndex(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, data.length]);

  const imgFit = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-3">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              // If fast swipe, use velocity
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              }
              // Otherwise use offset threshold (30% of container width)
              else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              // Clamp index
              newIndex = Math.max(0, Math.min(data.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {data.map((item, i) => (
              <div
                key={item.id}
                className="shrink-0 w-full h-[min(64vh,660px)] min-h-[220px] flex items-center justify-center"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    poster={item.poster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={item.title}
                    /* Stop the drag handler swallowing clicks on the controls. */
                    onPointerDownCapture={(e) => e.stopPropagation()}
                    style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                    className="rounded-lg bg-black select-none"
                    ref={(el) => {
                      // Pause a video as soon as its slide scrolls out of view.
                      if (el && i !== index) el.pause();
                    }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    /*
                     * The image is not stretched to a fixed box — it is capped at
                     * the stage and keeps its own aspect ratio, so no part of a
                     * screenshot is ever cropped away.
                     */
                    style={{
                      objectFit: fit,
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                    }}
                    className={`${imgFit} rounded-lg select-none pointer-events-none`}
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            type="button"
            aria-label="Previous"
            disabled={index === 0}
            onClick={() => setIndex(Math.max(0, index - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10 text-[#023336]
              ${
                index === 0
                  ? 'bg-white opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Next Button */}
          <motion.button
            type="button"
            aria-label="Next"
            disabled={index === data.length - 1}
            onClick={() => setIndex(Math.min(data.length - 1, index + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10 text-[#023336]
              ${
                index === data.length - 1
                  ? 'bg-white opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <Thumbnails data={data} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}

function Thumbnails({
  data,
  index,
  setIndex,
}: {
  data: CarouselItem[];
  index: number;
  setIndex: (index: number) => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex gap-1 h-14 pb-1 mx-auto" style={{ width: 'fit-content' }}>
        {data.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={item.title}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative shrink-0 h-full overflow-hidden rounded-md"
          >
            <img
              src={item.thumb ?? item.poster ?? item.url}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            {item.type === 'video' && (
              <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/35">
                <svg className="h-5 w-5 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FramerCarouselThumbnails;
