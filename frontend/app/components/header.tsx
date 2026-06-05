import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

export default function Header() {
	const { userRole, setUserRole } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		setUserRole(UserRole.USER);
		navigate("/");
	};

	const mainNavLinks = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Event Listings", path: "/eventListing" },
	];

	const userLinks = [{ name: "Event Registration", path: "/eventRegistration" }];
	const organizerLinks = [
		{ name: "Dashboard", path: "/dashboard" },
		{ name: "Event Management", path: "/eventManagement" },
		{ name: "Participant Management", path: "/participantManagement" },
	];

	const currentNavLinks = [
		...mainNavLinks,
		...(userRole === UserRole.USER ? userLinks : []),
		...(userRole === UserRole.ORGANIZER ? organizerLinks : []),
	];

	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`text-sm font-medium transition-colors ${
			isActive ? "text-text-primary border-b-2 border-brand pb-1" : "text-text-muted hover:text-text-primary"
		}`;

	const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
			isActive ? "bg-primary-50 text-brand" : "text-text-muted hover:bg-surface-secondary hover:text-text-primary"
		}`;

	return (
		<header className="bg-surface border-b border-border sticky top-0 z-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<div className="shrink-0 text-text-primary font-bold text-xl tracking-tight">
							<NavLink to="/">Campus Events</NavLink>
						</div>
						<div className="hidden lg:block">
							<div className="ml-10 flex items-baseline space-x-8">
								{currentNavLinks.map((link) => (
									<NavLink key={link.path} to={link.path} className={getNavLinkClass}>
										{link.name}
									</NavLink>
								))}
							</div>
						</div>
					</div>

					<div className="hidden lg:flex items-center gap-4">
						{userRole === UserRole.USER ? (
							<>
								<NavLink
									to="/login"
									className="border border-border text-text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-card-hover transition-colors">
									Login
								</NavLink>
								<NavLink
									to="/register"
									className="bg-brand text-text-inverse px-4 py-2 rounded-md text-sm font-semibold hover:bg-brand-hover transition-colors">
									Register
								</NavLink>
							</>
						) : (
							<div className="flex items-center gap-4">
								<span className="text-sm text-text-muted capitalize">Role: {userRole}</span>
								<button
									onClick={handleLogout}
									className="border border-border text-text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-card-hover transition-colors">
									Logout
								</button>
							</div>
						)}
					</div>

					<div className="-mr-2 flex lg:hidden">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="relative inline-flex items-center justify-center rounded-md p-2 text-text-muted hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
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
				<div className="lg:hidden border-t border-border bg-surface" id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
						{currentNavLinks.map((link) => (
							<NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>
								{link.name}
							</NavLink>
						))}
					</div>
					<div className="border-t border-border pb-3 pt-4">
						<div className="flex flex-col px-5 gap-3">
							{userRole === UserRole.USER ? (
								<>
									<NavLink
										to="/login"
										onClick={() => setIsOpen(false)}
										className="block w-full text-center border border-border text-text-primary px-4 py-2 rounded-md text-base font-semibold hover:bg-card-hover transition-colors">
										Login
									</NavLink>
									<NavLink
										to="/register"
										onClick={() => setIsOpen(false)}
										className="block w-full text-center bg-brand text-text-inverse px-4 py-2 rounded-md text-base font-semibold hover:bg-brand-hover transition-colors">
										Register
									</NavLink>
								</>
							) : (
								<>
									<span className="text-base text-text-muted capitalize block w-full text-center mb-1">Role: {userRole}</span>
									<button
										onClick={() => {
											handleLogout();
											setIsOpen(false);
										}}
										className="block w-full text-center border border-border text-text-primary px-4 py-2 rounded-md text-base font-semibold hover:bg-card-hover transition-colors">
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
