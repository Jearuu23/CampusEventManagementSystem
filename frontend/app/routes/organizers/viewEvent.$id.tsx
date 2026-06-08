import type { Route } from "../+types/dashboardOrganizer";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as ViewEventPage } from "~/pages/organizer/viewEvent/ViewEvent";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `View Event | ${APPNAME}` }, { name: "description", content: "View and edit your event" }];
}

export default function ViewEvent() {
	return (
		<RouteHandler role={UserRole.ORGANIZER}>
			<ViewEventPage />
		</RouteHandler>
	);
}
