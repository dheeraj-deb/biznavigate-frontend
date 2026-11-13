import nextConfig from "eslint-config-next";

const eslintConfig = [
  // Cloudflare/OpenNext build output (generated, not source).
  { ignores: [".open-next/**", ".wrangler/**"] },
  ...nextConfig,
];

export default eslintConfig;
