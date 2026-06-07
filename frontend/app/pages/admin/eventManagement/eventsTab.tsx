import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { GetEvents, UpdateEventStatus, DeleteEvent } from "~/api/events";
import { routeLinks } from "~/constants";
import { notify } from "~/components/Notification";

export default function EventsTab() {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState("date");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			const res = await GetEvents();
			if (res.success && res.data) {
				setEvents(res.data);
			}
			setLoading(false);
		};
		fetchEvents();
	}, []);

	const handleAction = async (id: number, action: string) => {
		const res = await UpdateEventStatus(id, action);
		if (res.success) {
			setEvents(events.map((e) => (e.id === id ? { ...e, status: action } : e)));
			notify(`Event status updated to ${action}`, "success");
		} else {
			notify(res.message || "Failed to update event status", "error");
		}
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this event?")) {
			const res = await DeleteEvent(id);
			if (res.success) {
				setEvents(events.filter((e) => e.id !== id));
				notify("Event deleted successfully", "success");
			} else {
				notify(res.message || "Failed to delete event", "error");
			}
		}
	};

	const filteredEvents = events.filter((e) => {
		const matchesStatus = filter === "all" || e.status === filter;
		const searchLower = searchQuery.toLowerCase();
		const matchesSearch = !searchQuery || e.title?.toLowerCase().includes(searchLower) || e.department?.toLowerCase().includes(searchLower);

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
		<div className="fade-in-element">
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<input
					type="text"
					placeholder="Search by title or department..."
					className="bg-transparent border border-border p-2 font-mono text-[13px] text-text-primary outline-none focus:border-brand transition-colors flex-1"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="bg-transparent border border-border p-2 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}>
					<option value="all">All Events</option>
					<option value="pending">Pending</option>
					<option value="approved">Approved</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
					<option value="archived">Archived</option>
					<option value="rejected">Rejected</option>
				</select>
				<select
					className="bg-transparent border border-border p-2 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer"
					value={sortField}
					onChange={(e) => setSortField(e.target.value)}>
					<option value="title">Sort by Title</option>
					<option value="department">Sort by Dept</option>
					<option value="date">Sort by Date</option>
					<option value="status">Sort by Status</option>
				</select>
				<button
					onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
					className="bg-transparent border border-border p-2 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer hover:bg-surface-secondary">
					{sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
				</button>
			</div>

			<div className="border border-border bg-background">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-surface-secondary border-b border-border">
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Title</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Organizer / Dept</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Date</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Status</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={5} className="p-8 text-center text-[13px] text-text-muted font-light">
									Loading events...
								</td>
							</tr>
						) : sortedEvents.length > 0 ? (
							sortedEvents.map((event) => (
								<tr key={event.id} className="border-b border-border last:border-b-0 hover:bg-surface-secondary/30 transition-colors">
									<td className="p-4 text-[14px] font-medium text-text-primary">{event.title}</td>
									<td className="p-4 text-[13px] text-text-muted">{event.department || "Unknown"}</td>
									<td className="p-4 text-[13px] text-text-muted">
										{event.event_start_date ? event.event_start_date.split(" ")[0] : "TBA"}
									</td>
									<td className="p-4 text-sm">
										<span
											className={`px-2.5 py-1 rounded-[1px] font-mono text-[10px] tracking-[0.1em] uppercase ${
												event.status === "approved"
													? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
													: event.status === "pending"
														? "bg-[rgba(168,135,58,0.12)] text-warning"
														: event.status === "completed"
															? "bg-[rgba(100,100,100,0.1)] text-text-muted"
															: event.status === "cancelled" || event.status === "rejected"
																? "bg-[rgba(200,64,30,0.1)] text-brand"
																: "bg-surface-secondary text-text-muted"
											}`}>
											{event.status}
										</span>
									</td>
									<td className="p-4 text-[12px] flex gap-3 justify-end font-medium">
										<Link
											to={routeLinks.adminViewEvent.replace(":id", event.id.toString())}
											className="text-text-primary hover:text-brand transition-colors cursor-pointer bg-transparent border-none no-underline">
											View
										</Link>
										{event.status === "pending" && (
											<>
												<button
													onClick={() => handleAction(event.id, "approved")}
													className="text-[#3a7a3a] hover:underline cursor-pointer bg-transparent border-none">
													Approve
												</button>
												<button
													onClick={() => handleAction(event.id, "rejected")}
													className="text-brand hover:underline cursor-pointer bg-transparent border-none">
													Reject
												</button>
											</>
										)}
										{event.status === "completed" && (
											<button
												onClick={() => handleAction(event.id, "archived")}
												className="text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
												Archive
											</button>
										)}
										{event.status !== "completed" && event.status !== "cancelled" && event.status !== "archived" && (
											<button className="text-text-primary hover:text-brand transition-colors cursor-pointer bg-transparent border-none">
												Edit
											</button>
										)}
										<button
											onClick={() => handleDelete(event.id)}
											className="text-brand hover:underline transition-colors cursor-pointer bg-transparent border-none">
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="p-8 text-center text-[13px] text-text-muted font-light">
									No events found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
