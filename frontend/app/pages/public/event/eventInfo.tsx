import React from "react";
import type { Event } from "~/types/events";

export default function EventInfo({ event }: { event?: Event }) {
	if (!event) return null;

	const formatDate = (dateString?: string) => {
		if (!dateString) return null;
		return new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
	};

	const formatTime = (timeString?: string) => {
		if (!timeString) return null;
		const [hours, minutes] = timeString.split(":");
		if (!hours || !minutes) return timeString;
		const h = parseInt(hours, 10);
		const ampm = h >= 12 ? "PM" : "AM";
		const displayHours = h % 12 || 12;
		return `${displayHours}:${minutes} ${ampm}`;
	};

	const startDate = formatDate(event.eventStartDate) || "TBA";
	const endDate = formatDate(event.eventEndDate);
	const startTime = formatTime(event.eventStartTime) || "TBA";
	const endTime = formatTime(event.eventEndTime);

	const displayDate = endDate && startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
	const displayTime = endTime ? `${startTime} – ${endTime}` : startTime;

	return (
		<div className="fade-in-element">
			<h2 className="font-serif text-[28px] font-bold mb-6">About This Event</h2>
			<div className="text-[15px] text-text-muted leading-[1.8] font-light flex flex-col gap-5 mb-14 whitespace-pre-wrap">
				{event.description || "No description provided."}
			</div>

			<h3 className="font-serif text-[20px] font-bold mb-5">Event Details</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 border-t border-border pt-6">
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Date &amp; Time</div>
					<div className="text-[14px] text-text-primary">{displayDate}</div>
					<div className="text-[13px] text-text-muted mt-0.5">{displayTime}</div>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Location</div>
					<div className="text-[14px] text-text-primary">{event.location || "TBA"}</div>
					{event.department && <div className="text-[13px] text-text-muted mt-0.5">{event.department}</div>}
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Capacity</div>
					<div className="text-[14px] text-text-primary flex items-center gap-2">
						{event.currentParticipants || 0} / {event.maxParticipants ? `${event.maxParticipants} Registered` : "No Limit"}
					</div>
					<div
						className={`mt-2 font-mono text-[9px] tracking-[0.1em] uppercase py-1 px-2.5 rounded-[1px] inline-block ${
							event.status === "approved"
								? "bg-success-bg text-success-text"
								: event.status === "ongoing"
									? "bg-info-bg text-info-text"
									: event.status === "completed"
										? "bg-border-muted text-text-muted"
										: event.status === "cancelled"
											? "bg-danger-bg text-danger-text"
											: "bg-warning-bg text-warning-text"
						}`}>
						Status: {event.status === "approved" ? "Open" : event.status || "Pending"}
					</div>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">Organizer</div>
					<div className="text-[14px] text-text-primary">{event.organizerName || "Event Organizer"}</div>
				</div>
			</div>
		</div>
	);
}
