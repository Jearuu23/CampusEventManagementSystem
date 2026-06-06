import React from "react";

export default function EventInfo({ event }: { event?: any }) {
	if (!event) return null;

	const startDate = event.event_start_date
		? new Date(event.event_start_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
		: "TBA";
	const startTime = event.event_start_time || "TBA";
	const endTime = event.event_end_time ? ` – ${event.event_end_time}` : "";

	return (
		<div className="fade-in-element">
			<h2 className="font-serif text-[28px] font-bold mb-6">About This Event</h2>
			<div className="text-[15px] text-text-muted leading-[1.8] font-light flex flex-col gap-5 mb-14 whitespace-pre-wrap">
				{event.description}
			</div>

			<h3 className="font-serif text-[20px] font-bold mb-5">Event Details</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 border-t border-border pt-6">
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Date &amp; Time</div>
					<div className="text-[14px] text-text-primary">{startDate}</div>
					<div className="text-[13px] text-text-muted mt-0.5">
						{startTime}
						{endTime}
					</div>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Location</div>
					<div className="text-[14px] text-text-primary">{event.location}</div>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Capacity</div>
					<div className="text-[14px] text-text-primary flex items-center gap-2">
						{event.current_participants || 0} / {event.max_participants ? `${event.max_participants} Registered` : "No Limit"}
					</div>
					<div
						className={`mt-2 font-mono text-[9px] tracking-[0.1em] uppercase py-1 px-2.5 rounded-[1px] inline-block ${
							event.status === "approved"
								? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
								: event.status === "ongoing"
									? "bg-[rgba(55,138,221,0.1)] text-[#378add]"
									: event.status === "completed"
										? "bg-[rgba(100,100,100,0.1)] text-text-muted"
										: event.status === "cancelled"
											? "bg-[rgba(200,64,30,0.1)] text-brand"
											: "bg-[rgba(168,135,58,0.12)] text-warning"
						}`}>
						Status: {event.status === "approved" ? "Open" : event.status}
					</div>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Organizer</div>
					<div className="text-[14px] text-text-primary">{event.organizer_name || "Event Organizer"}</div>
					<div className="text-[13px] text-text-muted mt-0.5">{event.department || "Office of Campus Events"}</div>
				</div>
			</div>
		</div>
	);
}
