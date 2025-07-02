"use client";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import styles from "./ProfImage.module.css";
import { BASE_PATH } from "@/basepath";

interface ProfQuoteProps {
	profName: string;
	profImg: string; // Add all valid map types here
	quote: string[];
	signature: string[];
	toggleModal: () => void;
}

export default function ProfImage(props: ProfQuoteProps) {
	return (
		<div className={styles.parent}>
			<div
				className={styles.frame}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						props.toggleModal();
						sendGAEvent("event", "profViewed", { value: props.profName });
					}
				}}
				onClick={() => {
					props.toggleModal();
					sendGAEvent("event", "profViewed", { value: props.profName });
				}}
			>
				<div className={styles.photo}>
					{props.profImg && (
						<Image
							src={BASE_PATH + props.profImg}
							alt={props.profName}
							fill={true}
							style={{ objectFit: "fill" }}
						/>
					)}
				</div>
			</div>
			<div className={styles.textbox}>
				<p>{props.profName}</p>
			</div>
		</div>
	);
}
