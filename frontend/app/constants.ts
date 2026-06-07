export const routeLinks = {
	home: "/",
	about: "/about",
	login: "/login",
	register: "/register",
	eventListing: "/event-listing",
	eventRegistration: "/event/:id",

	// Admin routes
	adminDashboard: "/admin/dashboard",
	adminViewEvent: "/admin/view-event/:id",
	adminEventManagement: "/admin/event-management",
	adminParticipantManagement: "/admin/participant-management",

	// Organizer routes
	organizerDashboard: "/organizer/dashboard",
	organizerViewEvent: "/organizer/view-event/:id",
	organizerEventManagement: "/organizer/event-management",
	organizerParticipantManagement: "/organizer/participant-management",

	// Participant routes
	participantDashboard: "/participants/dashboard",
	participantViewEvent: "/participants/view-event/:id",
};
