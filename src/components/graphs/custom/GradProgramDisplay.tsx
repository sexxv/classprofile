// SOME HOW this is the only word cloud that doesn't work.
export const GradProgramDisplay = () => {
	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				textAlign: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingLeft: "40%",
					fontSize: 28,
					paddingBottom: 40,
				}}
			>
				<div>Operating Systems</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingRight: "20%",
					fontSize: 28,
					maxWidth: "80%",
				}}
			>
				<div>Programming Languages, Formal Methods</div>
			</div>
		</div>
	);
};
