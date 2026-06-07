import React, { useState, useEffect } from "react";
import { useAuth } from "~/contexts/auth/AuthContext";
import { notify } from "~/components/Notification";
import { GetParticipantDashboard } from "~/api/user";
import type { ParticipantDashboardData } from "~/types/user";

export default function Dashboard() {
	const { user } = useAuth();
	const [data, setData] = useState<ParticipantDashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const res = await GetParticipantDashboard();
			if (res.success && res.data) {
				setData(res.data);
				setPoints(res.data.points);
			} else {
				notify(res.message || "Failed to load dashboard data.", "error");
			}
			setLoading(false);
		}
		fetchData();
	}, []);

	// Mock rewards catalog
	const rewards = [
		{ id: 101, title: "Certificate of Participation", cost: 500, type: "cert" },
		{ id: 102, title: "$5 Campus Coffee Voucher", cost: 200, type: "voucher" },
		{ id: 103, title: "Priority Event Registration", cost: 1000, type: "perk" },
		{ id: 104, title: "University Merch Pack", cost: 2500, type: "merch" },
	];

	const handleRedeem = (reward: any) => {
		if (points >= reward.cost) {
			setPoints((prev) => prev - reward.cost);
			notify(`Successfully redeemed: ${reward.title}!`, "success");
		} else {
			notify("Not enough points to redeem this reward.", "error");
		}
	};

	if (loading) {
		return <div className="p-12 font-mono text-[13px] text-text-muted">Loading dashboard...</div>;
	}

	return (
		<div className="w-full bg-background min-h-[calc(100vh-56px)] p-8 md:p-12 fade-in-element text-text-primary">
			<div className="max-w-6xl mx-auto">
				<header className="mb-10">
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-4 flex items-center gap-2.5 before:content-[''] before:block before:w-4 before:h-px before:bg-brand">
						Participant Portal
					</div>
					<h1 className="font-serif text-[clamp(32px,3vw,48px)] font-bold mb-2">Welcome back, {user?.firstName || "Student"}</h1>
					<p className="text-text-muted text-[14px] font-light">Track your event participation, earn points, and redeem campus rewards.</p>
				</header>

				{/* Points Overview */}
				<section className="bg-surface-secondary border border-border p-8 rounded-[4px] mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h2 className="font-mono text-[12px] uppercase tracking-wider text-text-muted mb-2">Available Balance</h2>
						<div className="font-serif text-[48px] font-bold text-brand leading-none">
							{points} <span className="text-[20px] text-text-primary font-normal">pts</span>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="bg-background border border-border px-6 py-4 rounded-[4px] text-center">
							<div className="font-serif text-[24px] font-bold">{data?.attendedCount || 0}</div>
							<div className="font-mono text-[10px] uppercase text-text-muted mt-1">Events Attended</div>
						</div>
						<div className="bg-background border border-border px-6 py-4 rounded-[4px] text-center">
							<div className="font-serif text-[24px] font-bold">{data?.upcomingCount || 0}</div>
							<div className="font-mono text-[10px] uppercase text-text-muted mt-1">Upcoming</div>
						</div>
					</div>
				</section>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Earning History */}
					<section>
						<h3 className="font-serif text-[24px] font-bold mb-6 border-b border-border pb-4">Recent Activity</h3>
						<div className="flex flex-col gap-4">
							{!data?.activities?.length ? (
								<div className="text-[13px] text-text-muted">No recent activity found.</div>
							) : (
								data.activities.map((act) => (
									<div
										key={act.id}
										className="flex items-center justify-between p-4 bg-surface-secondary border border-border rounded-[2px] transition-colors hover:border-border-strong">
										<div>
											<div className="text-[13px] font-medium text-text-primary">
												<span className="capitalize">{act.action}</span>: {act.event}
											</div>
											<div className="text-[11px] text-text-muted mt-1">{act.date}</div>
										</div>
										<div className="font-mono text-[13px] text-[#16a34a] font-bold">+{act.points} pts</div>
									</div>
								))
							)}
						</div>
					</section>

					{/* Rewards Exchange */}
					<section>
						<h3 className="font-serif text-[24px] font-bold mb-6 border-b border-border pb-4">Rewards Exchange</h3>
						<div className="flex flex-col gap-4">
							{rewards.map((reward) => (
								<div
									key={reward.id}
									className="flex items-center justify-between p-4 bg-surface-secondary border border-border rounded-[2px] transition-colors hover:border-border-strong">
									<div>
										<div className="text-[13px] font-medium text-text-primary">{reward.title}</div>
										<div className="font-mono text-[11px] text-brand mt-1">{reward.cost} pts required</div>
									</div>
									<button
										onClick={() => handleRedeem(reward)}
										disabled={points < reward.cost}
										className="px-4 py-2 bg-background border border-brand text-brand font-mono text-[10px] uppercase tracking-wider rounded-[2px] hover:bg-brand hover:text-background transition-colors disabled:opacity-50 disabled:border-border disabled:text-text-muted disabled:hover:bg-background cursor-pointer">
										Redeem
									</button>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
