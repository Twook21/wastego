import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Play,
  QrCode,
} from "lucide-react";
import QRCode from "../assets/qr-placeholder.png";

function DownloadPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(0);

  const installSteps = [
    {
      title: t("download.install.steps.step1_title"),
      desc: t("download.install.steps.step1_desc"),
    },
    {
      title: t("download.install.steps.step2_title"),
      desc: t("download.install.steps.step2_desc"),
    },
    {
      title: t("download.install.steps.step3_title"),
      desc: t("download.install.steps.step3_desc"),
    },
  ];
  const faqItems = [
    { q: t("download.faq.items.q1"), a: t("download.faq.items.a1") },
    { q: t("download.faq.items.q2"), a: t("download.faq.items.a2") },
    { q: t("download.faq.items.q3"), a: t("download.faq.items.a3") },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden bg-surface-50 text-surface-900 dark:bg-[#010909] dark:text-surface-50 [&_p]:leading-relaxed">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <section className="relative border-b border-surface-200/80 px-6 pb-20 pt-28 dark:border-surface-800/80 md:pb-24">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="max-w-2xl text-4xl font-black leading-[1.1] tracking-[-0.01em] text-primary dark:text-white md:text-5xl lg:text-6xl">
              {t("download.hero.title")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-dark dark:from-white dark:to-accent">
                {t("download.hero.title_highlight")}
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-surface-600 dark:text-surface-300 md:text-lg">
              {t("download.hero.description")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="btn-glow px-6 py-3 text-sm font-semibold"
                aria-label={t("download.hero.cta_play_aria")}
              >
                <Play size={16} />
                {t("download.hero.cta_play")}
              </a>
              <a
                href="#"
                className="btn-primary px-6 py-3 text-sm font-semibold"
                aria-label={t("download.hero.cta_appstore_aria")}
              >
                <Download size={16} />
                {t("download.hero.cta_appstore")}
              </a>
              <a
                href="#"
                className="rounded-2xl border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary/40 dark:border-surface-700 dark:bg-surface-900 dark:text-white"
                aria-label={t("download.hero.cta_apk_aria")}
              >
                <ArrowRight size={16} className="inline mr-1" />
                {t("download.hero.cta_apk")}
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card relative rounded-3xl p-6 md:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-surface-500">
                {t("download.qr.title")}
              </p>
              <QrCode className="text-accent-dark dark:text-accent" size={18} />
            </div>
            <div className="rounded-2xl border border-surface-200/80 bg-white p-4 dark:border-surface-600 dark:bg-white">
              <img
                src={QRCode}
                alt={t("download.qr.image_alt")}
                className="mx-auto h-52 w-52 rounded-xl object-cover dark:invert-0 dark:brightness-100"
              />
            </div>
            <p className="mt-5 text-[15px] text-surface-600 dark:text-surface-300">
              {t("download.qr.description")}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {installSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-200 bg-white px-3 py-2.5 text-center dark:border-surface-700 dark:bg-surface-900/70"
                >
                  <p className="text-xs font-black text-primary dark:text-white">{index + 1}</p>
                  <p className="mt-1.5 text-[11px] leading-4 text-surface-600 dark:text-surface-300">{step.title}</p>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="rounded-3xl border border-surface-200 bg-white p-8 dark:border-surface-800 dark:bg-surface-900/80">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              {t("download.install.kicker")}
            </p>
            <h2 className="mt-2 text-3xl font-black text-primary dark:text-white md:text-4xl">
              {t("download.install.title")}
            </h2>
            <p className="mt-4 text-[15px] text-surface-600 dark:text-surface-300">
              {t("download.install.desc")}
            </p>
            <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 p-4 text-sm font-semibold text-accent-dark dark:text-accent">
              Clean 3-step flow. Less friction. Faster first action.
            </div>
          </div>

          <div className="relative space-y-4 pl-5 md:pl-6">
            <div className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-px bg-surface-200 dark:bg-surface-700" />
            {installSteps.map((step, index) => (
              <Motion.div
                key={step.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-surface-200 bg-white p-5 dark:border-surface-800 dark:bg-surface-900"
              >
                <span className="absolute -left-[1.85rem] top-6 inline-flex h-4 w-4 rounded-full border-2 border-white bg-accent dark:border-[#010909]" />
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-white dark:bg-accent dark:text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold leading-snug text-primary dark:text-white">{step.title}</p>
                    <p className="mt-2 text-[15px] text-surface-600 dark:text-surface-300">{step.desc}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-surface-200 bg-white p-8 dark:border-surface-800 dark:bg-surface-900">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
            {t("download.faq.kicker")}
          </p>
          <h2 className="mt-2 text-2xl font-black text-primary dark:text-white md:text-3xl">
            {t("download.faq.title")}
          </h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border bg-surface-50/70 dark:bg-surface-900/70 ${isOpen
                    ? "border-accent/40"
                    : "border-surface-200 dark:border-surface-800"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left md:py-5"
                  >
                    <span className="text-[15px] font-semibold leading-relaxed text-primary dark:text-white">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-surface-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-dark dark:text-accent" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-[15px] text-surface-600 dark:text-surface-300">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-primary/15 bg-primary p-8 text-white dark:border-accent/20 dark:bg-[#082627] md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {t("download.closing.kicker")}
              </p>
              <h3 className="mt-2 text-2xl font-black md:text-3xl">
                {t("download.closing.title")}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                {t("download.closing.desc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-glow px-6 py-3 text-sm uppercase tracking-wider">
                {t("download.closing.cta_demo")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DownloadPage;
