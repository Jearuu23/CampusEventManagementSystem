import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";
import { LoginUser } from "~/api/user";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const data = await LoginUser({ email, password });

			if (data.success) {
				// Update context state and localStorage
				login(data.user.role as UserRole);
				navigate("/dashboard");
			} else {
				setError(data.message || "Login failed");
			}
		} catch (err) {
			console.error("Error logging in:", err);
			setError("An error occurred while communicating with the server.");
		}
	};

	return (
		<main className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)] w-full bg-background font-sans text-text-primary">
			{/* Left Panel - Hero/Marketing Copy */}
			<section className="hidden lg:flex w-1/2 bg-text-primary relative items-center justify-center p-20 overflow-hidden">
				<div className="relative z-10 w-full max-w-lg fade-in-element">
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-6 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
						Organizer Portal
					</div>
					<h1 className="font-serif text-[clamp(40px,4vw,60px)] font-black leading-[1.05] text-background mb-6">
						Orchestrate
						<br />
						<em className="italic text-brand">Campus Life.</em>
					</h1>
					<p className="text-[15px] font-light text-background/60 leading-[1.7]">
						Access the centralized management suite to create, organize, and monitor events across the university ecosystem. Secure,
						efficient, and designed for faculty and organizers.
					</p>
				</div>
				<div className="absolute inset-0 bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208] flex items-center justify-center -z-10">
					<svg width="400" height="400" viewBox="0 0 80 80" fill="none" className="opacity-10">
						<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
						<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
						<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
					</svg>
				</div>
			</section>

			{/* Right Panel - Login Form */}
			<section className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20">
				<div className="w-full max-w-md fade-in-element">
					<div className="flex border-b border-border mb-12">
						<button className="flex-1 pb-4 text-[13px] font-medium tracking-[0.08em] uppercase text-text-primary border-b-2 border-brand text-center cursor-pointer bg-transparent">
							Staff Login
						</button>
						<button
							onClick={() => navigate("/register")}
							className="flex-1 pb-4 text-[13px] font-normal tracking-[0.08em] uppercase text-text-muted hover:text-text-primary border-b-2 border-transparent transition-colors text-center cursor-pointer bg-transparent">
							Register
						</button>
					</div>

					<h2 className="font-serif text-[32px] font-bold mb-2">Welcome Back</h2>
					<p className="text-[14px] text-text-muted font-light mb-8">Sign in to your account.</p>

					{error && (
						<div className="mb-6 p-4 bg-[rgba(200,64,30,0.1)] border border-[rgba(200,64,30,0.2)] rounded-[2px] text-brand text-[13px] font-medium flex items-start gap-2 fade-in-element">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="shrink-0 mt-0.5">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							<span>{error}</span>
						</div>
					)}

					<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
								Email
							</label>
							<input
								type="email"
								id="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="john@email.com"
								className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors placeholder:text-text-muted/50"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex justify-between items-end">
								<label htmlFor="password" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
									Password
								</label>
								<a href="#" className="font-mono text-[10px] tracking-[0.05em] text-brand hover:underline transition-all">
									Forgot?
								</a>
							</div>
							<input
								type="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors placeholder:text-text-muted/50"
							/>
						</div>

						<button
							type="submit"
							className="mt-6 bg-brand text-background px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-brand-hover hover:-translate-y-[1px] w-full text-center cursor-pointer border-none flex items-center justify-center gap-2">
							Sign In
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M5 12h14"></path>
								<path d="m12 5 7 7-7 7"></path>
							</svg>
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
