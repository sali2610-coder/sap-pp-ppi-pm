"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { SiteLogo } from "@/components/site-logo";
import { OmniSearch } from "@/components/omni-search";
import { CommandPalette } from "@/components/command-palette";
import { UXSettings } from "@/components/ux-settings";
import { Footer } from "@/components/Footer";
import { LangSwitch } from "@/components/lang-switch";
import { playClick } from "@/lib/sound";

function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-l from-brand-dark via-brand to-brand text-brand-foreground shadow-lg shadow-brand/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]" onClick={() => playClick()}>
            <SiteLogo />
          </Link>
          <div className="lg:hidden">
            <LangSwitch />
          </div>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-center">
          <OmniSearch />
        </div>
        <nav className="hidden shrink-0 items-center gap-1 text-sm font-medium lg:flex">
          <Link href="/pm/" onClick={() => playClick()} className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15 active:scale-95">
            {t("nav.pm")}
          </Link>
          <Link href="/pp-pi/" onClick={() => playClick()} className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15 active:scale-95">
            {t("nav.ppi")}
          </Link>
          <Link href="/library/" onClick={() => playClick()} className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15 active:scale-95">
            {t("nav.library")}
          </Link>
          <Link href="/chat/" onClick={() => playClick()} className="flex items-center gap-1 rounded-lg px-3 py-1.5 transition-colors hover:bg-white/15 active:scale-95">
            <Sparkles className="size-3.5" />
            {t("nav.chat")}
          </Link>
          <div className="ms-2">
            <LangSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>
      <Footer />
      <CommandPalette />
      <UXSettings />
    </I18nProvider>
  );
}
