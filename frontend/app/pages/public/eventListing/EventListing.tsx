export default function EventListings() {
	return (
		<div className="min-h-screen bg-background font-sans text-text-primary pb-20">
			{/* Header Section */}
			<section className="pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold text-text-secondary mb-4 tracking-tight">Discover Campus Events</h1>
				<p className="text-text-muted text-lg max-w-3xl">
					Explore a curated selection of upcoming workshops, seminars, and social gatherings designed to enrich your academic journey.
				</p>
			</section>

			{/* Filters and Controls */}
			<section className="px-6 md:px-12 max-w-7xl mx-auto mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
					{/* Category Pills */}
					<div className="flex flex-wrap items-center gap-2">
						<button className="bg-brand text-text-inverse px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">All Events</button>
						<button className="bg-surface border border-border text-text-muted hover:text-text-primary transition-colors px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
							Workshops
						</button>
						<button className="bg-surface border border-border text-text-muted hover:text-text-primary transition-colors px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
							Seminars
						</button>
						<button className="bg-surface border border-border text-text-muted hover:text-text-primary transition-colors px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
							Social
						</button>
						<button className="bg-surface border border-border text-text-muted hover:text-text-primary transition-colors px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
							Sports
						</button>
					</div>

					{/* Sort Dropdown */}
					<div className="flex items-center gap-2 text-sm text-text-muted font-medium">
						<span>Sort by:</span>
						<button className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-md shadow-sm hover:bg-card-hover transition-colors">
							<span className="text-text-primary">Date: Upcoming</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>
					</div>
				</div>
			</section>

			{/* Event Grid */}
			<section className="px-6 md:px-12 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Card 1: Seminar */}
					<div className="bg-card border border-border rounded-lg shadow-card overflow-hidden flex flex-col hover:shadow-dropdown transition-shadow duration-300">
						<div className="relative h-48 bg-background-muted">
							<img
								src="https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&w=600&q=80"
								alt="Seminar Presentation"
								className="w-full h-full object-cover"
							/>
							<span className="absolute top-3 left-3 bg-primary-200 text-brand text-xs font-bold px-3 py-1 rounded-full shadow-sm">
								Seminar
							</span>
						</div>
						<div className="p-5 flex-1 flex flex-col">
							<h3 className="text-xl font-bold text-text-secondary mb-3 leading-tight flex-1">
								Future of Artificial Intelligence in Education
							</h3>
							<div className="space-y-2 text-sm text-text-muted font-medium mb-4">
								<div className="flex items-center gap-2">
									<CalendarIcon /> Oct 24, 2024 • 2:00 PM
								</div>
								<div className="flex items-center gap-2">
									<MapPinIcon /> Main Science Building, Room 401
								</div>
							</div>
						</div>
						<div className="px-5 py-4 border-t border-border-muted flex items-center justify-between bg-surface-secondary/50">
							<span className="text-sm font-bold text-text-muted">Free</span>
							<button className="bg-primary-200 text-brand hover:bg-primary-300 transition-colors px-4 py-1.5 rounded text-sm font-bold">
								Register
							</button>
						</div>
					</div>

					{/* Card 2: Workshop */}
					<div className="bg-card border border-border rounded-lg shadow-card overflow-hidden flex flex-col hover:shadow-dropdown transition-shadow duration-300">
						<div className="relative h-48 bg-background-muted">
							<img
								src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
								alt="Workshop Session"
								className="w-full h-full object-cover"
							/>
							<span className="absolute top-3 left-3 bg-primary-200 text-brand text-xs font-bold px-3 py-1 rounded-full shadow-sm">
								Workshop
							</span>
						</div>
						<div className="p-5 flex-1 flex flex-col">
							<h3 className="text-xl font-bold text-text-secondary mb-3 leading-tight flex-1">Design Thinking & Rapid Prototyping</h3>
							<div className="space-y-2 text-sm text-text-muted font-medium mb-4">
								<div className="flex items-center gap-2">
									<CalendarIcon /> Oct 26, 2024 • 10:00 AM
								</div>
								<div className="flex items-center gap-2">
									<MapPinIcon /> Innovation Hub, Studio B
								</div>
							</div>
						</div>
						<div className="px-5 py-4 border-t border-border-muted flex items-center justify-between bg-surface-secondary/50">
							<span className="text-sm font-bold text-text-muted">Free</span>
							<button className="bg-primary-200 text-brand hover:bg-primary-300 transition-colors px-4 py-1.5 rounded text-sm font-bold">
								Register
							</button>
						</div>
					</div>

					{/* Card 3: Social */}
					<div className="bg-card border border-border rounded-lg shadow-card overflow-hidden flex flex-col hover:shadow-dropdown transition-shadow duration-300">
						<div className="relative h-48 bg-background-muted">
							<img
								src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80"
								alt="Campus Mixer"
								className="w-full h-full object-cover"
							/>
							<span className="absolute top-3 left-3 bg-primary-200 text-brand text-xs font-bold px-3 py-1 rounded-full shadow-sm">
								Social
							</span>
						</div>
						<div className="p-5 flex-1 flex flex-col">
							<h3 className="text-xl font-bold text-text-secondary mb-3 leading-tight flex-1">Annual Fall Campus Mixer & Networking</h3>
							<div className="space-y-2 text-sm text-text-muted font-medium mb-4">
								<div className="flex items-center gap-2">
									<CalendarIcon /> Nov 02, 2024 • 5:30 PM
								</div>
								<div className="flex items-center gap-2">
									<MapPinIcon /> Student Union Courtyard
								</div>
							</div>
						</div>
						<div className="px-5 py-4 border-t border-border-muted flex items-center justify-between bg-surface-secondary/50">
							<span className="text-sm font-bold text-text-muted">$10 Entry</span>
							<button className="bg-primary-200 text-brand hover:bg-primary-300 transition-colors px-4 py-1.5 rounded text-sm font-bold">
								Register
							</button>
						</div>
					</div>

					{/* Card 4: Sports (Placeholder Graphic) */}
					<div className="bg-card border border-border rounded-lg shadow-card overflow-hidden flex flex-col hover:shadow-dropdown transition-shadow duration-300">
						<div className="relative h-48 bg-border flex items-center justify-center text-text-muted/30">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="64"
								height="64"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round">
								<circle cx="12" cy="12" r="10" />
								<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
								<path d="M2 12h20" />
							</svg>
							<span className="absolute top-3 left-3 bg-primary-200 text-brand text-xs font-bold px-3 py-1 rounded-full shadow-sm">
								Sports
							</span>
						</div>
						<div className="p-5 flex-1 flex flex-col">
							<h3 className="text-xl font-bold text-text-secondary mb-3 leading-tight flex-1">Inter-Department Basketball Finals</h3>
							<div className="space-y-2 text-sm text-text-muted font-medium mb-4">
								<div className="flex items-center gap-2">
									<CalendarIcon /> Nov 10, 2024 • 7:00 PM
								</div>
								<div className="flex items-center gap-2">
									<MapPinIcon /> Campus Recreation Center
								</div>
							</div>
						</div>
						<div className="px-5 py-4 border-t border-border-muted flex items-center justify-between bg-surface-secondary/50">
							<span className="text-sm font-bold text-text-muted">Free</span>
							<button className="bg-primary-200 text-brand hover:bg-primary-300 transition-colors px-4 py-1.5 rounded text-sm font-bold">
								Register
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Pagination */}
			<section className="flex justify-center items-center gap-4 mt-16 px-6">
				<button className="w-10 h-10 flex items-center justify-center border border-border rounded shadow-sm text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors bg-surface">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<span className="text-sm font-bold text-text-secondary">Page 1 of 4</span>
				<button className="w-10 h-10 flex items-center justify-center border border-border rounded shadow-sm text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors bg-surface">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>
			</section>
		</div>
	);
}

// Reusable SVG Icon Components
const CalendarIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="text-text-muted">
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
		<line x1="16" y1="2" x2="16" y2="6" />
		<line x1="8" y1="2" x2="8" y2="6" />
		<line x1="3" y1="10" x2="21" y2="10" />
	</svg>
);

const MapPinIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="text-text-muted">
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);
