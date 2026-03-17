import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Theo from "/images/team/Theo.webp";
import Akmal from "/images/team/Akmal.webp";
import Alfi from "/images/team/Alfi.webp";
import Fahmi from "/images/team/Fahmi.webp";
import David from "/images/team/David.webp";

function AboutPage() {
  const { t } = useTranslation();
  const tx = (key, defaultValue) => t(key, { defaultValue });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

  const team = [
    {
      image: Theo,
      name: "Theo",
      role: "Sofware Engineer - Mobile",
      quote: "Turning Waste into Opportunities.",
    },
    {
      image: Akmal,
      name: "Akmal Bintang B.",
      role: "Software Engineer - Web",
      quote: "Nature Needs Action, Not Just Words.",
    },
    {
      image: Alfi,
      name: "Alfi Akmal Fariz",
      role: "Software Quality Assurance",
      quote: "Transform Waste, Create the Future.",
    },
    {
      image: Fahmi,
      name: "Fahmi Andika S.",
      role: "Software Engineer - Backend",
      quote: "One Small Step, Big Impact.",
    },
    {
      image: David,
      name: "David Ersa P.",
      role: "Software Quality Assurance",
      quote: "Trash is the trace of civilization.",
    },
  ];

  const milestones = [
    {
      id: "m1",
      year: tx("about.journey.milestones.m1_year", "2024"),
      event: tx(
        "about.journey.milestones.m1_event",
        "Ide lahir dari riset pengelolaan sampah di kampus. Lima founder bersatu membangun solusi."
      ),
    },
    {
      id: "m2",
      year: tx("about.journey.milestones.m2_year", "Q1 2025"),
      event: tx(
        "about.journey.milestones.m2_event",
        "MVP diluncurkan dan 50 pengguna awal pertama berhasil onboard di Surabaya."
      ),
    },
    {
      id: "m3",
      year: tx("about.journey.milestones.m3_year", "Q2 2025"),
      event: tx(
        "about.journey.milestones.m3_event",
        "Ekspansi ke 3 kota, mencapai 500+ pengguna aktif, serta meluncurkan EcoHive dan EcoCentral."
      ),
    },
    {
      id: "m4",
      year: tx("about.journey.milestones.m4_year", "2025 →"),
      event: tx(
        "about.journey.milestones.m4_event",
        "Skalasi menuju 10 kota sambil menyiapkan roadmap tokenisasi kredit karbon."
      ),
    },
  ];

  const values = [
    {
      id: "v1",
      icon: "ri-recycle-line",
      title: tx("about.values.items.v1_title", "Ekonomi Sirkular"),
      desc: tx("about.values.items.v1_desc", "Setiap kilogram yang tercatat membawa kita lebih dekat ke masa depan minim sampah."),
    },
    {
      id: "v2",
      icon: "ri-hand-coin-line",
      title: tx("about.values.items.v2_title", "Ekonomi yang Adil"),
      desc: tx("about.values.items.v2_desc", "Kolektor berhak mendapatkan penghasilan yang adil melalui pembayaran transparan dan tepat waktu."),
    },
    {
      id: "v3",
      icon: "ri-government-line",
      title: tx("about.values.items.v3_title", "Data untuk Tata Kelola"),
      desc: tx("about.values.items.v3_desc", "Kota membutuhkan intelijen real-time untuk membuat kebijakan yang lebih tepat."),
    },
    {
      id: "v4",
      icon: "ri-earth-line",
      title: tx("about.values.items.v4_title", "Planet sebagai Prioritas"),
      desc: tx("about.values.items.v4_desc", "Dampak lingkungan adalah kompas utama kami, bukan sekadar angka di dashboard."),
    },
  ];

  const stats = [
    { id: "founders", value: "5", label: tx("about.stats.items.founders", "Founder") },
    { id: "users", value: "500+", label: tx("about.stats.items.users", "Pengguna Awal") },
    { id: "cities", value: "3", label: tx("about.stats.items.cities", "Kota") },
    { id: "founded", value: "2025", label: tx("about.stats.items.founded", "Berdiri") },
  ];

  const missions = [
    {
      id: "m1",
      text: tx("about.direction.mission_items.m1", "Mengedukasi masyarakat tentang pemilahan sampah dan pembuangan yang bertanggung jawab"),
    },
    {
      id: "m2",
      text: tx("about.direction.mission_items.m2", "Mendorong penghasilan yang adil dan transparan bagi para kolektor sampah"),
    },
    {
      id: "m3",
      text: tx("about.direction.mission_items.m3", "Memberikan data persampahan real-time yang dapat ditindaklanjuti oleh pemerintah"),
    },
    {
      id: "m4",
      text: tx("about.direction.mission_items.m4", "Mempercepat adopsi ekonomi sirkular melalui data dan teknologi"),
    },
  ];

  return (
    <div className="relative bg-surface-50 dark:bg-[#010909]">
      <section className="relative overflow-hidden pb-24 pt-36">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <Motion.span variants={fadeUp} className="mb-4 block text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">
              {tx("about.hero.kicker", "Tentang WasteGo")}
            </Motion.span>
            <Motion.h1 variants={fadeUp} className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-primary dark:text-white sm:text-6xl">
              {tx("about.hero.title_prefix", "Dibangun oleh orang-orang yang percaya sampah adalah")}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-dark bg-clip-text text-transparent dark:from-white dark:to-accent">
                {tx("about.hero.title_highlight", "sumber daya yang belum dimaksimalkan.")}
              </span>
            </Motion.h1>
            <Motion.p variants={fadeUp} className="max-w-2xl text-xl leading-relaxed text-surface-600 dark:text-surface-300">
              {tx("about.hero.description", "WasteGo dimulai pada 2024 sebagai proyek kampus dan berkembang menjadi misi: memperbaiki infrastruktur persampahan Indonesia dengan teknologi yang bekerja untuk semua pihak.")}
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      <section className="border-y border-surface-200 bg-white/50 py-16 dark:border-surface-800 dark:bg-surface-900/30">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <Motion.div key={s.id} variants={fadeUp}>
                <div className="text-4xl font-black tracking-tighter text-primary dark:text-white">{s.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-surface-500">{s.label}</div>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{tx("about.direction.kicker", "Arah Kami")}</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary dark:text-white">{tx("about.direction.title", "Visi & Misi")}</h2>
            </Motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl border border-primary-light bg-primary p-10 dark:border-surface-700/50 dark:bg-surface-800/60">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-[60px]" />
                <div className="relative z-10">
                  <i className="ri-telescope-line mb-6 block text-3xl text-accent" />
                  <h3 className="mb-4 text-2xl font-bold text-white">{tx("about.direction.vision_title", "Visi")}</h3>
                  <p className="leading-relaxed text-white/70">{tx("about.direction.vision_desc", "Menjadi platform pengelolaan sampah terdepan di Indonesia yang menghubungkan komunitas, kolektor, dan pengolah dalam satu ekosistem yang efisien.")}</p>
                </div>
              </Motion.div>
              <Motion.div variants={fadeUp} className="rounded-3xl border border-surface-200 bg-surface-100 p-10 dark:border-surface-700/50 dark:bg-surface-800/40">
                <i className="ri-flag-2-line mb-6 block text-3xl text-accent-dark dark:text-accent" />
                <h3 className="mb-4 text-2xl font-bold text-primary dark:text-white">{tx("about.direction.mission_title", "Misi")}</h3>
                <ul className="space-y-3">
                  {missions.map((m) => (
                    <li key={m.id} className="flex items-start gap-3 text-sm text-surface-600 dark:text-surface-300">
                      <i className="ri-check-line mt-0.5 shrink-0 text-base text-accent-dark dark:text-accent" />
                      {m.text}
                    </li>
                  ))}
                </ul>
              </Motion.div>
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="border-y border-surface-200 bg-surface-100 py-24 dark:border-surface-800 dark:bg-surface-900/40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="mb-16 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{tx("about.values.kicker", "Nilai Kami")}</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary dark:text-white">{tx("about.values.title", "Prinsip yang kami pegang.")}</h2>
            </Motion.div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <Motion.div key={v.id} variants={fadeUp} className="group rounded-3xl border border-surface-200 bg-white p-8 transition-all duration-300 hover:border-accent/30 dark:border-surface-700/50 dark:bg-surface-800/50">
                  <i className={`${v.icon} mb-5 block text-3xl text-accent-dark transition-transform duration-300 group-hover:scale-110 dark:text-accent`} />
                  <h3 className="mb-2 font-bold text-primary dark:text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">{v.desc}</p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{tx("about.journey.kicker", "Perjalanan")}</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary dark:text-white">{tx("about.journey.title", "Cerita Kami")}</h2>
            </Motion.div>
            <div className="relative">
              <div className="space-y-0">
                {milestones.map((m, index) => (
                  <Motion.div key={m.id} variants={fadeUp} className="flex gap-8">
                    <div className="flex flex-col items-center">
                      <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                        <i className="ri-check-line text-sm font-bold text-primary" />
                      </div>
                      {index !== milestones.length - 1 && (
                        <div className="hidden w-px flex-grow bg-surface-200 dark:bg-surface-800 md:block" />
                      )}
                    </div>
                    <div className={index !== milestones.length - 1 ? "pb-12" : "pb-2"}>
                      <div className="mb-1 text-xs font-black uppercase tracking-widest text-accent-dark dark:text-accent">{m.year}</div>
                      <p className="leading-relaxed text-surface-700 dark:text-surface-300">{m.event}</p>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="border-t border-surface-200 bg-surface-100 py-24 dark:border-surface-800 dark:bg-surface-900/40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <Motion.div variants={fadeUp} className="mb-16 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark dark:text-accent">{tx("about.team.kicker", "Tim Kami")}</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary dark:text-white">{tx("about.team.title", "Siapa yang membangun ini.")}</h2>
              <p className="mt-3 text-surface-500">{tx("about.team.subtitle", "5 builder dari Surabaya, Indonesia.")}</p>
            </Motion.div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {team.map((member) => (
                <Motion.div key={member.name} variants={fadeUp} className="group overflow-hidden rounded-3xl border border-surface-200 bg-white transition-all duration-300 hover:border-accent/30 dark:border-surface-700/50 dark:bg-surface-800/50">
                  <div className="aspect-square overflow-hidden bg-surface-100 dark:bg-surface-700">
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="mb-0.5 text-sm font-bold text-primary dark:text-white">{member.name}</div>
                    <div className="mb-2 text-xs font-semibold text-accent-dark dark:text-accent">{member.role}</div>
                    <p className="text-xs italic leading-relaxed text-surface-400">"{member.quote}"</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[3rem] border border-primary-light p-12 md:p-20 dark:border-surface-700/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[80px]" />
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">{tx("about.cta.title", "Ingin berkolaborasi?")}</h2>
              <p className="mx-auto mb-10 max-w-md text-white/70">{tx("about.cta.desc", "Kami terbuka untuk kerja sama dengan pemerintah kota, investor, dan NGO yang punya misi serupa.")}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-primary shadow-lg transition-transform hover:scale-[1.02]">
                {tx("about.cta.button", "Hubungi Kami")} <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
