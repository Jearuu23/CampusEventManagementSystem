export type Event = {
	id: number;
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	eventDuration: number;
	location: string;
	organizerId: number;
	maxParticipants: number;
	currentParticipants: number;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	createdAt: string;
	updatedAt: string;
};

export type CreateEvent = {
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	eventDuration: number;
	location: string;
	organizerId: number;
	maxParticipants: number;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	createdAt: string;
	updatedAt: string;
};

export type UpdateEvent = {
	id: number;
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	eventDuration: number;
	location: string;
	organizerId: number;
	maxParticipants: number;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	createdAt: string;
	updatedAt: string;
};
