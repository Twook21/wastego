import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t("footer.nav_home"), path: "/" },
    { name: t("footer.nav_about"), path: "/about" },
    { name: t("footer.nav_download"), path: "/download" },
    { name: t("footer.contact_title"), path: "/contact" },
  ];

  const productLinks = [
    { label: "EcoHive", path: "/ecohive/dashboard" },
    { label: "EcoCentral", path: "/ecocentral/dashboard" },
    { label: "EcoBuddy", path: "/download" },
    { label: "WasteGo Mobile", path: "/download" },
  ];

  const socials = [
    { icon: "ri-instagram-line", label: "Instagram", href: "#" },
    { icon: "ri-linkedin-fill", label: "LinkedIn", href: "#" },
    { icon: "ri-twitter-x-fill", label: "X", href: "#" },
    { icon: "ri-youtube-line", label: "YouTube", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-primary text-white/80 transition-colors duration-300 dark:bg-[#051314]">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block group">
              <img
                src={logo}
                alt="WasteGo"
                className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition hover:border-accent hover:bg-accent hover:text-primary"
                >
                  <i className={`${social.icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.nav_title")}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/70 transition hover:text-accent">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.program_title")}
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-white/70 transition hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.contact_title")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <i className="ri-map-pin-2-line mt-0.5 text-accent" />
                <span>Surabaya, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="ri-mail-line text-accent" />
                <a href="mailto:hello@wastego.com" className="transition hover:text-accent">
                  hello@wastego.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="ri-phone-line text-accent" />
                <a href="tel:+621234567890" className="transition hover:text-accent">
                  +62 123 4567 890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs font-medium md:flex-row md:items-center">
          <p className="text-white/65">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/65 transition hover:text-accent">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-white/65 transition hover:text-accent">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
