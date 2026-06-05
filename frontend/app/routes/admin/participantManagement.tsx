import type { Route } from "../+types/home";
import { default as ParticipantManagementPage } from "~/pages/admin/participantManagement/ParticipantManagement";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Participant Management" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function ParticipantManagement() {
	return <ParticipantManagementPage />;
}
