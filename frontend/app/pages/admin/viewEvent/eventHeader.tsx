import React from "react";

export default function EventHeader({ event }: { event: any }) {
	return (
		<div className="mb-10 border-b border-border pb-8">
			<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
				{event.department || "General"} Event
			</div>
			<h1 className="font-serif text-[32px] md:text-[40px] font-bold text-text-primary leading-[1.1] mb-5">{event.title}</h1>
			<div className="flex flex-wrap gap-4 items-center">
				<span
					className={`px-2.5 py-1 rounded-[1px] font-mono text-[10px] tracking-[0.1em] uppercase ${
						event.status === "approved"
							? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
							: event.status === "pending"
								? "bg-[rgba(168,135,58,0.12)] text-warning"
								: event.status === "cancelled" || event.status === "rejected"
									? "bg-[rgba(200,64,30,0.1)] text-brand"
									: "bg-surface-secondary text-text-muted"
					}`}>
					{event.status || "Unknown Status"}
				</span>
				<span className="font-mono text-[12px] text-text-muted flex items-center gap-2">
					<span className="w-1 h-1 rounded-full bg-border"></span>
					{event.event_start_date ? new Date(event.event_start_date).toLocaleString() : "Date TBA"}
				</span>
			</div>
		</div>
	);
}
