import React, { useState, useEffect } from "react";
import { GetEvents, UpdateEventStatus, DeleteEvent } from "~/api/events";

export default function EventsTab() {
	const [filter, setFilter] = useState("all");
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
		} else {
			alert(res.message || "Failed to update event status");
		}
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this event?")) {
			const res = await DeleteEvent(id);
			if (res.success) {
				setEvents(events.filter((e) => e.id !== id));
			} else {
				alert(res.message || "Failed to delete event");
			}
		}
	};

	const filteredEvents = filter === "all" ? events : events.filter((e) => e.status === filter);

	return (
		<div className="fade-in-element">
			<div className="flex gap-4 mb-6">
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
						) : filteredEvents.length > 0 ? (
							filteredEvents.map((event) => (
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
										<button className="text-text-primary hover:text-brand transition-colors cursor-pointer bg-transparent border-none">
											View
										</button>
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
										<button className="text-text-primary hover:text-brand transition-colors cursor-pointer bg-transparent border-none">
											Edit
										</button>
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
