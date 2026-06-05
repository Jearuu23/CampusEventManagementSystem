import type { Route } from "../+types/register";
import { default as LoginPage } from "~/pages/public/auth/Login";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Login" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Login() {
	return <LoginPage />;
}
