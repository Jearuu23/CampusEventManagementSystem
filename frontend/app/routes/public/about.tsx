import type { Route } from "../+types/about";
import { default as AboutPage } from "~/pages/public/about/About";

export function meta({}: Route.MetaArgs) {
	return [{ title: "About Page" }, { name: "description", content: "About Page!" }];
}

export default function About() {
	return <AboutPage />;
}
