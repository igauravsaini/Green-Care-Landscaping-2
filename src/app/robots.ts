import { MetadataRoute } from "next";
import { seo } from "@/content/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${seo.url}/sitemap.xml`,
  };
}
