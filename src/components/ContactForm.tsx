'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isEmailJSInitialized, setIsEmailJSInitialized] = useState(false);

  useEffect(() => {
    // Check if all required environment variables are present
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!userId || !serviceId || !templateId) {
      console.error('Missing EmailJS configuration. Please check environment variables.');
      return;
    }

    try {
      emailjs.init({
        publicKey: userId,
        blockHeadless: true,
        limitRate: {
          id: 'app',
          throttle: 10000 // Prevent spam
        }
      });
      setIsEmailJSInitialized(true);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      setStatus('error');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    // Check EmailJS initialization
    if (!isEmailJSInitialized) {
      console.error('EmailJS not initialized');
      setStatus('error');
      return;
    }

    setStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      console.error('Missing EmailJS service or template ID');
      setStatus('error');
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'kelepifj@gmail.com'
        }
      );

      console.log('Email sent successfully:', result);

      if (result.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Unexpected response status:', result.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 space-y-6"
    >
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/40"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/40"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/40 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending' || !isEmailJSInitialized}
        className="w-full px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status === 'success' && (
        <p className="text-green-500 text-center">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
      )}
    </motion.form>
  );
}
