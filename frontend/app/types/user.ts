export enum UserRole {
	USER = "user",
	ORGANIZER = "organizer",
	ADMIN = "admin",
}

export type UserRoles = UserRole.USER | UserRole.ORGANIZER | UserRole.ADMIN;

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
}

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
