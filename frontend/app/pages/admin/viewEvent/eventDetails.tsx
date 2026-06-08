import React from "react";

export default function EventDetails({ event, participants }: { event: any; participants: any[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
			<div className="flex flex-col gap-8">
				<section>
					<h3 className="font-mono text-[11px] uppercase text-text-muted mb-4 tracking-[0.15em]">Description</h3>
					<p className="text-[14px] text-text-primary leading-[1.8] font-light whitespace-pre-wrap">
						{event.description || "No description provided for this event."}
					</p>
				</section>

				<section className="mt-4 border-t border-border pt-8">
					<div className="flex items-center justify-between mb-6">
						<h3 className="font-mono text-[11px] uppercase text-text-muted tracking-[0.15em]">
							Participants ({participants?.length || 0}
							{event.maxParticipants ? ` / ${event.maxParticipants}` : ""})
						</h3>
					</div>

					{participants && participants.length > 0 ? (
						<div className="bg-surface-secondary/20 border border-border rounded-[2px] overflow-hidden">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="border-b border-border bg-surface-secondary/50">
										<th className="p-4 font-mono text-[10px] uppercase text-text-muted/70 tracking-wider font-normal">Name</th>
										<th className="p-4 font-mono text-[10px] uppercase text-text-muted/70 tracking-wider font-normal">Email</th>
										<th className="p-4 font-mono text-[10px] uppercase text-text-muted/70 tracking-wider font-normal">Status</th>
									</tr>
								</thead>
								<tbody>
									{participants.map((p, i) => (
										<tr key={i} className="border-b border-border last:border-0 hover:bg-surface-secondary/30 transition-colors">
											<td className="p-4 text-[13px] text-text-primary font-medium">
												{p.name || [p.firstName, p.lastName].filter(Boolean).join(" ") || "Unknown"}
											</td>
											<td className="p-4 text-[13px] text-text-muted">{p.email}</td>
											<td className="p-4">
												<span
													className={`px-2 py-1 rounded-[1px] font-mono text-[9px] uppercase tracking-wider ${
														p.status?.toLowerCase() === "registered" ||
														p.status?.toLowerCase() === "attending" ||
														p.status?.toLowerCase() === "approved"
															? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
															: "bg-surface-secondary text-text-muted"
													}`}>
													{p.status || "Registered"}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="bg-surface-secondary/20 border border-border p-8 rounded-[2px] text-center">
							<p className="text-[13px] text-text-muted font-light">No participants have registered for this event yet.</p>
						</div>
					)}
				</section>
			</div>

			<div className="flex flex-col gap-6">
				<div className="bg-surface-secondary/20 border border-border p-6 rounded-[2px]">
					<h3 className="font-mono text-[11px] uppercase text-text-muted mb-5 tracking-[0.15em]">Event Information</h3>
					<ul className="space-y-4">
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Location</span>
							<span className="text-[13px] text-text-primary font-medium">{event.location || "TBA"}</span>
						</li>
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Capacity</span>
							<span className="text-[13px] text-text-primary font-medium">
								{event.maxParticipants || event.capacity || "Unlimited"}
							</span>
						</li>
						<li>
							<span className="block font-mono text-[10px] text-text-muted/70 uppercase tracking-wider mb-1">Organizer</span>
							<span className="text-[13px] text-text-primary font-medium">{event.organizerName || event.department || "Unknown"}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
