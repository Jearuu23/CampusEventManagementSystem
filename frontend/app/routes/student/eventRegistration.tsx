import type { Route } from "../+types/home";
import { default as EventRegistrationPage } from "~/pages/student/EventRegistration";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";

export function meta({}: Route.MetaArgs) {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventRegistration() {
	return (
		<RouteHandler role={UserRole.USER}>
			<EventRegistrationPage />
		</RouteHandler>
	);
}
