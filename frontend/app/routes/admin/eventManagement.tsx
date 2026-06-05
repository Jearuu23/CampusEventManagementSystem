import type { Route } from "../+types/home";
import { default as EventManagementPage } from "~/pages/admin/eventManagement/EventManagement";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Admin Dashboard" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventManagement() {
	return <EventManagementPage />;
}
