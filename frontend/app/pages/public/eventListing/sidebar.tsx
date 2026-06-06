import React from "react";

export default function Sidebar() {
	return (
		<aside className="border-r border-border py-10 px-8 sticky top-[113px] h-[calc(100vh-113px)] overflow-y-auto hidden md:block no-scrollbar">
			{/* Mini Calendar */}
			<div className="mb-9">
				<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted mb-4 pb-2.5 border-b border-border">
					October 2024
				</div>
				<div className="flex items-center justify-between mb-3">
					<button className="bg-transparent border-none cursor-pointer text-text-muted text-lg hover:text-text-primary">‹</button>
					<span className="font-mono text-[11px] text-text-primary tracking-[0.1em] uppercase">OCT 2024</span>
					<button className="bg-transparent border-none cursor-pointer text-text-muted text-lg hover:text-text-primary">›</button>
				</div>
				<div className="grid grid-cols-7 gap-0.5 mb-1">
					{["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
						<div key={i} className="font-mono text-[8px] text-center text-text-muted tracking-[0.05em] uppercase pb-1">
							{day}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-0.5">
					{[29, 30].map((d) => (
						<div
							key={`prev-${d}`}
							className="aspect-square flex items-center justify-center font-mono text-[10px] rounded-[1px] text-text-muted opacity-25">
							{d}
						</div>
					))}
					{Array.from({ length: 31 }).map((_, i) => {
						const day = i + 1;
						const isToday = day === 15;
						const hasEvent = [4, 5, 6, 9, 17, 19, 24, 26, 31].includes(day);
						return (
							<div
								key={day}
								className={`aspect-square flex items-center justify-center font-mono text-[10px] rounded-[1px] cursor-pointer transition-colors relative ${
									isToday
										? "bg-brand text-background"
										: hasEvent
											? "text-text-primary font-medium hover:bg-surface-secondary"
											: "text-text-muted hover:bg-surface-secondary hover:text-text-primary"
								}`}>
								{day}
								{hasEvent && !isToday && (
									<span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-brand"></span>
								)}
							</div>
						);
					})}
					{[1, 2].map((d) => (
						<div
							key={`next-${d}`}
							className="aspect-square flex items-center justify-center font-mono text-[10px] rounded-[1px] text-text-muted opacity-25">
							{d}
						</div>
					))}
				</div>
			</div>

			{/* Department */}
			<div className="mb-9">
				<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted mb-4 pb-2.5 border-b border-border">Department</div>
				<div className="flex flex-col gap-0.5">
					{[
						{ name: "All Departments", count: 47, active: true },
						{ name: "Computer Science", count: 8 },
						{ name: "Fine Arts", count: 11 },
						{ name: "Philosophy", count: 4 },
						{ name: "Natural Sciences", count: 7 },
						{ name: "History", count: 5 },
						{ name: "Engineering", count: 6 },
						{ name: "Economics", count: 3 },
						{ name: "Student Orgs", count: 3 },
					].map((item, i) => (
						<div
							key={i}
							className={`flex items-center justify-between py-2 px-2.5 rounded-[2px] cursor-pointer transition-colors ${item.active ? "bg-primary-100" : "hover:bg-black/5"}`}>
							<div
								className={`text-[13px] flex items-center gap-2.5 ${item.active ? "font-medium text-text-primary" : "font-light text-text-primary"}`}>
								<span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? "bg-brand" : "bg-transparent"}`}></span>
								{item.name}
							</div>
							<span className="font-mono text-[10px] text-text-muted tracking-[0.05em]">{item.count}</span>
						</div>
					))}
				</div>
			</div>

			{/* Open To */}
			<div className="mb-9">
				<div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted mb-4 pb-2.5 border-b border-border">Open To</div>
				<div className="flex flex-col gap-0.5">
					{["Everyone", "Students Only", "Faculty & Staff", "Postgraduate"].map((item, i) => (
						<div
							key={i}
							className="flex items-center justify-between py-2 px-2.5 rounded-[2px] cursor-pointer transition-colors hover:bg-black/5">
							<div className="text-[13px] flex items-center gap-2.5 font-light text-text-primary">
								<span className="w-1.5 h-1.5 rounded-full shrink-0 bg-text-primary"></span>
								{item}
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
