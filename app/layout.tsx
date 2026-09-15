import "./globals.css";
import type {Metadata} from "next";
import {Analytics} from "@vercel/analytics/next";
import {Providers} from "../components/site/providers";

const SITE_URL="https://nissostudios.com";

export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:"Nisso Emmanuel Franky — Ingénieur logiciel & développeur cybersécurité | Nisso Studios",template:"%s · Nisso Studios"},
 description:"Portfolio de Nisso Emmanuel Franky (Nisso Studios) — étudiant en génie logiciel à l'ICT University et développeur sensibilisé à la cybersécurité, stagiaire chez SOSUCAM. Applications web, mobiles et métier construites pour SOSUCAM, le Secrétariat Ousy et Mobile Six.",
 keywords:["Nisso Emmanuel Franky","Nisso Studios","Nisso Franky","ingénieur logiciel Cameroun","développeur cybersécurité Cameroun","stagiaire SOSUCAM","ICT University","full stack developer","Next.js developer","Kotlin Android developer","software engineering portfolio"],
 authors:[{name:"Nisso Emmanuel Franky",url:SITE_URL}],
 creator:"Nisso Emmanuel Franky",
 publisher:"Nisso Studios",
 applicationName:"Nisso Studios Portfolio",
 category:"technology",
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1}},
 alternates:{canonical:SITE_URL},
 openGraph:{
  type:"website",
  url:SITE_URL,
  title:"Nisso Emmanuel Franky — Ingénieur logiciel & développeur cybersécurité",
  description:"Étudiant en génie logiciel et développeur sensibilisé à la cybersécurité, stagiaire chez SOSUCAM. Découvrez des prototypes interactifs de chaque projet.",
  siteName:"Nisso Studios",
  locale:"fr_FR",
  images:[{url:"/nisso-photo.png",width:800,height:1000,alt:"Nisso Emmanuel Franky — Nisso Studios"}]
 },
 twitter:{
  card:"summary_large_image",
  title:"Nisso Emmanuel Franky — Ingénieur logiciel & développeur cybersécurité",
  description:"Étudiant en génie logiciel et développeur sensibilisé à la cybersécurité, stagiaire chez SOSUCAM.",
  images:["/nisso-photo.png"]
 },
 icons:{icon:"/favicon.ico"}
};

const personJsonLd={
 "@context":"https://schema.org",
 "@type":"Person",
 "name":"Nisso Emmanuel Franky",
 "alternateName":"Nisso Studios",
 "url":SITE_URL,
 "image":SITE_URL+"/nisso-photo.png",
 "jobTitle":"Software Engineer",
 "description":"Étudiant en génie logiciel à l'ICT University et développeur sensibilisé à la cybersécurité, stagiaire chez SOSUCAM depuis avril 2026.",
 "sameAs":["https://github.com/NissoStudios","https://www.facebook.com/nisso.emmanuel.franky"],
 "knowsAbout":["Software Engineering","Cybersecurity","Web Development","Mobile Development","Next.js","Kotlin","Python"],
 "alumniOf":{"@type":"CollegeOrUniversity","name":"ICT University"},
 "worksFor":[{"@type":"Organization","name":"SOSUCAM"},{"@type":"Organization","name":"Secrétariat Ousy"},{"@type":"Organization","name":"Mobile Six"}]
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="fr" suppressHydrationWarning>
  <head>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personJsonLd)}}/>
  </head>
  <body>
   <Providers defaultLang="fr">{children}</Providers>
   <Analytics/>
  </body>
 </html>
}
