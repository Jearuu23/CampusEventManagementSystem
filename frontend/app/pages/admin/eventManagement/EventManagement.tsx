import React, { useState, useEffect } from "react";
import EventsTab from "./eventsTab";
import OrganizersTab from "./organizersTab";
import { useSearchParams } from "react-router";

export default function EventManagement() {
	const [searchParams, setSearchParams] = useSearchParams();
	const tabParam = searchParams.get("tab");

	const [activeTab, setActiveTab] = useState<"events" | "organizers">(tabParam === "organizers" ? "organizers" : "events");

	useEffect(() => {
		if (tabParam === "events" || tabParam === "organizers") {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	const handleTabChange = (tab: "events" | "organizers") => {
		setActiveTab(tab);
		const newParams = new URLSearchParams(searchParams);
		newParams.set("tab", tab);
		setSearchParams(newParams);
	};

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
						onClick={() => handleTabChange("events")}>
						Events
					</button>
					<button
						className={`pb-4 px-4 text-[13px] font-medium tracking-[0.08em] uppercase transition-all cursor-pointer bg-transparent ${
							activeTab === "organizers"
								? "border-b-2 border-brand text-text-primary"
								: "border-b-2 border-transparent text-text-muted hover:text-text-primary"
						}`}
						onClick={() => handleTabChange("organizers")}>
						Organizers
					</button>
				</div>

				{activeTab === "events" ? <EventsTab /> : <OrganizersTab />}
			</div>
		</div>
	);
}
