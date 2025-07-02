"use client";

import {
	useState,
	useRef,
	useEffect,
	CSSProperties,
	PropsWithChildren,
} from "react";

type AnimatedOnFirstViewProps = PropsWithChildren<{
	keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
	options: number | KeyframeAnimationOptions | undefined;
	viewThreshold: number | number[] | undefined;

	initialStyle: CSSProperties | undefined;
	wrapperStyle: CSSProperties | undefined;
}>;

export function AnimatedOnFirstView(props: AnimatedOnFirstViewProps) {
	const {
		children,
		initialStyle,
		keyframes,
		options,
		viewThreshold,
		wrapperStyle,
	} = props;

	const [viewed, setViewed] = useState(false);
	const wrapper = useRef<HTMLDivElement>(null);
	const animated = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (animated.current) {
					if (entries.at(0)?.isIntersecting) {
						animated.current.animate(keyframes, options);
						setViewed(true);
					}
				}
			},
			{
				threshold: viewThreshold,
			},
		);
		if (!viewed) {
			if (wrapper.current) {
				observer.observe(wrapper.current);
			}
		}
		return () => {
			observer.disconnect();
		};
	}, [wrapper, viewed, keyframes, options, viewThreshold]);

	return (
		<div ref={wrapper} style={wrapperStyle}>
			<div ref={animated} style={initialStyle}>
				{children}
			</div>
		</div>
	);
}
