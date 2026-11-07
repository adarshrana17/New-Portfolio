import { useState } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeading from './SectionHeading';
import SocialLinks from './SocialLinks';
import { personalInfo } from '../data/portfolioData';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  User,
  MessageSquare,
  Phone,
  Sparkles
} from 'lucide-react';

export default function ContactSection() {
  const { links } = personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS credentials are configured in .env
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS credentials missing in .env');
      setErrorMessage(
        'EmailJS service is not configured yet. Please add your VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'adarshrana540@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 7000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrorMessage(
        error?.text || 'Failed to send message. Please try again or reach out directly at ' + links.email
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    if (links.email) {
      navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Direct Web-safe email URL (opens Gmail Compose in browser, or custom link if http is provided)
  const emailUrl = links.email?.startsWith('http')
    ? links.email
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email || '')}`;

  return (
    <section id="contact" className="py-12 sm:py-16">
      <SectionHeading
        badge="Get In Touch"
        title="Let's build something"
        highlight="together"
        subtitle="Have a project in mind, an exciting role, or just want to connect? Reach out directly or drop a message."
      />

      {/* Two-Column Contact Layout (Clean direct layout without redundant outer card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Communication Channels & Information */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Got an opportunity or project? Let's talk.
            </h3>
            <p className="mt-2.5 sm:mt-3 text-sm text-slate-300 leading-relaxed">
              I am always interested in discussing modern frontend engineering, scalable component systems, and impactful digital experiences.
            </p>
          </div>

          {/* Direct Communication Channels (Clean unboxed rows) */}
          <div className="space-y-4 sm:space-y-5">
            {/* Direct Email Field */}
            <div className="group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Direct Email
                    </span>
                    <a
                      href={emailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-slate-100 hover:text-orange-400 transition-colors truncate block"
                      title="Open Gmail to compose email"
                    >
                      {links.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="contact-icon-btn p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={emailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send email"
                    className="contact-icon-btn p-2 rounded-lg text-slate-400 hover:text-orange-400 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                    title="Open Gmail to compose email"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {copied && (
                <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5 pl-13">
                  <Check size={12} />
                  <span>Email copied to clipboard!</span>
                </div>
              )}
            </div>

            {/* Location & Availability Field */}
            {links.location && (
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Location & Work Mode
                  </span>
                  <span className="text-sm font-semibold text-slate-100 block">
                    {links.location}
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Open to Remote & Hybrid worldwide
                  </span>
                </div>
              </div>
            )}

            {/* Mobile Number Field */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Mobile Number
                </span>
                <span className="text-sm font-semibold text-slate-100 block mt-0.5">
                  +91 8988207845
                </span>
              </div>
            </div>
          </div>

          {/* Social Presence Strip */}
          <div className="pt-3 sm:pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Social Profiles
            </span>
            <SocialLinks iconSize={18} />
          </div>
        </div>

        {/* Right Column: Modern Direct Message Form (Inner Box) */}
        <div className="lg:col-span-7">
          <div className="contact-form-card p-5 sm:p-7 lg:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 shadow-xl transition-all duration-200">
            {/* Form Header */}
            <div className="contact-header-border mb-5 pb-3 sm:mb-6 sm:pb-4 border-b border-slate-800/70">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare size={17} className="text-orange-400" />
                <span>Send a Direct Message</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your details below and I will respond to your inquiry shortly.
              </p>
            </div>

            {isSubmitted && (
              <div className="contact-success mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>Thank you! Your message has been sent successfully to adarshrana540@gmail.com. I will get back to you shortly.</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm flex items-start gap-3">
                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block leading-relaxed">{errorMessage}</span>
                  <a
                    href={`mailto:${links.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
                  >
                    <span>Send directly via your email client</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    <span>Your Name <span className="text-orange-400">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adarsh Rana"
                    className="contact-input w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" />
                    <span>Your Email <span className="text-orange-400">*</span></span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="contact-input w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-slate-400" />
                  <span>Subject <span className="text-orange-400">*</span></span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="contact-input w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-slate-400" />
                  <span>Your Message <span className="text-orange-400">*</span></span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or open role..."
                  className="contact-input w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all shadow-inner resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-400 text-slate-950 transition-all duration-200 shadow-md shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                <Send size={15} className={isSubmitting ? 'animate-pulse' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
