import profQuoteData from "@/data/cleaned/profquotes.json";
import { useState } from "react";
import pageStyles from "./page.module.css";
import styles from "./ProfGallery.module.css";
import ProfImage from "./ProfImage";
import ProfQuote from "./ProfQuote";

export default function ProfGallery() {
	const [showModal, setShowModal] = useState<number>(4);

	const toggleModal = (idx: number) => {
		if (showModal === idx) {
			// close modal
			setShowModal(4);
			window.onscroll = function () {};
		} else {
			// open modal
			setShowModal(idx);
			const top = window.pageYOffset || document.documentElement.scrollTop;
			const left = window.pageXOffset || document.documentElement.scrollLeft;
			window.onscroll = function () {
				window.scrollTo({ top, left, behavior: "instant" });
			};
		}
	};

	return (
		<div id="about" className={styles.about}>
			<section>
				<div className={styles.section}>
					<h2 className={pageStyles.title} style={{ paddingTop: 0 }}>
						Farewell Messages From Faculty
					</h2>
					<p style={{ padding: "10px 0 1em 0" }}>
						We asked our favourite profs, lecturers, and admin to give some
						closing remarks as we left for the road ahead. Here were some of the
						things they said:
					</p>
					<p style={{ paddingBottom: "1em" }}>
						(Click on an image to view. Hold C to toggle speed.)
					</p>
				</div>
			</section>

			{profQuoteData.quotes.map((prof, idx) => {
				return (
					<div key={`${prof.profName}-modal`}>
						{showModal === idx && (
							<ProfQuote
								key={`${prof.profName}-quote`}
								profName={prof.profName}
								profImg={prof.profImg}
								quote={prof.quote}
								signature={prof.signature}
								toggleModal={() => toggleModal(idx)}
							/>
						)}
					</div>
				);
			})}

			<div className={styles.gallery}>
				{profQuoteData.quotes.map((prof, idx) => {
					return (
						<div key={idx} className={styles.profCapsule}>
							<ProfImage
								key={prof.profName}
								profName={prof.profName}
								profImg={prof.profImg}
								quote={prof.quote}
								signature={prof.signature}
								toggleModal={() => toggleModal(idx)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
