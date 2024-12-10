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

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    if (!userId) {
      console.warn('EmailJS User ID is not set');
      return;
    }
    emailjs.init(userId);
    console.log('EmailJS initialized');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    console.log('Attempting to send email...');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      console.error('EmailJS configuration is incomplete');
      setStatus('error');
      return;
    }

    try {
      console.log('Sending email with data:', {
        serviceId,
        templateId,
        from_name: formData.name,
        from_email: formData.email,
        message_length: formData.message.length,
      });

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
        disabled={status === 'sending'}
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
