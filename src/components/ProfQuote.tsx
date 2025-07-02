"use client";
import styles from "./ProfQuote.module.css";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FocusTrap } from "focus-trap-react";
import { BASE_PATH } from "@/basepath";

// consists of:
// 1. A profile photo ✅
// 2. A quote and attribution ✅

// Nice-to-have future functionality (order of importance):
// 1. Pause page scroll when modal opens ✅
// 2. Don't close page when clicking on the modal content, only on the X ✅
// 3. Re-integrate rolling text ✅
// 4. focus trapping ✅

interface ProfQuoteProps {
	profName: string;
	profImg: string; // Add all valid map types here
	quote: string[];
	signature: string[];
	toggleModal: () => void;
}

export default function ProfQuote(props: ProfQuoteProps) {
	const sleep = (ms: number | undefined) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const fullPhrase = props.quote.join("\n\n");
	const fullAttribution = `-- ${props.signature[0]}, ${props.signature[1]}`;
	const [phrase, setPhrase] = useState("");
	const [attribution, setAttribution] = useState("");
	const [factor, setFactor] = useState(1); // fun easter egg where you can speed up Jeff Zarnett (and Victoria)
	const factorRef = useRef(factor);
	const [showQuote, setShowQuote] = useState(false);

	useEffect(() => {
		factorRef.current = factor;
	}, [factor]);

	useEffect(() => {
		const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
			if (e.key === "c") {
				setFactor(15);
			}
		};
		const handleKeyUp = (e: { key: string; preventDefault: () => void }) => {
			if (e.key === "c") {
				setFactor(1);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [factor]);

	const writeSentence = async (
		sentence: string,
		setSentence: {
			(value: SetStateAction<string>): void;
			(arg0: string): void;
		},
	) => {
		for (let i = 0; i < sentence.length; i++) {
			setSentence(sentence.substring(0, i + 1));
			if (
				sentence.charAt(i) === "," ||
				sentence.charAt(i) === ":" ||
				sentence.charAt(i) === "-"
			) {
				await sleep(300 / factorRef.current);
			} else if (sentence.charAt(i) === ".") {
				await sleep(600 / factorRef.current);
			} else {
				await sleep(20 / factorRef.current);
			}
		}
	};

	const writeQuoteAndAttribution = async () => {
		await writeSentence(fullPhrase, setPhrase);
		const fullAttribution = `-- ${props.signature[0]}, ${props.signature[1]}`;
		await writeSentence(fullAttribution, setAttribution);
	};

	useEffect(() => {
		writeQuoteAndAttribution();
		// FYI, if you're about to add a dependency on
		// writeQuoteAndAttribution due to a lint warning, don't.
		// (You will get infinite re-renders)
	}, []);

	return (
		<div className={styles.overlay}>
			<FocusTrap>
				<div
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							props.toggleModal();
						}
					}}
					className={styles.parent}
					role="dialog"
					aria-modal="true"
				>
					<div className={styles.photo}>
						{props.profImg && (
							<Image
								src={BASE_PATH + props.profImg}
								alt={props.profName}
								fill={true}
								style={{ objectFit: "contain" }}
								tabIndex={0}
								onClick={() => setShowQuote(!showQuote)}
							/>
						)}
					</div>
					<div className={styles.textbox} tabIndex={0}>
						{/* invisible sizer to determine height/width */}
						<div className={styles.hiddenSizer}>
							{fullPhrase}
							<h2>{fullAttribution}</h2>
						</div>
						{/* actual text content */}
						<div className={styles.textContent}>
							{phrase}
							<h2>{attribution}</h2>
						</div>
					</div>
					<span
						className={styles.exit}
						onClick={props.toggleModal}
						tabIndex={1}
						style={{ fontSize: "48px" }}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								props.toggleModal();
							}
						}}
					>
						X
					</span>
				</div>
			</FocusTrap>
		</div>
	);
}
