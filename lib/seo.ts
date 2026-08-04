import type { Metadata } from "next";

// Shared Open Graph builder.
//
// Why this exists: in the Next.js Metadata API a page-level `openGraph` object
// REPLACES the parent layout's `openGraph` wholesale — it is not deep-merged.
// Eight route files were setting `openGraph: { title, description }`, which
// silently dropped `type`, `siteName`, `url`, `locale` and `images` that
// app/layout.tsx defines. Measured on the built homepage before this change:
//
//   og:title        present
//   og:description  present
//   og:image        MISSING   <- and twitter:card is summary_large_image,
//   og:type         MISSING      so the social card rendered without an image
//   og:url          MISSING
//   og:site_name    MISSING
//   og:locale       MISSING
//
// Routing every override through this helper keeps the full set intact and
// makes the failure mode impossible to reintroduce by copy-paste.
export const SITE_URL = "https://sapbysali.app";
export const SITE_NAME = "SAP by Sali";
export const OG_IMAGE = "/og.png";

/**
 * Build a complete OpenGraph metadata object.
 *
 * @param title       og:title for this page
 * @param description og:description for this page
 * @param path        absolute site path, e.g. "/object/EQUI/". Omit to let Next
 *                    resolve `./` against the page's own URL (self-referencing).
 */
export function og(title: string, description: string, path?: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: "he_IL",
    url: path ?? "./",
    title,
    description,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SAP by Sali — Project NEO · Interactive SAP Knowledge Platform",
      },
    ],
  };
}

/**
 * Matching Twitter card. `summary_large_image` requires an image; without one
 * the card degrades to a bare link, which is why this always carries OG_IMAGE.
 */
export function twitter(title: string, description: string): Metadata["twitter"] {
  return { card: "summary_large_image", title, description, images: [OG_IMAGE] };
}

/**
 * Per-page title + description for the knowledge routes.
 *
 * Before this existed, 516 indexable pages across 14 dynamic route families
 * fell back to the layout defaults, producing 726 duplicate <title> values
 * (516 of them the literal "SAP by Sali | Project NEO") and 1,696 identical
 * meta descriptions. Google treats that as duplicate metadata and it suppresses
 * distinct snippets.
 *
 * Everything here is built from fields that already exist in the datasets —
 * Hebrew name, English name, module, and the record's own summary text. No
 * copy is invented, and a missing field is simply omitted rather than filled
 * with a guess.
 */
export function pageMeta(o: { he?: string; title?: string; module?: string; blurb?: string; path: string }): Metadata {
  const name = [o.he, o.title && o.title !== o.he ? `(${o.title})` : ""].filter(Boolean).join(" ").trim() || o.title || "";
  const heading = [name, o.module].filter(Boolean).join(" · ");
  // Meta descriptions are truncated by search engines around 155-160 chars.
  // Cut on a word boundary so the snippet never ends mid-word.
  const raw = (o.blurb || "").replace(/\s+/g, " ").trim();
  const description = raw.length > 155 ? raw.slice(0, 155).replace(/\s+\S*$/, "") + "…" : raw || undefined;
  return {
    title: heading || undefined,
    description,
    alternates: { canonical: o.path },
    openGraph: og(`SAP by Sali | ${heading}`, description || heading, o.path),
  };
}
