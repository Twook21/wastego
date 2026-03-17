import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Replace with your Formspree form ID: https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  const contacts = [
    { icon: "ri-map-pin-2-line", label: "Location", value: "Surabaya, Indonesia" },
    { icon: "ri-mail-line", label: "Email", value: "wastego.idn@gmail.com" },
    { icon: "ri-time-line", label: "Response Time", value: "Within 24 hours" },
    { icon: "ri-linkedin-box-line", label: "LinkedIn", value: "linkedin.com/company/wastego" },
  ];

  const faqs = [
    { q: "How does WasteGo work?", a: "Residents schedule pickups via the app. Our AI dispatches the nearest EcoBuddy, who collects and sorts the waste. Residents earn rewards; collectors receive instant payment." },
    { q: "Which cities are currently served?", a: "We're currently active across 3 cities in East Java, with Surabaya as our primary hub. Expansion to 10 cities is planned for late 2025." },
    { q: "Is WasteGo free to use?", a: "The app is free to download. Basic pickup scheduling is free. Premium features for businesses and local governments are priced separately." },
    { q: "How can cities or organizations partner with WasteGo?", a: "We're actively looking for government and corporate partners. Please use the contact form and mention 'Partnership' in the subject." },
  ];

  return (
    <div className="relative bg-surface-50 dark:bg-[#010909]">

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent mb-4 block">Contact</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-primary dark:text-white tracking-tight leading-tight mb-5">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-dark dark:from-white dark:to-accent">impactful together.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-surface-600 dark:text-surface-300">
              Whether you're a city government, investor, corporate partner, or just curious, we'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3 bg-white dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/50 rounded-3xl p-8 md:p-10">
              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6">
                    <i className="ri-check-double-line text-3xl text-accent-dark dark:text-accent"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-primary dark:text-white mb-3">Message Sent!</h3>
                  <p className="text-surface-500 max-w-sm">We'll get back to you within 24 hours. Thank you for reaching out to WasteGo.</p>
                  <button onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-3 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-semibold text-primary dark:text-white hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-primary dark:text-white mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                        { id: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
                      ].map(f => (
                        <div key={f.id}>
                          <label htmlFor={f.id} className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">{f.label}</label>
                          <input type={f.type} id={f.id} name={f.id} value={formData[f.id]} onChange={handleChange} required
                            placeholder={f.placeholder}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900/50 text-primary dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-sm" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">Subject</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900/50 text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-sm">
                        <option value="">Select a topic...</option>
                        <option value="Partnership">Partnership / Collaboration</option>
                        <option value="Investment">Investment Inquiry</option>
                        <option value="Demo Request">Demo Request</option>
                        <option value="Government">Government / Municipality</option>
                        <option value="General">General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">Message</label>
                      <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required
                        placeholder="Tell us what you have in mind..."
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900/50 text-primary dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-sm resize-none"></textarea>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                    )}
                    <motion.button type="submit" disabled={status === "submitting"}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="w-full py-4 rounded-xl bg-primary dark:bg-white text-white dark:text-primary font-bold transition-all hover:bg-primary-dark dark:hover:bg-surface-100 flex items-center justify-center gap-2 disabled:opacity-60">
                      {status === "submitting" ? (
                        <><i className="ri-loader-4-line animate-spin"></i> Sending...</>
                      ) : (
                        <><i className="ri-send-plane-line"></i> Send Message</>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-primary dark:bg-surface-800/40 border border-primary-light dark:border-surface-700/50 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px]"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-6">Contact Details</h3>
                  <div className="space-y-5">
                    {contacts.map(c => (
                      <div key={c.label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <i className={`${c.icon} text-accent`}></i>
                        </div>
                        <div>
                          <div className="text-xs text-white/50 font-medium">{c.label}</div>
                          <div className="text-sm text-white font-semibold">{c.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/50 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-primary dark:text-white uppercase tracking-widest mb-5">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: "ri-instagram-line", href: "https://www.instagram.com/" },
                    { icon: "ri-linkedin-box-line", href: "https://www.linkedin.com/company/wastego" },
                    { icon: "ri-twitter-x-line", href: "https://x.com/" },
                    { icon: "ri-facebook-circle-line", href: "https://www.facebook.com/" },
                  ].map(s => (
                    <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-surface-200 dark:border-surface-700 flex items-center justify-center text-primary dark:text-white hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                      <i className={`${s.icon} text-lg`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-surface-100 dark:bg-surface-900/40 border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">FAQ</span>
              <h2 className="text-4xl font-bold text-primary dark:text-white tracking-tight mt-3">Common Questions</h2>
            </motion.div>
            <div className="space-y-4">
              {faqs.map(faq => (
                <motion.div key={faq.q} variants={fadeUp}
                  className="bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700/50 rounded-2xl p-7">
                  <h3 className="font-bold text-primary dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default ContactPage;
