import Link from "next/link";
import styles from "./TabNavbar.module.css";

type TabNavbarProps = {
	current: string;
	tabs: {
		name: string;
		href: string;
	}[];
};

export default function TabNavbar(props: TabNavbarProps) {
	const { current, tabs } = props;

	return (
		<nav className={styles.tabBar}>
			<span>
				{tabs.map(({ name, href }) =>
					name == current ? (
						<CurrentTab key={name} name={name} href={href} />
					) : (
						<Tab key={name} name={name} href={href} />
					),
				)}
			</span>
		</nav>
	);
}

type TabProps = {
	name: string;
	href: string;
};

function Tab(props: TabProps) {
	const { name, href } = props;

	return (
		<Link href={href} className={styles.tab}>
			<div>{name}</div>
		</Link>
	);
}

function CurrentTab(props: TabProps) {
	const { name } = props;

	return <div className={styles.currentTab}>{name}</div>;
}
