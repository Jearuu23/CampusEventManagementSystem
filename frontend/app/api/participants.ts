import { API_URL } from "./constant";
import type { Participant } from "~/types/user";

export async function GetEventParticipants(eventId: number) {
	try {
		const res = await fetch(`${API_URL}events/getEventParticipants.php?eventId=${eventId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await res.json();
	} catch (error) {
		return { success: false, data: [] };
	}
}

export async function UpdateParticipantStatus(eventId: number, participantId: number, status: string) {
	try {
		const res = await fetch(`${API_URL}events/manageParticipant.php`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ eventId: eventId, participantId: participantId, status }),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}

export async function RegisterParticipant(participant: Participant) {
	try {
		const res = await fetch(`${API_URL}participants/register.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(participant),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}
