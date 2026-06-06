import { API_URL } from "./constant";

export async function GetEventParticipants(eventId: number) {
	try {
		const res = await fetch(`${API_URL}events/getEventParticipants.php?event_id=${eventId}`, {
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
			body: JSON.stringify({ event_id: eventId, participant_id: participantId, status }),
		});
		return await res.json();
	} catch (error) {
		return { success: false, message: "Network Error" };
	}
}
