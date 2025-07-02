import { useEffect, useState } from "react";

export function HoverCountTooltip({ id }: { id: string }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			{/* need this because wordcloud randomizes */}
			{isClient ? (
				<div
					id={id}
					style={{
						position: "absolute",
						opacity: 0,
						transition: "opacity 0.2s ease",
						pointerEvents: "none",
						fontSize: "20px",
						fontFamily: "var(--font-athiti)",
						color: "#170636",
						fontWeight: "bold",
						backgroundColor: "white",
						borderRadius: "5px",
						padding: "5px 10px",
						textAlign: "center",
						zIndex: 100,
					}}
				/>
			) : null}
		</>
	);
}
