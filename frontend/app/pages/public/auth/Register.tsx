import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

export default function Register() {
	const { setUserRole } = useAuth();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [org, setOrg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setUserRole(UserRole.ORGANIZER);
		navigate("/dashboard");
	};

	return (
		<main className="flex flex-col-reverse md:flex-row-reverse min-h-[calc(100vh-140px)] w-full bg-background">
			{/* Left Panel - Registration Form */}
			<section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background-muted">
				<div className="bg-surface border border-border shadow-card w-full max-w-md p-8 pt-6">
					{/* Form Tabs */}
					<div className="flex border-b border-border-muted mb-8">
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="flex-1 text-center py-3 text-text-muted hover:text-text-primary transition-colors text-sm font-medium">
							Login
						</button>
						<button className="flex-1 text-center py-3 border-b-2 border-brand font-semibold text-text-primary text-sm">
							Organizer Registration
						</button>
					</div>

					{/* Form Header */}
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-text-secondary mb-2">Organizer Sign Up</h2>
						<p className="text-sm text-text-muted">
							This registration is for event organizers only. Provide your department or organization to request organizer access.
						</p>
					</div>

					{/* Registration Form */}
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
									First Name
								</label>
								<input
									type="text"
									id="firstName"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="org" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
								Organization / Department
							</label>
							<input
								type="text"
								id="org"
								required
								value={org}
								onChange={(e) => setOrg(e.target.value)}
								placeholder="e.g. Student Council"
								className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
								University Email
							</label>
							<input
								type="email"
								id="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="organizer@university.edu"
								className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
								Create Password
							</label>
							<input
								type="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
							/>
						</div>

						<div className="pt-2">
							<label className="flex items-start gap-3 cursor-pointer">
								<input type="checkbox" className="mt-1 accent-brand" required />
								<span className="text-xs text-text-muted leading-tight">
									I agree to the university's event hosting policies and terms of service.
								</span>
							</label>
						</div>

						<button
							type="submit"
							className="w-full bg-brand text-text-inverse hover:bg-brand-hover active:bg-brand-active transition-colors py-2.5 rounded-sm font-semibold flex items-center justify-center gap-2 mt-4 shadow-sm">
							Create Organizer Account
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
						</button>
					</form>
				</div>
			</section>

			{/* Right Panel - Hero Content */}
			<section className="relative w-full md:w-1/2 min-h-[400px] md:min-h-full flex items-center justify-center p-6 md:p-12 overflow-hidden">
				<div
					className="absolute inset-0 z-0 bg-cover bg-center"
					style={{
						backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')",
					}}>
					<div className="absolute inset-0 bg-primary-900/20"></div>
				</div>

				<div className="relative z-10 bg-surface/95 backdrop-blur-sm p-8 md:p-12 max-w-lg w-full shadow-card border border-border">
					<h1 className="text-4xl md:text-5xl font-bold text-text-secondary mb-6 leading-tight tracking-tight">
						Empower Your
						<br />
						Community.
					</h1>
					<p className="text-text-muted leading-relaxed">
						Join hundreds of faculty members and student leaders who use Campus Events to bring people together. Register today to gain
						full access to our promotion and logistics tools.
					</p>
				</div>
			</section>
		</main>
	);
}
