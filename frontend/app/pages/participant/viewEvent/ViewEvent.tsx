import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { GetEventById } from "~/api/events";
import { GetParticipationStatus, UpdateParticipationStatus } from "~/api/user";
import { useAuth } from "~/contexts/auth/AuthContext";
import { notify } from "~/components/Notification";
import { getImageUrl } from "~/utils/helpers";
import { CalendarIcon, ClockIcon, MapPinIcon } from "~/components/Icons";

export default function ParticipantViewEvent() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [event, setEvent] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
	const [points, setPoints] = useState<number>(0);
	const [isUpdating, setIsUpdating] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await GetEventById(Number(id));
			if (res.success && res.data) {
				setEvent(res.data);
				if (user?.email) {
					const partRes = await GetParticipationStatus(Number(id), user.email);
					if (partRes.success && partRes.data) {
						setRegistrationStatus(partRes.data.status);
						setPoints(partRes.data.points);
					}
				}
			} else {
				setError("Event not found.");
			}
		} catch (err) {
			setError("An error occurred while fetching the event.");
		} finally {
			setLoading(false);
		}
	}, [id, user]);

	useEffect(() => {
		if (!id || !user?.id) return;
		fetchData();
	}, [id, user, fetchData]);

	const handleUpdateStatus = async (newStatus: string) => {
		if (!user?.email) {
			notify("User email not found.", "error");
			return;
		}

		setIsUpdating(true);
		try {
			const res = await UpdateParticipationStatus({
				event_id: Number(id),
				email: user.email,
				status: newStatus,
			});

			if (res.success) {
				setRegistrationStatus(newStatus);
				if (newStatus === "cancelled") setPoints(0);
				if (newStatus === "registered") setPoints(10);
				notify(res.message || `Successfully updated status to ${newStatus}.`, "success");
			} else {
				notify(res.message || "Failed to update participation status.", "error");
			}
		} catch (err) {
			console.error(err);
			notify("An error occurred while updating status.", "error");
		} finally {
			setIsUpdating(false);
		}
	};

	if (loading) {
		return <div className="p-12 font-mono text-[13px] text-text-muted">Loading event details...</div>;
	}

	if (error) {
		return <div className="p-12 font-mono text-[13px] text-brand">{error}</div>;
	}

	if (!event) {
		return <div className="p-12 font-mono text-[13px] text-brand">Event not found.</div>;
	}

	const isEventActive = !["completed", "cancelled"].includes(event.status);

	return (
		<div className="w-full bg-background min-h-[calc(100vh-56px)] p-8 md:p-12 fade-in-element text-text-primary">
			<div className="max-w-5xl mx-auto">
				<button
					onClick={() => navigate(-1)}
					className="mb-8 font-mono text-[12px] uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
					&larr; Back to Dashboard
				</button>

				{event.image_path && (
					<div className="w-full h-[300px] md:h-[400px] mb-8 rounded-[4px] overflow-hidden bg-surface-secondary border border-border fade-in-element">
						<img src={getImageUrl(event.image_path)} alt={event.title} className="w-full h-full object-cover" />
					</div>
				)}

				<div className="flex flex-col lg:flex-row gap-10 items-start mb-12">
					<div className="flex-1">
						<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-4 flex items-center gap-2.5 before:content-[''] before:block before:w-4 before:h-px before:bg-brand">
							{event.department || "Event Details"}
						</div>
						<h1 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-[1.1] mb-6">{event.title}</h1>

						<div className="flex flex-wrap gap-6 mb-8 font-mono text-[12px] text-text-muted uppercase tracking-wider">
							<div className="flex items-center gap-2.5">
								<span className="text-brand">
									<CalendarIcon />
								</span>
								{event.event_start_date?.split(" ")[0]}
							</div>
							<div className="flex items-center gap-2.5">
								<span className="text-brand">
									<ClockIcon />
								</span>
								{event.event_start_time}
							</div>
							{event.location && (
								<div className="flex items-center gap-2.5">
									<span className="text-brand">
										<MapPinIcon />
									</span>
									{event.location}
								</div>
							)}
						</div>

						<div className="prose prose-invert max-w-none text-text-primary/80 font-light leading-relaxed">
							{event.description?.split("\n").map((para: string, idx: number) => (
								<p key={idx} className="mb-4">
									{para}
								</p>
							))}
						</div>
					</div>

					{/* Participation Card */}
					<div className="w-full lg:w-80 bg-surface-secondary border border-border p-6 rounded-[4px] shrink-0 sticky top-24">
						<h3 className="font-serif text-[20px] font-bold mb-6">Your Participation</h3>

						<div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
							<span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Status</span>
							<span
								className={`font-mono text-[12px] uppercase font-bold tracking-wider ${
									registrationStatus === "registered"
										? "text-brand"
										: registrationStatus === "attended"
											? "text-[#16a34a]"
											: "text-[#dc2626]"
								}`}>
								{registrationStatus || "Not Registered"}
							</span>
						</div>

						<div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
							<span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Points Earned</span>
							<span className="font-serif text-[24px] font-bold text-text-primary leading-none">
								{points || 0} <span className="text-[14px] text-text-muted font-normal">pts</span>
							</span>
						</div>

						{isEventActive ? (
							registrationStatus === "cancelled" ? (
								<button
									onClick={() => handleUpdateStatus("registered")}
									disabled={isUpdating}
									className="w-full py-3.5 bg-brand text-background font-mono text-[11px] uppercase tracking-wider hover:bg-brand-hover transition-colors cursor-pointer disabled:opacity-50">
									{isUpdating ? "Updating..." : "Re-register"}
								</button>
							) : (
								<button
									onClick={() => handleUpdateStatus("cancelled")}
									disabled={isUpdating || registrationStatus === "attended"}
									className="w-full py-3.5 border border-[#dc2626] text-[#dc2626] font-mono text-[11px] uppercase tracking-wider hover:bg-[#dc2626]/10 transition-colors cursor-pointer disabled:opacity-50 disabled:border-border disabled:text-text-muted">
									{isUpdating ? "Updating..." : "Cancel Registration"}
								</button>
							)
						) : (
							<div className="text-center font-mono text-[11px] uppercase tracking-wider text-text-muted p-4 bg-background border border-border rounded-[2px]">
								Event {event.status}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
