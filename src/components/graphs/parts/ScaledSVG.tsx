type ScaledSVGProps = React.PropsWithChildren<
	React.SVGProps<SVGSVGElement> & {
		width: number;
		height: number;
	}
>;

export default function ScaledSVG(props: ScaledSVGProps) {
	const { width, height, children } = props;

	return (
		<svg
			{...props}
			viewBox={`0 0 ${width} ${height}`}
			style={{
				width: "100%",
				aspectRatio: width / height,
				height: "auto",
			}}
			fontFamily={"var(--font-graph)"}
		>
			{children}
		</svg>
	);
}
