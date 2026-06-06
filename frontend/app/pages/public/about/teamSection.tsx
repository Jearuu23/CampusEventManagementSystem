import React from "react";

export default function TeamSection() {
	return (
		<section className="py-[100px] px-8 md:px-20 bg-background">
			<div className="flex items-baseline justify-between mb-[60px] fade-in-element">
				<div>
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
						The People
					</div>
					<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1]">Meet the Team</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border">
				{[
					{
						name: "Dr. Eleanor Marsh",
						role: "Director",
						desc: "Office of Campus Events & Cultural Programming. Oversees all event strategy, partnerships, and academic calendar alignment.",
					},
					{
						name: "Marcus Lim",
						role: "Events Coordinator",
						desc: "Leads logistics, vendor relations, and day-of event operations for all faculty and department-hosted programs.",
					},
					{
						name: "Priya Santos",
						role: "Student Programs Lead",
						desc: "Liaison to student organizations, supporting org-led events from application through post-event reporting.",
					},
					{
						name: "James Okafor",
						role: "Systems & Portal Admin",
						desc: "Manages the events portal, org accounts, and technical infrastructure supporting the campus events platform.",
					},
				].map((member, i) => (
					<div key={i} className="bg-background py-9 px-7 flex flex-col gap-4 transition-colors hover:bg-surface-secondary fade-in-element">
						<div className="w-16 h-16 rounded-[2px] bg-text-primary flex items-center justify-center overflow-hidden shrink-0">
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--color-background)"
								strokeWidth="1.5"
								className="opacity-40">
								<circle cx="12" cy="8" r="4" />
								<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
							</svg>
						</div>
						<div>
							<div className="font-serif text-[20px] font-bold leading-[1.2] text-text-primary">{member.name}</div>
							<div className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand mt-1">{member.role}</div>
						</div>
						<div className="text-[13px] text-text-muted font-light leading-[1.5] border-t border-border pt-3.5 mt-auto">
							{member.desc}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
