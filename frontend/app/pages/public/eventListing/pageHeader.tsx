import React from "react";

export default function PageHeader() {
	return (
		<section className="bg-text-primary px-8 md:px-20 pt-[80px] pb-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px] items-end relative overflow-hidden">
			<div className="relative z-10 fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-5 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					Browse &amp; Discover
				</div>
				<h1 className="font-serif text-[clamp(40px,4.5vw,64px)] font-black leading-none text-background">
					All Campus
					<br />
					<em className="italic text-brand font-black">Events</em>
				</h1>
			</div>
			<div className="flex flex-col justify-end gap-6 relative z-10 fade-in-element">
				<p className="text-[15px] text-background/50 leading-[1.7] font-light">
					Search, filter, and explore every lecture, workshop, exhibition, and gathering scheduled across all 18 departments this semester.
				</p>
				<div className="flex gap-10 flex-wrap pt-2">
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[28px] text-background leading-none">47</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">This month</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[28px] text-background leading-none">12</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">This week</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[28px] text-background leading-none">3</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">Today</span>
					</div>
				</div>
			</div>

			<div className="relative overflow-hidden hidden md:block">
				<div className="absolute inset-0 bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208] flex items-center justify-center">
					<svg width="240" height="240" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
						<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
						<circle cx="40" cy="40" r="20" stroke="#a8873a" strokeWidth="0.5" />
						<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
						<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
					</svg>
				</div>
				<div className="absolute inset-0 bg-gradient-to-r from-text-primary from-0% to-transparent to-40%"></div>
			</div>
		</section>
	);
}
