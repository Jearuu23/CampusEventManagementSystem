import React, { useEffect, useRef } from "react";
import HeroSection from "./heroSection";
import TickerSection from "~/components/ui/tickerSection";
import EventsSection from "./eventsSection";
import WhySection from "./whySection";
import CtaSection from "./ctaSection";

export default function Home() {
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, i) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add("opacity-100", "translate-y-0");
							entry.target.classList.remove("opacity-0", "translate-y-5");
						}, i * 80);
					}
				});
			},
			{ threshold: 0.1 },
		);

		document.querySelectorAll(".fade-in-element").forEach((el) => {
			el.classList.add("opacity-0", "translate-y-5", "transition-all", "duration-500", "ease-out");
			observerRef.current?.observe(el);
		});

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return (
		<div className="font-sans text-text-primary bg-background min-h-screen">
			<HeroSection />
			<TickerSection />
			<EventsSection />
			<WhySection />
			<CtaSection />
		</div>
	);
}
