import type {MetadataRoute} from "next";
import {projects} from "../lib/projects-data";
export default function sitemap():MetadataRoute.Sitemap{
 const lastModified=new Date();
 return [
  {url:"https://nissostudios.com",lastModified,changeFrequency:"monthly",priority:1},
  {url:"https://nissostudios.com/projects",lastModified,changeFrequency:"monthly",priority:0.9},
  ...projects.map((project)=>({
   url:`https://nissostudios.com/projects/${project.id}`,
   lastModified,
   changeFrequency:"monthly" as const,
   priority:project.featured?0.9:0.8,
  })),
 ];
}
