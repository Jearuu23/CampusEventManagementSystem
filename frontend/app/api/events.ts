import { API_URL } from "./constant";
import type { RegisterEventPayload } from "~/types/events";

export async function GetEvents(params?: { status?: string; organizerId?: number; limit?: number; offset?: number; search?: string }) {
	try {
		const query = new URLSearchParams();
		if (params?.status) query.append("status", params.status);
		if (params?.organizerId) query.append("organizerId", params.organizerId.toString());
		if (params?.limit) query.append("limit", params.limit.toString());
		if (params?.offset !== undefined) query.append("offset", params.offset.toString());
		if (params?.search) query.append("search", params.search);

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
		const res = await fetch(`${API_URL}events/getEvent.php?eventId=${id}&withRewards=true`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			const data = JSON.parse(text);
			return { ...data, data: data.data || data.event || null };
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

export async function CreateEvent(data: FormData) {
	try {
		const res = await fetch(`${API_URL}events/createEvent.php`, {
			method: "POST",
			credentials: "include",
			body: data,
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("CreateEvent JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("CreateEvent Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function RegisterForEvent(data: RegisterEventPayload) {
	try {
		const res = await fetch(`${API_URL}events/registerEvent.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("RegisterForEvent JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("RegisterForEvent Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function UpdateEventDetails(data: FormData) {
	try {
		const res = await fetch(`${API_URL}events/updateEvent.php`, {
			method: "POST",
			credentials: "include",
			body: data,
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("UpdateEventDetails JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("UpdateEventDetails Network Error:", error);
		return { success: false, message: "Network Error" };
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

export async function GetParticipants(params?: { eventId?: number; status?: string; search?: string }) {
	try {
		const query = new URLSearchParams();
		if (params?.eventId) query.append("eventId", params.eventId.toString());
		if (params?.status) query.append("status", params.status);
		if (params?.search) query.append("search", params.search);

		const queryString = query.toString();
		const url = `${API_URL}events/getParticipants.php${queryString ? `?${queryString}` : ""}`;

		const res = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const text = await res.text();
		try {
			const data = JSON.parse(text);
			return data;
		} catch (e) {
			console.error("GetParticipants JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("GetParticipants Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function UpdateParticipantStatus(data: { eventId: number; email: string; status: string }) {
	try {
		const res = await fetch(`${API_URL}events/updateParticipation.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(data),
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("UpdateParticipantStatus JSON Parse Error. PHP Output:", text);
			return { success: false, message: "Invalid JSON from server. Check console for details." };
		}
	} catch (error) {
		console.error("UpdateParticipantStatus Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function AddEventReward(data: { eventId: number; name: string; points: number }) {
	try {
		const res = await fetch(`${API_URL}events/addReward.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ event_id: data.eventId, name: data.name, points: data.points }),
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("AddEventReward JSON Parse Error:", text);
			return { success: false, message: "Invalid JSON from server." };
		}
	} catch (error) {
		console.error("AddEventReward Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function VerifyRewardCode(data: { code: string; eventId?: number }) {
	try {
		const res = await fetch(`${API_URL}events/verifyRewardCode.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ code: data.code, event_id: data.eventId }),
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("VerifyRewardCode JSON Parse Error:", text);
			return { success: false, message: "Invalid JSON from server." };
		}
	} catch (error) {
		console.error("VerifyRewardCode Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}

export async function RedeemReward(data: { eventId: number; email: string; rewardId: number }) {
	try {
		const res = await fetch(`${API_URL}events/redeemReward.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ event_id: data.eventId, email: data.email, reward_id: data.rewardId }),
		});
		const text = await res.text();
		try {
			return JSON.parse(text);
		} catch (e) {
			console.error("RedeemReward JSON Parse Error:", text);
			return { success: false, message: "Invalid JSON from server." };
		}
	} catch (error) {
		console.error("RedeemReward Network Error:", error);
		return { success: false, message: "Network Error" };
	}
}
