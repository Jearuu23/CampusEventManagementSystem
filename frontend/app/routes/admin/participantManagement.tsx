import type { Route } from "../+types/participantManagement";
import { default as ParticipantManagementPage } from "~/pages/admin/participantManagement/ParticipantManagement";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Participant Management" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function ParticipantManagement() {
	return (
		<RouteHandler role={UserRole.ADMIN}>
			<ParticipantManagementPage />
		</RouteHandler>
	);
}
