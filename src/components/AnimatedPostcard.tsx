"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";
import { Postcard } from "./Postcard";

export function AnimatedPostcard() {
	const [viewed, setViewed] = useState(false);
	const wrapper = useRef<HTMLDivElement>(null);
	const riser = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (riser.current) {
					if (entries.at(0)?.isIntersecting) {
						riser.current.animate(
							[
								{
									opacity: "0%",
									transform: "translateY(500px) rotate(45deg)",
								},
								{
									opacity: "100%",
									transform: "translateY(0px) rotate(0deg)",
								},
							],
							{
								duration: 1000,
								fill: "forwards",
								easing: "ease-in-out",
							},
						);
						setViewed(true);
					}
				}
			},
			{
				threshold: [0.1],
			},
		);
		if (!viewed) {
			if (wrapper.current) {
				observer.observe(wrapper.current);
			}
		}
		return () => {
			observer.disconnect();
			sendGAEvent("event", "postcard", {
				value: "finished",
			});
		};
	}, [wrapper, viewed]);

	return (
		<div ref={wrapper} style={{ overflow: "hidden", paddingTop: 80 }}>
			<div ref={riser} style={{ opacity: "0%" }}>
				<Postcard />
			</div>
		</div>
	);
}
