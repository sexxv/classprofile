import Image from "next/image";
import styles from "./Postcard.module.css";
import { Emoji } from "./Emoji";
import { AnimatedSignature } from "./AnimatedSignature";
import { BASE_PATH } from "@/basepath";

export function Postcard() {
	return (
		<div className={styles.postcardContainer} id="postcard">
			<div className={styles.postcard}>
				{/*
					
				<div className={styles.leftSide}>
					<img width="200px" height="360px" />
				</div>
					*/}
				<div className={styles.rightSide}>
					<div className={styles.topSide}>
						<div className={styles.stampBox}>
							<Image
								src={BASE_PATH + "/se25.png"}
								width={64}
								height={64}
								alt={"se25 logo stamp"}
							/>
						</div>
						<h2 className={styles.postcardTitle}>Thank You!</h2>
					</div>
					<div className={styles.textSection}>
						<p>
							We hope you enjoyed reading this class profile as much as we
							enjoyed making it!
							{/* idk where to put this */}
							{/* Thank you to everyone who helped make this project possible. */}
							{/* SE25s for filling out the surveys, J for graph feedback, Eric for exporting SE25 logo, all the class profiles that came before us (link somewhere) */}{" "}
							<br />
							<br />
							Made with <Emoji>🧋</Emoji>, <Emoji>☕</Emoji>, and much{" "}
							<Emoji>❤️</Emoji> by
						</p>
						<div className={styles.textUnderline}>
							<hr />
							<hr />
							<hr />
						</div>
					</div>
					<div className={styles.whyTheHellDidIDoThisToMyself}>
						<AnimatedSignature />
					</div>
				</div>
			</div>
		</div>
	);
}
