import React from "react";

export default function RegistrationForm({ event }: { event?: any }) {
	if (!event) return null;

	const isFull = event.max_participants && (event.current_participants || 0) >= event.max_participants;
	const isClosed = event.status === "completed" || event.status === "cancelled" || event.status === "draft" || event.status === "rejected";
	const isDisabled = isFull || isClosed;

	let buttonText = "Confirm Registration";
	if (isClosed) buttonText = "Registration Closed";
	else if (isFull) buttonText = "Event Full";

	return (
		<div className="bg-surface-secondary border border-border p-8 md:p-10 sticky top-24 fade-in-element">
			<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-4 flex items-center gap-2.5 before:content-[''] before:block before:w-4 before:h-px before:bg-brand">
				Reserve Your Spot
			</div>
			<h3 className="font-serif text-[24px] font-bold mb-8">Registration</h3>

			<form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
				<div className="grid grid-cols-2 gap-6">
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">First Name *</label>
						<input
							type="text"
							required
							className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							placeholder="Jane"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Last Name *</label>
						<input
							type="text"
							required
							className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							placeholder="Doe"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Email Address *</label>
					<input
						type="email"
						required
						className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						placeholder="jane.doe@university.edu"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Phone Number</label>
					<input
						type="tel"
						className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						placeholder="+1 (555) 000-0000"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Organization / Department</label>
					<input
						type="text"
						className="bg-transparent border-b border-border-strong pb-2 text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						placeholder="Computer Science Dept."
					/>
				</div>

				<button
					type="submit"
					disabled={isDisabled}
					className="mt-4 bg-brand text-background px-6 py-4 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[2px] transition-all hover:bg-brand-hover hover:-translate-y-[1px] w-full text-center cursor-pointer border-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed">
					{buttonText}
				</button>
			</form>
		</div>
	);
}
