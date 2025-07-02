import { BASE_PATH } from "@/basepath";
import Image from "next/image";

export const GradSchoolDisplay = () => {
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
					paddingRight: "40%",
				}}
			>
				<Image
					src={BASE_PATH + "/grad-uw.png"}
					alt="Grad School UW"
					width={200}
					height={200}
				/>
				<div>
					University of Waterloo
					<br />
					(1 Respondent)
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingLeft: "40%",
				}}
			>
				<Image
					src={BASE_PATH + "/grad-gt.png"}
					alt="Grad School GT"
					width={200}
					height={200}
				/>
				<div>
					Georgia Institute of Technology
					<br />
					(1 Respondent)
				</div>
			</div>
		</div>
	);
};
