import React from "react";
import { Link } from "react-router";

export default function CtaSection() {
	return (
		<div className="bg-brand p-12 md:p-20 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12 fade-in-element">
			<div>
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-background/65 flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-background/40">
					Get Involved
				</div>
				<h2 className="font-serif text-[clamp(32px,3vw,48px)] font-black text-background leading-[1.05] max-w-[560px]">
					Ready to Host
					<br />
					an <em className="italic opacity-75 font-serif">Event?</em>
				</h2>
			</div>
			<Link
				to="/register"
				className="bg-background text-brand px-9 py-4 text-[14px] font-medium tracking-[0.06em] uppercase rounded-[2px] no-underline whitespace-nowrap transition-all duration-150 inline-block text-center hover:bg-surface-secondary hover:-translate-y-[1px]">
				Go to Admin Suite →
			</Link>
		</div>
	);
}
