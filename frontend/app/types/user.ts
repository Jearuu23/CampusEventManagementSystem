export enum UserRole {
	USER = "user",
	ORGANIZER = "organizer",
	ADMIN = "admin",
	PARTICIPANT = "participant",
}

export type UserRoles = UserRole.USER | UserRole.ORGANIZER | UserRole.ADMIN | UserRole.PARTICIPANT;

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	status?: string;
}

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	organization?: string;
};

export interface ParticipationRecord {
	status: string;
	points: number;
}

export type Participant = {
	id?: number;
	first_name: string;
	last_name: string;
	email: string;
	password?: string;
	phone?: string;
	organization?: string;
};

export interface ParticipantActivity {
	id: number;
	action: string;
	event: string;
	points: number;
	date: string;
}

export interface ParticipantDashboardData {
	points: number;
	attendedCount: number;
	upcomingCount: number;
	activities: ParticipantActivity[];
}
