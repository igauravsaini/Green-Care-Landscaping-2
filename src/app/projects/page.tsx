import { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description: "View our landscaping and hardscaping projects across Washington, DC. Before/after transformations, case studies, and portfolio gallery.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
