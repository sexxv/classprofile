import { BASE_PATH } from "@/basepath";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	// Ok so this one makes the build create static files
	output: 'export',

	// ...and this one stops images from complaining since 
	// Next doesn't let you use their imgae optimization API 
	// with static export, you have to disable it or configure your own
	images: {
		unoptimized: true,
	},

	basePath: BASE_PATH,
};

export default nextConfig;
