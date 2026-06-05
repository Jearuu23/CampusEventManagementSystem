import type { Route } from "../+types/home";
import { default as EventRegistrationPage } from "~/pages/student/EventRegistration";

export function meta({}: Route.MetaArgs) {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventRegistration() {
	return <EventRegistrationPage />;
}
