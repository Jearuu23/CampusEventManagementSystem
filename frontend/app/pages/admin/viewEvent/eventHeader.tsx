import React, { useState } from "react";
import { UpdateEventStatus } from "~/api/events";
import { notify } from "~/components/Notification";

export default function EventHeader({
	event,
	setEvent,
	isEditing,
	setIsEditing,
}: {
	event: any;
	setEvent: (e: any) => void;
	isEditing: boolean;
	setIsEditing: (val: boolean) => void;
}) {
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateStatus = async (status: string) => {
		setIsUpdating(true);
		const res = await UpdateEventStatus(event.id, status);
		if (res.success) {
			setEvent({ ...event, status });
			notify(`Event status updated to ${status}`, "success");
		} else {
			notify(res.message || "Failed to update event status.", "error");
		}
		setIsUpdating(false);
	};

	return (
		<div className="mb-10 border-b border-border pb-8">
			<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
				{event.department || "General"} Event
			</div>
			<h1 className="font-serif text-[32px] md:text-[40px] font-bold text-text-primary leading-[1.1] mb-5">{event.title}</h1>
			<div className="flex flex-wrap gap-4 items-center">
				<span
					className={`px-2.5 py-1 rounded-[1px] font-mono text-[10px] tracking-[0.1em] uppercase ${
						event.status === "approved"
							? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
							: event.status === "pending"
								? "bg-[rgba(168,135,58,0.12)] text-warning"
								: event.status === "cancelled" || event.status === "rejected"
									? "bg-[rgba(200,64,30,0.1)] text-brand"
									: "bg-surface-secondary text-text-muted"
					}`}>
					{event.status || "Unknown Status"}
				</span>
				<span className="font-mono text-[12px] text-text-muted flex items-center gap-2">
					<span className="w-1 h-1 rounded-full bg-border"></span>
					{event.eventStartDate ? new Date(event.eventStartDate).toLocaleString() : "Date TBA"}
				</span>
			</div>

			<div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
				{event.status === "pending" && (
					<>
						<button
							onClick={() => handleUpdateStatus("approved")}
							disabled={isUpdating}
							className="px-5 py-2.5 bg-brand text-background font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors disabled:opacity-50 cursor-pointer">
							Approve
						</button>
						<button
							onClick={() => handleUpdateStatus("rejected")}
							disabled={isUpdating}
							className="px-5 py-2.5 border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-surface-secondary transition-colors disabled:opacity-50 cursor-pointer">
							Reject
						</button>
					</>
				)}
				{event.status === "approved" && (
					<button
						onClick={() => handleUpdateStatus("cancelled")}
						disabled={isUpdating}
						className="px-5 py-2.5 border border-brand/30 text-brand font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-[rgba(200,64,30,0.05)] transition-colors disabled:opacity-50 cursor-pointer">
						Cancel Event
					</button>
				)}
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="px-5 py-2.5 border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-surface-secondary transition-colors cursor-pointer ml-auto">
					{isEditing ? "Cancel Edit" : "Edit Details"}
				</button>
			</div>
		</div>
	);
}
