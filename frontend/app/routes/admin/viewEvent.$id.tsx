import type { Route } from "../+types/viewEventAdmin.$id";
import { default as ViewEventPage } from "~/pages/admin/viewEvent/ViewEvent";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Event Management | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function ParticipantManagement() {
	return (
		<RouteHandler role={UserRole.ADMIN}>
			<ViewEventPage />
		</RouteHandler>
	);
}
