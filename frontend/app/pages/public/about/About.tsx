export default function About() {
	return (
		<div className="min-h-screen bg-background font-sans text-text-primary pb-20">
			{/* Hero Section */}
			<section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="pr-0 md:pr-8">
						<h1 className="text-4xl md:text-[3rem] font-bold text-text-secondary leading-tight mb-6 tracking-tight">
							Connecting
							<br />
							Campus Life.
						</h1>
						<p className="text-text-muted text-lg mb-8 leading-relaxed">
							Campus Events is the central hub for discovering, organizing, and experiencing the academic and social vibrancy of our
							university. We streamline engagement.
						</p>
						<button className="bg-primary-200 text-brand px-6 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-primary-300 transition-colors">
							Explore Events
						</button>
					</div>
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
							alt="Students walking on campus"
							className="rounded-lg shadow-card w-full object-cover h-[350px] border border-border"
						/>
					</div>
				</div>
			</section>

			{/* Mission & Goal Section */}
			<section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
				<div className="mb-10">
					<h2 className="text-2xl md:text-3xl font-bold text-text-secondary mb-3">Our Mission & Goal</h2>
					<p className="text-text-muted max-w-2xl text-base">
						To foster a cohesive academic community by providing a unified, reliable platform for all institutional and student-led
						events.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1: Centralized Discovery */}
					<div className="bg-card border border-border rounded-lg p-8 shadow-card flex flex-col h-full hover:shadow-dropdown transition-shadow">
						<div className="w-10 h-10 rounded bg-brand text-text-inverse flex items-center justify-center mb-6">
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
								<path d="m15 18-6-6 6-6" />
							</svg>
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Centralized Discovery</h3>
						<p className="text-sm text-text-muted leading-relaxed">
							Eliminating fragmented communication by bringing departmental seminars, student club meetings, and major campus traditions
							into one searchable directory.
						</p>
					</div>

					{/* Card 2: Streamlined Management */}
					<div className="bg-surface-secondary border border-border rounded-lg p-8 shadow-card flex flex-col h-full hover:shadow-dropdown transition-shadow">
						<div className="w-10 h-10 rounded bg-primary-200 text-brand flex items-center justify-center mb-6">
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
								<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
								<line x1="16" x2="16" y1="2" y2="6" />
								<line x1="8" x2="8" y1="2" y2="6" />
								<line x1="3" x2="21" y1="10" y2="10" />
								<path d="M8 14h.01" />
								<path d="M12 14h.01" />
								<path d="M16 14h.01" />
								<path d="M8 18h.01" />
								<path d="M12 18h.01" />
								<path d="M16 18h.01" />
							</svg>
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Streamlined Management</h3>
						<p className="text-sm text-text-muted leading-relaxed">
							Empowering organizers with robust tools for RSVP tracking, capacity management, and automated attendee communications.
						</p>
					</div>

					{/* Card 3: Data-Driven Insights */}
					<div className="bg-card border border-border rounded-lg p-8 shadow-card flex flex-col h-full hover:shadow-dropdown transition-shadow md:col-span-1">
						<div className="w-10 h-10 rounded bg-brand text-text-inverse flex items-center justify-center mb-6">
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
								<path d="M3 3v18h18" />
								<path d="m19 9-5 5-4-4-3 3" />
							</svg>
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Data-Driven Insights</h3>
						<p className="text-sm text-text-muted leading-relaxed">
							Providing administration with clear visibility into campus engagement, helping allocate resources and measure the success
							of programs.
						</p>
					</div>

					{/* Card 4: Image Span */}
					<div className="bg-background-muted rounded-lg overflow-hidden relative shadow-card md:col-span-2 group border border-border">
						<img
							src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"
							alt="Lecture Hall"
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-8">
							<h3 className="text-xl font-bold text-text-inverse">Enhancing Academic Life</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-12 px-6 md:px-12 max-w-5xl mx-auto my-12 border-t border-b border-border">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div>
						<div className="text-4xl md:text-5xl font-bold text-text-secondary mb-2">500+</div>
						<div className="text-xs font-bold text-text-muted uppercase tracking-widest">Events Annually</div>
					</div>
					<div>
						<div className="text-4xl md:text-5xl font-bold text-text-secondary mb-2">12k</div>
						<div className="text-xs font-bold text-text-muted uppercase tracking-widest">Active Users</div>
					</div>
					<div>
						<div className="text-4xl md:text-5xl font-bold text-text-secondary mb-2">150</div>
						<div className="text-xs font-bold text-text-muted uppercase tracking-widest">Student Groups</div>
					</div>
					<div>
						<div className="text-4xl md:text-5xl font-bold text-text-secondary mb-2">45</div>
						<div className="text-xs font-bold text-text-muted uppercase tracking-widest">Venues</div>
					</div>
				</div>
			</section>

			{/* How it Works Section */}
			<section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-2xl md:text-3xl font-bold text-text-secondary mb-3">How it Works</h2>
					<p className="text-text-muted text-base">A streamlined process from discovery to attendance.</p>
				</div>

				<div className="relative grid md:grid-cols-3 gap-12 text-center">
					{/* Connector Line (Desktop Only) */}
					<div className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-[2px] bg-border z-0"></div>

					{/* Step 1 */}
					<div className="relative z-10 flex flex-col items-center">
						<div className="w-12 h-12 bg-surface border-2 border-border rounded flex items-center justify-center text-text-secondary font-bold text-xl mb-6 shadow-sm">
							1
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Discover</h3>
						<p className="text-sm text-text-muted px-4">
							Browse the comprehensive directory, filtering by department, interest, or date.
						</p>
					</div>

					{/* Step 2 */}
					<div className="relative z-10 flex flex-col items-center">
						<div className="w-12 h-12 bg-surface border-2 border-border rounded flex items-center justify-center text-text-secondary font-bold text-xl mb-6 shadow-sm">
							2
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Register</h3>
						<p className="text-sm text-text-muted px-4">Secure your spot with one-click RSVP using your campus credentials.</p>
					</div>

					{/* Step 3 */}
					<div className="relative z-10 flex flex-col items-center">
						<div className="w-12 h-12 bg-surface border-2 border-border rounded flex items-center justify-center text-text-secondary font-bold text-xl mb-6 shadow-sm">
							3
						</div>
						<h3 className="font-bold text-text-secondary mb-3">Attend</h3>
						<p className="text-sm text-text-muted px-4">Access your digital ticket and venue map right from your mobile device.</p>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
				<div className="bg-surface-secondary border border-border rounded-xl p-8 md:p-12 shadow-sm">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Contact Info */}
						<div className="pr-0 md:pr-8">
							<h2 className="text-2xl md:text-3xl font-bold text-text-secondary mb-4">Get in Touch</h2>
							<p className="text-text-muted text-sm leading-relaxed mb-8">
								Have questions about the system or need support organizing a major event? Our team is here to help.
							</p>

							<div className="space-y-4">
								<div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-brand">
										<rect width="20" height="16" x="2" y="4" rx="2" />
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
									</svg>
									support@campusevents.edu
								</div>
								<div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-brand">
										<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
										<circle cx="12" cy="10" r="3" />
									</svg>
									Student Union Building, Room 204
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-card">
							<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
								<div>
									<label htmlFor="name" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
										Name
									</label>
									<input
										type="text"
										id="name"
										placeholder="Jane Doe"
										className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
										Email
									</label>
									<input
										type="email"
										id="email"
										placeholder="jane@university.edu"
										className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
									/>
								</div>
								<div>
									<label htmlFor="message" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
										Message
									</label>
									<textarea
										id="message"
										rows={4}
										placeholder="How can we help?"
										className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"></textarea>
								</div>
								<button
									type="submit"
									className="bg-brand text-text-inverse hover:bg-brand-hover active:bg-brand-active transition-colors px-6 py-2.5 rounded-sm font-semibold text-sm shadow-sm">
									Send message
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
