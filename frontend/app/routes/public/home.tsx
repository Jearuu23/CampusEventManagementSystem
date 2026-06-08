import type { Route } from "../+types/home";
import { default as HomePage } from "~/pages/public/home/Home";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Home | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return <HomePage />;
}
