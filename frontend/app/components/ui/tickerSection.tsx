import React from "react";

export default function TickerSection() {
	return (
		<>
			<style>{`
				@keyframes ticker {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
			`}</style>
			<div className="bg-brand py-2.5 overflow-hidden whitespace-nowrap">
				<div className="inline-block animate-[ticker_30s_linear_infinite]">
					{[
						"Est. 1891 — University Campus Events",
						"Serving 18 Academic Departments",
						"12,000+ Attendees Monthly",
						"240+ Annual Events",
					].map((text, index) => (
						<span
							key={index}
							className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-background mr-20 before:content-['◆_'] before:opacity-60 before:mr-2">
							{text}
						</span>
					))}
					{[
						"Est. 1891 — University Campus Events",
						"Serving 18 Academic Departments",
						"12,000+ Attendees Monthly",
						"240+ Annual Events",
					].map((text, index) => (
						<span
							key={`dup-${index}`}
							className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-background mr-20 before:content-['◆_'] before:opacity-60 before:mr-2">
							{text}
						</span>
					))}
				</div>
			</div>
		</>
	);
}
