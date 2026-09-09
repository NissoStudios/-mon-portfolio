import "./globals.css";
import type {Metadata} from "next";
import {Analytics} from "@vercel/analytics/next";

const SITE_URL="https://nissostudios.com";

export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:"Nisso Emmanuel Franky — Software Engineer & Cybersecurity Developer | Nisso Studios",template:"%s · Nisso Studios"},
 description:"Portfolio of Nisso Emmanuel Franky (Nisso Studios) — software engineering student and cybersecurity-minded developer building secure, real-world web, mobile and business applications. Work built for SOSUCAM, Secrétariat Ousy and Mobile Six.",
 keywords:["Nisso Emmanuel Franky","Nisso Studios","Nisso Franky","software engineer Cameroon","cybersecurity developer Cameroon","full stack developer","Next.js developer","Kotlin Android developer","software engineering portfolio"],
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
  title:"Nisso Emmanuel Franky — Software Engineer & Cybersecurity Developer",
  description:"Software engineering student and cybersecurity-minded developer building secure, real-world digital solutions. See live interactive prototypes of every project.",
  siteName:"Nisso Studios",
  locale:"en_US",
  images:[{url:"/nisso-photo.png",width:800,height:1000,alt:"Nisso Emmanuel Franky — Nisso Studios"}]
 },
 twitter:{
  card:"summary_large_image",
  title:"Nisso Emmanuel Franky — Software Engineer & Cybersecurity Developer",
  description:"Software engineering student and cybersecurity-minded developer building secure, real-world digital solutions.",
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
 "description":"Software engineering student and cybersecurity-minded developer building secure, real-world web, mobile and business applications.",
 "sameAs":["https://github.com/NissoStudios","https://www.facebook.com/nisso.emmanuel.franky"],
 "knowsAbout":["Software Engineering","Cybersecurity","Web Development","Mobile Development","Next.js","Kotlin","Python"],
 "worksFor":[{"@type":"Organization","name":"SOSUCAM"},{"@type":"Organization","name":"Secrétariat Ousy"},{"@type":"Organization","name":"Mobile Six"}]
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en">
  <head>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personJsonLd)}}/>
  </head>
  <body>{children}<Analytics/></body>
 </html>
}
