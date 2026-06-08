import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ClockIcon, CalendarIcon, BriefcaseIcon, UsersIcon } from "~/components/Icons";
import { GetEvents } from "~/api/events";
import { GetOrganizers } from "~/api/user";
import { routeLinks } from "~/constants";

export default function AdminDashboardPage() {
	const [statsData, setStatsData] = useState({
		totalEvents: "0",
		totalOrganizers: "0",
		totalParticipants: "0",
		pendingApprovals: "0",
	});
	const [recentEvents, setRecentEvents] = useState<any[]>([]);
	const [recentOrganizers, setRecentOrganizers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const [eventsRes, pendingRes, orgsRes] = await Promise.all([GetEvents(), GetEvents({ status: "pending" }), GetOrganizers()]);

				let totalParticipants = 0;
				let totalEvents = 0;

				if (eventsRes.success && eventsRes.data) {
					totalEvents = eventsRes.total || eventsRes.data.length;
					totalParticipants = eventsRes.data.reduce((sum: number, event: any) => sum + (Number(event.currentParticipants) || 0), 0);
				}

				setStatsData({
					totalEvents: totalEvents.toString(),
					totalOrganizers: orgsRes.success && orgsRes.data ? orgsRes.data.length.toString() : "0",
					totalParticipants: totalParticipants.toLocaleString(),
					pendingApprovals: pendingRes.success ? (pendingRes.total || pendingRes.data.length).toString() : "0",
				});

				if (pendingRes.success && pendingRes.data) {
					setRecentEvents([...pendingRes.data].reverse().slice(0, 4));
				}

				if (orgsRes.success && orgsRes.data) {
					const reversedOrgs = [...orgsRes.data].reverse();
					const pendingOrgs = reversedOrgs.filter(
						(org: any) => org.status?.toLowerCase() === "pending" || org.is_approved === false || org.is_approved === 0,
					);
					setRecentOrganizers(pendingOrgs.length > 0 ? pendingOrgs.slice(0, 4) : reversedOrgs.slice(0, 4));
				}
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

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 fade-in-element">
				{/* Recent Event Approvals */}
				<div className="bg-surface-secondary border border-border rounded-[4px] overflow-hidden flex flex-col">
					<div className="p-6 border-b border-border flex items-center justify-between">
						<h2 className="font-serif text-[20px] font-bold text-text-primary">Recent Event Approvals</h2>
						<Link
							to={`${routeLinks.adminEventManagement}?tab=events`}
							className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted hover:text-brand transition-colors">
							View All
						</Link>
					</div>
					<div className="flex-1 p-6 flex flex-col gap-4">
						{loading ? (
							<p className="text-[13px] text-text-muted">Loading...</p>
						) : recentEvents.length === 0 ? (
							<p className="text-[13px] text-text-muted">No pending events found.</p>
						) : (
							recentEvents.map((event, i) => (
								<Link
									key={i}
									to={routeLinks.adminViewEvent.replace(":id", event.id.toString())}
									className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 group cursor-pointer no-underline">
									<div>
										<div className="text-[14px] text-text-primary font-medium group-hover:text-brand transition-colors">
											{event.title || `Event #${event.id}`}
										</div>
										<div className="text-[12px] text-text-muted mt-1">
											{event.eventStartDate ? new Date(event.eventStartDate).toLocaleDateString() : "Date TBA"}
										</div>
									</div>
									<span className="px-2.5 py-1 bg-warning-bg text-warning-text rounded-[2px] font-mono text-[9px] tracking-[0.1em] uppercase">
										Pending
									</span>
								</Link>
							))
						)}
					</div>
				</div>

				{/* Recent Organizer Approvals */}
				<div className="bg-surface-secondary border border-border rounded-[4px] overflow-hidden flex flex-col">
					<div className="p-6 border-b border-border flex items-center justify-between">
						<h2 className="font-serif text-[20px] font-bold text-text-primary">Recent Organizer Approvals</h2>
						<Link
							to={`${routeLinks.adminEventManagement}?tab=organizers`}
							className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted hover:text-brand transition-colors">
							View All
						</Link>
					</div>
					<div className="flex-1 p-6 flex flex-col gap-4">
						{loading ? (
							<p className="text-[13px] text-text-muted">Loading...</p>
						) : recentOrganizers.length === 0 ? (
							<p className="text-[13px] text-text-muted">No recent organizers found.</p>
						) : (
							recentOrganizers.map((org, i) => (
								<div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
									<div>
										<div className="text-[14px] text-text-primary font-medium">
											{org.name || org.username || "Unknown Organizer"}
										</div>
										<div className="text-[12px] text-text-muted mt-1">{org.email || "No email provided"}</div>
									</div>
									<span
										className={`px-2.5 py-1 rounded-[2px] font-mono text-[9px] tracking-[0.1em] uppercase ${
											org.status?.toLowerCase() === "pending" || org.is_approved === false || org.is_approved === 0
												? "bg-warning-bg text-warning-text"
												: "bg-info-bg text-info-text"
										}`}>
										{org.status?.toLowerCase() === "pending" || org.is_approved === false || org.is_approved === 0
											? "Pending"
											: "New"}
									</span>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
