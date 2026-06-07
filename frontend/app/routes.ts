import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { routeLinks } from "./constants";

const publicRoute = "routes/public/";
const adminRoute = "routes/admin/";
const organizerRoute = "routes/organizers/";
const participantRoute = "routes/participants/";

const appRoutes = {
	// Public
	home: { path: routeLinks.home, component: publicRoute + "home.tsx" },
	about: { path: routeLinks.about, component: publicRoute + "about.tsx" },
	eventListing: { path: routeLinks.eventListing, component: publicRoute + "eventListing.tsx" },
	login: { path: routeLinks.login, component: publicRoute + "login.tsx" },
	register: { path: routeLinks.register, component: publicRoute + "register.tsx" },
	eventRegistration: { path: routeLinks.eventRegistration, component: publicRoute + "event.$id.tsx" },
	// forgotPassword: publicRoute + "forgotPassword.tsx",

	// Admin
	dashboard: { path: routeLinks.adminDashboard, component: adminRoute + "dashboard.tsx" },
	eventManagement: { path: routeLinks.adminEventManagement, component: adminRoute + "eventManagement.tsx" },
	participantManagement: { path: routeLinks.adminParticipantManagement, component: adminRoute + "participantManagement.tsx" },
	ViewEvent: { path: routeLinks.adminViewEvent, component: adminRoute + "viewEvent.$id.tsx" },

	// Organizers
	organizerDashboard: { path: routeLinks.organizerDashboard, component: organizerRoute + "dashboard.tsx" },
	organizerEventManagement: { path: routeLinks.organizerEventManagement, component: organizerRoute + "eventManagement.tsx" },
	organizerViewEvent: { path: routeLinks.organizerViewEvent, component: organizerRoute + "viewEvent.$id.tsx" },

	// participants
	participantDashboard: { path: routeLinks.participantDashboard, component: participantRoute + "dashboard.tsx" },
	participantViewEvent: { path: routeLinks.participantViewEvent, component: participantRoute + "viewEvent.$id.tsx" },
};

const routes = [];

for (const [key, value] of Object.entries(appRoutes)) {
	if (value.path === "/") routes.push(index(value.component));
	else routes.push(route(value.path, value.component));
}

export default routes satisfies RouteConfig;
