"use client";

import { UserCog, Search, Boxes, Layers, KeyRound } from "lucide-react";
import { CourseCenter } from "@/components/learn/course-center";
import { COURSE, buildSecurityCourseData } from "@/lib/security-course";

const CAT_ICON: Record<string, React.ReactNode> = {
  admin: <UserCog className="size-5" />, diag: <Search className="size-5" />, object: <Boxes className="size-5" />,
  roletype: <Layers className="size-5" />, fiori: <KeyRound className="size-5" />,
};

export function SecurityCenter() {
  const d = buildSecurityCourseData();
  return <CourseCenter config={{
    courseKey: COURSE, ...d.meta,
    startCards: d.startMeta.map((s) => ({ id: s.id, he: s.he, sub: s.sub, color: s.color, icon: CAT_ICON[s.cat] || <Layers className="size-5" /> })),
    ladder: d.ladder, topics: d.topics, defaultTopic: d.defaultTopic, crossLinks: d.crossLinks,
  }} />;
}
