import { useState, useEffect, useRef } from "react";
import { GetParticipants, UpdateParticipantStatus, GetEvents } from "~/api/events";
import type { Participant, Event } from "~/types/events";
import { notify } from "~/components/Notification";

export default function ParticipantManagement() {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedEventId, setSelectedEventId] = useState<number | "">("");
	const [participants, setParticipants] = useState<Participant[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sortField, setSortField] = useState("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const [eventSearchTerm, setEventSearchTerm] = useState("");
	const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
	const eventDropdownRef = useRef<HTMLDivElement>(null);

	const selectedEvent = events.find((e) => e.id === selectedEventId);
	const isEventInactive = selectedEvent && ["completed", "cancelled", "archived", "rejected"].includes(selectedEvent.status);

	// Fetch events on mount to populate the dropdown
	useEffect(() => {
		const fetchEvents = async () => {
			const response = await GetEvents({ limit: 100 });
			if (response.success) setEvents(response.data || []);
		};
		fetchEvents();
	}, []);

	// Debounce the search input to avoid spamming the backend
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	// Click outside handler for custom dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
				setIsEventDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Sync search term with selected event when dropdown closes
	useEffect(() => {
		if (!isEventDropdownOpen) {
			if (selectedEventId !== "") {
				const ev = events.find((e) => e.id === selectedEventId);
				if (ev) {
					setEventSearchTerm(`${ev.title} ${ev.eventStartDate ? `(${new Date(ev.eventStartDate).toLocaleDateString()})` : ""}`);
				}
			} else {
				setEventSearchTerm("");
			}
		}
	}, [isEventDropdownOpen, selectedEventId, events]);

	const fetchParticipants = async () => {
		setLoading(true);
		setError(null);
		const response = await GetParticipants({
			eventId: selectedEventId === "" ? undefined : (selectedEventId as number),
			status: statusFilter,
			search: debouncedSearch,
		});
		if (response.success) {
			setParticipants(response.data || []);
		} else {
			setError(response.message || "Failed to load participants.");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchParticipants();
	}, [selectedEventId, statusFilter, debouncedSearch]);

	const handleStatusUpdate = async (eventId: number, email: string, status: string) => {
		const response = await UpdateParticipantStatus({ eventId, email, status });
		if (response.success) {
			fetchParticipants();
			notify(`Participant status updated to ${status}`, "success");
		} else {
			notify(response.message || "Failed to update status", "error");
		}
	};

	const sortedParticipants = [...participants].sort((a, b) => {
		const aValue = (a[sortField as keyof typeof a] || "").toString().toLowerCase();
		const bValue = (b[sortField as keyof typeof b] || "").toString().toLowerCase();
		if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
		if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	return (
		<div className="p-8 md:p-12">
			<div className="flex flex-col gap-2 mb-8">
				<h1 className="font-serif text-[32px] font-bold text-text-primary">Participant Management</h1>
				<p className="text-[14px] text-text-muted font-light">View and manage event registrations and participation status.</p>
			</div>

			{/* Filters & Search */}
			<div className="flex flex-col sm:flex-row gap-4 mb-6 bg-surface-secondary p-5 rounded-[4px] border border-border">
				<div className="flex-1 flex flex-col gap-2" ref={eventDropdownRef}>
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Filter by Event</label>
					<div className="relative">
						<input
							type="text"
							placeholder="All Events"
							value={eventSearchTerm}
							onChange={(e) => {
								setEventSearchTerm(e.target.value);
								setIsEventDropdownOpen(true);
								if (e.target.value === "") setSelectedEventId("");
							}}
							onFocus={() => setIsEventDropdownOpen(true)}
							className="bg-background border border-border-strong pl-3 pr-8 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors w-full"
						/>
						{selectedEventId !== "" && (
							<button
								type="button"
								onClick={() => {
									setSelectedEventId("");
									setEventSearchTerm("");
									setIsEventDropdownOpen(true);
								}}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer font-medium">
								✕
							</button>
						)}
						{isEventDropdownOpen && (
							<div className="absolute z-50 w-full mt-1 bg-background border border-border-strong rounded-[2px] shadow-dropdown max-h-60 overflow-y-auto">
								{events.filter((ev) => ev.title.toLowerCase().includes(eventSearchTerm.toLowerCase())).length === 0 ? (
									<div className="px-3 py-2.5 text-[13px] text-text-muted">No events found.</div>
								) : (
									events
										.filter((ev) => ev.title.toLowerCase().includes(eventSearchTerm.toLowerCase()))
										.map((ev) => (
											<div
												key={ev.id}
												onClick={() => {
													setSelectedEventId(ev.id);
													setIsEventDropdownOpen(false);
												}}
												className={`px-3 py-2.5 text-[13px] cursor-pointer transition-colors ${
													selectedEventId === ev.id
														? "bg-brand/10 text-brand font-medium"
														: "text-text-primary hover:bg-surface-secondary"
												}`}>
												{ev.title}
												{ev.eventStartDate && (
													<span className="text-text-muted ml-1 font-normal">
														({new Date(ev.eventStartDate).toLocaleDateString()})
													</span>
												)}
											</div>
										))
								)}
							</div>
						)}
					</div>
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Search Participants</label>
					<input
						type="text"
						placeholder="Search by name or email..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors w-full"
					/>
				</div>
				<div className="sm:w-48 flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Filter Status</label>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors w-full cursor-pointer">
						<option value="">All Statuses</option>
						<option value="registered">Registered</option>
						<option value="attended">Attended</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>
				<div className="sm:w-48 flex flex-col gap-2">
					<label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted">Sort By</label>
					<div className="flex gap-2">
						<select
							value={sortField}
							onChange={(e) => setSortField(e.target.value)}
							className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors flex-1 cursor-pointer">
							<option value="name">Name</option>
							<option value="email">Email</option>
							<option value="status">Status</option>
						</select>
						<button
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
							className="bg-background border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors cursor-pointer hover:bg-surface-secondary">
							{sortOrder === "asc" ? "↑" : "↓"}
						</button>
					</div>
				</div>
			</div>

			{error && <div className="bg-danger-bg text-danger-text px-4 py-3 rounded-[2px] text-[13px] font-medium mb-6">{error}</div>}

			{!loading && (
				<div className="font-mono text-[11px] text-text-muted tracking-[0.08em] mb-4 uppercase">Total records: {participants.length}</div>
			)}

			<div className="bg-surface-secondary border border-border rounded-[4px] overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse min-w-[800px]">
						<thead>
							<tr className="bg-surface-primary border-b border-border">
								<th className="px-6 py-4 font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted font-medium">
									Participant
								</th>
								<th className="px-6 py-4 font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted font-medium">Event</th>
								<th className="px-6 py-4 font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted font-medium">Points</th>
								<th className="px-6 py-4 font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted font-medium">Status</th>
								{!isEventInactive && (
									<th className="px-6 py-4 font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted font-medium text-right">
										Actions
									</th>
								)}
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{loading ? (
								<tr>
									<td colSpan={isEventInactive ? 4 : 5} className="px-6 py-8 text-center text-[13px] text-text-muted font-medium">
										Loading participants...
									</td>
								</tr>
							) : participants.length === 0 ? (
								<tr>
									<td colSpan={isEventInactive ? 4 : 5} className="px-6 py-8 text-center text-[13px] text-text-muted font-medium">
										No participants found matching your criteria.
									</td>
								</tr>
							) : (
								sortedParticipants.map((p, idx) => (
									<tr key={`${p.eventId}-${p.email}-${idx}`} className="hover:bg-white/5 transition-colors group">
										<td className="px-6 py-4">
											<div className="text-[14px] text-text-primary font-medium">{p.name || "N/A"}</div>
											<div className="text-[13px] text-text-muted mt-0.5">{p.email}</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-[14px] text-text-primary line-clamp-1">{p.eventTitle || `Event #${p.eventId}`}</div>
											<div className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-[0.05em]">
												ID: {p.eventId}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="font-mono text-[13px] text-brand font-medium">
												{p.points !== undefined ? p.points : 0} pts
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-block px-2.5 py-1 rounded-[2px] font-mono text-[9px] tracking-[0.1em] uppercase ${
													p.status === "attended"
														? "bg-success-bg text-success-text"
														: p.status === "registered"
															? "bg-info-bg text-info-text"
															: p.status === "cancelled"
																? "bg-danger-bg text-danger-text"
																: "bg-warning-bg text-warning-text"
												}`}>
												{p.status}
											</span>
										</td>
										{!isEventInactive && (
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													{p.status !== "attended" && (
														<button
															onClick={() => handleStatusUpdate(p.eventId, p.email, "attended")}
															className="px-3 py-1.5 bg-success-bg text-success-text hover:bg-success hover:text-background rounded-[2px] text-[11px] font-medium tracking-[0.05em] uppercase transition-colors cursor-pointer border-none">
															Attended
														</button>
													)}
													{p.status !== "cancelled" && (
														<button
															onClick={() => handleStatusUpdate(p.eventId, p.email, "cancelled")}
															className="px-3 py-1.5 bg-danger-bg text-danger-text hover:bg-danger hover:text-background rounded-[2px] text-[11px] font-medium tracking-[0.05em] uppercase transition-colors cursor-pointer border-none">
															Cancel
														</button>
													)}
												</div>
											</td>
										)}
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
