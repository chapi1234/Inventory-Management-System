import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@repo/ui",
    "@repo/auth",
    "@repo/types",
    "@repo/api-client",
    "@repo/products",
    "@repo/stock",
    "@repo/sales",
    "@repo/purchases",
    "@repo/suppliers",
    "@repo/reports",
    "@repo/users",
  ],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
};

export default nextConfig;