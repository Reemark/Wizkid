import { motion } from 'framer-motion';

export default function ProgressBar({ progress }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-1.5 w-full bg-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 shadow-[0_0_24px_rgba(216,181,111,0.55)]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
    </div>
  );
}
