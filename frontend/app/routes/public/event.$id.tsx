import type { Route } from "../+types/event.$id";
import { default as EventPage } from "~/pages/public/event/Event";
import { GetEventById } from "~/api/events";
import { APPNAME } from "~/constants";

export async function loader({ params }: Route.LoaderArgs) {
	const id = params.id;
	if (!id || isNaN(Number(id))) {
		throw new Response("Invalid Event ID", { status: 400 });
	}

	const response = (await GetEventById(Number(id))) as any;
	console.log("res:", response);

	if (!response || !response.success) {
		throw new Response(response?.message || "Event Not Found", { status: 404 });
	}
	if (!response.data) {
		throw new Response("Event Data Missing from Backend", { status: 404 });
	}

	return { event: response.data };
}

export function meta({ data }: Route.MetaArgs) {
	if (!data?.event) return [{ title: "Event Not Found | CEMS" }];
	return [{ title: `${data.event.title} | ${APPNAME}` }, { name: "description", content: data.event.description }];
}

export default function EventRegistration() {
	return <EventPage />;
}
