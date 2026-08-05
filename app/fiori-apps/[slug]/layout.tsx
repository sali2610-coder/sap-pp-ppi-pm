import type { ReactNode } from "react";
import { AskAI } from "@/components/ask-ai";

// AskAI lives in the layout, not the page.
//
// These pages return from several branches (full intel page / light registry
// page / dataset-derived view / not-found). Embedding AskAI inside the page
// meant it only rendered on whichever branch happened to be edited — on
// /tcode/IW31 it silently never appeared, because that route returns early.
// A layout renders for every branch, so this cannot drift again.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AskAI variant="inline" className="mt-6" />
    </>
  );
}
