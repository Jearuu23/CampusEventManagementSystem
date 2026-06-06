import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import HeroSection from "./heroSection";
import MainContent from "./mainContent";
import type { Event as EventType } from "~/types/events";

export default function Event() {
	const { event } = useLoaderData() as { event: EventType };
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
			<HeroSection event={event} />
			<MainContent event={event} />
		</div>
	);
}
