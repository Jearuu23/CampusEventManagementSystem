import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { GetEvents } from "~/api/events";
import { useAuth } from "~/contexts/auth/AuthContext";
import { routeLinks } from "~/constants";
import ModalCreateEvent from "./modalCreateEvent";
import type { Event } from "~/types/events";

export default function EventManagement() {
	const { user } = useAuth();
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortField, setSortField] = useState("date");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	const fetchEvents = useCallback(async () => {
		if (!user?.id) return;
		setLoading(true);
		try {
			const res = await GetEvents({ organizer_id: user.id });
			if (res.success && res.data) {
				setEvents(res.data);
			}
		} catch (error) {
			console.error("Failed to fetch events:", error);
		} finally {
			setLoading(false);
		}
	}, [user?.id]);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const filteredEvents = events.filter((e) => {
		const matchesStatus = statusFilter === "all" || e.status === statusFilter;
		const matchesSearch = !searchQuery || e.title?.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const sortedEvents = [...filteredEvents].sort((a, b) => {
		let aValue = a[sortField as keyof typeof a] || "";
		let bValue = b[sortField as keyof typeof b] || "";

		if (sortField === "date") {
			aValue = a.event_start_date ? new Date(a.event_start_date).getTime() : 0;
			bValue = b.event_start_date ? new Date(b.event_start_date).getTime() : 0;
		}

		if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
		if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	return (
		<div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 fade-in-element">
				<div>
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-3 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-px before:bg-brand">
						Event Management
					</div>
					<h1 className="font-serif text-[36px] font-bold leading-none text-text-primary">My Events</h1>
				</div>
				<button
					onClick={() => setIsCreateModalOpen(true)}
					className="bg-brand text-background px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors no-underline rounded-[2px] cursor-pointer border-none">
					Create Event
				</button>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 mb-6 fade-in-element">
				<input
					type="text"
					placeholder="Search by title..."
					className="bg-surface-secondary border border-border px-4 py-2.5 font-mono text-[13px] text-text-primary outline-none focus:border-brand transition-colors flex-1 rounded-[2px]"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="bg-surface-secondary border border-border px-4 py-2.5 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer rounded-[2px]"
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}>
					<option value="all">All Events</option>
					<option value="pending">Pending</option>
					<option value="approved">Approved</option>
					<option value="ongoing">Ongoing</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
					<option value="rejected">Rejected</option>
				</select>
				<select
					className="bg-surface-secondary border border-border px-4 py-2.5 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer rounded-[2px]"
					value={sortField}
					onChange={(e) => setSortField(e.target.value)}>
					<option value="title">Sort by Title</option>
					<option value="date">Sort by Date</option>
					<option value="status">Sort by Status</option>
				</select>
				<button
					onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
					className="bg-surface-secondary border border-border px-4 py-2.5 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer hover:bg-white/5 rounded-[2px]">
					{sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
				</button>
			</div>

			<div className="bg-surface-secondary border border-border rounded-[4px] overflow-hidden fade-in-element">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="border-b border-border bg-background/50">
								<th className="p-4 font-mono text-[10px] uppercase text-text-muted tracking-wider">Title</th>
								<th className="p-4 font-mono text-[10px] uppercase text-text-muted tracking-wider">Date</th>
								<th className="p-4 font-mono text-[10px] uppercase text-text-muted tracking-wider">Participants</th>
								<th className="p-4 font-mono text-[10px] uppercase text-text-muted tracking-wider">Status</th>
								<th className="p-4 font-mono text-[10px] uppercase text-text-muted tracking-wider text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={5} className="p-6 text-center text-[13px] text-text-muted">
										Loading events...
									</td>
								</tr>
							) : events.length === 0 ? (
								<tr>
									<td colSpan={5} className="p-6 text-center text-[13px] text-text-muted">
										No events found. Start by creating a new event!
									</td>
								</tr>
							) : sortedEvents.length === 0 ? (
								<tr>
									<td colSpan={5} className="p-6 text-center text-[13px] text-text-muted">
										No events found matching your search criteria.
									</td>
								</tr>
							) : (
								sortedEvents.map((event) => (
									<tr key={event.id} className="border-b border-border last:border-0 hover:bg-white/5 transition-colors group">
										<td className="p-4 text-[14px] text-text-primary font-medium">{event.title}</td>
										<td className="p-4 text-[13px] text-text-muted">
											{event.event_start_date ? new Date(event.event_start_date).toLocaleDateString() : "TBA"}
										</td>
										<td className="p-4 text-[13px] text-text-muted">
											{event.current_participants || 0} {event.max_participants ? `/ ${event.max_participants}` : ""}
										</td>
										<td className="p-4">
											<span
												className={`px-2.5 py-1 rounded-[2px] font-mono text-[9px] tracking-[0.1em] uppercase ${
													event.status === "pending"
														? "bg-warning-bg text-warning-text"
														: event.status === "approved" || event.status === "ongoing" || event.status === "completed"
															? "bg-success-bg text-success-text"
															: event.status === "rejected" || event.status === "cancelled"
																? "bg-danger-bg text-danger-text"
																: "bg-info-bg text-info-text"
												}`}>
												{event.status}
											</span>
										</td>
										<td className="p-4 text-right">
											<Link
												to={
													routeLinks.organizerViewEvent
														? routeLinks.organizerViewEvent.replace(":id", event.id.toString())
														: `/organizers/events/${event.id}`
												}
												className="font-mono text-[10px] uppercase tracking-wider text-brand hover:underline">
												Manage
											</Link>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			<ModalCreateEvent
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSuccess={() => {
					setIsCreateModalOpen(false);
					fetchEvents();
				}}
			/>
		</div>
	);
}
