import type { Route } from "../+types/viewEventParticipants.$id";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as ViewEventPage } from "~/pages/participant/viewEvent/ViewEvent";

export function meta({}: Route.MetaArgs) {
	return [{ title: "View Event" }, { name: "description", content: "View and edit your event" }];
}

export default function ViewEvent() {
	return (
		<RouteHandler role={UserRole.PARTICIPANT}>
			<ViewEventPage />
		</RouteHandler>
	);
}
