import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ClockIcon, CalendarIcon, BriefcaseIcon, UsersIcon } from "~/components/Icons";
import { GetEvents } from "~/api/events";
import { routeLinks } from "~/constants";
import { useAuth } from "~/contexts/auth/AuthContext";
import type { Event } from "~/types/events";

export default function Dashboard() {
	const { user } = useAuth();
	const [statsData, setStatsData] = useState({
		totalEvents: "0",
		totalParticipants: "0",
		upcomingEvents: "0",
		pendingApprovals: "0",
	});
	const [recentEvents, setRecentEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user?.id) return;

		const fetchStats = async () => {
			try {
				const eventsRes = await GetEvents({ organizerId: user.id });

				let totalParticipants = 0;
				let totalEvents = 0;
				let upcomingEventsCount = 0;
				let pendingApprovalsCount = 0;

				if (eventsRes.success && eventsRes.events) {
					totalEvents = eventsRes.total || eventsRes.events.length;
					const now = new Date();
					// Resetting time to midnight for today's comparison
					now.setHours(0, 0, 0, 0);

					eventsRes.events.forEach((event: Event) => {
						totalParticipants += Number(event.currentParticipants) || 0;
						if (event.status === "pending") {
							pendingApprovalsCount++;
						}

						if (event.eventStartDate) {
							const eventDate = new Date(event.eventStartDate);
							if (eventDate >= now && ["approved", "ongoing"].includes(event.status)) {
								upcomingEventsCount++;
							}
						}
					});

					setRecentEvents([...eventsRes.events].reverse().slice(0, 5));
				}

				setStatsData({
					totalEvents: totalEvents.toString(),
					totalParticipants: totalParticipants.toLocaleString(),
					upcomingEvents: upcomingEventsCount.toString(),
					pendingApprovals: pendingApprovalsCount.toString(),
				});
			} catch (error) {
				console.error("Error fetching dashboard stats:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, [user]);

	const stats = [
		{ title: "My Events", value: loading ? "..." : statsData.totalEvents, icon: <CalendarIcon /> },
		{ title: "Total Participants", value: loading ? "..." : statsData.totalParticipants, icon: <UsersIcon /> },
		{ title: "Upcoming Events", value: loading ? "..." : statsData.upcomingEvents, icon: <BriefcaseIcon /> },
		{ title: "Pending Approvals", value: loading ? "..." : statsData.pendingApprovals, icon: <ClockIcon />, highlight: true },
	];

	return (
		<div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
			<div className="mb-10 fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-3 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
					Overview
				</div>
				<h1 className="font-serif text-[36px] font-bold leading-none text-text-primary">Organizer Dashboard</h1>
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

			<div className="mt-10 fade-in-element">
				<div className="bg-surface-secondary border border-border rounded-[4px] overflow-hidden flex flex-col">
					<div className="p-6 border-b border-border flex items-center justify-between">
						<h2 className="font-serif text-[20px] font-bold text-text-primary">Recent Events</h2>
						<Link
							to={routeLinks.organizerEventManagement || "/organizers/events"}
							className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted hover:text-brand transition-colors">
							View All
						</Link>
					</div>
					<div className="flex-1 p-6 flex flex-col gap-4">
						{loading ? (
							<p className="text-[13px] text-text-muted">Loading...</p>
						) : recentEvents.length === 0 ? (
							<p className="text-[13px] text-text-muted">No events found. Start by creating an event!</p>
						) : (
							recentEvents.map((event, i) => (
								<Link
									key={i}
									to={
										routeLinks.organizerViewEvent
											? routeLinks.organizerViewEvent.replace(":id", event.id.toString())
											: `/organizers/events/${event.id}`
									}
									className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 group cursor-pointer no-underline">
									<div>
										<div className="text-[14px] text-text-primary font-medium group-hover:text-brand transition-colors">
											{event.title || `Event #${event.id}`}
										</div>
										<div className="text-[12px] text-text-muted mt-1">
											{event.eventStartDate ? new Date(event.eventStartDate).toLocaleDateString() : "Date TBA"}
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="hidden sm:flex flex-col items-end">
											<span className="text-[12px] text-text-muted">Participants</span>
											<span className="text-[13px] font-medium text-text-primary">
												{event.currentParticipants} {event.maxParticipants ? `/ ${event.maxParticipants}` : ""}
											</span>
										</div>
										<span
											className={`px-2.5 py-1 rounded-[2px] font-mono text-[9px] tracking-[0.1em] uppercase ${
												event.status === "pending"
													? "bg-warning-bg text-warning-text"
													: event.status === "approved"
														? "bg-success-bg text-success-text"
														: event.status === "rejected" || event.status === "cancelled"
															? "bg-danger-bg text-danger-text"
															: "bg-info-bg text-info-text"
											}`}>
											{event.status}
										</span>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
