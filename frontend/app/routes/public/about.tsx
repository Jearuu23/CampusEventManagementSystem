import { APPNAME } from "~/constants";
import type { Route } from "../+types/about";
import { default as AboutPage } from "~/pages/public/about/About";

export function meta({}: Route.MetaArgs) {
	return [{ title: `About | ${APPNAME} ` }, { name: "description", content: "About Page!" }];
}

export default function About() {
	return <AboutPage />;
}
