import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import { SiteConfig, siteConfig } from "@/config/site";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow">
				{children}
			</main>
			<footer className="w-full flex items-center justify-center py-3">
				<Link
					isExternal
					className="flex items-center gap-1 text-current"
					href={siteConfig.links.github}
					title="nextui.org homepage"
				>
					<span className="text-default-600">Version</span>
					<p className="text-primary">{siteConfig.version}</p>
				</Link>
			</footer>
		</div>
	);
}