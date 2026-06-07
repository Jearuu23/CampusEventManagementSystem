import React, { useState, useEffect } from "react";
import type { Event } from "~/types/events";
import { RegisterForEvent, GetParticipants, UpdateParticipantStatus } from "~/api/events";
import { notify } from "~/components/Notification";
import { registrationFormSchema } from "~/schemas/schemas";

export default function RegistrationForm({ event, user }: { event?: Event; user?: any }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phone: "",
		organization: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

	const [isRegistered, setIsRegistered] = useState(false);
	const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
	const [isChecking, setIsChecking] = useState(false);

	useEffect(() => {
		const checkRegistration = async () => {
			if (user && event) {
				setIsChecking(true);
				const res = await GetParticipants({ eventId: event.id, search: user.email });
				if (res.success && res.data) {
					const participant = res.data.find((p: any) => p.email === user.email);
					if (participant) {
						setIsRegistered(true);
						setRegistrationStatus(participant.status);
					}
				}
				setIsChecking(false);
			}
		};
		checkRegistration();
	}, [user, event]);

	if (!event) return null;

	const isFull = event.maxParticipants && (event.currentParticipants || 0) >= event.maxParticipants;
	const isClosed = event.status === "completed" || event.status === "cancelled" || event.status === "rejected";
	const isDisabled = isFull || isClosed || isSubmitting;

	let buttonText = "Confirm Registration";
	if (isClosed) buttonText = "Registration Closed";
	else if (isFull) buttonText = "Event Full";
	else if (isSubmitting) buttonText = "Registering...";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isDisabled) return;
		setValidationErrors({});

		if (!user) {
			const validationResult = registrationFormSchema.safeParse(formData);

			if (!validationResult.success) {
				const fieldErrors = validationResult.error.flatten().fieldErrors;
				const errors: { [key: string]: string } = {};
				for (const key in fieldErrors) {
					errors[key] = fieldErrors[key as keyof typeof fieldErrors]?.[0] || "";
				}
				setValidationErrors(errors);
				return;
			}
		}

		setIsSubmitting(true);
		const payload = user
			? {
					eventId: event.id,
					participantId: user.id,
					email: user.email,
				}
			: { eventId: event.id, ...formData };
		const res = await RegisterForEvent(payload as any);

		if (res.success) {
			notify(res.message, "success");
			setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "", organization: "" });
			if (user) {
				setIsRegistered(true);
				setRegistrationStatus("registered");
			}
		} else {
			if (res.message === "Participant is already registered for this event.") {
				setIsRegistered(true);
				setRegistrationStatus("registered");
				notify("You are already registered. You can cancel your registration if needed.", "info");
			} else {
				notify(res.message || "Failed to register.", "error");
			}
		}
		setIsSubmitting(false);
	};

	const handleCancelRegistration = async () => {
		if (!user || !event) return;
		setIsSubmitting(true);
		const res = await UpdateParticipantStatus({ eventId: event.id, email: user.email, status: "cancelled" });
		if (res.success) {
			notify("Registration cancelled successfully.", "success");
			setIsRegistered(true);
			setRegistrationStatus("cancelled");
		} else {
			notify(res.message || "Failed to cancel registration.", "error");
		}
		setIsSubmitting(false);
	};

	const handleReRegister = async () => {
		if (!user || !event) return;
		setIsSubmitting(true);
		const res = await UpdateParticipantStatus({ eventId: event.id, email: user.email, status: "registered" });
		if (res.success) {
			notify("Successfully re-registered for the event.", "success");
			setIsRegistered(true);
			setRegistrationStatus("registered");
		} else {
			notify(res.message || "Failed to register.", "error");
		}
		setIsSubmitting(false);
	};

	return (
		<div className="bg-surface-secondary border border-border p-8 md:p-10 sticky top-24 fade-in-element">
			<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-4 flex items-center gap-2.5 before:content-[''] before:block before:w-4 before:h-px before:bg-brand">
				Reserve Your Spot
			</div>
			<h3 className="font-serif text-[24px] font-bold mb-8">Registration</h3>

			{user ? (
				<div className="flex flex-col gap-6">
					<p className="text-[13px] text-text-muted leading-relaxed">
						You are currently logged in as <span className="text-brand font-medium">{user.email}</span>.
					</p>
					{isChecking ? (
						<p className="text-[13px] text-text-muted animate-pulse">Checking registration status...</p>
					) : isRegistered && registrationStatus !== "cancelled" ? (
						<div className="flex flex-col gap-4">
							<div className="bg-surface-primary border border-border p-4 rounded-[2px]">
								<p className="text-[13px] text-text-primary font-medium mb-1">You are registered for this event.</p>
								<p className="text-[11px] text-text-muted">
									Status: <span className="uppercase tracking-wider font-mono text-brand">{registrationStatus}</span>
								</p>
							</div>
							<button
								type="button"
								onClick={handleCancelRegistration}
								disabled={isSubmitting || isClosed}
								className="mt-2 bg-danger-bg text-danger-text px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-danger hover:text-background w-full text-center cursor-pointer border-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed">
								{isSubmitting ? "Processing..." : "Cancel Registration"}
							</button>
						</div>
					) : (
						<form
							onSubmit={
								isRegistered && registrationStatus === "cancelled"
									? (e) => {
											e.preventDefault();
											handleReRegister();
										}
									: handleSubmit
							}
							className="flex flex-col gap-6">
							{isRegistered && registrationStatus === "cancelled" && (
								<div className="bg-warning-bg/10 border border-warning/20 p-4 rounded-[2px]">
									<p className="text-[13px] text-warning font-medium mb-1">Your previous registration was cancelled.</p>
									<p className="text-[11px] text-warning/80">You can register again by clicking below.</p>
								</div>
							)}
							<button
								type="submit"
								disabled={isDisabled}
								className="mt-2 bg-brand text-background px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-brand-hover hover:-translate-y-[1px] w-full text-center cursor-pointer border-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed">
								{buttonText}
							</button>
						</form>
					)}
				</div>
			) : (
				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">First Name *</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								required
								className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								placeholder="Jane"
							/>
							{validationErrors.firstName && <span className="text-brand text-[11px] mt-1">{validationErrors.firstName}</span>}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Last Name *</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								required
								className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								placeholder="Doe"
							/>
							{validationErrors.lastName && <span className="text-brand text-[11px] mt-1">{validationErrors.lastName}</span>}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Email Address *</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							placeholder="jane.doe@university.edu"
						/>
						{validationErrors.email && <span className="text-brand text-[11px] mt-1">{validationErrors.email}</span>}
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Create Password *</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							placeholder="••••••••"
						/>
						{validationErrors.password && <span className="text-brand text-[11px] mt-1">{validationErrors.password}</span>}
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								placeholder="+63 000 0000 000"
							/>
							{validationErrors.phone && <span className="text-brand text-[11px] mt-1">{validationErrors.phone}</span>}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Organization / Department</label>
							<input
								type="text"
								name="organization"
								value={formData.organization}
								onChange={handleChange}
								className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								placeholder="Computer Science Dept."
							/>
							{validationErrors.organization && <span className="text-brand text-[11px] mt-1">{validationErrors.organization}</span>}
						</div>
					</div>

					<button
						type="submit"
						disabled={isDisabled}
						className="mt-4 bg-brand text-background px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-brand-hover hover:-translate-y-[1px] w-full text-center cursor-pointer border-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed">
						{buttonText}
					</button>
				</form>
			)}
		</div>
	);
}
