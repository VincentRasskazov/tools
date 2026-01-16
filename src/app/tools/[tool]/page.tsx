import { tools } from "../../../data/tools";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export function generateMetadata({ params }: { params: { tool: string } }) {
  const tool = tools.find(t => t.slug === params.tool);
  if (!tool) return {};
  return {
    title: `${tool.name} | Ultimate Tools Hub`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | Ultimate Tools Hub`,
      description: tool.description,
      url: `https://vincentrasskazov.github.io/tools/tools/${tool.slug}/`,
      siteName: "Ultimate Tools Hub",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ultimate Tools Hub",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | Ultimate Tools Hub`,
      description: tool.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `https://vincentrasskazov.github.io/tools/tools/${tool.slug}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = tools.find(t => t.slug === params.tool);
  if (!tool) return notFound();
  const ToolComponent = dynamic(() => import(`../../../components/tools/${tool.component}`), { ssr: false });
  return <ToolComponent />;
}
