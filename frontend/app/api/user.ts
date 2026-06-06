import { API_URL } from "./constant";

export async function RegisterOrganizer(Credentials: {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	organization: string;
}) {
	const res = await fetch(`${API_URL}auth/register.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(Credentials),
	});

	return res.json().then((data) => data);
}
export async function LoginUser(Credentials: { email: string; password: string }) {
	const res = await fetch(`${API_URL}auth/login.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(Credentials),
	});

	const text = await res.text();
	try {
		return JSON.parse(text);
	} catch (error) {
		console.error("Server returned non-JSON response:", text);
		throw new Error("Invalid response from server");
	}
}

export async function CheckAuth() {
	const res = await fetch(`${API_URL}auth/checkAuth.php`, {
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function LogoutUser() {
	const res = await fetch(`${API_URL}auth/logout.php`, {
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function GetEvent(id: number) {
	const res = await fetch(`${API_URL}events/getEvent.php?id=${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function GetOrganizers() {
	try {
		const res = await fetch(`${API_URL}auth/manageOrganizer.php`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await res.json();
	} catch (error) {
		return { success: false, data: [] };
	}
}

export async function UpdateOrganizerStatus(id: number, status: string) {
	try {
		const res = await fetch(`${API_URL}auth/manageOrganizer.php`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ id, status }),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}
