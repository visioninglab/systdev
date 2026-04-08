const isStatic = process.env.STATIC_EXPORT === "1";
const repo = "systdev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_STATIC: isStatic ? "1" : "",
    NEXT_PUBLIC_BASE_PATH: isStatic ? `/${repo}` : "",
  },
};

export default nextConfig;
