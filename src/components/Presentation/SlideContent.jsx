import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedCounter from '../shared/AnimatedCounter';
import InteractiveGallery from './InteractiveGallery';

const videoCards = [
  { title: 'One Dance', youtubeId: '4JipHEz53sU', description: 'Le hit qui a ouvert les charts mondiaux.' },
  { title: 'Essence', youtubeId: 'm77FDcKg96Q', description: 'Le morceau qui a impose l Afrobeats partout.' },
  { title: 'Live Performance', youtubeId: 'qTRQiwaU7GI', description: 'Une presence scénique puissante en direct.' },
];

function Reveal({ step, revealStep, children, className = '' }) {
  const visible = revealStep >= step;

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, scale: visible ? 1 : 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
      {children}
    </h2>
  );
}

function StatCard({ label, value }) {
  return (
    <article className="glass-panel rounded-2xl p-4 shadow-keynote">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{value}</p>
    </article>
  );
}

function IconPill({ text }) {
  return (
    <span className="rounded-full border border-emerald-300/45 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-emerald-100">
      {text}
    </span>
  );
}

export default function SlideContent({ slide, revealStep, isActive }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const mapDots = useMemo(
    () => [
      { country: 'Nigeria', left: '49%', top: '56%' },
      { country: 'United Kingdom', left: '44%', top: '35%' },
      { country: 'United States', left: '29%', top: '39%' },
      { country: 'Canada', left: '27%', top: '31%' },
    ],
    []
  );

  switch (slide.key) {
    case 'opening':
      return (
        <div className="space-y-6 md:space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-200 sm:text-base">
            The Biggest Presentation
          </p>
          <p className="inline-flex rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
            World Class Keynote
          </p>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] text-white sm:text-7xl lg:text-9xl">
            <span className="typing-title inline-block">WIZKID</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="max-w-3xl text-lg text-slate-200 sm:text-2xl"
          >
            {slide.subtitle}
          </motion.p>
          <Reveal step={1} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="Afrobeats" />
            <IconPill text="Culture" />
            <IconPill text="Global Impact" />
          </Reveal>
          <Reveal step={2} revealStep={revealStep}>
            <p className="text-sm text-slate-300 sm:text-base">{slide.presenter}</p>
          </Reveal>
          <Reveal step={3} revealStep={revealStep}>
            <p className="text-sm text-amber-100/90">{slide.date}</p>
          </Reveal>
        </div>
      );

    case 'identity':
      return (
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="space-y-4">
            <SectionTitle>Who Is Wizkid?</SectionTitle>
            <Reveal step={1} revealStep={revealStep}>
              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                Ayodeji Ibrahim Balogun est une reference mondiale de l Afrobeats et une icone culturelle africaine.
              </p>
            </Reveal>
            <Reveal step={2} revealStep={revealStep} className="grid gap-3 sm:grid-cols-2">
              <StatCard label="Origin" value="Surulere, Lagos" />
              <StatCard label="Signature" value="Melodies + Groove" />
            </Reveal>
            <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
              <IconPill text="Global Icon" />
              <IconPill text="African Excellence" />
            </Reveal>
          </div>

          <div className="glass-panel overflow-hidden rounded-3xl border border-white/20 p-3">
            <video controls preload="metadata" className="w-full rounded-2xl bg-black">
              <source src={slide.videoFile} type="video/mp4" />
            </video>
          </div>
        </div>
      );

    case 'beginnings':
      return (
        <div className="space-y-5">
          <SectionTitle>Humble Beginnings</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Tout commence a Lagos. Discipline, repetitions, studio tres jeune: le socle de sa carriere est construit tres tot.
            </p>
          </Reveal>
          <Reveal step={2} revealStep={revealStep} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Childhood" value="Lagos" />
            <StatCard label="Age 11" value="First recordings" />
            <StatCard label="First Group" value="Glorious Five" />
            <StatCard label="Mindset" value="Obsessed with growth" />
          </Reveal>
          <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="Talent" />
            <IconPill text="Work Ethic" />
            <IconPill text="Vision" />
          </Reveal>
        </div>
      );

    case 'stardom':
      return (
        <div className="space-y-5">
          <SectionTitle>Rise to Stardom</SectionTitle>
          <Reveal step={1} revealStep={revealStep} className="grid gap-3 lg:grid-cols-3">
            <StatCard label="Breakout" value="Holla at Your Boy" />
            <StatCard label="Debut Album" value="Superstar (2011)" />
            <StatCard label="Result" value="Pan-African breakthrough" />
          </Reveal>
          <Reveal step={2} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Une trajectoire rapide: tube, album, confirmation, puis domination regionale.
            </p>
          </Reveal>
          <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="Hitmaker" />
            <IconPill text="Stage Power" />
          </Reveal>
        </div>
      );

    case 'global':
      return (
        <div className="space-y-5">
          <SectionTitle>Global Breakthrough</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              One Dance avec Drake propulse Wizkid dans les top charts internationaux et installe l Afrobeats dans le mainstream.
            </p>
          </Reveal>

          <Reveal step={2} revealStep={revealStep}>
            <div className="relative min-h-52 overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(15,53,95,0.6),rgba(2,5,12,0.9))] bg-[length:42px_42px,42px_42px,auto] p-3">
              {mapDots.map((dot) => (
                <motion.div
                  key={dot.country}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/75 bg-black/75 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-amber-100 sm:text-[0.68rem]"
                  style={{ left: dot.left, top: dot.top }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {dot.country}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="#1 multi countries" />
            <IconPill text="Billions of streams" />
            <IconPill text="Afrobeats worldwide" />
          </Reveal>
        </div>
      );

    case 'afrobeats':
      return (
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="space-y-4">
            <SectionTitle>Afrobeats Revolution</SectionTitle>
            <Reveal step={1} revealStep={revealStep}>
              <p className="text-base text-slate-200 sm:text-lg">
                Wizkid a porte une identite musicale africaine sur des scenes globales, sans diluer son ADN.
              </p>
            </Reveal>
            <Reveal step={2} revealStep={revealStep} className="grid gap-3 sm:grid-cols-2">
              <StatCard label="Sound" value="Afrobeats mainstream" />
              <StatCard label="Culture" value="African pride amplified" />
            </Reveal>
            <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
              <IconPill text="Ambassador" />
              <IconPill text="Movement" />
            </Reveal>
          </div>

          <div className="glass-panel overflow-hidden rounded-3xl border border-white/20 p-3">
            <iframe
              src="https://www.youtube.com/embed/XRXUSCBzDIg"
              title="Wizkid - Afrobeats Revolution"
              className="aspect-video w-full rounded-2xl"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );

    case 'awards':
      return (
        <div className="space-y-5">
          <SectionTitle>Awards & Records</SectionTitle>
          <Reveal step={1} revealStep={revealStep} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Grammy" value="Winner" />
            <StatCard label="BET Awards" value="Multiple Wins" />
            <StatCard label="Streams" value={<AnimatedCounter target={5} suffix="B+" isActive={isActive} />} />
            <StatCard label="Monthly Reach" value={<AnimatedCounter target={30} suffix="M+" isActive={isActive} />} />
          </Reveal>
          <Reveal step={2} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Les chiffres confirment l impact: constance, longévité, influence transnationale.
            </p>
          </Reveal>
          <Reveal step={3} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="Elite Awards" />
            <IconPill text="Chart Authority" />
          </Reveal>
        </div>
      );

    case 'videos':
      return (
        <div className="space-y-5">
          <SectionTitle>Video Experience</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="text-base text-slate-200 sm:text-lg">Cliquez sur une carte pour lancer la vidéo.</p>
          </Reveal>

          <Reveal step={2} revealStep={revealStep} className="grid gap-4 md:grid-cols-3">
            {videoCards.map((video) => (
              <button
                key={video.youtubeId}
                type="button"
                onClick={() => setActiveVideo(video)}
                className="group overflow-hidden rounded-2xl border border-white/20 bg-slate-900/55 text-left transition hover:-translate-y-1 hover:border-amber-300/65"
              >
                <div className="relative">
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="h-40 w-full object-cover brightness-75 transition group-hover:scale-105 group-hover:brightness-95"
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/55 bg-black/75 px-4 py-1 text-xs uppercase tracking-[0.12em] text-white">
                    Play
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-display text-lg font-bold text-white">{video.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{video.description}</p>
                </div>
              </button>
            ))}
          </Reveal>

          <Reveal step={2} revealStep={revealStep}>
            <InteractiveGallery />
          </Reveal>

          <AnimatePresence>
            {activeVideo && (
              <motion.div
                className="fixed inset-0 z-[130] grid place-items-center bg-black/85 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideo(null)}
              >
                <motion.div
                  className="w-full max-w-5xl rounded-3xl border border-white/20 bg-slate-950/95 p-4"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-white">{activeVideo.title}</h3>
                    <button
                      type="button"
                      onClick={() => setActiveVideo(null)}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-slate-200 transition hover:border-amber-300/60 hover:text-amber-100"
                    >
                      Close
                    </button>
                  </div>
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    className="aspect-video w-full rounded-2xl"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );

    case 'legacy':
      return (
        <div className="space-y-5">
          <SectionTitle>Influence & Legacy</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Son impact depasse la musique: mode, narration, identite africaine et inspiration d une nouvelle generation.
            </p>
          </Reveal>

          <Reveal step={2} revealStep={revealStep} className="grid gap-4 md:grid-cols-2">
            <video controls preload="metadata" className="w-full rounded-2xl border border-white/20 bg-black">
              <source src={slide.videoFile} type="video/mp4" />
            </video>
            {slide.secondVideoFile ? (
              <video controls preload="metadata" className="w-full rounded-2xl border border-white/20 bg-black">
                <source src={slide.secondVideoFile} type="video/mp4" />
              </video>
            ) : null}
          </Reveal>

          <Reveal step={3} revealStep={revealStep} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Artists" value="New generation inspired" />
            <StatCard label="Fashion" value="Global style reference" />
            <StatCard label="Culture" value="African identity amplified" />
            <StatCard label="Reputation" value="Long-term global respect" />
          </Reveal>
          <Reveal step={4} revealStep={revealStep} className="flex flex-wrap gap-2">
            <IconPill text="Influence" />
            <IconPill text="Legacy" />
            <IconPill text="Respect" />
          </Reveal>
        </div>
      );

    case 'greatest':
      return (
        <div className="space-y-5">
          <SectionTitle>Why He Is the Greatest African Artist</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="max-w-3xl text-base text-slate-200 sm:text-lg">
              Il cumule impact culturel, performance commerciale, influence artistique et constance sur la duree.
            </p>
          </Reveal>
          <Reveal step={2} revealStep={revealStep} className="grid gap-3 md:grid-cols-2">
            <StatCard label="Charts" value="Global and sustained" />
            <StatCard label="Collaborations" value="Top-tier international" />
            <StatCard label="Storytelling" value="Culture-first vision" />
            <StatCard label="Influence" value="Cross-generational" />
          </Reveal>
          <Reveal step={3} revealStep={revealStep}>
            <p className="font-display text-2xl font-bold text-amber-100 sm:text-4xl">
              He did not follow the global sound. He helped redefine it.
            </p>
          </Reveal>
        </div>
      );

    case 'message':
      return (
        <div className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Final Message</p>
          <SectionTitle>Inspirational Message</SectionTitle>
          <Reveal step={1} revealStep={revealStep}>
            <p className="mx-auto max-w-4xl font-display text-2xl font-bold leading-tight text-amber-100 sm:text-4xl lg:text-5xl">
              From Lagos dreams to global stages, African excellence has no ceiling.
            </p>
          </Reveal>
          <Reveal step={2} revealStep={revealStep}>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Thank You</p>
          </Reveal>
        </div>
      );

    default:
      return null;
  }
}
