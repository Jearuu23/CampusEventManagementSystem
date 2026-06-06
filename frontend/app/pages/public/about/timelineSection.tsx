import React from "react";

export default function TimelineSection() {
	return (
		<section className="py-[100px] px-8 md:px-20 bg-text-primary">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] mb-20 fade-in-element">
				<div>
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
						Our History
					</div>
					<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1] text-background">
						A Century of
						<br />
						<em className="italic text-brand">Gathering</em>
					</h2>
				</div>
				<p className="text-[15px] text-background/50 leading-[1.75] font-light pt-0 md:pt-[60px]">
					From a single lecture series organized by four faculty members, to the most comprehensive academic events calendar in the region —
					this is how we got here.
				</p>
			</div>

			<div className="relative flex flex-col fade-in-element">
				{[
					{
						year: "1891",
						tag: "Founding",
						title: "The First Lecture Series",
						desc: "Four founding faculty members organized the university's first public lecture series in the original Main Hall. Twelve lectures were held that first autumn, drawing audiences from the surrounding town.",
					},
					{
						year: "1924",
						tag: "Expansion",
						title: "Office of Campus Life Established",
						desc: "Growing student enrollment and departmental requests led to the formalization of a dedicated events coordination office, staffed by two full-time administrators and a student advisory board.",
					},
					{
						year: "1968",
						tag: "Cultural Shift",
						title: "Student Organizations Take the Stage",
						desc: "Student-led programming was formally integrated into the campus calendar for the first time, recognizing student organizations as equal partners in shaping campus intellectual life.",
					},
					{
						year: "2003",
						tag: "Digital Era",
						title: "The Online Events Directory Launches",
						desc: "The first campus events website consolidated what had been a patchwork of departmental flyers and bulletin boards into a single, searchable digital calendar available to all students and staff.",
					},
					{
						year: "2024",
						tag: "Present",
						title: "Campus Events Portal — This Platform",
						desc: "A complete redesign of the events ecosystem: a unified portal for discovery, registration, and administration, serving over 12,000 monthly attendees across 18 academic departments.",
					},
				].map((item, index, arr) => (
					<div key={item.year} className="grid grid-cols-[80px_1px_1fr] md:grid-cols-[120px_1px_1fr] gap-x-6 md:gap-x-10 relative group">
						<div className="font-serif text-[24px] md:text-[28px] font-bold text-warning text-right py-9 leading-none">{item.year}</div>
						<div className={`relative ${index === arr.length - 1 ? "bg-gradient-to-b from-white/10 to-transparent" : "bg-white/10"}`}>
							<div className="absolute top-[42px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-brand border-2 border-text-primary shadow-[0_0_0_1px_var(--color-brand)]"></div>
						</div>
						<div className={`py-7 pl-0 md:pl-10 ${index === arr.length - 1 ? "" : "border-b border-white/5"}`}>
							<div className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand bg-[rgba(200,64,30,0.12)] px-2.5 py-1 rounded-[1px] inline-block mb-3">
								{item.tag}
							</div>
							<div className="font-serif text-[22px] font-bold text-background mb-2.5 leading-[1.2]">{item.title}</div>
							<p className="text-[14px] text-background/50 leading-[1.7] font-light max-w-[560px]">{item.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
