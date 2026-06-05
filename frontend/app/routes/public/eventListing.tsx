import type { Route } from "../+types/eventListing";
import { default as EventListingPage } from "~/pages/public/eventListing/EventListing";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Event Listing" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventListing() {
	return <EventListingPage />;
}
