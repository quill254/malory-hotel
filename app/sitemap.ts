import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl;
  const routes = ["", "/stay", "/book", "/long-stays", "/location", "/our-story", "/contact",
    "/dining", "/events", "/pool", "/spa", "/privacy", "/terms"]; // trim unverified facilities at launch
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}
