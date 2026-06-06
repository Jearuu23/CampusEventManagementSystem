import React, { useState } from "react";

interface FilterBarProps {
	viewMode: "list" | "grid";
	setViewMode: (view: "list" | "grid") => void;
}

export default function FilterBar({ viewMode, setViewMode }: FilterBarProps) {
	const tabs = ["All Events", "Lectures", "Workshops", "Exhibitions", "Seminars", "Social", "Sports", "Arts & Culture"];
	const [active, setActive] = useState("All Events");

	return (
		<div className="bg-surface-secondary border-b border-border px-8 md:px-20 flex flex-col md:flex-row md:items-center gap-0 sticky top-14 z-[90]">
			<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted py-4 md:py-[18px] pr-6 border-r border-border whitespace-nowrap shrink-0">
				Filter by
			</div>
			<div className="flex items-center flex-1 overflow-x-auto no-scrollbar">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActive(tab)}
						className={`font-mono text-[11px] tracking-[0.1em] uppercase py-4 md:py-[18px] px-6 border-none cursor-pointer transition-colors border-r border-border whitespace-nowrap ${
							active === tab
								? "text-brand bg-[rgba(200,64,30,0.06)]"
								: "text-text-muted bg-transparent hover:text-text-primary hover:bg-black/5"
						}`}>
						{tab}
					</button>
				))}
			</div>
			<div className="flex items-center gap-4 py-3 md:py-0 md:ml-auto md:pl-6 md:border-l border-border justify-between md:justify-end border-t md:border-t-0 w-full md:w-auto shrink-0">
				<input
					type="text"
					placeholder="Search events..."
					className="bg-transparent border-b border-border-strong py-1 px-2 font-mono text-[11px] text-text-primary tracking-[0.08em] w-[180px] outline-none transition-colors focus:border-brand placeholder:text-text-muted"
				/>
				<div className="flex border border-border-strong rounded-[2px] overflow-hidden shrink-0">
					<button
						onClick={() => setViewMode("list")}
						className={`p-2 cursor-pointer transition-colors flex items-center justify-center ${viewMode === "list" ? "bg-text-primary text-background" : "bg-transparent text-text-muted hover:bg-black/5"}`}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="8" y1="6" x2="21" y2="6" />
							<line x1="8" y1="12" x2="21" y2="12" />
							<line x1="8" y1="18" x2="21" y2="18" />
							<line x1="3" y1="6" x2="3.01" y2="6" />
							<line x1="3" y1="12" x2="3.01" y2="12" />
							<line x1="3" y1="18" x2="3.01" y2="18" />
						</svg>
					</button>
					<button
						onClick={() => setViewMode("grid")}
						className={`p-2 cursor-pointer transition-colors flex items-center justify-center ${viewMode === "grid" ? "bg-text-primary text-background" : "bg-transparent text-text-muted hover:bg-black/5"}`}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<rect x="3" y="3" width="7" height="7" />
							<rect x="14" y="3" width="7" height="7" />
							<rect x="3" y="14" width="7" height="7" />
							<rect x="14" y="14" width="7" height="7" />
						</svg>
					</button>
				</div>
				<select className="font-mono text-[11px] text-text-primary bg-transparent border border-border-strong py-2 px-3 pr-7 rounded-[2px] cursor-pointer tracking-[0.06em] uppercase outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201l4%204%204-4%22%20stroke%3D%22%237a7469%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center]">
					<option>Date: Soonest</option>
					<option>Date: Latest</option>
					<option>Name A–Z</option>
					<option>Most Popular</option>
				</select>
			</div>
		</div>
	);
}
