import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="bg-[#080807] pt-[60px] pb-10 px-8 md:px-20">
			<div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10 mb-8">
				<div>
					<div className="font-serif text-[22px] font-bold text-background mb-3">
						Campus<span className="text-brand">Events</span>
					</div>
					<p className="text-[13px] font-light text-background/40 leading-[1.6] max-w-[240px]">
						The intellectual and cultural heartbeat of our university campus, since 1891.
					</p>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-background/30 mb-4">Navigate</div>
					<ul className="flex flex-col gap-2.5 list-none m-0 p-0">
						<li>
							<Link to="/" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/about"
								className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								About
							</Link>
						</li>
						<li>
							<Link
								to="/eventListing"
								className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Event Listings
							</Link>
						</li>
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Campus Map
							</a>
						</li>
					</ul>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-background/30 mb-4">Organize</div>
					<ul className="flex flex-col gap-2.5 list-none m-0 p-0">
						<li>
							<Link
								to="/register"
								className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Create Event
							</Link>
						</li>
						<li>
							<Link
								to="/login"
								className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Admin Suite
							</Link>
						</li>
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Guidelines
							</a>
						</li>
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Contact Support
							</a>
						</li>
					</ul>
				</div>
				<div>
					<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-background/30 mb-4">Connect</div>
					<ul className="flex flex-col gap-2.5 list-none m-0 p-0">
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Directory
							</a>
						</li>
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Newsletter
							</a>
						</li>
						<li>
							<a href="#" className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Accessibility
							</a>
						</li>
						<li>
							<Link
								to="/login"
								className="text-[13px] font-light text-background/50 no-underline transition-colors hover:text-background">
								Login
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-between gap-6">
				<div className="font-mono text-[11px] text-background/20 tracking-[0.05em] text-center md:text-left">
					© 2024 University Campus Events. All rights reserved.
				</div>
				<div className="flex flex-wrap justify-center gap-6">
					<a
						href="#"
						className="font-mono text-[11px] text-background/20 no-underline transition-colors tracking-[0.05em] hover:text-background/50">
						Privacy Policy
					</a>
					<a
						href="#"
						className="font-mono text-[11px] text-background/20 no-underline transition-colors tracking-[0.05em] hover:text-background/50">
						Terms of Service
					</a>
					<a
						href="#"
						className="font-mono text-[11px] text-background/20 no-underline transition-colors tracking-[0.05em] hover:text-background/50">
						Accessibility
					</a>
				</div>
			</div>
		</footer>
	);
}
