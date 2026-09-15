import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{
 const lastModified=new Date();
 return [
  {url:"https://nissostudios.com",lastModified,changeFrequency:"monthly",priority:1},
  {url:"https://nissostudios.com/projects",lastModified,changeFrequency:"monthly",priority:0.9},
 ];
}
