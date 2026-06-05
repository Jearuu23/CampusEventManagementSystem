import { type RouteConfig, index, route } from "@react-router/dev/routes";

const publicRoute = "routes/public/";
const adminRoute = "routes/admin/";
const studentRoute = "routes/student/";

const appRoutes = {
	// Public
	home: { path: "/", component: publicRoute + "home.tsx" },
	about: { path: "/about", component: publicRoute + "about.tsx" },
	eventListng: { path: "/eventListing", component: publicRoute + "eventListing.tsx" },
	login: { path: "/login", component: publicRoute + "login.tsx" },
	register: { path: "/register", component: publicRoute + "register.tsx" },
	// forgotPassword: publicRoute + "forgotPassword.tsx",

	// Admin
	dashboard: { path: "/dashboard", component: adminRoute + "dashboard.tsx" },
	eventManagement: { path: "/eventManagement", component: adminRoute + "eventManagement.tsx" },
	participantManagement: { path: "/participantManagement", component: adminRoute + "participantManagement.tsx" },

	// Student
	eventRegistration: { path: "/eventRegistration", component: studentRoute + "eventRegistration.tsx" },
};

const routes = [];

for (const [key, value] of Object.entries(appRoutes)) {
	if (value.path === "/") routes.push(index(value.component));
	else routes.push(route(value.path, value.component));
}

export default routes satisfies RouteConfig;

// export default [
// 	index(publicRoute + "home.tsx"),
// 	route("about", publicRoute + "about.tsx"),
// 	route("eventListng", publicRoute + "eventListng.tsx"),
// ] satisfies RouteConfig;
