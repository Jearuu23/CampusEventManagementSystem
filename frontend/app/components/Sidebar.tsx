import { NavLink, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { routeLinks } from "~/constants";

export default function Sidebar() {
	const { userRole, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate(routeLinks.home);
	};

	const isAdmin = userRole === "admin";

	const dashboardLinks = [
		{
			name: "Dashboard",
			path: isAdmin ? routeLinks.adminDashboard : routeLinks.organizerDashboard,
			icon: (
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<rect x="3" y="3" width="7" height="7"></rect>
					<rect x="14" y="3" width="7" height="7"></rect>
					<rect x="14" y="14" width="7" height="7"></rect>
					<rect x="3" y="14" width="7" height="7"></rect>
				</svg>
			),
		},
		{
			name: "Event Management",
			path: isAdmin ? routeLinks.adminEventManagement : routeLinks.organizerEventManagement,
			icon: (
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
					<line x1="16" y1="2" x2="16" y2="6"></line>
					<line x1="8" y1="2" x2="8" y2="6"></line>
					<line x1="3" y1="10" x2="21" y2="10"></line>
				</svg>
			),
		},
		...(isAdmin
			? [
					{
						name: "Participant Mgmt",
						path: routeLinks.adminParticipantManagement,
						icon: (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
								<circle cx="9" cy="7" r="4"></circle>
								<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
								<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
							</svg>
						),
					},
				]
			: []),
	];

	return (
		<aside className="w-64 bg-sidebar border-r border-white/10 flex flex-col h-full sticky top-0 shrink-0">
			<div className="h-14 flex items-center px-6 border-b border-white/10 shrink-0">
				<NavLink to={routeLinks.home} className="font-serif font-bold text-[18px] text-background tracking-[0.02em] no-underline">
					ACTI<span className="text-brand">VO</span>
				</NavLink>
			</div>

			<div className="p-6 flex-1 overflow-y-auto">
				<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-background/30 mb-4">Menu</div>
				<ul className="flex flex-col gap-2 list-none m-0 p-0">
					{dashboardLinks.map((link) => (
						<li key={link.path}>
							<NavLink
								to={link.path}
								className={({ isActive }) =>
									`flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-[12px] font-medium tracking-[0.06em] uppercase transition-colors no-underline ${
										isActive ? "bg-white/10 text-background" : "text-background/55 hover:bg-white/5 hover:text-background"
									}`
								}>
								<span className="shrink-0">{link.icon}</span>
								{link.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			<div className="p-6 border-t border-white/10">
				<div className="flex flex-col gap-3">
					<span className="text-[11px] font-normal tracking-[0.08em] uppercase text-background/55 block w-full mb-1">Role: {userRole}</span>
					<button
						onClick={handleLogout}
						className="bg-brand text-background px-4 py-2.5 rounded-[2px] text-[13px] font-medium tracking-[0.08em] uppercase hover:bg-brand-hover transition-colors w-full text-center cursor-pointer border-none flex items-center justify-center gap-2">
						Logout
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
							<polyline points="16 17 21 12 16 7"></polyline>
							<line x1="21" y1="12" x2="9" y2="12"></line>
						</svg>
					</button>
				</div>
			</div>
		</aside>
	);
}
