'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to your backend or a service like Formspree
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h2>
      
      {submitStatus === 'success' && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
          Message sent successfully! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium w-full flex items-center justify-center disabled:opacity-50"
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message <FiSend className="ml-2" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;