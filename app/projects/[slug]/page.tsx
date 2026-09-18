import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "../../../components/projects/project-detail-client";
import { projects } from "../../../lib/projects-data";
import { projectDetails } from "../../../lib/project-details";

const SITE_URL = "https://nissostudios.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);

  if (!project) {
    return { title: "Projet introuvable" };
  }

  const url = `${SITE_URL}/projects/${project.id}`;
  const description = project.headline.fr;

  return {
    title: `${project.title} — Étude de cas`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — Étude de cas · Nisso Studios`,
      description,
      siteName: "Nisso Studios",
      locale: "fr_FR",
      images: [
        {
          url: "/nisso-photo.png",
          width: 800,
          height: 1000,
          alt: `Nisso Emmanuel Franky — ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Étude de cas`,
      description,
      images: ["/nisso-photo.png"],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);

  if (!project || !projectDetails[slug]) notFound();

  return <ProjectDetailClient projectId={project.id} />;
}
