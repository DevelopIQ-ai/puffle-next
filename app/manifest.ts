import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Puffle",
    short_name: "Puffle",
    description:
      "The AI growth employee for strategy, lead discovery, qualification, and personalized outbound.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfef8",
    theme_color: "#fcfef8",
    icons: [
      {
        src: "/puffle-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
