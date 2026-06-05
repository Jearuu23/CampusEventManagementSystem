import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

export default function Login() {
	const { setUserRole } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<string>("admin");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setUserRole(UserRole.ADMIN);
		navigate("/dashboard");
	};

	return (
		<main className="flex flex-col md:flex-row min-h-[calc(100vh-140px)] w-full bg-background">
			{/* Left Panel - Hero/Marketing Copy */}
			<section className="relative w-full md:w-1/2 min-h-[400px] md:min-h-full flex items-center justify-center p-6 md:p-12 overflow-hidden">
				{/* Background Image with slight overlay for readability if needed */}
				<div
					className="absolute inset-0 z-0 bg-cover bg-center"
					style={{
						backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80')",
					}}>
					{/* Optional subtle gradient overlay */}
					<div className="absolute inset-0 bg-primary-900/10"></div>
				</div>

				{/* Text Box Overlay */}
				<div className="relative z-10 bg-surface/95 backdrop-blur-sm p-8 md:p-12 max-w-lg w-full shadow-card border border-border">
					<h1 className="text-4xl md:text-5xl font-bold text-text-secondary mb-6 leading-tight tracking-tight">
						Orchestrate
						<br />
						Campus Life.
					</h1>
					<p className="text-text-muted leading-relaxed">
						Access the centralized management suite to create, organize, and monitor events across the university ecosystem. Secure,
						efficient, and designed for faculty and organizers.
					</p>
				</div>
			</section>

			{/* Right Panel - Login Form */}
			<section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background-muted">
				<div className="bg-surface border border-border shadow-card w-full max-w-md p-8 pt-6">
					{/* Form Tabs */}
					<div className="flex border-b border-border-muted mb-8">
						<button className="flex-1 text-center py-3 border-b-2 border-brand font-semibold text-text-primary text-sm">Login</button>
						<button
							className="flex-1 text-center py-3 text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
							onClick={() => navigate("/register")}>
							Organizer Registration
						</button>
					</div>

					{/* Form Header */}
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-text-secondary mb-2">Welcome Back</h2>
						<p className="text-sm text-text-muted">Sign in to your administrative dashboard.</p>
					</div>

					{/* Login Form */}
					<form className="space-y-5" onSubmit={handleSubmit}>
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
								placeholder="faculty@university.edu"
								className="w-full border border-border rounded-sm px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-shadow"
							/>
						</div>

						<div>
							<div className="flex justify-between items-center mb-1.5">
								<label htmlFor="password" className="block text-xs font-bold text-text-secondary uppercase tracking-wide">
									Password
								</label>
								<a href="#" className="text-xs font-medium text-brand hover:text-brand-hover hover:underline">
									Forgot password?
								</a>
							</div>
							<input
								type="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full border border-border rounded-sm px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-shadow"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-brand text-text-inverse hover:bg-brand-hover active:bg-brand-active transition-colors py-2.5 rounded-sm font-semibold flex items-center justify-center gap-2 mt-4 shadow-sm">
							Sign In
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
								<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
								<polyline points="10 17 15 12 10 7" />
								<line x1="15" y1="12" x2="3" y2="12" />
							</svg>
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
