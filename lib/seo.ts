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
