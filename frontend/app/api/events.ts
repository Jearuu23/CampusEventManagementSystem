import { API_URL } from "./constant";

export async function GetEvents(params?: { status?: string; organizer_id?: number; limit?: number; offset?: number }) {
	try {
		const query = new URLSearchParams();
		if (params?.status) query.append("status", params.status);
		if (params?.organizer_id) query.append("organizer_id", params.organizer_id.toString());
		if (params?.limit) query.append("limit", params.limit.toString());
		if (params?.offset !== undefined) query.append("offset", params.offset.toString());

		const queryString = query.toString();
		const url = `${API_URL}events/getEvents.php${queryString ? `?${queryString}` : ""}`;

		const res = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			const data = JSON.parse(text);
			return { ...data, data: data.events || [], total: data.total || 0 };
		} catch (e) {
			console.error("GetAllEvents JSON Parse Error. PHP Output:", text);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.error("GetAllEvents Network Error:", error);
		return { success: false, data: [] };
	}
}

export async function GetEventById(id: number) {
	try {
		const res = await fetch(`${API_URL}events/getEvent.php?id=${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			const data = JSON.parse(text);
			return { ...data, data: data.event || null };
		} catch (e) {
			console.error("GetEventById JSON Parse Error. PHP Output:", text);
			return { success: false, data: null };
		}
	} catch (error) {
		console.error("GetEventById Network Error:", error);
		return { success: false, data: null };
	}
}

export async function GetEventsByStatus(status: string) {
	try {
		const res = await fetch(`${API_URL}events/getEvents.php?status=${status}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			const data = JSON.parse(text);
			return { ...data, data: data.events || [] };
		} catch (e) {
			console.error("GetEventsByStatus JSON Parse Error. PHP Output:", text);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.error("GetEventsByStatus Network Error:", error);
		return { success: false, data: [] };
	}
}

export async function UpdateEventStatus(id: number, status: string) {
	try {
		const res = await fetch(`${API_URL}events/manageEvent.php`, {
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

export async function DeleteEvent(id: number) {
	try {
		const res = await fetch(`${API_URL}events/manageEvent.php`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ id }),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}
