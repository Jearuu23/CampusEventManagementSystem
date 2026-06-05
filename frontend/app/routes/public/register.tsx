import type { Route } from "../+types/register";
import { default as RegisterPage } from "~/pages/public/auth/Register";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Register" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return <RegisterPage />;
}
