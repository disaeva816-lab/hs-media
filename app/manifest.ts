import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HS Media",
    short_name: "HS Media",
    description: "Система управления оборудованием школы",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F8FA",
    theme_color: "#111827",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}