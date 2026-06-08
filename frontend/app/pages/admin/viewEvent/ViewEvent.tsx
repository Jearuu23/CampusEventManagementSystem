import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { GetEventById, GetParticipants, UpdateEventDetails, AddEventReward, VerifyRewardCode } from "~/api/events";
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

	const [rewards, setRewards] = useState<{ id?: number; name: string; points: number }[]>([]);
	const [newRewardName, setNewRewardName] = useState("");
	const [newRewardPoints, setNewRewardPoints] = useState("");
	const [verifyCode, setVerifyCode] = useState("");

	const fetchEvent = useCallback(async () => {
		setLoading(true);
		const [res, partsRes, orgsRes] = await Promise.all([GetEventById(Number(id)), GetParticipants({ eventId: Number(id) }), GetOrganizers()]);

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
				eventStartDate: event.eventStartDate?.split(" ")[0] || "",
				eventStartTime: event.eventStartTime || event.eventStartDate?.split(" ")[1] || "00:00:00",
				location: event.location || "",
				maxParticipants: event.maxParticipants || "",
				status: event.status || "pending",
				organizerId: event.organizerId || "",
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

	const handleAddReward = async () => {
		if (!newRewardName.trim() || !newRewardPoints) {
			notify("Please provide both reward name and points.", "error");
			return;
		}

		const res = await AddEventReward({
			eventId: Number(id),
			name: newRewardName,
			points: parseInt(newRewardPoints),
		});

		if (res.success) {
			setRewards([...rewards, { id: res.data?.id, name: newRewardName, points: parseInt(newRewardPoints) }]);
			setNewRewardName("");
			setNewRewardPoints("");
			notify("Reward added successfully.", "success");
		} else {
			notify(res.message || "Failed to add reward.", "error");
		}
	};

	const handleVerifyCode = async () => {
		if (!verifyCode.trim()) {
			notify("Please enter a code to verify.", "error");
			return;
		}

		const res = await VerifyRewardCode({ code: verifyCode, eventId: Number(id) });
		if (res.success) {
			notify(`Code ${verifyCode} verified successfully! Participant redeemed: ${res.data?.rewardName}`, "success");
			setVerifyCode("");
		} else {
			notify(res.message || "Invalid or already used code.", "error");
		}
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
		if (editData.maxParticipants) fd.append("maxParticipants", editData.maxParticipants.toString());
		fd.append("status", editData.status);
		fd.append("organizerId", editData.organizerId.toString());
		if (imageFile) {
			fd.append("image", imageFile);
		}

		fd.append("eventStartDate", editData.eventStartDate);

		let timeStr = editData.eventStartTime || "00:00:00";
		if (timeStr.split(":").length === 2) timeStr += ":00";
		fd.append("eventStartTime", timeStr);

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
				{event.imagePath && !isEditing && (
					<div className="w-full h-[300px] md:h-[400px] mb-8 rounded-[4px] overflow-hidden bg-surface-secondary border border-border fade-in-element">
						<img src={getImageUrl(event.imagePath)} alt={event.title} className="w-full h-full object-cover" />
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
									name="eventStartDate"
									value={editData.eventStartDate}
									onChange={handleEditChange}
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
									step="1"
									value={editData.eventStartTime}
									onChange={handleEditChange}
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
									value={editData.maxParticipants}
									onChange={handleEditChange}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
								/>
								{validationErrors.maxParticipants && (
									<span className="text-brand text-[11px] mt-1">{validationErrors.maxParticipants}</span>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Organizer</label>
								<select
									name="organizerId"
									value={editData.organizerId}
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
								{validationErrors.organizerId && <span className="text-brand text-[11px] mt-1">{validationErrors.organizerId}</span>}
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
								{event?.imagePath && !imageFile && (
									<span className="text-[11px] text-text-muted truncate">Current: {event.imagePath.split(/[/\\]/).pop()}</span>
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
					<div className="flex flex-col gap-8">
						<EventDetails event={event} participants={participants} />

						<div className="p-6 bg-surface-secondary/20 border border-border rounded-[4px] fade-in-element">
							<h3 className="font-serif text-[20px] font-bold mb-4">Verify Reward Code</h3>
							<div className="flex flex-col sm:flex-row gap-4">
								<input
									type="text"
									placeholder="Enter participant code..."
									value={verifyCode}
									onChange={(e) => setVerifyCode(e.target.value)}
									className="bg-background border border-border-strong px-4 py-3 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand flex-1 uppercase font-mono tracking-widest"
								/>
								<button
									onClick={handleVerifyCode}
									className="px-6 py-3 bg-brand text-background font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors cursor-pointer whitespace-nowrap border-none">
									Verify Code
								</button>
							</div>
						</div>

						<div className="p-6 bg-surface-secondary/20 border border-border rounded-[4px] fade-in-element mb-12">
							<h3 className="font-serif text-[20px] font-bold mb-4">Manage Rewards</h3>
							<div className="flex flex-col md:flex-row gap-4 mb-6">
								<input
									type="text"
									placeholder="Reward Name (e.g. Free T-Shirt)"
									value={newRewardName}
									onChange={(e) => setNewRewardName(e.target.value)}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand flex-1"
								/>
								<input
									type="number"
									placeholder="Points Required"
									value={newRewardPoints}
									onChange={(e) => setNewRewardPoints(e.target.value)}
									className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand w-full md:w-40"
								/>
								<button
									onClick={handleAddReward}
									className="px-5 py-2.5 bg-brand text-background font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors cursor-pointer whitespace-nowrap border-none">
									Add Reward
								</button>
							</div>

							<div className="flex flex-col gap-3">
								{rewards.length > 0 || event.rewards?.length > 0 ? (
									[...(event.rewards || []), ...rewards].map((reward, idx) => (
										<div
											key={idx}
											className="flex justify-between items-center p-4 bg-background border border-border-strong rounded-[2px]">
											<span className="text-[14px] font-medium text-text-primary">{reward.name}</span>
											<span className="font-mono text-[11px] text-brand tracking-wider uppercase bg-brand/10 px-3 py-1 rounded-[2px]">
												{reward.points} pts
											</span>
										</div>
									))
								) : (
									<div className="text-[13px] text-text-muted p-6 text-center border border-border-strong border-dashed rounded-[2px]">
										No rewards added yet. Add a reward above to let participants redeem their points.
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
