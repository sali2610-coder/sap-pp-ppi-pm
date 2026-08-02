"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { GlobalBack } from "@/components/global-back";
import { WorkspaceInspector } from "@/components/workspace-inspector";
import { I18nProvider } from "@/lib/i18n";
import { SiteLogo } from "@/components/site-logo";
import { KnowledgeSidebar } from "@/components/knowledge-sidebar";
import dynamic from "next/dynamic";
import { OmniSearch } from "@/components/omni-search";
// Non-critical shell UI — deferred so the dataset + search engine (pulled by the
// command palette) and floating helpers stay off the first-paint path.
const CommandPalette = dynamic(() => import("@/components/command-palette").then((m) => m.CommandPalette), { ssr: false });
const FindHighlighter = dynamic(() => import("@/components/find-highlighter").then((m) => m.FindHighlighter), { ssr: false });
const OnboardingDrawer = dynamic(() => import("@/components/onboarding-drawer").then((m) => m.OnboardingDrawer), { ssr: false });
const PageHelp = dynamic(() => import("@/components/page-help").then((m) => m.PageHelp), { ssr: false });
const UXSettings = dynamic(() => import("@/components/ux-settings").then((m) => m.UXSettings), { ssr: false });
import { MobileTabBar } from "@/components/mobile-tab-bar";
const ObjectPeek = dynamic(() => import("@/components/object-peek").then((m) => m.ObjectPeek), { ssr: false });
const ContextFab = dynamic(() => import("@/components/context-fab").then((m) => m.ContextFab), { ssr: false });
const PeekCoach = dynamic(() => import("@/components/peek-coach").then((m) => m.PeekCoach), { ssr: false });
import { WowToast } from "@/components/wow-toast";
import { Footer } from "@/components/Footer";
import { LangSwitch } from "@/components/lang-switch";
import { playClick } from "@/lib/sound";

// Slim, neutral top bar (Design System v2). Hairline + faint brand accent line;
// primary navigation lives in the persistent left knowledge tree, not here.
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/85 pt-[env(safe-area-inset-top)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-l before:from-brand before:via-brand before:to-brand-dark">
      <div className="flex h-14 items-center gap-2 px-3 sm:gap-3 sm:px-4">
        {/* mobile navigation lives entirely in the bottom bar (Home/Modules/Library/Search/More)
            — the desktop knowledge tree stays lg+; no duplicate hamburger drawer on touch. */}
        <button onClick={() => window.dispatchEvent(new Event("neo:open-sidebar"))} aria-label="פתח עץ ניווט"
          className="tap hidden size-9 shrink-0 place-items-center rounded-lg text-ink-2 hover:bg-black/[0.05] lg:hidden">
          <Menu className="size-5" />
        </button>
        <Link href="/" onClick={() => playClick()} aria-label="SAP by Sali — דף הבית" className="shrink-0 transition-transform hover:scale-[1.01]">
          <SiteLogo tone="dark" size="lg" wordmark="sm+" />
        </Link>
        <div className="mx-auto min-w-0 max-w-2xl flex-1">
          <OmniSearch />
        </div>
        {/* creator signature — premium product mark, not an ad. Always in the header. */}
        <div dir="ltr" className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold leading-none md:flex"
          aria-label="Built by Sali Halif">
          <span className="text-ink-3">Built by</span>
          <b className="font-extrabold tracking-tight text-brand">Sali&nbsp;Halif</b>
        </div>
        <div className="shrink-0">
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-[90] focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-brand focus:shadow-lg">דלג לתוכן</a>
      <div className="flex min-h-full flex-col">
        <Header />
        <div className="flex flex-1">
          <KnowledgeSidebar />
          <main id="main" className="min-w-0 flex-1">
            <div className="container-app pt-6 pb-24 sm:pt-8 xl:pb-10">
              <GlobalBack />
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
      {/* secondary floating actions — desktop only; on phone/tablet they live in the bottom tab bar */}
      <div data-shell="desktop-only" className="max-xl:hidden">
        <PageHelp />
        <UXSettings />
      </div>
      {/* always-mounted (modal/effect; opened via events / ⌘K) */}
      <CommandPalette />
      <FindHighlighter />
      <OnboardingDrawer />
      <WowToast />
      <MobileTabBar />
      <ContextFab />
      <ObjectPeek />
      <PeekCoach />
      <WorkspaceInspector />
    </I18nProvider>
  );
}
