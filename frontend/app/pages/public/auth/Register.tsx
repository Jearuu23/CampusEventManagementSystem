import React, { useState } from "react";
import { useNavigate } from "react-router";
import { RegisterOrganizer } from "~/api/user";

export default function Register() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [org, setOrg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const data = await RegisterOrganizer({
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				organization: org,
			});
			if (data.success) {
				alert("Registration successful! Please login.");
				navigate("/login");
			} else {
				setError(data.message || "Registration failed");
			}
		} catch (err) {
			console.error("Error registering:", err);
			setError("An error occurred while communicating with the server.");
		}
	};

	return (
		<main className="flex flex-col-reverse lg:flex-row min-h-[calc(100vh-56px)] w-full bg-background font-sans text-text-primary">
			{/* Left Panel - Registration Form */}
			<section className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20 overflow-y-auto">
				<div className="w-full max-w-md fade-in-element">
					<div className="flex border-b border-border mb-10">
						<button
							onClick={() => navigate("/login")}
							className="flex-1 pb-4 text-[13px] font-normal tracking-[0.08em] uppercase text-text-muted hover:text-text-primary border-b-2 border-transparent transition-colors text-center cursor-pointer bg-transparent">
							Staff Login
						</button>
						<button className="flex-1 pb-4 text-[13px] font-medium tracking-[0.08em] uppercase text-text-primary border-b-2 border-brand text-center cursor-pointer bg-transparent">
							Register
						</button>
					</div>

					<h2 className="font-serif text-[32px] font-bold mb-2">Organizer Sign Up</h2>
					<p className="text-[14px] text-text-muted font-light mb-8 leading-[1.6]">
						Provide your department or organization to request organizer access.
					</p>

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
						<div className="grid grid-cols-2 gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="firstName" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
									First Name
								</label>
								<input
									type="text"
									id="firstName"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="lastName" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="org" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
								Organization / Dept
							</label>
							<input
								type="text"
								id="org"
								required
								value={org}
								onChange={(e) => setOrg(e.target.value)}
								placeholder="e.g. Student Council"
								className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors placeholder:text-text-muted/50"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
								University Email
							</label>
							<input
								type="email"
								id="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="organizer@university.edu"
								className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors placeholder:text-text-muted/50"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="password" className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">
								Create Password
							</label>
							<input
								type="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="bg-transparent border-b border-border-strong pb-2 text-[14px] text-text-primary outline-none focus:border-brand transition-colors"
							/>
						</div>

						<div className="pt-2">
							<label className="flex items-start gap-3 cursor-pointer">
								<input type="checkbox" className="mt-1 accent-brand" required />
								<span className="text-[12px] text-text-muted leading-tight font-light">
									I agree to the university's event hosting policies and terms of service.
								</span>
							</label>
						</div>

						<button
							type="submit"
							className="mt-2 bg-brand text-background px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-brand-hover hover:-translate-y-[1px] w-full text-center cursor-pointer border-none flex items-center justify-center gap-2">
							Create Account
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

			{/* Right Panel - Hero Content */}
			<section className="hidden lg:flex w-1/2 bg-text-primary relative items-center justify-center p-20 overflow-hidden">
				<div className="relative z-10 w-full max-w-lg fade-in-element">
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-6 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
						Join the Network
					</div>
					<h1 className="font-serif text-[clamp(40px,4vw,60px)] font-black leading-[1.05] text-background mb-6">
						Empower Your
						<br />
						<em className="italic text-brand">Community.</em>
					</h1>
					<p className="text-[15px] font-light text-background/60 leading-[1.7]">
						Join hundreds of faculty members and student leaders who use Campus Events to bring people together. Register today to gain
						full access to our promotion and logistics tools.
					</p>
				</div>
				<div className="absolute inset-0 bg-gradient-to-br from-[#121815] via-[#1a231d] to-[#0c120f] flex items-center justify-center -z-10">
					<svg width="400" height="400" viewBox="0 0 60 60" fill="none" className="opacity-[0.15]">
						<circle cx="30" cy="30" r="24" stroke="#5cb88a" strokeWidth="1" />
						<circle cx="30" cy="30" r="16" stroke="#5cb88a" strokeWidth="0.5" />
					</svg>
				</div>
			</section>
		</main>
	);
}
