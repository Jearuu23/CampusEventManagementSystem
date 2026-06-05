export enum UserRole {
	STUDENT = "student",
	ORGANIZER = "organizer",
	ADMIN = "admin",
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: UserRole;
}
