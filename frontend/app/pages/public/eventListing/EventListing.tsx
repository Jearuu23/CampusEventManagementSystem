import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import PageHeader from "./pageHeader";
import TickerSection from "~/components/ui/tickerSection";
import EventsSection from "./eventsSection";
import FilterBar from "./filterBar";
import Sidebar from "./sidebar";
import MainContent from "./mainContent";

export default function EventListings() {
	const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

	return (
		<div className="font-sans text-text-primary bg-background min-h-screen">
			<style>{`
				.no-scrollbar::-webkit-scrollbar { display: none; }
				.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			`}</style>

			<PageHeader />
			<TickerSection />
			<FilterBar viewMode={viewMode} setViewMode={setViewMode} />
			<div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[calc(100vh-113px)] bg-background items-start">
				<Sidebar />
				<MainContent viewMode={viewMode} />
			</div>
		</div>
	);
}
