"use client";

import { FileText, GitBranch, Cable, Radio } from "lucide-react";
import { CourseCenter } from "@/components/learn/course-center";
import { COURSE, buildIntegrationCourseData } from "@/lib/integration-course";

const CAT_ICON: Record<string, React.ReactNode> = {
  classic: <FileText className="size-5" />, middleware: <GitBranch className="size-5" />, modern: <Cable className="size-5" />, event: <Radio className="size-5" />,
};

export function IntegrationCenter() {
  const d = buildIntegrationCourseData();
  return <CourseCenter config={{
    courseKey: COURSE, ...d.meta,
    startCards: d.startMeta.map((s) => ({ id: s.id, he: s.he, sub: s.sub, color: s.color, icon: CAT_ICON[s.cat] || <Cable className="size-5" /> })),
    ladder: d.ladder, topics: d.topics, defaultTopic: d.defaultTopic, crossLinks: d.crossLinks,
  }} />;
}
