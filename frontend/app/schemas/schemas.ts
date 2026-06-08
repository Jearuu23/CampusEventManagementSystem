import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
	firstName: z.string().min(1, "First Name is required"),
	lastName: z.string().min(1, "Last Name is required"),
	organization: z.string().min(1, "Organization is required"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createEventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	location: z.string().optional(),
	eventStartDate: z.string().min(1, "Date is required"),
	eventStartTime: z.string().optional(),
	maxParticipants: z.union([z.string(), z.number()]).optional(),
});

export const updateEventSchema = createEventSchema.extend({
	organizerId: z.union([z.string(), z.number()]).optional(),
	status: z.string().optional(),
});

export const manageOrganizerSchema = z.object({
	name: z.string().min(1, "Name is required"),
	org: z.string().min(1, "Organization is required"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	status: z.string().min(1, "Status is required"),
});

export const registrationFormSchema = z.object({
	firstName: z.string().min(1, "First Name is required"),
	lastName: z.string().min(1, "Last Name is required"),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	phone: z.string().optional(),
	organization: z.string().optional(),
});
