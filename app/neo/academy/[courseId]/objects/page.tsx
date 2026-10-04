// Project NEO · /neo/academy/pp-pi/objects/ — the PP textbook's object index.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { PPObjectsIndexView } from "@/components/neo-shell/academy-ref/pp-objects";

// Only the PP-PI course has an object index (lib/pp-object-index.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ courseId: "pp-pi" }];
}

export const metadata = {
  title: "כל אובייקטי ה-PP · ספר לימוד · Project NEO",
  robots: { index: false, follow: false },
};

export default async function NeoPPObjects({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (courseId !== "pp-pi") notFound();
  return <PPObjectsIndexView />;
}
