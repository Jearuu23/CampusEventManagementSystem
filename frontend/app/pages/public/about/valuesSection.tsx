export default function ValuesSection() {
	return (
		<section className="bg-text-primary py-[100px] px-8 md:px-20 grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20 items-start">
			<div className="fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
					What We Stand For
				</div>
				<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1] text-background mb-5">Our Values</h2>
				<p className="text-[15px] text-background/50 leading-[1.75] font-light max-w-[340px]">
					Every decision we make — from which events to feature to how we design our spaces — flows from these principles.
				</p>
			</div>

			<div className="flex flex-col border border-white/10 fade-in-element">
				{[
					{
						num: "01",
						title: "Intellectual Openness",
						desc: "We platform ideas across the full spectrum of academic inquiry — including the uncomfortable, the unconventional, and the unresolved. Debate is a feature, not a bug.",
					},
					{
						num: "02",
						title: "Radical Accessibility",
						desc: "The best events are the ones everyone can attend. We work to remove barriers — physical, informational, financial — from every event we host.",
					},
					{
						num: "03",
						title: "Community as Craft",
						desc: "An event is not a transaction. It is a designed social experience. We bring the same care to a department lunch as to a visiting Nobel laureate's lecture.",
					},
					{
						num: "04",
						title: "Student Leadership",
						desc: "Student organizations are full partners in our calendar — not guests. The future of campus life belongs to the people currently living it.",
					},
				].map((val, i, arr) => (
					<div
						key={i}
						className={`grid grid-cols-[56px_1fr] transition-colors hover:bg-white/5 ${i === arr.length - 1 ? "" : "border-b border-white/5"}`}>
						<div className="font-mono text-[11px] text-[rgba(200,64,30,0.5)] tracking-[0.1em] py-8 pl-6 border-r border-white/5 flex items-start">
							{val.num}
						</div>
						<div className="p-8">
							<div className="font-serif text-[20px] font-bold text-background mb-2 leading-[1.2]">{val.title}</div>
							<p className="text-[13px] text-background/45 leading-[1.7] font-light">{val.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
