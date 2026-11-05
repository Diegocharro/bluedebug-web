import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    // The VBStats legal pages live on the VBStats site now. Old links (apps,
    // stores) keep working; Next forwards the query string, so ?lang=fr survives.
    return [
      // www is an alias of the apex: 301, not the 308 that "permanent" gives.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bluedebug.com" }],
        destination: "https://bluedebug.com/:path*",
        statusCode: 301,
      },
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
