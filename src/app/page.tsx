'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [contentLoaded, setContentLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('Page mounted');
    setContentLoaded(true);
  }, []);

  // Start video and fade timer after content is loaded
  useEffect(() => {
    if (contentLoaded && videoRef.current) {
      videoRef.current.play();
      // Fade in the video
      setTimeout(() => {
        setVideoOpacity(1);
      }, 100); // Small delay to ensure video has started

      // Start the fade out timer
      const fadeOutTimer = setTimeout(() => {
        setVideoOpacity(0);
      }, 18000);
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [contentLoaded]);

  return (
    <main className="bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: videoOpacity,
            transition: 'opacity 1s ease-out'
          }}
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video load started')}
          onLoadedData={() => console.log('Video data loaded')}
          onTransitionEnd={(e) => {
            const video = e.target as HTMLVideoElement;
            if (videoOpacity === 0) {
              video.pause();
            }
          }}
        >
          <source src="Leeway.mp4" type="video/mp4" />
        </video>
       
        {/* Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setContentLoaded(true)}
          className="text-center relative z-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent mb-6">
            Leeway
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4">
          Leading the Way in Modern Web Design and Digital Excellence for You and Your Business.
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
          >
            Learn More
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

      {/* About Section */}
      <section id="about" className="relative bg-black py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-900/10 to-black pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-16 text-center">
              About Us
            </h2>
            
            <div className="max-w-4xl mx-auto text-center mb-20">
              <p className="text-xl text-gray-300 mb-12">
                We are a passionate team driven by the belief that great design and development can transform businesses. Our goal is to help professionals and small businesses thrive by crafting modern, impactful landing pages that leave lasting impressions. We do what we do because we understand the power of a strong digital presence in unlocking new opportunities and success. At Leeway, every project is a step toward helping our clients achieve their goals with creativity, precision, and purpose.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="p-6 rounded-lg border border-yellow-500/20 bg-black/50">
                  <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Our Vision</h3>
                  <p className="text-gray-300">To empower businesses with stunning designs and smart development, delivering digital solutions that inspire and succeed.</p>
                </div>
                <div className="p-6 rounded-lg border border-yellow-500/20 bg-black/50">
                  <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Our Values</h3>
                  <p className="text-gray-300">Excellence in design, precision in development, and dedication to bringing your vision to life.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'Stay ahead with cutting-edge web design tailored to your needs',
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
                  <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative bg-black py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-900/10 to-black pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-300">
              Comprehensive digital solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
                features: ['Custom Website Design', 'E-commerce Solutions', 'Progressive Web Apps', 'CMS Integration'],
                icon: '🌐'
              },
              {
                title: 'Software Development',
                description: 'Robust software solutions that streamline your business operations.',
                features: ['Custom Software Solutions', 'Enterprise Applications', 'API Development', 'Cloud Integration'],
                icon: '💻'
              },
              {
                title: 'Mobile Applications',
                description: 'Native and cross-platform mobile apps that engage your users.',
                features: ['iOS Development', 'Android Development', 'Cross-platform Solutions', 'App Maintenance'],
                icon: '📱'
              },
              {
                title: 'Custom Solutions',
                description: 'Tailored digital solutions to address your unique challenges.',
                features: ['Business Analysis', 'Custom Integration', 'Legacy System Updates', 'Technical Consulting'],
                icon: '⚡'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="group relative p-8 rounded-xl border border-yellow-500/20 bg-black/50 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl"
                  >
                    {service.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-yellow-500 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-gray-400"
                        >
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 px-6 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Enquire Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative bg-black py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-yellow-900/20 pointer-events-none opacity-50" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Have questions or ready to transform your business? Send us a message and we'll get back to you shortly.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
