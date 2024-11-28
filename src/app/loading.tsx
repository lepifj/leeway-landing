'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h2 className="text-yellow-500 text-xl font-semibold">Loading...</h2>
      </motion.div>
    </div>
  );
}
