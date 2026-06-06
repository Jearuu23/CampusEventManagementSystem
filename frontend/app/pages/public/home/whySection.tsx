import React from "react";

export default function WhySection() {
	return (
		<section className="py-16 md:py-[100px] px-8 md:px-20 bg-text-primary grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20 items-center">
			<div className="fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
					Our Purpose
				</div>
				<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1] text-background mb-5">
					Why Engage
					<br />
					with Campus
					<br />
					<em className="italic opacity-60 font-serif">Events?</em>
				</h2>
				<p className="text-[15px] text-background/50 font-light leading-[1.7] max-w-[360px]">
					A robust calendar of events is central to the academic experience, fostering community, intellectual growth, and professional
					networking.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 fade-in-element">
				<div className="bg-white/5 py-9 px-8 flex flex-col gap-3.5 transition-colors hover:bg-white/10">
					<div className="w-10 h-10 bg-primary-100 rounded-[2px] flex items-center justify-center text-brand">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
							<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
						</svg>
					</div>
					<div className="font-serif text-[20px] font-bold text-background leading-[1.2]">Intellectual Enrichment</div>
					<p className="text-[13px] font-light text-background/50 leading-[1.7]">
						Participate in curated discussions led by distinguished faculty and visiting scholars to broaden your academic horizons and
						spark new interdisciplinary ideas.
					</p>
				</div>

				<div className="bg-white/5 py-9 px-8 flex flex-col gap-3.5 transition-colors hover:bg-white/10">
					<div className="w-10 h-10 bg-primary-100 rounded-[2px] flex items-center justify-center text-brand">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
							<path d="M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
					</div>
					<div className="font-serif text-[20px] font-bold text-background leading-[1.2]">Professional Networking</div>
					<p className="text-[13px] font-light text-background/50 leading-[1.7]">
						Connect with industry-leading professionals and peers to build meaningful networks aligned to future career opportunities
						across disciplines.
					</p>
				</div>

				<div className="bg-white/5 py-9 px-8 flex flex-col gap-3.5 transition-colors hover:bg-white/10">
					<div className="w-10 h-10 bg-primary-100 rounded-[2px] flex items-center justify-center text-brand">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</div>
					<div className="font-serif text-[20px] font-bold text-background leading-[1.2]">Community Building</div>
					<p className="text-[13px] font-light text-background/50 leading-[1.7]">
						Participate in vibrant campus gatherings that strengthen the bonds between students, faculty, and the broader university
						community.
					</p>
				</div>

				<div className="bg-[rgba(200,64,30,0.08)] border border-[rgba(200,64,30,0.2)] py-9 px-8 flex flex-col gap-3.5 transition-colors hover:bg-[rgba(200,64,30,0.12)]">
					<div className="w-10 h-10 bg-[rgba(200,64,30,0.15)] rounded-[2px] flex items-center justify-center text-brand">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
						</svg>
					</div>
					<div className="font-serif text-[20px] font-bold text-background/85 leading-[1.2]">240+ Events / Year</div>
					<p className="text-[13px] font-light text-[rgba(200,64,30,0.65)] leading-[1.7]">
						The most comprehensive academic event calendar in the region — something new every day of the semester.
					</p>
				</div>
			</div>
		</section>
	);
}
