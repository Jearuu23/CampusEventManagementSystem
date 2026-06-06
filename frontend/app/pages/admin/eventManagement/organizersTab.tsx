import React, { useState, useEffect } from "react";
import { GetOrganizers, UpdateOrganizerStatus } from "~/api/user";

export default function OrganizersTab() {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [organizers, setOrganizers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrganizers = async () => {
			setLoading(true);
			const res = await GetOrganizers();
			if (res.success && res.data) {
				setOrganizers(res.data);
			}
			setLoading(false);
		};
		fetchOrganizers();
	}, []);

	const handleAction = async (id: number, action: string) => {
		const res = await UpdateOrganizerStatus(id, action);
		if (res.success) {
			setOrganizers(organizers.map((o) => (o.id === id ? { ...o, status: action } : o)));
		} else {
			alert(res.message || "Failed to update organizer status");
		}
	};

	const filteredOrganizers = organizers.filter((o) => {
		const matchesStatus = filter === "all" || o.status === filter;
		const searchLower = searchQuery.toLowerCase();
		const matchesSearch =
			!searchQuery ||
			o.name?.toLowerCase().includes(searchLower) ||
			o.org?.toLowerCase().includes(searchLower) ||
			o.email?.toLowerCase().includes(searchLower);

		return matchesStatus && matchesSearch;
	});

	return (
		<div className="fade-in-element">
			<div className="flex flex-col sm:flex-row gap-4 mb-4">
				<input
					type="text"
					placeholder="Search by name, organization, or email..."
					className="bg-transparent border border-border p-2 font-mono text-[13px] text-text-primary outline-none focus:border-brand transition-colors flex-1"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="bg-transparent border border-border p-2 font-mono text-xs uppercase text-text-primary outline-none focus:border-brand transition-colors cursor-pointer"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}>
					<option value="all">All Organizers</option>
					<option value="pending">Pending</option>
					<option value="approved">Approved</option>
					<option value="rejected">Rejected</option>
				</select>
			</div>

			<div className="font-mono text-[11px] text-text-muted tracking-[0.08em] mb-4 uppercase">
				Total organizers: {filteredOrganizers.length}
			</div>

			<div className="border border-border bg-background overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-surface-secondary border-b border-border">
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Name</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Organization</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Email</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">Status</th>
							<th className="p-4 font-mono text-[10px] uppercase tracking-wider text-text-muted text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={5} className="p-8 text-center text-[13px] text-text-muted font-light">
									Loading organizers...
								</td>
							</tr>
						) : filteredOrganizers.length > 0 ? (
							filteredOrganizers.map((org) => (
								<tr key={org.id} className="border-b border-border last:border-b-0 hover:bg-surface-secondary/30 transition-colors">
									<td className="p-4 text-[14px] font-medium text-text-primary">{org.name}</td>
									<td className="p-4 text-[13px] text-text-muted">{org.org}</td>
									<td className="p-4 text-[13px] text-text-muted">{org.email}</td>
									<td className="p-4 text-sm">
										<span
											className={`px-2.5 py-1 rounded-[1px] font-mono text-[10px] tracking-[0.1em] uppercase ${
												org.status === "approved"
													? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
													: org.status === "pending"
														? "bg-[rgba(168,135,58,0.12)] text-warning"
														: "bg-[rgba(200,64,30,0.1)] text-brand"
											}`}>
											{org.status}
										</span>
									</td>
									<td className="p-4 text-[12px] flex gap-3 justify-end font-medium">
										{org.status === "pending" && (
											<>
												<button
													onClick={() => handleAction(org.id, "approved")}
													className="text-[#3a7a3a] hover:underline cursor-pointer bg-transparent border-none">
													Approve
												</button>
												<button
													onClick={() => handleAction(org.id, "rejected")}
													className="text-brand hover:underline cursor-pointer bg-transparent border-none">
													Reject
												</button>
											</>
										)}
										<button className="text-text-primary hover:text-brand transition-colors cursor-pointer bg-transparent border-none">
											Manage
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="p-8 text-center text-[13px] text-text-muted font-light">
									No organizers found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
