"use client";

import { Boxes, LayoutGrid, Cloud } from "lucide-react";
import { CourseCenter } from "@/components/learn/course-center";
import { COURSE, buildAlmCourseData } from "@/lib/alm-course";

const ICON: Record<string, React.ReactNode> = {
  solman: <Boxes className="size-5" />, fb: <LayoutGrid className="size-5" />, calm: <Cloud className="size-5" />,
};

export function AlmCenter() {
  const d = buildAlmCourseData();
  return <CourseCenter config={{
    courseKey: COURSE, ...d.meta,
    startCards: d.startMeta.map((s) => ({ id: s.id, he: s.he, sub: s.sub, color: s.color, icon: ICON[s.cat] || <Boxes className="size-5" /> })),
    ladder: d.ladder, topics: d.topics, defaultTopic: d.defaultTopic, crossLinks: d.crossLinks,
  }} />;
}
