import "../styles/main.scss";
import "./components/DigitalMenu.scss";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
