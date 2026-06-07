import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";
import { routeLinks } from "~/constants";

export default function Header() {
	const { userRole, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate(routeLinks.home);
	};

	const mainNavLinks = [
		{ name: "Home", path: routeLinks.home },
		{ name: "About", path: routeLinks.about },
		{ name: "Event Listings", path: routeLinks.eventListing },
	];

	const userLinks: { name: string; path: string }[] = [];
	const participantLinks = [{ name: "Dashboard", path: "/participants/dashboard" }];
	const organizerLinks = [
		{ name: "Dashboard", path: routeLinks.adminDashboard },
		{ name: "Event Management", path: routeLinks.adminEventManagement },
		{ name: "Participant Management", path: routeLinks.adminParticipantManagement },
	];

	const currentNavLinks = [
		...mainNavLinks,
		...(userRole === UserRole.USER ? userLinks : []),
		...(userRole === UserRole.PARTICIPANT ? participantLinks : []),
		...(userRole === UserRole.ORGANIZER ? organizerLinks : []),
	];

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`text-[13px] font-normal tracking-[0.08em] uppercase transition-colors no-underline ${
			isActive ? "text-background" : "text-background/55 hover:text-background"
		}`;

	const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`block rounded-[2px] px-3 py-2 text-[13px] font-normal tracking-[0.08em] uppercase transition-colors ${
			isActive ? "bg-white/10 text-background" : "text-background/55 hover:bg-white/5 hover:text-background"
		}`;

	return (
		<nav className="bg-sidebar border-b border-white/10 sticky top-0 z-[100] flex items-center justify-between px-6 md:px-12 h-14">
			<NavLink to={routeLinks.home} className="font-serif font-bold text-[18px] text-background tracking-[0.02em] no-underline shrink-0">
				Campus<span className="text-brand">Events</span>
			</NavLink>

			<ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
				{currentNavLinks.map((link) => (
					<li key={link.path}>
						<NavLink to={link.path} className={getNavLinkClass}>
							{link.name}
						</NavLink>
					</li>
				))}

				<li className="flex items-center gap-6 ml-2">
					{userRole === UserRole.USER ? (
						<NavLink
							to={routeLinks.login}
							className="bg-brand text-background px-5 py-2 rounded-[2px] text-[13px] font-medium tracking-[0.08em] uppercase hover:bg-brand-hover transition-colors no-underline">
							Login
						</NavLink>
					) : (
						<div className="flex items-center gap-6">
							<button
								onClick={handleLogout}
								className="bg-brand text-background px-5 py-2 rounded-[2px] text-[13px] font-medium tracking-[0.08em] uppercase hover:bg-brand-hover transition-colors no-underline cursor-pointer border-none">
								Logout
							</button>
						</div>
					)}
				</li>
			</ul>

			<div className="-mr-2 flex lg:hidden">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="relative inline-flex items-center justify-center rounded-[2px] p-2 text-background/55 hover:bg-white/5 hover:text-background focus:outline-none"
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

			{isOpen && (
				<div className="lg:hidden bg-sidebar border-b border-white/10 absolute top-14 left-0 w-full shadow-dropdown" id="mobile-menu">
					<div className="space-y-1 px-4 pb-3 pt-2">
						{currentNavLinks.map((link) => (
							<NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>
								{link.name}
							</NavLink>
						))}
					</div>
					<div className="border-t border-white/10 pb-4 pt-4">
						<div className="flex flex-col px-4 gap-3">
							{userRole === UserRole.USER ? (
								<>
									<NavLink
										to={routeLinks.login}
										onClick={() => setIsOpen(false)}
										className="block w-full text-center text-background/55 hover:bg-white/5 hover:text-background px-4 py-2 rounded-[2px] text-[13px] font-normal tracking-[0.08em] uppercase transition-colors">
										Staff Login
									</NavLink>
									<NavLink
										to={routeLinks.register}
										onClick={() => setIsOpen(false)}
										className="block w-full text-center bg-brand text-background px-4 py-2.5 rounded-[2px] text-[13px] font-medium tracking-[0.08em] uppercase hover:bg-brand-hover transition-colors">
										Create Event
									</NavLink>
								</>
							) : (
								<>
									<button
										onClick={() => {
											handleLogout();
											setIsOpen(false);
										}}
										className="block w-full text-center bg-brand text-background px-4 py-2.5 rounded-[2px] text-[13px] font-medium tracking-[0.08em] uppercase hover:bg-brand-hover transition-colors">
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
