import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Lang, T } from './translations';
import { translations } from './translations';

type I18nContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: T;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>('bg'); // default BG

    const value = useMemo<I18nContextValue>(() => {
        return { lang, setLang, t: translations[lang] as T };
    }, [lang]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used within I18nProvider');
    return ctx;
}
