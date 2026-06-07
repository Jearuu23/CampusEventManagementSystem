import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { GetEventById, GetParticipants, UpdateEventDetails } from "~/api/events";
import { GetOrganizers } from "~/api/user";
import EventHeader from "./eventHeader";
import EventDetails from "./eventDetails";
import { notify } from "~/components/Notification";
import { getImageUrl } from "~/utils/helpers";
import { updateEventSchema } from "~/schemas/schemas";

export default function ViewEvent() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [event, setEvent] = useState<any>(null);
	const [participants, setParticipants] = useState<any[]>([]);
	const [organizers, setOrganizers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<any>({});
	const [isSaving, setIsSaving] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

	const fetchEvent = useCallback(async () => {
		setLoading(true);
		const [res, partsRes, orgsRes] = await Promise.all([GetEventById(Number(id)), GetParticipants({ event_id: Number(id) }), GetOrganizers()]);

		if (res.success && res.data) {
			setEvent(res.data);
		}
		if (partsRes && partsRes.success !== false) {
			setParticipants(partsRes.data || (Array.isArray(partsRes) ? partsRes : []));
		}
		if (orgsRes && orgsRes.success && orgsRes.data) {
			setOrganizers(orgsRes.data);
		}
		setLoading(false);
	}, [id]);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			return;
		}
		fetchEvent();
	}, [id, fetchEvent]);

	useEffect(() => {
		if (event) {
			setEditData({
				title: event.title || "",
				description: event.description || "",
				event_start_date: event.event_start_date?.split(" ")[0] || "",
				event_start_time: event.event_start_time || event.event_start_date?.split(" ")[1] || "00:00:00",
				location: event.location || "",
				max_participants: event.max_participants || "",
				status: event.status || "pending",
				organizer_id: event.organizer_id || "",
			});
		}
	}, [event, isEditing]);

	useEffect(() => {
		if (event && isEditing && ["completed", "cancelled"].includes(event.status)) {
			setIsEditing(false);
			notify("Cannot edit a completed or cancelled event.", "error");
		}
	}, [event, isEditing]);

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationErrors({});

		const validationResult = updateEventSchema.safeParse(editData);

		if (!validationResult.success) {
			const fieldErrors = validationResult.error.flatten().fieldErrors;
			const errors: { [key: string]: string } = {};
			for (const key in fieldErrors) {
				errors[key] = fieldErrors[key as keyof typeof fieldErrors]?.[0] || "";
			}
			setValidationErrors(errors);
			return;
		}

		setIsSaving(true);
		const fd = new FormData();
		fd.append("id", event.id.toString());
		fd.append("title", editData.title);
		fd.append("description", editData.description);
		fd.append("location", editData.location);
		if (editData.max_participants) fd.append("max_participants", editData.max_participants.toString());
		fd.append("status", editData.status);
		fd.append("organizer_id", editData.organizer_id.toString());
		if (imageFile) {
			fd.append("image", imageFile);
		}

		fd.append("event_start_date", editData.event_start_date);

		let timeStr = editData.event_start_time || "00:00:00";
		if (timeStr.split(":").length === 2) timeStr += ":00";
		fd.append("event_start_time", timeStr);

		const res = await UpdateEventDetails(fd);
		if (res.success) {
			await fetchEvent();
			setIsEditing(false);
			notify("Event updated successfully.", "success");
		} else {
			notify(res.message || "Failed to update event.", "error");
		}
		setIsSaving(false);
	};

	if (loading) {
		return <div className="p-12 font-mono text-[13px] text-text-muted">Loading event details...</div>;
	}

	if (!event) {
		return <div className="p-12 font-mono text-[13px] text-brand">Event not found.</div>;
	}

	return (
		<div className="w-full bg-background min-h-screen p-8 md:p-12 fade-in-element">
			<button
				onClick={() => navigate(-1)}
				className="mb-8 font-mono text-[12px] uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
				&larr; Back
			</button>
			<div className="max-w-4xl">
				{event.image_path && !isEditing && (
					<div className="w-full h-[300px] md:h-[400px] mb-8 rounded-[4px] overflow-hidden bg-surface-secondary border border-border fade-in-element">
						<img src={getImageUrl(event.image_path)} alt={event.title} className="w-full h-full object-cover" />
					</div>
				)}
				<EventHeader event={event} setEvent={setEvent} isEditing={isEditing} setIsEditing={setIsEditing} />

				{isEditing && !["completed", "cancelled"].includes(event.status) ? (
					<form
						onSubmit={handleSave}
						className="flex flex-col gap-6 mt-8 p-6 bg-surface-secondary/20 border border-border rounded-[4px] fade-in-element">
						<h2 className="font-serif text-[24px] font-bold text-text-primary mb-2">Edit Event</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Title</label>
								<input
									type="text"
									name="title"
									value={editData.title}
									onChange={handleEditChange}
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
									value={editData.location}
									onChange={handleEditChange}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								/>
								{validationErrors.location && <span className="text-brand text-[11px] mt-1">{validationErrors.location}</span>}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Date</label>
								<input
									type="date"
									name="event_start_date"
									value={editData.event_start_date}
									onChange={handleEditChange}
									required
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors [color-scheme:dark]"
								/>
								{validationErrors.event_start_date && (
									<span className="text-brand text-[11px] mt-1">{validationErrors.event_start_date}</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Time</label>
								<input
									type="time"
									name="event_start_time"
									step="1"
									value={editData.event_start_time}
									onChange={handleEditChange}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors [color-scheme:dark]"
								/>
								{validationErrors.event_start_time && (
									<span className="text-brand text-[11px] mt-1">{validationErrors.event_start_time}</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Max Participants (Optional)</label>
								<input
									type="number"
									name="max_participants"
									value={editData.max_participants}
									onChange={handleEditChange}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								/>
								{validationErrors.max_participants && (
									<span className="text-brand text-[11px] mt-1">{validationErrors.max_participants}</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Organizer</label>
								<select
									name="organizer_id"
									value={editData.organizer_id}
									onChange={handleEditChange}
									required
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors">
									<option value="">Select Organizer</option>
									{organizers.map((org) => (
										<option key={org.id} value={org.id}>
											{org.name} ({org.org})
										</option>
									))}
								</select>
								{validationErrors.organizer_id && (
									<span className="text-brand text-[11px] mt-1">{validationErrors.organizer_id}</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Status</label>
								<select
									name="status"
									value={editData.status}
									onChange={handleEditChange}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors">
									<option value="pending">Pending</option>
									<option value="approved">Approved</option>
									<option value="rejected">Rejected</option>
									<option value="ongoing">Ongoing</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>
								{validationErrors.status && <span className="text-brand text-[11px] mt-1">{validationErrors.status}</span>}
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
								{event?.image_path && !imageFile && (
									<span className="text-[11px] text-text-muted truncate">Current: {event.image_path.split(/[/\\]/).pop()}</span>
								)}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Description</label>
							<textarea
								name="description"
								value={editData.description}
								onChange={handleEditChange}
								rows={5}
								className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"></textarea>
							{validationErrors.description && <span className="text-brand text-[11px] mt-1">{validationErrors.description}</span>}
						</div>
						<div className="flex justify-end gap-4 mt-4">
							<button
								type="button"
								onClick={() => setIsEditing(false)}
								disabled={isSaving}
								className="px-5 py-2.5 border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-surface-secondary transition-colors cursor-pointer disabled:opacity-50">
								Cancel
							</button>
							<button
								type="submit"
								disabled={isSaving}
								className="px-5 py-2.5 bg-brand text-background font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors cursor-pointer disabled:opacity-50">
								{isSaving ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>
				) : (
					<EventDetails event={event} participants={participants} />
				)}
			</div>
		</div>
	);
}
