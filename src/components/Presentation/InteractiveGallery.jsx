import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetUrl } from '../../utils/assetUrl';

const galleryItems = [
  { src: assetUrl('Wizkid.webp'), title: 'Global Stage Presence' },
  { src: assetUrl('Wizkid.webp'), title: 'Fashion Influence' },
  { src: assetUrl('Wizkid.webp'), title: 'Afrobeats Identity' },
  { src: assetUrl('Wizkid.webp'), title: 'Live Atmosphere' },
];

export default function InteractiveGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item, index) => (
          <motion.button
            key={`${item.title}-${index}`}
            type="button"
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-2xl border border-white/20 bg-slate-900/50 text-left"
            onClick={() => setSelected(item)}
          >
            <img src={item.src} alt={item.title} className="h-28 w-full object-cover brightness-90" />
            <span className="block p-2 text-xs text-slate-200">{item.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-white/20 bg-slate-950/95 p-4"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selected.src} alt={selected.title} className="w-full rounded-2xl" />
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-100">{selected.title}</p>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-white/20 px-3 py-1.5 text-xs text-slate-200 transition hover:border-amber-300/60 hover:text-amber-100"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
