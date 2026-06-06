import React, { useState, useEffect } from "react";
import { ClockIcon, CalendarIcon, BriefcaseIcon, UsersIcon } from "~/components/Icons";
import { GetEvents } from "~/api/events";
import { GetOrganizers } from "~/api/user";

export default function AdminDashboardPage() {
	const [statsData, setStatsData] = useState({
		totalEvents: "0",
		totalOrganizers: "0",
		totalParticipants: "0",
		pendingApprovals: "0",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const [eventsRes, pendingRes, orgsRes] = await Promise.all([GetEvents(), GetEvents({ status: "pending" }), GetOrganizers()]);

				let totalParticipants = 0;
				let totalEvents = 0;

				if (eventsRes.success && eventsRes.data) {
					totalEvents = eventsRes.total || eventsRes.data.length;
					totalParticipants = eventsRes.data.reduce((sum: number, event: any) => sum + (Number(event.current_participants) || 0), 0);
				}

				setStatsData({
					totalEvents: totalEvents.toString(),
					totalOrganizers: orgsRes.success && orgsRes.data ? orgsRes.data.length.toString() : "0",
					totalParticipants: totalParticipants.toLocaleString(),
					pendingApprovals: pendingRes.success ? (pendingRes.total || pendingRes.data.length).toString() : "0",
				});
			} catch (error) {
				console.error("Error fetching dashboard stats:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	const stats = [
		{ title: "Total Events", value: loading ? "..." : statsData.totalEvents, icon: <CalendarIcon /> },
		{ title: "Total Organizers", value: loading ? "..." : statsData.totalOrganizers, icon: <BriefcaseIcon /> },
		{ title: "Total Participants", value: loading ? "..." : statsData.totalParticipants, icon: <UsersIcon /> },
		{ title: "Pending Approvals", value: loading ? "..." : statsData.pendingApprovals, icon: <ClockIcon />, highlight: true },
	];

	return (
		<div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
			<div className="mb-10 fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-3 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					Overview
				</div>
				<h1 className="font-serif text-[36px] font-bold leading-none text-text-primary">Dashboard</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border fade-in-element">
				{stats.map((stat, index) => (
					<div
						key={index}
						className={`p-8 flex flex-col gap-2 transition-colors hover:bg-surface-secondary ${
							stat.highlight ? "bg-[rgba(200,64,30,0.04)]" : "bg-background"
						}`}>
						<div className="flex items-center justify-between mb-4">
							<div
								className={`w-10 h-10 rounded-[2px] flex items-center justify-center ${stat.highlight ? "bg-brand text-background" : "bg-primary-100 text-brand"}`}>
								{stat.icon}
							</div>
						</div>
						<div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1">{stat.title}</div>
						<div className="font-serif text-[32px] font-bold text-text-primary leading-none">{stat.value}</div>
					</div>
				))}
			</div>
		</div>
	);
}
