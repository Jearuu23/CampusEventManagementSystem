import React from "react";

export default function HeroSection() {
	return (
		<section className="bg-text-primary pt-[120px] pb-20 px-8 md:px-20 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end min-h-[70vh]">
			<div className="absolute top-1/2 -translate-y-1/2 -right-10 font-serif text-[clamp(120px,20vw,280px)] font-black text-white/5 tracking-tighter leading-none pointer-events-none select-none">
				ABOUT
			</div>
			<div className="flex flex-col justify-end relative z-10">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-7 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					Our Story &amp; Purpose
				</div>
				<h1 className="font-serif text-[clamp(52px,5.5vw,80px)] font-black leading-none text-background mb-8">
					Where Ideas
					<br />
					Come <em className="italic text-brand">Alive</em>
				</h1>
			</div>
			<div className="relative z-10 flex flex-col justify-end pb-1">
				<p className="text-[17px] font-light text-background/60 leading-[1.75] max-w-[480px] border-l border-brand/40 pl-7 mb-10">
					Since 1891, the University Campus Events office has been the connective tissue of academic life — curating the lectures,
					exhibitions, workshops, and gatherings that transform a collection of students into a community of scholars.
				</p>
				<div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[32px] font-bold text-background">133</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">Years of service</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[32px] font-bold text-background">240+</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">Events per year</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-[32px] font-bold text-background">18</strong>
						<span className="text-[11px] uppercase tracking-[0.1em] text-text-muted">Departments</span>
					</div>
				</div>
			</div>
		</section>
	);
}
