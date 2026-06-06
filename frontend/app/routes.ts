import { type RouteConfig, index, route } from "@react-router/dev/routes";

const publicRoute = "routes/public/";
const adminRoute = "routes/admin/";

const appRoutes = {
	// Public
	home: { path: "/", component: publicRoute + "home.tsx" },
	about: { path: "/about", component: publicRoute + "about.tsx" },
	eventListng: { path: "/event-listing", component: publicRoute + "eventListing.tsx" },
	login: { path: "/login", component: publicRoute + "login.tsx" },
	register: { path: "/register", component: publicRoute + "register.tsx" },
	eventRegistration: { path: "/event/:id", component: publicRoute + "event.$id.tsx" },
	// forgotPassword: publicRoute + "forgotPassword.tsx",

	// Admin / Organizer
	dashboard: { path: "/dashboard", component: adminRoute + "dashboard.tsx" },
	eventManagement: { path: "/event-management", component: adminRoute + "eventManagement.tsx" },
	participantManagement: { path: "/participant-management", component: adminRoute + "participantManagement.tsx" },
};

const routes = [];

for (const [key, value] of Object.entries(appRoutes)) {
	if (value.path === "/") routes.push(index(value.component));
	else routes.push(route(value.path, value.component));
}

export default routes satisfies RouteConfig;
