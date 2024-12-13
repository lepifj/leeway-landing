'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-yellow-500/20">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Image
              src="/LeewayLogo.png"
              alt="Leeway Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-yellow-500 font-bold text-xl">Leeway</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm text-center"
          >
            {new Date().getFullYear()} Leeway. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
