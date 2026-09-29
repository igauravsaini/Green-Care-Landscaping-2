import { MetadataRoute } from "next";
import { services, serviceAreas, seo } from "@/content/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seo.url;

  // Static routes
  const staticRoutes = [
    "",
    "/services",
    "/commercial",
    "/projects",
    "/about",
    "/service-areas",
    "/contact",
    "/book",
    "/faq",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/book" ? 0.9 : 0.8,
  }));

  // Service detail routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Service area routes
  const areaRoutes = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
