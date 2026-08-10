import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS_META } from "@/lib/projectsMeta";

export function generateStaticParams() {
  return PROJECTS_META.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = PROJECTS_META.find((p) => p.slug === slug);
  if (!meta) notFound();

  return <ProjectDetail slug={meta.slug} />;
}
