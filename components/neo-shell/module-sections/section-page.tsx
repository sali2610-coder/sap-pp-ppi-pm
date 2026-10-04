/* ============================================================================
   PROJECT NEO · MODULE SECTIONS — one section of a module page.
   ----------------------------------------------------------------------------
   The legacy portal gave each module fifteen sections at /pm/<section>/ and
   /pp-pi/<section>/. This is that section as a sub-page of the NEO module
   page: the module's family hue (the shell sets data-fam from the path), the
   way back to the module, every sibling section, then the section's own body.
   Server component; the only client piece is the shared SmartReturn.
   ========================================================================== */

import Link from "next/link";
import { SmartReturn } from "../nav-context";
import { msSection, msSections, sectionCount, sectionLevel, type MsModule } from "./section-data";
import {
  BapisBody, CdsBody, EccS4Body, FioriBody, IntegrationBody, RelatedBody, RelationshipsBody,
  TablesBody, TransactionsBody,
} from "./bodies-data";
import {
  ConfigBody, EnhancementsBody, MasterDataBody, PracticesBody, ProcessBody, TroubleBody,
} from "./bodies-know";
import { nf } from "./parts";

const BODY: Record<string, (p: { mod: MsModule }) => React.ReactNode> = {
  "business-process": ProcessBody,
  "master-data": MasterDataBody,
  transactions: TransactionsBody,
  tables: TablesBody,
  relationships: RelationshipsBody,
  configuration: ConfigBody,
  integration: IntegrationBody,
  bapis: BapisBody,
  cds: CdsBody,
  fiori: FioriBody,
  enhancements: EnhancementsBody,
  troubleshooting: TroubleBody,
  related: RelatedBody,
  "best-practices": PracticesBody,
  "ecc-s4": EccS4Body,
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ModuleSectionPage({ mod, slug }: { mod: MsModule; slug: string }) {
  const meta = msSection(slug);
  const Body = BODY[slug];
  if (!meta || !Body) return null;
  const idx = msSections.findIndex((s) => s.slug === slug);
  const prev = msSections[idx - 1];
  const next = msSections[idx + 1];
  const href = (s: string) => `${mod.home}${s}/`;

  return (
    <article className="nms" data-mod={mod.code} data-section={slug}>
      <SmartReturn fallback={{ href: mod.home, label: mod.back }} />

      <header className="nms-head">
        <p className="nms-eye">
          <Link className="nms-eye-l" href={mod.home} prefetch={false}>
            <span className="nx-sap" dir="ltr">SAP {mod.code}</span> · {mod.he}
          </Link>
          <i aria-hidden="true" />
          <span dir="ltr" lang="en">{meta.en}</span>
        </p>
        <h1 className="nms-h1">{meta.he}</h1>
        <p className="nms-lede">{meta.desc}</p>
        <p className="nms-figs">
          <span><b>{nf.format(sectionCount(mod, slug))}</b> פריטים</span>
          <span>רמה <b>{sectionLevel(slug)}</b></span>
          <span>חלק <b>{idx + 1}</b> מתוך {msSections.length}</span>
        </p>
      </header>

      <nav className="nms-idx" aria-label={`חלקי המודול SAP ${mod.code}`}>
        <ol>
          {msSections.map((s, i) => (
            <li key={s.slug}>
              <Link
                className="nms-idx-a"
                href={href(s.slug)}
                prefetch={false}
                aria-current={s.slug === slug ? "page" : undefined}
              >
                <span className="nms-idx-n" aria-hidden="true">{pad(i + 1)}</span>
                <span className="nms-idx-t" dir="auto">{s.he}</span>
                <em>{nf.format(sectionCount(mod, s.slug))}</em>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="nms-body">
        <Body mod={mod} />
      </div>

      <nav className="nms-pn" aria-label="החלק הקודם והבא">
        {prev ? (
          <Link className="nms-pn-a" href={href(prev.slug)} prefetch={false} rel="prev">
            <em>החלק הקודם</em>
            <b dir="auto">{prev.he}</b>
            <span>{prev.desc}</span>
          </Link>
        ) : null}
        {next ? (
          <Link className="nms-pn-a" href={href(next.slug)} prefetch={false} rel="next">
            <em>החלק הבא</em>
            <b dir="auto">{next.he}</b>
            <span>{next.desc}</span>
          </Link>
        ) : null}
        <Link className="nu-link nms-pn-home" href={mod.home} prefetch={false}>
          לעמוד המודול <span className="nx-sap" dir="ltr">SAP {mod.code}</span>
        </Link>
      </nav>
    </article>
  );
}
