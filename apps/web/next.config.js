/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@hrms/ui",
    "@hrms/auth",
    "@hrms/employees",
    "@hrms/departments",
    "@hrms/attendance",
    "@hrms/leave",
    "@hrms/payroll",
    "@hrms/profile",
    "@hrms/recruitment",
    "@hrms/performance",
    "@hrms/api-client",
    "@hrms/types"
  ],
};

export default nextConfig;
 