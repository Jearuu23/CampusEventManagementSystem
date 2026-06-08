import type { Route } from "../+types/register";
import { default as LoginPage } from "~/pages/public/auth/Login";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Login | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Login() {
	return <LoginPage />;
}
