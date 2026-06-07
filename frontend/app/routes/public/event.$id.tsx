import type { Route } from "../+types/event.$id";
import { default as EventPage } from "~/pages/public/event/Event";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { GetEventById } from "~/api/events";

export async function loader({ params }: Route.LoaderArgs) {
	const id = params.id;
	if (!id || isNaN(Number(id))) {
		throw new Response("Invalid Event ID", { status: 400 });
	}

	const response = (await GetEventById(Number(id))) as any;
	if (!response.success || !response.data) {
		throw new Response("Event Not Found", { status: 404 });
	}

	return { event: response.data };
}

export function meta({ data }: Route.MetaArgs) {
	if (!data?.event) return [{ title: "Event Not Found | CEMS" }];
	return [{ title: `${data.event.title} | CEMS` }, { name: "description", content: data.event.description }];
}

export default function EventRegistration() {
	return <EventPage />;
}
