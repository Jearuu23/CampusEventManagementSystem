import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import HeroSection from "./heroSection";
import MainContent from "./mainContent";
import type { Event as EventType } from "~/types/events";
import { getImageUrl } from "~/utils/helpers";
import { useAuth } from "~/contexts/auth/AuthContext";

export default function Event() {
	const { event } = useLoaderData() as { event: EventType };
	const observerRef = useRef<IntersectionObserver | null>(null);
	const { user } = useAuth();

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
		<div className="font-sans text-text-primary bg-background min-h-screen relative">
			{event?.imagePath && (
				<div className="absolute top-0 left-0 w-full h-[50vh] md:h-[70vh] z-0 overflow-hidden pointer-events-none">
					<img src={getImageUrl(event.imagePath)} alt={event.title} className="w-full h-full object-cover opacity-30" />
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
				</div>
			)}
			<div className="relative z-10">
				<HeroSection event={event} />
				<MainContent event={event} user={user} />
			</div>
		</div>
	);
}
