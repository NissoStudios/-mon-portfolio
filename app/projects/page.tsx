import type { Metadata } from "next";
import { ProjectsClient } from "../../components/projects/projects-client";

const SITE_URL = "https://nissostudios.com";

export const metadata: Metadata = {
  title: "Projets & études de cas",
  description:
    "Études de cas détaillées : le problème résolu, le rôle joué, la stack technique et ce que chaque projet m'a réellement appris — de GestMedicert et E-Commercial (SOSUCAM) à TripBook, TransMap, Java Restaurant, Mobile Six et Blog-O-Platform.",
  alternates: { canonical: SITE_URL + "/projects" },
  openGraph: {
    type: "website",
    url: SITE_URL + "/projects",
    title: "Projets & études de cas · Nisso Studios",
    description:
      "Une sélection de projets qui ont façonné ma façon de penser le logiciel — problème, rôle, stack technique et ce que j'en ai retenu.",
    siteName: "Nisso Studios",
    images: [{ url: "/nisso-photo.png", width: 800, height: 1000, alt: "Nisso Emmanuel Franky — Nisso Studios" }],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
