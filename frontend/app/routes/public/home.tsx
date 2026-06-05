import type { Route } from "../+types/home";
import { default as HomePage } from "~/pages/public/home/Home";

export function meta({}: Route.MetaArgs) {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return <HomePage />;
}
