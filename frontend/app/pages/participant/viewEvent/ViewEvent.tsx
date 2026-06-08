import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { GetEventById, RedeemReward } from "~/api/events";
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
	const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

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
				eventId: Number(id),
				email: user.email,
				status: newStatus,
			});

			if (res.success) {
				setRegistrationStatus(newStatus);
				if (newStatus === "cancelled") setPoints(0);
				if (newStatus === "registered") setPoints(10);
				if (newStatus === "attended") setPoints(50);
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

	const handleRedeem = async (cost: number, rewardName: string, rewardId: number) => {
		if (points >= cost) {
			if (!user?.email) return;

			const res = await RedeemReward({
				eventId: Number(id),
				email: user.email,
				rewardId,
			});

			if (res.success) {
				setPoints(points - cost);
				setRedeemedCode(res.data?.code || Math.random().toString(36).substring(2, 8).toUpperCase());
				notify(`Successfully redeemed ${rewardName}! Show this code to the organizer.`, "success");
			} else {
				notify(res.message || "Failed to redeem reward.", "error");
			}
		} else {
			notify("Not enough points to redeem this reward.", "error");
		}
	};

	const handleDownloadCertificate = () => {
		const printWindow = window.open("", "", "width=800,height=600");
		if (!printWindow) return;
		printWindow.document.write(`
			<html>
			<head>
				<title>Certificate - ${event.title}</title>
				<style>
					body { font-family: 'Georgia', serif; text-align: center; padding: 40px; background: #f9f9f9; margin: 0; }
					.cert { border: 8px solid #c8401e; padding: 60px 40px; background: white; outline: 2px solid #a8873a; outline-offset: -16px; }
					h1 { font-size: 48px; color: #c8401e; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; }
					h2 { font-size: 36px; margin: 20px 0; color: #111; }
					p { font-size: 18px; color: #555; margin: 10px 0; font-style: italic; }
					.event { font-weight: bold; font-size: 26px; margin: 30px 0; color: #222; font-style: normal; }
				</style>
			</head>
			<body>
				<div class="cert">
					<h1>Certificate of Attendance</h1>
					<p>This is to proudly certify that</p>
					<h2>${user?.firstName} ${user?.lastName}</h2>
					<p>has successfully participated in</p>
					<div class="event">${event.title}</div>
					<p>Awarded on ${new Date().toLocaleDateString()}</p>
				</div>
				<script>window.print();</script>
			</body>
			</html>
		`);
		printWindow.document.close();
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

	const rewardsList = event.rewards;

	return (
		<div className="w-full bg-background min-h-[calc(100vh-56px)] p-8 md:p-12 fade-in-element text-text-primary">
			<div className="max-w-5xl mx-auto">
				<button
					onClick={() => navigate(-1)}
					className="mb-8 font-mono text-[12px] uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
					&larr; Back to Dashboard
				</button>

				{event.imagePath && (
					<div className="w-full h-[300px] md:h-[400px] mb-8 rounded-[4px] overflow-hidden bg-surface-secondary border border-border fade-in-element">
						<img src={getImageUrl(event.imagePath)} alt={event.title} className="w-full h-full object-cover" />
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
								{event.eventStartDate?.split(" ")[0]}
							</div>
							<div className="flex items-center gap-2.5">
								<span className="text-brand">
									<ClockIcon />
								</span>
								{event.eventStartTime}
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

						<div className="mb-8 pb-4 border-b border-border">
							<h4 className="font-serif text-[20px] font-bold mb-4">Rewards</h4>
							<div className="flex flex-col gap-3">
								{rewardsList.map((reward: any, index: number) => (
									<div key={index} className="flex justify-between items-center">
										<span className="text-[13px] font-medium text-text-primary">{reward.name}</span>
										<button
											onClick={() => handleRedeem(reward.points, reward.name, reward.id)}
											disabled={points < reward.points}
											className="px-3 py-1.5 bg-brand text-background font-mono text-[10px] uppercase tracking-wider rounded-[2px] cursor-pointer hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-none">
											{reward.points} pts
										</button>
									</div>
								))}
							</div>

							{redeemedCode && (
								<div className="mt-5 p-4 bg-success-bg border border-success/20 rounded-[2px] text-center fade-in-element">
									<div className="font-mono text-[10px] uppercase text-success-text tracking-wider mb-2">Your Redemption Code</div>
									<div className="font-mono text-[20px] font-bold text-success-text tracking-[0.2em]">{redeemedCode}</div>
								</div>
							)}
						</div>

						{registrationStatus === "attended" && (
							<button
								onClick={handleDownloadCertificate}
								className="w-full mb-4 py-3.5 bg-[#16a34a] text-white font-mono text-[11px] uppercase tracking-wider hover:bg-[#15803d] transition-colors cursor-pointer">
								Download Certificate
							</button>
						)}

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
