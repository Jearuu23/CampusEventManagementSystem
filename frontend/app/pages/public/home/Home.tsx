import React from "react";

export default function Home() {
	return (
		<div className="min-h-screen bg-background font-sans text-text-primary">
			{/* Hero Section */}
			<section className="bg-background-muted py-16 px-6 md:px-12">
				<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
					<div className="pr-0 md:pr-8">
						<h1 className="text-4xl md:text-[2.75rem] font-bold text-text-primary leading-tight mb-6">
							Discover Academic Excellence & Vibrant Student Life
						</h1>
						<p className="text-text-muted text-lg mb-8 leading-relaxed">
							From distinguished guest lectures to dynamic student showcases, explore the intellectual and cultural heartbeat of our
							university campus.
						</p>
						<div className="flex flex-wrap gap-4">
							<button className="bg-brand text-text-inverse px-6 py-3 rounded-md font-medium shadow-sm hover:bg-brand-hover transition-colors">
								Find Your Next Event
							</button>
							<button className="bg-surface border border-border text-text-primary px-6 py-3 rounded-md font-medium shadow-sm hover:bg-card-hover transition-colors">
								Browse Directory
							</button>
						</div>
					</div>
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
							alt="University Campus"
							className="rounded-lg shadow-card w-full object-cover h-[350px] md:h-[450px]"
						/>
					</div>
				</div>
			</section>

			{/* Upcoming Events */}
			<section className="py-16 px-6 md:px-12 bg-surface">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-end mb-8 border-b border-border-muted pb-4">
						<h2 className="text-2xl md:text-3xl font-bold text-text-secondary">Upcoming Events</h2>
						<a href="#" className="text-sm font-medium text-text-muted hover:text-brand flex items-center gap-1 transition-colors">
							View All
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
								<path d="M5 12h14" />
								<path d="m12 5 7 7-7 7" />
							</svg>
						</a>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Event Card 1 */}
						<div className="bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-dropdown transition-shadow duration-300 flex flex-col">
							<div className="relative h-48 bg-background-muted">
								<img
									src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
									alt="Lecture Hall"
									className="w-full h-full object-cover"
								/>
								<span className="absolute top-3 right-3 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded">
									Lecture
								</span>
							</div>
							<div className="p-6 flex-1 flex flex-col">
								<h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-1">The Future of AI in Research</h3>
								<p className="text-sm text-text-muted mb-6 line-clamp-2 flex-1">
									A symposium discussing the ethical and practical implications of artificial...
								</p>
								<div className="space-y-2 text-xs text-text-muted font-medium">
									<div className="flex items-center gap-2">
										<CalendarIcon /> Oct 15, 2024
									</div>
									<div className="flex items-center gap-2">
										<ClockIcon /> 2:00 PM - 4:00 PM
									</div>
									<div className="flex items-center gap-2">
										<MapPinIcon /> Science Building, Room 402
									</div>
								</div>
							</div>
						</div>

						{/* Event Card 2 */}
						<div className="bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-dropdown transition-shadow duration-300 flex flex-col">
							<div className="relative h-48 bg-background-muted">
								<img
									src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
									alt="Students in Workshop"
									className="w-full h-full object-cover"
								/>
								<span className="absolute top-3 right-3 bg-primary-200 text-primary-900 text-xs font-bold px-3 py-1 rounded">
									Workshop
								</span>
							</div>
							<div className="p-6 flex-1 flex flex-col">
								<h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-1">Advanced Data Visualization</h3>
								<p className="text-sm text-text-muted mb-6 line-clamp-2 flex-1">
									Hands-on workshop covering the latest tools and techniques for presenting...
								</p>
								<div className="space-y-2 text-xs text-text-muted font-medium">
									<div className="flex items-center gap-2">
										<CalendarIcon /> Oct 18, 2024
									</div>
									<div className="flex items-center gap-2">
										<ClockIcon /> 10:00 AM - 1:00 PM
									</div>
									<div className="flex items-center gap-2">
										<MapPinIcon /> Library Computer Lab B
									</div>
								</div>
							</div>
						</div>

						{/* Event Card 3 */}
						<div className="bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-dropdown transition-shadow duration-300 flex flex-col">
							<div className="relative h-48 bg-background-muted">
								<img
									src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80"
									alt="Art Exhibition"
									className="w-full h-full object-cover"
								/>
								<span className="absolute top-3 right-3 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded">
									Exhibition
								</span>
							</div>
							<div className="p-6 flex-1 flex flex-col">
								<h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-1">Fine Arts Thesis Showcase</h3>
								<p className="text-sm text-text-muted mb-6 line-clamp-2 flex-1">
									The annual exhibition featuring the culminating projects of our graduating...
								</p>
								<div className="space-y-2 text-xs text-text-muted font-medium">
									<div className="flex items-center gap-2">
										<CalendarIcon /> Oct 20 - Nov 5, 2024
									</div>
									<div className="flex items-center gap-2">
										<ClockIcon /> Gallery Hours
									</div>
									<div className="flex items-center gap-2">
										<MapPinIcon /> Main Campus Gallery
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Why Engage Section */}
			<section className="py-20 px-6 md:px-12 bg-surface-secondary">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-2xl md:text-3xl font-bold text-text-secondary mb-4">Why Engage with Campus Events?</h2>
						<p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base">
							A robust calendar of events is central to the academic experience, fostering community, intellectual growth, and
							professional networking.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{/* Feature 1 */}
						<div className="bg-card p-8 rounded-lg shadow-card border border-border relative overflow-hidden group">
							<div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] text-brand pointer-events-none transition-transform group-hover:scale-110">
								<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
								</svg>
							</div>
							<div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-5 text-brand">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5" />
									<path d="M9 18h6" />
									<path d="M10 22h4" />
								</svg>
							</div>
							<h3 className="font-bold text-text-secondary mb-3">Intellectual Enrichment</h3>
							<p className="text-sm text-text-muted leading-relaxed relative z-10">
								Step outside your primary discipline. Attend lectures and panels by distinguished faculty and visiting scholars to
								broaden your academic horizons and spark new interdisciplinary ideas.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="bg-card p-8 rounded-lg shadow-card border border-border">
							<div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-5 text-brand">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 20a6 6 0 0 0-12 0" />
									<circle cx="12" cy="16" r="2" />
									<path d="M12 14v-2" />
									<path d="M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
								</svg>
							</div>
							<h3 className="font-bold text-text-secondary mb-3">Professional Networking</h3>
							<p className="text-sm text-text-muted leading-relaxed">
								Connect with alumni, industry leaders, and peers in structured, professional settings designed to foster career
								opportunities.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="bg-card p-8 rounded-lg shadow-card border border-border">
							<div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-5 text-brand">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<h3 className="font-bold text-text-secondary mb-3">Community Building</h3>
							<p className="text-sm text-text-muted leading-relaxed">
								Participate in traditions and social gatherings that strengthen the bonds between students, faculty, and the broader
								university community.
							</p>
						</div>

						{/* CTA Box */}
						<div className="bg-brand p-8 rounded-lg shadow-card text-text-inverse flex flex-col justify-center border border-primary-800">
							<h3 className="font-bold text-xl mb-3">Ready to Host an Event?</h3>
							<p className="text-sm text-primary-200 mb-6 leading-relaxed">
								Faculty and recognized student organizations can utilize our streamlined platform to manage logistics, registrations,
								and promotions.
							</p>
							<div>
								<button className="bg-primary-200 text-brand px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-300 transition-colors">
									Go to Admin Suite
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

// Reusable SVG Icon Components
const CalendarIcon = () => (
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
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
		<line x1="16" y1="2" x2="16" y2="6" />
		<line x1="8" y1="2" x2="8" y2="6" />
		<line x1="3" y1="10" x2="21" y2="10" />
	</svg>
);

const ClockIcon = () => (
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
		<circle cx="12" cy="12" r="10" />
		<polyline points="12 6 12 12 16 14" />
	</svg>
);

const MapPinIcon = () => (
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
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);
