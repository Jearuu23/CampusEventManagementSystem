import React from "react";

export default function HeroSection() {
	return (
		<section className="bg-text-primary min-h-[50vh] flex flex-col justify-end px-8 md:px-20 pt-32 pb-16 relative overflow-hidden">
			<div className="relative z-10 fade-in-element max-w-4xl">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-5 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					Symposium · Computer Science
				</div>
				<h1 className="font-serif text-[clamp(40px,5vw,72px)] font-black leading-[1.05] text-background mb-6">
					The Future of AI in Research
				</h1>
				<div className="flex items-center gap-6 font-mono text-[11px] text-background/60 tracking-[0.05em] uppercase">
					<span>Oct 15, 2024</span>
					<span className="opacity-50">•</span>
					<span>Science Building</span>
				</div>
			</div>
			<div className="absolute inset-0 bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208] flex items-center justify-center -z-10">
				<svg width="240" height="240" viewBox="0 0 80 80" fill="none" className="opacity-10">
					<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
					<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
					<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
				</svg>
			</div>
		</section>
	);
}
