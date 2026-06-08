import React, { useState } from "react";
import { CreateEvent } from "~/api/events";
import { useAuth } from "~/contexts/auth/AuthContext";
import { createEventSchema } from "~/schemas/schemas";

interface ModalCreateEventProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export default function ModalCreateEvent({ isOpen, onClose, onSuccess }: ModalCreateEventProps) {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		location: "",
		eventStartDate: "",
		eventStartTime: "",
		maxParticipants: "",
	});
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

	if (!isOpen) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setValidationErrors({});

		const validationResult = createEventSchema.safeParse(formData);

		if (!validationResult.success) {
			const fieldErrors = validationResult.error.flatten().fieldErrors;
			const errors: { [key: string]: string } = {};
			for (const key in fieldErrors) {
				errors[key] = fieldErrors[key as keyof typeof fieldErrors]?.[0] || "";
			}
			setValidationErrors(errors);
			return;
		}

		setIsSubmitting(true);

		try {
			const fd = new FormData();
			fd.append("title", formData.title);
			fd.append("description", formData.description);
			fd.append("location", formData.location);
			if (formData.maxParticipants) {
				fd.append("maxParticipants", formData.maxParticipants);
			}

			// Defaults for new events
			fd.append("status", "pending");
			if (user?.id) {
				fd.append("organizerId", user.id.toString());
			}

			if (imageFile) {
				fd.append("image", imageFile);
			}

			if (formData.eventStartDate) {
				fd.append("eventStartDate", formData.eventStartDate);
			}

			if (formData.eventStartTime) {
				let timeStr = formData.eventStartTime;
				if (timeStr.split(":").length === 2) timeStr += ":00";
				fd.append("eventStartTime", timeStr);
			}

			const res = await CreateEvent(fd);
			if (res.success) {
				setFormData({
					title: "",
					description: "",
					location: "",
					eventStartDate: "",
					eventStartTime: "",
					maxParticipants: "",
				});
				setImageFile(null);
				onSuccess();
			} else {
				setError(res.message || "Failed to create event.");
			}
		} catch (err) {
			console.error("Error creating event:", err);
			setError("An unexpected error occurred.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 fade-in-element">
			<div className="bg-background border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[4px] shadow-2xl relative">
				<div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center z-10">
					<h2 className="font-serif text-[24px] font-bold text-text-primary">Create New Event</h2>
					<button
						onClick={onClose}
						className="text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer flex items-center justify-center p-1">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
					{error && (
						<div className="p-4 bg-[rgba(200,64,30,0.1)] border border-[rgba(200,64,30,0.2)] rounded-[2px] text-brand text-[13px] font-medium">
							{error}
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Title *</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							/>
							{validationErrors.title && <span className="text-brand text-[11px] mt-1">{validationErrors.title}</span>}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Location</label>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleChange}
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							/>
							{validationErrors.location && <span className="text-brand text-[11px] mt-1">{validationErrors.location}</span>}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Date *</label>
							<input
								type="date"
								name="eventStartDate"
								value={formData.eventStartDate}
								onChange={handleChange}
								required
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors [color-scheme:dark]"
							/>
							{validationErrors.eventStartDate && (
								<span className="text-brand text-[11px] mt-1">{validationErrors.eventStartDate}</span>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Time</label>
							<input
								type="time"
								name="eventStartTime"
								value={formData.eventStartTime}
								onChange={handleChange}
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors [color-scheme:dark]"
							/>
							{validationErrors.eventStartTime && (
								<span className="text-brand text-[11px] mt-1">{validationErrors.eventStartTime}</span>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Max Participants (Optional)</label>
							<input
								type="number"
								name="maxParticipants"
								value={formData.maxParticipants}
								onChange={handleChange}
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
							/>
							{validationErrors.maxParticipants && (
								<span className="text-brand text-[11px] mt-1">{validationErrors.maxParticipants}</span>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Event Image</label>
							<input
								type="file"
								name="image"
								accept="image/*"
								onChange={(e) => setImageFile(e.target.files?.[0] || null)}
								className="bg-background border border-border-strong px-3 py-2 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-[2px] file:border-0 file:text-[11px] file:font-mono file:uppercase file:tracking-wider file:bg-surface-secondary file:text-text-primary hover:file:bg-border cursor-pointer"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows={5}
							className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"></textarea>
						{validationErrors.description && <span className="text-brand text-[11px] mt-1">{validationErrors.description}</span>}
					</div>
					<div className="flex justify-end gap-4 mt-4 border-t border-border pt-6">
						<button
							type="button"
							onClick={onClose}
							disabled={isSubmitting}
							className="px-5 py-2.5 border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-surface-secondary transition-colors cursor-pointer disabled:opacity-50">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-5 py-2.5 bg-brand text-background font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors cursor-pointer disabled:opacity-50">
							{isSubmitting ? "Creating..." : "Create Event"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
