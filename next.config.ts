import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    // The VBStats legal pages live on the VBStats site now. Old links (apps,
    // stores) keep working; Next forwards the query string, so ?lang=fr survives.
    return [
      {
        source: "/vistas/vbstats-privacidad",
        destination: "https://www.vbstats.app/privacidad",
        permanent: true,
      },
      {
        source: "/vistas/vbstats-terminos",
        destination: "https://www.vbstats.app/terminos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
