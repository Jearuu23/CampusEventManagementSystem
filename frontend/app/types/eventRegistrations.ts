export type Registration = {
	id: number;
	eventId: number;
	userId: number;
	registeredAt: string;
	status: "registered" | "attended" | "cancelled";
	createdAt: string;
	updatedAt: string;
};
