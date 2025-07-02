import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import {
	Athiti,
	Geist,
	Geist_Mono,
	Jersey_10,
	Josefin_Sans,
	Noto_Color_Emoji,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const jersey10 = Jersey_10({
	variable: "--font-jersey-10",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

const Athihi = Athiti({
	variable: "--font-athiti",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

const AthihiBold = Athiti({
	variable: "--font-athiti-bold",
	subsets: ["latin"],
	weight: "600",
	display: "swap",
});

const NotoColorEmoji = Noto_Color_Emoji({
	variable: "--noto-color-emoji",
	subsets: ["emoji"],
	weight: "400",
	display: "swap",
});

const graphFont = Josefin_Sans({
	variable: "--font-graph",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Software Engineering 2025 Class Profile",
	description: "Fun (and hopefully useful) stats about the SE25 cohort!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${jersey10.variable} ${geistSans.variable} ${geistMono.variable} ${Athihi.variable} ${AthihiBold.variable} ${NotoColorEmoji.variable} ${graphFont.variable}`}
			>
				{children}
			</body>
			<GoogleAnalytics gaId="G-DHZ22JZR8P" />
		</html>
	);
}
