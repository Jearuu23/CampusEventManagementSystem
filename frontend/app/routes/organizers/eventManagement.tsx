import type { Route } from "../+types/organizerEventManagement";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as EventManagementPage } from "~/pages/organizer/eventManagement/EventManagement";

export function meta({}: Route.MetaArgs) {
	return [{ title: "My Events" }, { name: "description", content: "Manage your events" }];
}

export default function EventManagement() {
	return (
		<RouteHandler role={UserRole.ORGANIZER}>
			<EventManagementPage />
		</RouteHandler>
	);
}
