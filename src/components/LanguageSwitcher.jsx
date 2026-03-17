import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LANGS = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'id', label: 'ID', flag: '🇮🇩' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const current = LANGS.find(l => l.code === i18n.language) || LANGS[0];

    const switchTo = (code) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm text-xs font-bold text-primary dark:text-white hover:bg-surface-100 dark:hover:bg-surface-700 transition-all"
                aria-label="Switch Language"
            >
                <span>{current.flag}</span>
                <span className="tracking-wide">{current.label}</span>
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 mt-2 w-28 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                        {LANGS.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => switchTo(lang.code)}
                                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-left transition-colors
                  ${lang.code === i18n.language
                                        ? 'bg-accent/10 text-accent-dark dark:text-accent'
                                        : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-primary dark:text-white'
                                    }`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                                {lang.code === i18n.language && (
                                    <i className="ri-check-line ml-auto text-accent-dark dark:text-accent"></i>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
