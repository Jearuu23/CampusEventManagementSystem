import type { Route } from "../+types/eventListing";
import { default as EventListingPage } from "~/pages/public/eventListing/EventListing";
import { GetEvents } from "~/api/events";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const limit = 9; // Number of items per page
	const offset = (page - 1) * limit;

	const response = (await GetEvents({ status: "ongoing,approved,completed,cancelled", limit, offset })) as any;
	return { events: response.data || [], total: response.total || 0, page, limit };
}

export function meta({}: Route.MetaArgs) {
	return [{ title: "Event Listing" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventListing() {
	return <EventListingPage />;
}
