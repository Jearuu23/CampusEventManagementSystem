export type Event = {
	id: number;
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	location: string;
	department: string;
	organizerId: number;
	organizerName?: string;
	maxParticipants: number | null;
	currentParticipants: number;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	imagePath?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type CreateEvent = {
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	location: string;
	department: string;
	organizerId: number;
	maxParticipants: number | null;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	imagePath?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type UpdateEvent = {
	id: number;
	title: string;
	description: string;
	eventStartDate: string;
	eventStartTime: string;
	eventEndDate: string;
	eventEndTime: string;
	location: string;
	department: string;
	organizerId: number;
	maxParticipants: number | null;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	imagePath?: string;
	createdAt?: string;
	updatedAt?: string;
};

export interface Participant {
	id?: number;
	eventId: number;
	eventTitle?: string;
	userId?: number;
	name?: string;
	email: string;
	status: string;
}

export interface RegisterEventPayload {
	eventId: number;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	organization?: string;
}

export type Registration = {
	id: number;
	eventId: number;
	userId: number;
	registeredAt: string;
	status: "registered" | "attended" | "cancelled";
	createdAt: string;
	updatedAt: string;
};
