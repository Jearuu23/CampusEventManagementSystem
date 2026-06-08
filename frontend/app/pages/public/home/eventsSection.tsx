import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { GetEvents } from "~/api/events";
import { getImageUrl } from "~/utils/helpers";
import { ClockIcon, MapPinIcon, CalendarIcon } from "~/components/Icons";

export default function EventsSection() {
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = (await GetEvents({ status: "ongoing,approved", limit: 3 })) as any;
				if (response.success && response.data) {
					setEvents(response.data.slice(0, 3));
					console.log("events:", response.data.slice(0, 3));
				}
			} catch (error) {
				console.error("Failed to load events:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEvents();
	}, []);

	return (
		<section className="py-16 md:py-[100px] px-8 md:px-20 bg-background" id="events">
			<div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 md:mb-12 gap-4 fade-in-element">
				<div>
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-2.5 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
						On Campus
					</div>
					<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1]">Upcoming Events</h2>
				</div>
				<Link
					to="/event-listing"
					className="text-[13px] font-medium tracking-[0.08em] uppercase text-brand no-underline flex items-center gap-1.5 border-b border-primary-200 pb-0.5 transition-all hover:gap-2.5 shrink-0 self-start sm:self-end mb-1.5">
					View all →
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-[1px] bg-border border border-border fade-in-element">
				{loading ? (
					<div className="p-10 md:p-12 text-center col-span-full font-mono text-sm text-text-muted">Loading events...</div>
				) : events && events.length > 0 ? (
					events.map((event: any, index: number) => {
						const isFeatured = index === 0;
						return (
							<Link
								key={event.id || index}
								to={`/event/${event.id || ""}`}
								className={`bg-background flex flex-col gap-4 transition-colors hover:bg-surface-secondary cursor-pointer no-underline text-inherit group ${
									isFeatured ? "p-10 md:p-12" : "py-9 px-8"
								}`}>
								<div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-brand bg-primary-100 px-2.5 py-1 rounded-[1px] self-start">
									{event.department || (isFeatured ? "● Featured" : "Event")}
								</div>
								<div className="overflow-hidden rounded-[1px]">
									<div
										className={`w-full ${isFeatured ? "aspect-video" : "aspect-[4/3]"} bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208] relative flex items-center justify-center overflow-hidden`}>
										{event.imagePath ? (
											<img
												src={getImageUrl(event.imagePath)}
												alt={event.title}
												className="w-full h-full object-cover opacity-80"
											/>
										) : isFeatured ? (
											<svg
												width="80"
												height="80"
												viewBox="0 0 80 80"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="opacity-30">
												<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
												<circle cx="40" cy="40" r="20" stroke="#a8873a" strokeWidth="0.5" />
												<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
												<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
											</svg>
										) : (
											<svg
												width="60"
												height="60"
												viewBox="0 0 60 60"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="opacity-25">
												<rect x="5" y="5" width="50" height="50" stroke="#378add" strokeWidth="1" />
												<rect x="15" y="15" width="30" height="30" stroke="#378add" strokeWidth="0.5" />
												<line x1="5" y1="30" x2="55" y2="30" stroke="#378add" strokeWidth="0.5" />
												<line x1="30" y1="5" x2="30" y2="55" stroke="#378add" strokeWidth="0.5" />
											</svg>
										)}
									</div>
								</div>
								<h3 className={`font-serif font-bold leading-[1.2] ${isFeatured ? "text-[28px]" : "text-[20px]"}`}>{event.title}</h3>
								<p className="text-[14px] font-light text-text-muted leading-[1.6] line-clamp-3">{event.description}</p>
								<div className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-border">
									<div className="flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-[0.04em]">
										<CalendarIcon />
										{event.eventStartDate
											? new Date(event.eventStartDate).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})
											: "TBA"}{" "}
										{event.eventStartTime && ` · ${event.eventStartTime}`}
									</div>
									<div className="flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-[0.04em]">
										<MapPinIcon />
										{event.location}
									</div>
								</div>
							</Link>
						);
					})
				) : (
					<div className="p-10 md:p-12 text-center col-span-full font-mono text-sm text-text-muted">No upcoming events found.</div>
				)}
			</div>
		</section>
	);
}
