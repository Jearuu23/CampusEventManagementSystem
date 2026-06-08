import { API_URL } from "./constant";
import type { ParticipationRecord, ParticipantDashboardData } from "~/types/user";

export async function RegisterOrganizer(Credentials: { firstName: string; lastName: string; email: string; password: string; organization: string }) {
	try {
		const res = await fetch(`${API_URL}auth/register.php`, {
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
			console.error("RegisterOrganizer JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("RegisterOrganizer Network Error:", error);
		return { success: false, message: "Network Error" };
	}
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

export async function GetParticipantDashboard(): Promise<{ success: boolean; data?: ParticipantDashboardData; message?: string }> {
	try {
		const res = await fetch(`${API_URL}events/getParticipantDashboard.php`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}

export async function GetParticipationStatus(
	eventId: number,
	email: string,
): Promise<{ success: boolean; data?: ParticipationRecord; message?: string }> {
	try {
		const res = await fetch(`${API_URL}participants/getParticipation.php?eventId=${eventId}&email=${encodeURIComponent(email)}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("GetParticipantDashboard JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("GetParticipantDashboard Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function UpdateParticipationStatus(payload: { eventId: number; email: string; status: string }) {
	try {
		const res = await fetch(`${API_URL}events/updateParticipation.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(payload),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
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

export async function GetOrganizers(params?: { status?: string; search?: string }) {
	try {
		const query = new URLSearchParams();
		if (params?.status) query.append("status", params.status);
		if (params?.search) query.append("search", params.search);

		const queryString = query.toString();
		const url = `${API_URL}events/manageOrganizer.php${queryString ? `?${queryString}` : ""}`;

		const res = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		const text = await res.text();
		try {
			const parsed = JSON.parse(text);
			if (parsed.success && Array.isArray(parsed.data)) {
				// Map backend database keys to the UI component's expected format
				parsed.data = parsed.data.map((org: any) => ({
					...org,
					name: org.name || [org.firstName || org.first_name, org.lastName || org.last_name].filter(Boolean).join(" "),
					org: org.org || org.organization,
				}));
			}
			return parsed;
		} catch (error) {
			console.error("GetOrganizers JSON Parse Error. PHP Output:", text);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.error("GetOrganizers Network Error:", error);
		return { success: false, data: [] };
	}
}

export async function UpdateOrganizerStatus(id: number, status: string) {
	try {
		const res = await fetch(`${API_URL}events/manageOrganizer.php`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ id, status }),
		});

		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (error) {
			console.error("UpdateOrganizerStatus JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server." };
		}
	} catch (error) {
		console.error("UpdateOrganizerStatus Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}
