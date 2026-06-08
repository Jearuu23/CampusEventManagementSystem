import type { Route } from "../+types/register";
import { default as RegisterPage } from "~/pages/public/auth/Register";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Register | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return <RegisterPage />;
}
