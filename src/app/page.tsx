'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">We Lead</span> The Way
            </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4">
          Leading the Way in Modern Web Design and Digital Excellence for You and Your Business.
          </p>
          <div className="flex gap-4 justify-center">
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
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
            >
              Our Work
            </motion.button>
          </div>
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-16 text-center">
              About Us
            </h2>
            
            <div className="max-w-4xl mx-auto text-center mb-20">
              <p className="text-xl text-gray-300 mb-12">
                We are a passionate team driven by the belief that great design and development can transform businesses. Our goal is to help professionals and small businesses thrive with modern tech solutions that leave lasting impressions. We do what we do because we understand the power of a strong digital presence in unlocking new opportunities and success. At Leeway, every project is a step toward helping our clients achieve their goals with creativity, precision, and purpose.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="p-6 rounded-lg border border-yellow-500/20 bg-black/50">
                  <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Our Vision</h3>
                  <p className="text-gray-300">To empower businesses by delivering digital solutions that inspire success.</p>
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
                  viewport={{ once: true }}
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
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-300">Comprehensive web solutions to elevate your digital presence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom Web Development</h3>
              <p className="text-gray-300">Tailored web solutions built with cutting-edge technologies. From responsive websites to complex web applications, we bring your vision to life.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
              <p className="text-gray-300">Beautiful, intuitive interfaces designed with your users in mind. We create engaging experiences that keep visitors coming back.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Web Performance</h3>
              <p className="text-gray-300">Lightning-fast websites optimized for speed and performance. We ensure your site loads quickly and runs smoothly across all devices.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">E-commerce Solutions</h3>
              <p className="text-gray-300">Full-featured online stores with secure payment processing, inventory management, and seamless user experience.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Website Maintenance</h3>
              <p className="text-gray-300">Ongoing support and maintenance to keep your website secure, up-to-date, and performing at its best.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">SEO & Marketing</h3>
              <p className="text-gray-300">Boost your online visibility with strategic SEO optimization and digital marketing solutions to drive organic traffic.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section - Temporarily hidden until we have projects to showcase */}
      {/* <section id="work" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h2>
            <p className="text-xl text-gray-300">Showcasing our current work with our amazing clients who have entrusted.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="E-commerce Project"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">E-commerce Platform</h3>
                <p className="text-gray-300">A modern e-commerce solution with real-time inventory management and secure payment processing.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80"
                  alt="Portfolio Website"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Portfolio Website</h3>
                <p className="text-gray-300">A stunning portfolio website for a creative agency, featuring dynamic animations and responsive design.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Web Application"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">SaaS Dashboard</h3>
                <p className="text-gray-300">A comprehensive SaaS dashboard with real-time analytics, user management, and customizable widgets.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="contact" className="relative bg-black py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-yellow-900/20 pointer-events-none opacity-50" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Have questions or ready to transform your business? Send us a message and we’ll get back to you shortly.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
