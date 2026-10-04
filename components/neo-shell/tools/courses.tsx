/* ============================================================================
   PROJECT NEO · the interactive courses at their old addresses: ALM
   (/neo/alm/), delivery (/neo/delivery/), Fiori and UX (/neo/fiori/) and
   integration (/neo/integration/).
   ----------------------------------------------------------------------------
   Each calls its legacy adapter unchanged (lib/alm-course.ts,
   lib/delivery-course.ts, lib/fiori-course.ts, lib/integration-course.ts) and
   renders it through course-view.tsx.

   The delivery adapter shows a phase's FIRST objective, its first three roles
   and first four deliverables. Each phase's whole record from
   data/project-delivery.ts is therefore added under its topic, folded:
   every objective, deliverable, role, meeting, template, risk and mistake.
   ========================================================================== */

import { buildAlmCourseData, COURSE as ALM } from "@/lib/alm-course";
import { buildDeliveryCourseData, COURSE as DELIVERY } from "@/lib/delivery-course";
import { buildFioriCourseData, COURSE as FIORI } from "@/lib/fiori-course";
import { buildIntegrationCourseData, COURSE as INTEGRATION } from "@/lib/integration-course";
import { PHASES } from "@/data/project-delivery";
import { CourseView } from "./course-view";
import { Bullets, More } from "./kit";

export function AlmView() {
  return (
    <CourseView
      d={buildAlmCourseData()}
      course={ALM}
      surface="alm"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      foot={<>קורס אינטראקטיבי · ידע <span dir="ltr">SAP</span> סטנדרטי · <span dir="ltr">trust: curated</span>. ההתקדמות נשמרת מקומית. מקור: <span className="nx-sap" dir="ltr">data/alm</span>.</>}
    />
  );
}

export function FioriView() {
  return (
    <CourseView
      d={buildFioriCourseData()}
      course={FIORI}
      surface="fiori"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      foot={<>קורס אינטראקטיבי · ידע <span dir="ltr">SAP</span> סטנדרטי · <span dir="ltr">trust: curated</span>. ההתקדמות נשמרת מקומית. מקור: <span className="nx-sap" dir="ltr">lib/fiori-course</span>.</>}
    />
  );
}

export function IntegrationView() {
  return (
    <CourseView
      d={buildIntegrationCourseData()}
      course={INTEGRATION}
      surface="integration"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      foot={<>קורס אינטראקטיבי · ידע <span dir="ltr">SAP</span> סטנדרטי · <span dir="ltr">trust: curated</span>. ההתקדמות נשמרת מקומית. מקור: <span className="nx-sap" dir="ltr">lib/integration-course</span>.</>}
    />
  );
}

const PHASE_FIELDS = [
  ["objectives", "יעדים"],
  ["deliverables", "תוצרים"],
  ["roles", "גורמים מעורבים"],
  ["meetings", "ישיבות וסדנאות"],
  ["templates", "תבניות"],
  ["risks", "סיכונים"],
  ["mistakes", "טעויות נפוצות"],
] as const;

export function DeliveryView() {
  const extra = Object.fromEntries(PHASES.map((p) => [p.id, (
    <More key={p.id} summary="רשומת השלב המלאה">
      {PHASE_FIELDS.map(([k, he]) => (p[k].length ? (
        <div key={k}><h3 className="ntl-lbl">{he}</h3><Bullets items={p[k]} /></div>
      ) : null))}
    </More>
  )]));
  return (
    <CourseView
      d={buildDeliveryCourseData()}
      course={DELIVERY}
      surface="delivery"
      back={{ href: "/neo/knowledge/", label: "מרכז הידע" }}
      extra={extra}
      foot={<>קורס אינטראקטיבי · ידע <span dir="ltr">SAP</span> סטנדרטי · <span dir="ltr">trust: curated</span>. ההתקדמות נשמרת מקומית. מקור: <span className="nx-sap" dir="ltr">data/project-delivery</span> · <span className="nx-sap" dir="ltr">data/s4-transformation</span>.</>}
    />
  );
}
