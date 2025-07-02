"use client";

import { useEffect, useRef, useState } from "react";

// In units of (svg) pixels per second
const AVERAGE_DRAW_SPEED = 100;

// In units of seconds
const INITIAL_DRAW_DELAY = 1;

export function AnimatedSignature() {
	const [viewed, setViewed] = useState(false);
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (svgRef.current) {
				if (entries.at(0)?.isIntersecting) {
					const group = svgRef.current.querySelector("g")!;
					const paths = group.querySelectorAll("path");

					let drawDelay = INITIAL_DRAW_DELAY;

					paths.forEach((path) => {
						const pathLength = path.getTotalLength();
						const drawTime = pathLength / AVERAGE_DRAW_SPEED;

						path.style.strokeDasharray = `${pathLength}px`;
						path.style.strokeDashoffset = `${pathLength}px`;

						path.animate(
							[
								{
									strokeDashoffset: `${pathLength}px`,
								},
								{
									strokeDashoffset: "0px",
								},
							],
							{
								duration: drawTime * 1000,
								fill: "forwards",
								easing: "ease-in-out",
								delay: drawDelay * 1000,
							},
						);

						drawDelay += drawTime;
					});

					setViewed(true);
				}
			}
		});

		if (!viewed) {
			if (svgRef.current) {
				observer.observe(svgRef.current);
			}
		}
		return () => {
			observer.disconnect();
		};
	}, [svgRef, viewed]);

	return (
		<svg ref={svgRef} width="200px" height="60px" viewBox="0 0 100 30">
			<g
				stroke="white"
				fill="none"
				transform="translate(-49.706453,-112.87561)"
			>
				<path d="m 68.161371,118.39201 c 0,0 -5.32897,-8.80101 -15.228846,1.8422 -6.222034,6.68921 1.168272,5.61797 8.959634,7.36967 9.075159,2.04033 8.423432,7.3196 7.865784,9.45574 -2.463538,9.43688 -20.018564,3.31596 -20.018564,3.31596" />
				<path d="m 79.091755,116.91824 c 0,0 3.439999,0.26053 6.360877,0.0868 2.920877,-0.17368 7.517021,-0.0868 7.517021,-0.0868" />
				<path d="m 79.113157,116.80263 c 0,0 0.52047,7.34092 0.397444,12.15342 -0.123026,4.8125 0.427556,13.07421 0.427556,13.07421" />
				<path d="m 79.373684,129.69868 c 0,0 2.67118,0.0432 3.994343,-0.10674 1.346184,-0.15257 3.778025,0.23701 3.778025,0.23701" />
				<path d="m 79.981577,141.94342 c 0,0 7.076773,-0.6208 10.594199,-0.2922 2.276665,0.21269 5.254486,0.379 5.254486,0.379" />
				<path d="m 111.15789,122.88158 c 0,0 2.03753,-9.15133 9.27658,-5.83655 4.32247,1.97927 4.0733,12.40815 -7.97394,25.37602 15.4121,-1.67594 14.15526,-0.52105 14.15526,-0.52105" />
				<path d="m 143.11579,116.97631 -9.29211,0.78158 -0.28521,11.20263 c 0,0 5.88487,-2.85544 9.05626,0.95527 2.81838,3.38653 3.92374,7.82527 -0.2512,9.73221 -7.09304,3.2398 -10.25669,-0.52695 -10.25669,-0.52695" />
			</g>
		</svg>
	);
}
