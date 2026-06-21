import { StoryMode } from "@/components/story-mode";
import { STORIES } from "@/data/story/pppi-process-order";

export function generateStaticParams() {
  return Object.keys(STORIES).map((process) => ({ process }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ process: string }> }) {
  const { process } = await params;
  const s = STORIES[process];
  return { title: s ? `${s.he} · סיור מודרך · NEO` : "סיור מודרך · NEO" };
}

export default async function StoryPage({ params }: { params: Promise<{ process: string }> }) {
  const { process } = await params;
  return <StoryMode id={process} />;
}
