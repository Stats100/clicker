import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title({ color: "pink" })}>Stats100&nbsp;</h1>
					<h1 className={title()}>Clicker</h1>
					<br />
					<h1 className={title()}>Coming&nbsp;</h1>
					<h1 className={title({ color: "blue" })}>18th February</h1>
					<br />
					<h4 className={subtitle({ class: "mt-4" })}>
						The best clicker yet
					</h4>
				</div>
				<br />
				<div className="flex gap-3">
					<button>
						<h3 className={title({ color: "green" })}>Hey wait {">"}:3</h3>
						<h4 className={subtitle({ class: "mt-4" })}>
							I don&apos;t work yet
						</h4>
					</button>
				</div>
			</section>
		</DefaultLayout>
	);
}
