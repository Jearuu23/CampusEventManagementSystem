import React from "react";
import EventInfo from "./eventInfo";
import RegistrationForm from "./registrationForm";

export default function MainContent({ event }: { event?: any }) {
	return (
		<section className="py-16 md:py-[100px] px-8 md:px-20 bg-background">
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-[100px] max-w-7xl mx-auto items-start">
				{/* Left Column: Description & Metadata */}
				<EventInfo event={event} />
				{/* Right Column: Sticky Form */}
				<RegistrationForm event={event} />
			</div>
		</section>
	);
}
