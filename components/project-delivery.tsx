"use client";

import { Compass, ClipboardList, Search, Hammer, Rocket, RefreshCw } from "lucide-react";
import { CourseCenter } from "@/components/learn/course-center";
import { COURSE, buildDeliveryCourseData } from "@/lib/delivery-course";

const ICON: Record<string, React.ReactNode> = {
  discover: <Compass className="size-5" />, prepare: <ClipboardList className="size-5" />, explore: <Search className="size-5" />,
  realize: <Hammer className="size-5" />, deploy: <Rocket className="size-5" />, run: <RefreshCw className="size-5" />,
};

export function ProjectDelivery() {
  const d = buildDeliveryCourseData();
  return <CourseCenter config={{
    courseKey: COURSE, ...d.meta,
    startCards: d.startMeta.map((s) => ({ id: s.id, he: s.he, sub: s.sub, color: s.color, icon: ICON[s.cat] || <Compass className="size-5" /> })),
    ladder: d.ladder, topics: d.topics, defaultTopic: d.defaultTopic, crossLinks: d.crossLinks,
  }} />;
}
