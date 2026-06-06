import React from "react";

export default function MissionSection() {
	return (
		<section className="py-[100px] px-8 md:px-20 bg-background grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-[100px] items-start">
			<div className="fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-5 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
					Our Mission
				</div>
				<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1] mb-8">
					More Than
					<br />a Calendar
				</h2>
			</div>
			<div className="fade-in-element flex flex-col gap-8">
				<p className="font-serif text-[22px] italic font-normal leading-[1.5] text-text-primary border-l-[3px] border-brand pl-6 mb-8">
					"The university is not a serene grove of knowledge — it is a living, arguing, discovering organism."
				</p>
				<div className="flex flex-col gap-5 text-[15px] text-text-muted leading-[1.8] font-light">
					<p>
						Campus Events exists to give that organism a pulse. We believe that the hallways between lectures, the minutes before a panel
						begins, and the conversations that linger after a performance end — these are the moments where real education happens.
					</p>
					<p>
						Our office works with faculty, student organizations, visiting scholars, and external partners to design a calendar that
						reflects the full breadth of university life: rigorous and playful, specialized and cross-disciplinary, prestigious and
						accessible.
					</p>
					<p>
						We are stewards of the university's intellectual culture. Every event we host is an investment in the community we're building
						— one that asks hard questions, celebrates creative risk, and welcomes every member of our campus.
					</p>
				</div>
			</div>
		</section>
	);
}
