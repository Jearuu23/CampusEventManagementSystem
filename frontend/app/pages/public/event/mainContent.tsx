import React from "react";
import EventInfo from "./eventInfo";
import RegistrationForm from "./registrationForm";
import type { Event } from "~/types/events";

export default function MainContent({ event, user }: { event?: Event; user?: any }) {
	return (
		<section className="py-16 md:py-[100px] px-8 md:px-20 bg-background">
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-[100px] max-w-7xl mx-auto items-start">
				{/* Left Column: Description & Metadata */}
				<EventInfo event={event} />
				{/* Right Column: Sticky Form */}
				<RegistrationForm event={event} user={user} />
			</div>
		</section>
	);
}
