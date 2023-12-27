import type { Metadata } from "next";
import "../styles/auto_generated_main.css";
import Header from "./components/Footer";
import Footer from "./components/Header";

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
