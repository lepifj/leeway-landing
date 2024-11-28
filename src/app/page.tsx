'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Video Option */}
        {/* Uncomment the following for video background: */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="Leeway.mp4" type="video/mp4" />
        </video>
       

        {/* Background Image
        <div 
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/your-image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        /> */}

        {/* Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-6">
            Leeway
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4">
            Empowering your journey with elegant solutions
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10"
        >
          <ChevronDownIcon className="h-8 w-8 text-yellow-500 animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center text-yellow-500 mb-16"
          >
            Why Choose Leeway?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Stay ahead with cutting-edge solutions tailored to your needs',
                icon: '🚀'
              },
              {
                title: 'Excellence',
                description: 'Delivering quality that exceeds expectations every time',
                icon: '⭐'
              },
              {
                title: 'Growth',
                description: 'Scale your business with our powerful tools and support',
                icon: '📈'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg border border-yellow-500/20 bg-black/50 backdrop-blur-sm hover:border-yellow-500/40 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-black via-yellow-900/10 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              We believe in transforming businesses through innovative solutions that drive growth and success. Our commitment to excellence and customer satisfaction sets us apart.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg border border-yellow-500/20 bg-black/50">
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Our Vision</h3>
                <p className="text-gray-300">To be the leading force in digital transformation and innovation.</p>
              </div>
              <div className="p-6 rounded-lg border border-yellow-500/20 bg-black/50">
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Our Values</h3>
                <p className="text-gray-300">Innovation, integrity, and excellence in everything we do.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black to-yellow-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers who have transformed their business with Leeway.
            </p>
            <button className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
