export type Event = {
	id: number;
	title: string;
	description: string;
	event_start_date: string;
	event_start_time: string;
	event_end_date: string;
	event_end_time: string;
	location: string;
	department: string;
	organizer_id: number;
	organizer_name?: string;
	max_participants: number | null;
	current_participants: number;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	image_path?: string;
	created_at?: string;
	updated_at?: string;
};

export type CreateEvent = {
	title: string;
	description: string;
	event_start_date: string;
	event_start_time: string;
	event_end_date: string;
	event_end_time: string;
	location: string;
	department: string;
	organizer_id: number;
	max_participants: number | null;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	image_path?: string;
	created_at?: string;
	updated_at?: string;
};

export type UpdateEvent = {
	id: number;
	title: string;
	description: string;
	event_start_date: string;
	event_start_time: string;
	event_end_date: string;
	event_end_time: string;
	location: string;
	department: string;
	organizer_id: number;
	max_participants: number | null;
	status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled";
	image_path?: string;
	created_at?: string;
	updated_at?: string;
};

export interface Participant {
	id?: number;
	event_id: number;
	event_title?: string;
	user_id?: number;
	name?: string;
	email: string;
	status: string;
}

export interface RegisterEventPayload {
	event_id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone?: string;
	organization?: string;
}
