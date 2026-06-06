import React, { useState } from "react";
import EventsTab from "./eventsTab";
import OrganizersTab from "./organizersTab";

export default function EventManagement() {
	const [activeTab, setActiveTab] = useState<"events" | "organizers">("events");

	return (
		<div className="w-full bg-background min-h-screen">
			<div className="p-8 md:p-12 fade-in-element">
				<div className="mb-8">
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
						Administration
					</div>
					<h1 className="font-serif text-[32px] md:text-[40px] font-bold text-text-primary leading-[1.1]">Platform Management</h1>
				</div>

				<div className="flex border-b border-border mb-8">
					<button
						className={`pb-4 px-4 text-[13px] font-medium tracking-[0.08em] uppercase transition-all cursor-pointer bg-transparent ${
							activeTab === "events"
								? "border-b-2 border-brand text-text-primary"
								: "border-b-2 border-transparent text-text-muted hover:text-text-primary"
						}`}
						onClick={() => setActiveTab("events")}>
						Events
					</button>
					<button
						className={`pb-4 px-4 text-[13px] font-medium tracking-[0.08em] uppercase transition-all cursor-pointer bg-transparent ${
							activeTab === "organizers"
								? "border-b-2 border-brand text-text-primary"
								: "border-b-2 border-transparent text-text-muted hover:text-text-primary"
						}`}
						onClick={() => setActiveTab("organizers")}>
						Organizers
					</button>
				</div>

				{activeTab === "events" ? <EventsTab /> : <OrganizersTab />}
			</div>
		</div>
	);
}
