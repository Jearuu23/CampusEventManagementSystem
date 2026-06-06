import React from "react";

export default function EventDetails({ event }: { event: any }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
			<div className="flex flex-col gap-8">
				<section>
					<h3 className="font-mono text-[11px] uppercase text-text-muted mb-4 tracking-[0.15em]">Description</h3>
					<p className="text-[14px] text-text-primary leading-[1.8] font-light whitespace-pre-wrap">
						{event.description || "No description provided for this event."}
					</p>
				</section>
			</div>

			<div className="flex flex-col gap-6">
				<div className="bg-surface-secondary/20 border border-border p-6 rounded-[2px]">
					<h3 className="font-mono text-[11px] uppercase text-text-muted mb-5 tracking-[0.15em]">Event Information</h3>
					<ul className="space-y-4">
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Location</span>
							<span className="text-[13px] text-text-primary font-medium">{event.location || "TBA"}</span>
						</li>
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Capacity</span>
							<span className="text-[13px] text-text-primary font-medium">{event.capacity || "N/A"}</span>
						</li>
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Organizer</span>
							<span className="text-[13px] text-text-primary font-medium">{event.organizer_name || event.department || "Unknown"}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
