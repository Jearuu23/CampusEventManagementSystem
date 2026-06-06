import React from "react";
import { Link } from "react-router";

export default function HeroSection() {
	return (
		<section className="bg-text-primary min-h-[88vh] grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
			<div className="pt-20 pb-20 pl-8 md:pl-20 pr-8 md:pr-16 flex flex-col justify-center relative z-10">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-7 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					University Events Portal
				</div>
				<h1 className="font-serif text-[clamp(52px,5.5vw,80px)] font-black leading-none text-background mb-7">
					Discover
					<br />
					Academic
					<br />
					<em className="italic text-brand font-black">Excellence</em>
				</h1>
				<p className="text-base font-light text-background/60 max-w-[400px] leading-relaxed mb-12">
					From distinguished guest lectures to dynamic student showcases — the intellectual and cultural heartbeat of our campus, all in one
					place.
				</p>
				<div className="flex flex-col sm:flex-row sm:items-center gap-5">
					<a
						href="#events"
						className="bg-brand text-background px-8 py-[14px] text-sm font-medium tracking-[0.04em] rounded-sm transition-all duration-200 hover:bg-brand-hover hover:-translate-y-[1px] inline-block text-center">
						Find Your Next Event
					</a>
					<Link
						to="/eventListing"
						className="text-background/60 text-sm font-normal tracking-[0.06em] flex items-center gap-2 transition-colors border-b border-background/20 pb-0.5 w-max hover:text-background">
						Browse Directory →
					</Link>
				</div>
				<div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/10">
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-3xl font-bold text-background">240+</strong>
						<span className="text-xs uppercase tracking-[0.1em] text-text-muted">Events this term</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-3xl font-bold text-background">18</strong>
						<span className="text-xs uppercase tracking-[0.1em] text-text-muted">Departments</span>
					</div>
					<div className="flex flex-col gap-1">
						<strong className="font-serif text-3xl font-bold text-background">12k</strong>
						<span className="text-xs uppercase tracking-[0.1em] text-text-muted">Attendees monthly</span>
					</div>
				</div>
			</div>

			<div className="relative overflow-hidden hidden md:block">
				<div className="absolute inset-0">
					<div
						style={{
							width: "100%",
							height: "100%",
							background: "linear-gradient(145deg, #2a2a1e 0%, #3d3825 30%, #1a2010 60%, #0e1a0a 100%)",
							position: "relative",
							overflow: "hidden",
						}}>
						<svg
							style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "65%" }}
							viewBox="0 0 600 300"
							preserveAspectRatio="xMidYMax slice"
							xmlns="http://www.w3.org/2000/svg">
							<defs>
								<linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#c8401e" stopOpacity="0.08" />
									<stop offset="100%" stopColor="#0e0d0b" stopOpacity="0.9" />
								</linearGradient>
							</defs>
							<rect x="0" y="200" width="600" height="100" fill="#0e0d0b" />
							<rect x="260" y="40" width="40" height="260" fill="#1a1a14" />
							<rect x="250" y="80" width="60" height="220" fill="#1a1a14" />
							<polygon points="280,20 260,70 300,70" fill="#1a1a14" />
							<circle cx="280" cy="110" r="18" fill="none" stroke="#a8873a" strokeWidth="1" opacity="0.5" />
							<rect x="180" y="120" width="70" height="180" fill="#141410" />
							<rect x="310" y="120" width="70" height="180" fill="#141410" />
							<rect x="30" y="160" width="50" height="140" fill="#111110" />
							<rect x="90" y="140" width="40" height="160" fill="#111110" />
							<rect x="140" y="150" width="35" height="150" fill="#111110" />
							<rect x="390" y="150" width="35" height="150" fill="#111110" />
							<rect x="435" y="140" width="40" height="160" fill="#111110" />
							<rect x="485" y="160" width="50" height="140" fill="#111110" />
							<rect x="545" y="175" width="40" height="125" fill="#111110" />
							<rect x="268" y="140" width="5" height="7" fill="#a8873a" opacity="0.4" />
							<rect x="282" y="140" width="5" height="7" fill="#a8873a" opacity="0.4" />
							<rect x="268" y="160" width="5" height="7" fill="#a8873a" opacity="0.3" />
							<rect x="282" y="160" width="5" height="7" fill="#a8873a" opacity="0.5" />
							<rect x="268" y="180" width="5" height="7" fill="#a8873a" opacity="0.2" />
							<rect x="0" y="0" width="600" height="300" fill="url(#skyGrad)" />
						</svg>
						<div
							style={{
								position: "absolute",
								top: "10%",
								left: "20%",
								width: "60%",
								height: "50%",
								background: "radial-gradient(ellipse, rgba(200,64,30,0.12) 0%, transparent 70%)",
							}}></div>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-r from-text-primary from-0% to-transparent to-30%"></div>
				<div className="absolute inset-0 bg-gradient-to-t from-text-primary from-0% to-transparent to-40%"></div>
				<div className="absolute bottom-10 right-10 font-mono text-[10px] tracking-[0.15em] uppercase text-background/35 [writing-mode:vertical-rl] [text-orientation:mixed]">
					University Main Campus · Est. 1891
				</div>
			</div>
		</section>
	);
}
