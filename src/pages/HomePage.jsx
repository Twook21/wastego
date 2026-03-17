import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import Mockup from "../assets/mockup/mockup-1.svg";

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return { count, ref };
}

function StatNumber({ value, suffix = "", label }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center px-4 py-2">
      <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-semibold text-white/50 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ── Marquee strip data ── */
const MARQUEE_ITEMS = [
  { icon: "ri-award-line", text: "500+ Active Users" },
  { icon: "ri-map-pin-2-line", text: "3 Cities in East Java" },
  { icon: "ri-star-fill", text: "4.9 App Rating" },
  { icon: "ri-recycle-line", text: "2,400 kg Waste Managed" },
  { icon: "ri-shield-check-line", text: "99.9% Tracking Accuracy" },
  { icon: "ri-money-dollar-circle-line", text: "Rp 0 Transaction Fee" },
  { icon: "ri-leaf-line", text: "Zero Hidden Costs" },
  { icon: "ri-government-line", text: "Municipality Dashboard Ready" },
];

function MarqueeItem({ icon, text }) {
  return (
    <span className="flex items-center gap-2.5 mx-8 text-sm font-semibold text-primary dark:text-white/80 whitespace-nowrap">
      <i className={`${icon} text-accent-dark dark:text-accent text-base`}></i>
      {text}
      <span className="ml-8 text-surface-300 dark:text-surface-700">•</span>
    </span>
  );
}

function HomePage() {
  const { t } = useTranslation(); const heroRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: -999, y: -999 });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── Cursor spotlight ── */
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const [activeHowStep, setActiveHowStep] = useState(0);

  const howSteps = [
    {
      id: "01",
      step: "01",
      icon: "ri-home-heart-line",
      title: t("how.step1_title"),
      desc: t("how.step1_desc"),
      grad: "from-blue-500/10 to-blue-500/5",
      iconBg: "bg-blue-500/15 dark:bg-blue-500/10",
      iconColor: "text-blue-500 dark:text-blue-400",
      bar: "bg-blue-500",
    },
    {
      id: "02",
      step: "02",
      icon: "ri-route-line",
      title: t("how.step2_title"),
      desc: t("how.step2_desc"),
      grad: "from-accent/15 to-accent/5",
      iconBg: "bg-accent/15",
      iconColor: "text-accent-dark dark:text-accent",
      bar: "bg-accent",
    },
    {
      id: "03",
      step: "03",
      icon: "ri-wallet-3-line",
      title: t("how.step3_title"),
      desc: t("how.step3_desc"),
      grad: "from-emerald-500/10 to-emerald-500/5",
      iconBg: "bg-emerald-500/15 dark:bg-emerald-500/10",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      bar: "bg-emerald-500",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [pauseTestimonials, setPauseTestimonials] = useState(false);

  const testimonialCards = [
    {
      id: "t1",
      name: t("testimonials.t1_name"),
      role: t("testimonials.t1_role"),
      quote: t("testimonials.t1_quote"),
      avatar: "B",
      color: "bg-blue-600 dark:bg-blue-500",
      rating: "5.0"
    },
    {
      id: "t2",
      name: t("testimonials.t2_name"),
      role: t("testimonials.t2_role"),
      quote: t("testimonials.t2_quote"),
      avatar: "S",
      color: "bg-emerald-600 dark:bg-emerald-500",
      rating: "4.9"
    },
    {
      id: "t3",
      name: t("testimonials.t3_name"),
      role: t("testimonials.t3_role"),
      quote: t("testimonials.t3_quote"),
      avatar: "H",
      color: "bg-slate-700 dark:bg-slate-600",
      rating: "4.8"
    },
    {
      id: "t4",
      name: t("testimonials.t4_name"),
      role: t("testimonials.t4_role"),
      quote: t("testimonials.t4_quote"),
      avatar: "R",
      color: "bg-violet-600 dark:bg-violet-500",
      rating: "4.9"
    },
  ];

  useEffect(() => {
    if (pauseTestimonials) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialCards.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [pauseTestimonials, testimonialCards.length]);

  const visibleTestimonials = [0, 1].map((offset) => {
    const index = (activeTestimonial + offset) % testimonialCards.length;
    return testimonialCards[index];
  });

  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[92vh] flex items-center pt-24 pb-20 overflow-hidden"
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

        {/* ✨ Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(181,255,0,0.07), transparent 60%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            <Motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">

              <Motion.h1 variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight mb-6">
                <span className="text-primary dark:text-white">{t("hero.headline1")}</span>
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-dark dark:from-white dark:to-accent">
                  {t("hero.headline2")}
                </span>
              </Motion.h1>

              <Motion.p variants={fadeUp}
                className="text-lg md:text-xl text-surface-600 dark:text-surface-300 leading-relaxed mb-10 max-w-lg">
                {t("hero.subheadline")}
              </Motion.p>

              <Motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link to="/contact"
                  className="group px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-xl flex items-center gap-2">
                  {t("hero.cta_demo")}
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link to="/about"
                  className="px-8 py-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm font-semibold hover:bg-surface-100 dark:hover:bg-surface-700 transition-all flex items-center gap-2 text-primary dark:text-white">
                  <i className="ri-play-circle-fill text-xl text-accent-dark dark:text-accent"></i>
                  {t("hero.cta_watch")}
                </Link>
              </Motion.div>

              <Motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-center gap-8 pt-8 border-t border-surface-200 dark:border-surface-800">
                {[
                  { value: "500+", label: t("hero.stat_pilot") },
                  { value: "3", label: t("hero.stat_cities") },
                  { value: "4.9★", label: t("hero.stat_rating") },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-primary dark:text-white">{s.value}</div>
                    <div className="text-xs text-surface-500 font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </Motion.div>
            </Motion.div>

            {/* Phone mockup */}
            <Motion.div className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="relative z-10 w-full max-w-[300px] lg:scale-110">
                <div className="relative aspect-[9/19.5] bg-surface-900 rounded-[3rem] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] border border-white/10 ring-1 ring-black/5">
                  <div className="w-full h-full bg-surface-50 dark:bg-surface-900 rounded-[2.5rem] overflow-hidden border border-black/5">
                    <img
                      src={Mockup}
                      className="w-full h-full object-cover"
                      alt="WasteGo App Mockup"
                    />
                  </div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                </div>
              </div>

            </Motion.div>
          </div>
        </div>
      </section>

      {/* ✨ MARQUEE STRIP */}
      <div className="relative overflow-hidden py-4 border-y border-surface-200 dark:border-surface-800 bg-surface-50/80 dark:bg-surface-900/40 backdrop-blur-sm">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <MarqueeItem key={i} {...item} />
          ))}
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="py-20 bg-surface-100 dark:bg-surface-900/50 border-b border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
            <Motion.div variants={fadeUp} className="max-w-md lg:pt-1">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent mb-3 block">{t("problem.label")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white tracking-tight leading-tight">
                {t("problem.title")}
              </h2>
            </Motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { text: t("problem.p1"), icon: "ri-truck-line" },
                { text: t("problem.p2"), icon: "ri-money-dollar-circle-line" },
                { text: t("problem.p3"), icon: "ri-bar-chart-2-line" },
                { text: t("problem.p4"), icon: "ri-user-search-line" },
              ].map((item) => (
                <Motion.div key={item.text} variants={fadeUp}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/50 hover:border-red-200 dark:hover:border-red-900/40 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                    <i className={`${item.icon} text-red-500 text-lg`}></i>
                  </div>
                  <p className="text-sm md:text-[15px] leading-relaxed text-surface-600 dark:text-surface-300">{item.text}</p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section >

      {/* ── HOW IT WORKS ── */}
      < section className="py-28" >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="text-center mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{t("how.label")}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight mt-3">{t("how.title")}</h2>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
              {howSteps.map((s, index) => {
                const isActive = activeHowStep === index;
                return (
                  <Motion.div key={s.step} variants={fadeUp} className="relative group">
                    <button
                      type="button"
                      onClick={() => setActiveHowStep(index)}
                      aria-pressed={isActive}
                      className={`h-full w-full text-left bg-gradient-to-br ${s.grad} border rounded-3xl overflow-hidden transition-all duration-500 ${isActive
                        ? "border-accent/40 shadow-xl shadow-accent/10 md:-translate-y-1"
                        : "border-surface-200 dark:border-surface-700/50 opacity-85 hover:opacity-100 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
                        }`}
                    >
                      {/* Top color bar */}
                      <div className={`h-1 w-full ${s.bar} transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-45"}`}></div>
                      <div className="p-8 md:p-10">
                        {/* Icon + ghost number */}
                        <div className="flex items-start justify-between mb-8">
                          <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                            <i className={`${s.icon} text-2xl ${s.iconColor}`}></i>
                          </div>
                          <span className={`text-7xl font-black leading-none select-none transition-colors ${isActive ? "text-primary/30 dark:text-surface-700" : "text-primary/20 dark:text-surface-800"}`}>{s.step}</span>
                        </div>
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-3 tracking-tight">{s.title}</h3>
                        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{s.desc}</p>
                        {/* Bottom progress dots */}
                        <div className="mt-8 flex items-center gap-2">
                          {howSteps.map((_, dotIndex) => (
                            <div
                              key={`${s.id}-dot-${dotIndex}`}
                              className={`h-1 rounded-full transition-all duration-300 ${dotIndex === activeHowStep
                                ? `w-8 ${s.bar}`
                                : "w-2 bg-surface-200 dark:bg-surface-700"
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  </Motion.div>
                )
              })}
            </div>
          </Motion.div>
        </div>
      </section >


      {/* ── TRACTION ── */}
      < section className="py-24 relative overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark dark:from-surface-900 dark:to-[#010909]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">{t("traction.label")}</span>
              <h2 className="text-4xl font-bold text-white tracking-tight">{t("traction.title")}</h2>
            </Motion.div>
            <Motion.div variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x divide-white/10">
              <StatNumber value={500} suffix="+" label={t("traction.users")} />
              <StatNumber value={3} suffix="" label={t("traction.cities")} />
              <StatNumber value={2400} suffix=" kg" label={t("traction.waste")} />
              <StatNumber value={98} suffix="%" label={t("traction.satisfaction")} />
            </Motion.div>
          </Motion.div>
        </div>
      </section >

      {/* ── FEATURES BENTO ── */}
      < section className="py-28" >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{t("features.label")}</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight text-primary dark:text-white">
                {t("features.title1")} <span className="text-gradient-animated">{t("features.title2")}</span>
              </h2>
              <p className="text-surface-600 dark:text-surface-400 max-w-2xl text-lg">{t("features.subtitle")}</p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[minmax(260px,auto)]">
              <Motion.div variants={fadeUp}
                className="md:col-span-3 bg-surface-100 dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/50 rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden relative group hover:border-accent/20 transition-all duration-500">
                <div className="absolute right-0 top-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] group-hover:bg-accent/20 transition-all duration-700"></div>
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface-800 shadow-sm flex items-center justify-center mb-6 border border-surface-200 dark:border-surface-700 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-route-line text-2xl text-primary dark:text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-primary dark:text-white">{t("features.f1_title")}</h3>
                  <p className="text-surface-600 dark:text-surface-400 max-w-md leading-relaxed">{t("features.f1_desc")}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {[t("features.f1_t1"), t("features.f1_t2"), t("features.f1_t3")].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-accent/10 text-accent-dark dark:text-accent rounded-full text-xs font-semibold border border-accent/20">{tag}</span>
                  ))}
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp}
                className="md:col-span-1 bg-accent/10 border border-accent/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-accent/15 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-wallet-3-line text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-primary dark:text-white">{t("features.f2_title")}</h3>
                  <p className="text-primary/70 dark:text-white/70 text-sm leading-relaxed">{t("features.f2_desc")}</p>
                </div>
                <div className="text-3xl font-black text-primary dark:text-white tracking-tighter mt-6">
                  Rp 0 <span className="text-sm font-normal text-surface-500">{t("features.f2_stat")}</span>
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp}
                className="md:col-span-1 bg-surface-100 dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center group hover:border-accent/20 transition-all duration-300">
                <div className="text-5xl font-black text-primary dark:text-white tracking-tighter group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-sm text-surface-500 mt-2 font-medium">{t("features.f3_stat_label")}</div>
                <i className="ri-shield-check-line text-4xl text-accent/50 mt-6"></i>
              </Motion.div>

              <Motion.div variants={fadeUp}
                className="md:col-span-3 bg-primary dark:bg-[#051314] text-white border border-primary-light dark:border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden relative group">
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-all duration-700"></div>
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-government-line text-2xl text-accent"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{t("features.f4_title")}</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{t("features.f4_desc")}</p>
                  <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors group/link">
                    {t("features.f4_link")} <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        </div>
      </section >

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 relative overflow-hidden bg-surface-100 dark:bg-[#010909]">
        {/* Ambient glow for trust section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{t("testimonials.label")}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight mt-3">{t("testimonials.title")}</h2>
              <p className="mt-4 text-base md:text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                {t("testimonials.subtitle")}
              </p>
            </Motion.div>


            <div
              onMouseEnter={() => setPauseTestimonials(true)}
              onMouseLeave={() => setPauseTestimonials(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                {visibleTestimonials.map((item) => (
                  <Motion.div key={`${item.id}-${activeTestimonial}`}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative bg-white dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-shadow duration-500 min-h-[340px]">

                    {/* Top quote icon */}
                    <div className="absolute -top-5 left-8 w-12 h-12 bg-accent text-primary rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                      <i className="ri-double-quotes-l text-2xl"></i>
                    </div>

                    <div className="mt-4 flex-1">
                      <div className="flex items-center gap-1.5 mb-6 opacity-80">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="ri-star-fill text-accent-dark dark:text-accent text-sm"></i>
                        ))}
                      </div>
                      <p className="text-surface-800 dark:text-surface-100 text-lg leading-relaxed font-medium">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-8 mt-4 border-t border-surface-100 dark:border-surface-700">
                      <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-inner shrink-0 ring-4 ring-surface-50 dark:ring-surface-800`}>
                        {item.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-bold text-base text-primary dark:text-white">{item.name}</span>
                          <i className="ri-verified-badge-fill text-blue-500 text-base" title="Verified User"></i>
                        </div>
                        <div className="text-xs font-medium text-surface-500 dark:text-surface-400">{item.role}</div>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>

              {/* Navigation Indicators */}
              <div className="mt-12 flex items-center justify-center gap-2.5">
                {testimonialCards.map((card, idx) => {
                  const isActive = idx === activeTestimonial;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Show testimonial ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-500 ${isActive ? "w-10 bg-accent shadow-[0_0_10px_rgba(181,255,0,0.5)]" : "w-3 bg-surface-300 dark:bg-surface-700 hover:bg-surface-400 dark:hover:bg-surface-600"}`}
                    />
                  );
                })}
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      < section className="py-32" >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden border border-primary-light dark:border-surface-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark dark:from-surface-800/60 dark:to-surface-900/60"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full blur-[60px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{t("cta.title")}</h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">{t("cta.subtitle")}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact"
                  className="group px-8 py-4 rounded-xl bg-accent text-primary font-bold hover:scale-[1.02] transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                  {t("cta.btn_demo")}
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link to="/about"
                  className="px-8 py-4 rounded-xl border border-white/20 font-semibold hover:bg-white/10 transition-colors text-white flex items-center justify-center gap-2">
                  {t("cta.btn_learn")}
                </Link>
              </div>
            </div>
          </Motion.div>
        </div>
      </section >

    </div >
  );
}

export default HomePage;
