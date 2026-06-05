import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";

export default function Header() {
	const { userRole } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const allNavGroups = {
		Public: [
			{ name: "Home", path: "/" },
			{ name: "About", path: "/about" },
			{ name: "EventListing", path: "/eventListing" },
			{ name: "Login", path: "/login" },
			{ name: "Register", path: "/register" },
		],
		Students: [{ name: "EventRegistration", path: "/eventRegistration" }],
		Admin: [
			{ name: "Dashboard", path: "/dashboard" },
			{ name: "EventManagement", path: "/eventManagement" },
			{ name: "ParticipantManagement", path: "/participantManagement" },
		],
	};

	const navGroups = {
		Public: userRole === "guest" ? allNavGroups.Public : allNavGroups.Public.filter((link) => link.name !== "Login" && link.name !== "Register"),
		...(userRole === "student" ? { Students: allNavGroups.Students } : {}),
		...(userRole === "admin" ? { Admin: allNavGroups.Admin } : {}),
	};

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
			isActive ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white"
		}`;

	const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
			isActive ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white"
		}`;

	return (
		<header className="bg-blue-800 shadow-md">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<div className="shrink-0 text-white font-bold text-xl tracking-wide">
							<NavLink to="/">CampusEvents</NavLink>
						</div>
						<div className="hidden lg:block">
							<div className="ml-10 flex items-baseline space-x-4">
								{Object.entries(navGroups).map(([group, links]) => (
									<div key={group} className="flex items-center space-x-2">
										<div className="h-6 w-px bg-blue-600 mx-2 first:hidden"></div>
										{links.map((link) => (
											<NavLink key={link.path} to={link.path} className={getNavLinkClass}>
												{link.name}
											</NavLink>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="-mr-2 flex lg:hidden">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="relative inline-flex items-center justify-center rounded-md bg-blue-800 p-2 text-blue-200 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
							aria-controls="mobile-menu"
							aria-expanded={isOpen}>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? (
								<svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
								</svg>
							) : (
								<svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="lg:hidden" id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
						{Object.entries(navGroups).map(([group, links]) => (
							<div key={group} className="mb-4">
								<div className="text-blue-300 text-xs uppercase px-3 mb-1 font-semibold tracking-wider">{group}</div>
								{links.map((link) => (
									<NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>
										{link.name}
									</NavLink>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
