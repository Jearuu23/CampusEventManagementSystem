import React from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import { MapPinIcon, ClockIcon, UsersIcon } from "~/components/Icons";
import { getImageUrl } from "~/utils/helpers";

export default function MainContent({ viewMode }: { viewMode: "list" | "grid" }) {
	const { events, total, page, limit } = useLoaderData() as { events: any[]; total: number; page: number; limit: number };
	const [searchParams, setSearchParams] = useSearchParams();

	const displayEvents = (events || []).filter((event) => event.status === "approved" || event.status === "ongoing");
	// Only show the featured big card when we're on the first page
	const featuredEvent = displayEvents.length > 0 && page === 1 ? displayEvents[0] : null;

	const totalPages = Math.ceil(total / limit) || 1;

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > totalPages) return;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("page", newPage.toString());
		setSearchParams(newParams);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="py-10 px-6 md:px-12">
			<div className="flex items-center justify-between mb-10 pb-5 border-b border-border fade-in-element">
				<div>
					<h2 className="font-serif text-[28px] font-bold">All Events</h2>
					<div className="font-mono text-[11px] text-text-muted tracking-[0.08em] mt-1">
						Showing {Math.min(displayEvents.length, limit)} of {total} events
					</div>
				</div>
				<div className="hidden md:flex items-center gap-4">
					<select className="font-mono text-[11px] text-text-primary bg-transparent border border-border-strong py-2 px-3 pr-7 rounded-[2px] cursor-pointer tracking-[0.06em] uppercase outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201l4%204%204-4%22%20stroke%3D%22%237a7469%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center]">
						<option>Date: Soonest</option>
						<option>Date: Latest</option>
						<option>Name A–Z</option>
					</select>
				</div>
			</div>

			{/* Featured */}
			{featuredEvent && (
				<Link
					to={`/event/${featuredEvent.id || ""}`}
					className="bg-text-primary rounded-[2px] grid grid-cols-1 md:grid-cols-[1fr_280px] overflow-hidden mb-10 cursor-pointer transition-opacity hover:opacity-90 no-underline fade-in-element">
					<div className="p-10">
						<div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-brand bg-[rgba(200,64,30,0.15)] px-2.5 py-1 rounded-[1px] mb-5">
							● Featured Event
						</div>
						<h3 className="font-serif text-[30px] font-bold text-background leading-[1.2] mb-3">{featuredEvent.title}</h3>
						<p className="text-[14px] text-background/55 leading-[1.65] font-light mb-7 max-w-[480px]">{featuredEvent.description}</p>
						<div className="flex flex-wrap gap-6">
							<div className="flex items-center gap-2 font-mono text-[11px] text-background/45 tracking-[0.04em]">
								<ClockIcon />{" "}
								{featuredEvent.event_start_date
									? new Date(featuredEvent.event_start_date).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})
									: "TBA"}{" "}
								· {featuredEvent.event_start_time || "TBA"}
							</div>
							<div className="flex items-center gap-2 font-mono text-[11px] text-background/45 tracking-[0.04em]">
								<MapPinIcon /> {featuredEvent.location}
							</div>
							<div className="flex items-center gap-2 font-mono text-[11px] text-background/45 tracking-[0.04em]">
								<UsersIcon /> Open to All
							</div>
						</div>
					</div>
					<div className="bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208] relative flex items-center justify-center overflow-hidden min-h-[160px] md:min-h-full">
						{featuredEvent.image_path ? (
							<img
								src={getImageUrl(featuredEvent.image_path)}
								alt={featuredEvent.title}
								className="w-full h-full object-cover opacity-60"
							/>
						) : (
							<svg width="100" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
								<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
								<circle cx="40" cy="40" r="20" stroke="#a8873a" strokeWidth="0.5" />
								<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
								<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
							</svg>
						)}
						<div className="absolute inset-0 bg-gradient-to-r from-text-primary from-0% to-transparent to-40% hidden md:block"></div>
					</div>
				</Link>
			)}

			{viewMode === "list" ? (
				<div className="flex flex-col gap-10">
					<div className="fade-in-element">
						<div className="flex flex-col gap-[1px] bg-border border border-border">
							{displayEvents.length > 0 ? (
								displayEvents.map((event, i) => {
									const d = new Date(event.event_start_date || Date.now());
									const day = isNaN(d.getDate()) ? "--" : d.getDate().toString();
									const month = isNaN(d.getMonth()) ? "---" : d.toLocaleString("default", { month: "short" });
									return (
										<ListRow
											key={event.id || i}
											id={event.id}
											day={day}
											month={month}
											tag={event.department || "Event"}
											title={event.title}
											time={event.event_start_time || "TBA"}
											loc={event.location || "TBA"}
											aud="Open to All"
											cap={event.max_participants ? `${event.max_participants} seats` : "No limit"}
											status={
												event.status === "approved"
													? "Open"
													: event.status === "ongoing"
														? "Ongoing"
														: event.status === "completed"
															? "Completed"
															: event.status === "cancelled"
																? "Cancelled"
																: "Pending"
											}
											statusClass={
												event.status === "approved"
													? "bg-[rgba(60,130,60,0.1)] text-[#3a7a3a]"
													: event.status === "ongoing"
														? "bg-[rgba(55,138,221,0.1)] text-[#378add]"
														: event.status === "completed"
															? "bg-[rgba(100,100,100,0.1)] text-text-muted"
															: event.status === "cancelled"
																? "bg-[rgba(200,64,30,0.1)] text-brand"
																: "bg-[rgba(168,135,58,0.12)] text-warning"
											}
										/>
									);
								})
							) : (
								<div className="p-10 text-center font-mono text-sm text-text-muted">No events found.</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border fade-in-element">
					{displayEvents.length > 0 ? (
						displayEvents.map((event, i) => {
							const bgs = [
								"bg-gradient-to-br from-[#1a1a0f] via-[#2d2a18] to-[#1a1208]",
								"bg-gradient-to-br from-[#0e1620] via-[#162035] to-[#0a1218]",
								"bg-gradient-to-br from-[#1a0e1a] via-[#2a1428] to-[#0f080e]",
								"bg-gradient-to-br from-[#0a1410] via-[#12281a] to-[#060e09]",
							];
							return (
								<GridCard
									key={event.id || i}
									id={event.id}
									bg={bgs[i % bgs.length]}
									imagePath={getImageUrl(event.image_path)}
									svg={
										<svg width="60" height="60" viewBox="0 0 80 80" fill="none" opacity="0.25">
											<circle cx="40" cy="40" r="30" stroke="#a8873a" strokeWidth="1" />
											<line x1="40" y1="10" x2="40" y2="70" stroke="#a8873a" strokeWidth="0.5" />
											<line x1="10" y1="40" x2="70" y2="40" stroke="#a8873a" strokeWidth="0.5" />
										</svg>
									}
									tag={event.department || "Event"}
									title={event.title}
									desc={event.description}
									time={`${event.event_start_date ? new Date(event.event_start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBA"} · ${event.event_start_time || "TBA"}`}
									loc={event.location || "TBA"}
								/>
							);
						})
					) : (
						<div className="p-10 text-center font-mono text-sm text-text-muted col-span-full">No events found.</div>
					)}
				</div>
			)}

			{/* PAGINATION */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-2 py-12 fade-in-element">
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className="px-4 h-10 flex items-center justify-center border border-border-strong rounded-[2px] font-mono text-[12px] tracking-[0.08em] text-text-muted bg-transparent cursor-pointer transition-all hover:border-text-primary hover:text-text-primary disabled:opacity-50 disabled:pointer-events-none">
						← Prev
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
						<button
							key={p}
							onClick={() => handlePageChange(p)}
							className={`w-10 h-10 flex items-center justify-center border rounded-[2px] font-mono text-[12px] tracking-[0.08em] cursor-pointer transition-all ${
								p === page
									? "border-text-primary text-background bg-text-primary"
									: "border-border-strong text-text-muted bg-transparent hover:border-text-primary hover:text-text-primary"
							}`}>
							{p}
						</button>
					))}

					<button
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
						className="px-4 h-10 flex items-center justify-center border border-border-strong rounded-[2px] font-mono text-[12px] tracking-[0.08em] text-text-muted bg-transparent cursor-pointer transition-all hover:border-text-primary hover:text-text-primary disabled:opacity-50 disabled:pointer-events-none">
						Next →
					</button>
				</div>
			)}
		</div>
	);
}

function GridCard({ id, bg, imagePath, svg, tag, title, desc, time, loc }: any) {
	return (
		<Link
			to={`/event/${id || ""}`}
			className="bg-background p-7 flex flex-col gap-3.5 cursor-pointer transition-colors hover:bg-surface-secondary no-underline text-inherit">
			<div className={`w-full aspect-video ${bg} rounded-[1px] flex items-center justify-center overflow-hidden mb-1`}>
				{imagePath ? <img src={imagePath} alt={title} className="w-full h-full object-cover opacity-80" /> : svg}
			</div>
			<div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-brand bg-primary-100 px-2.5 py-1 rounded-[1px] self-start">
				{tag}
			</div>
			<h3 className="font-serif text-[20px] font-bold leading-[1.2]">{title}</h3>
			<p className="text-[13px] text-text-muted font-light leading-[1.6]">{desc}</p>
			<div className="flex flex-col gap-1.5 mt-auto pt-3.5 border-t border-border">
				<div className="flex items-center gap-2 font-mono text-[10px] text-text-muted tracking-[0.04em]">
					<ClockIcon /> {time}
				</div>
				<div className="flex items-center gap-2 font-mono text-[10px] text-text-muted tracking-[0.04em]">
					<MapPinIcon /> {loc}
				</div>
			</div>
		</Link>
	);
}

function ListRow({ id, day, month, tag, title, time, loc, aud, cap, status, statusClass }: any) {
	return (
		<Link
			to={`/event/${id || ""}`}
			className="bg-background grid grid-cols-1 sm:grid-cols-[80px_1fr_auto] gap-0 cursor-pointer transition-colors hover:bg-surface-secondary no-underline text-inherit group">
			<div className="py-5 px-4 sm:px-6 sm:border-r border-border flex flex-row sm:flex-col items-center sm:justify-center gap-0.5 bg-black/[0.02] border-b sm:border-b-0">
				<div className="font-serif text-[24px] font-bold leading-none text-text-primary">{day}</div>
				<div className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-muted">{month}</div>
			</div>
			<div className="py-[18px] px-6 flex flex-col justify-center gap-1.5">
				<div className="font-mono text-[9px] tracking-[0.14em] uppercase text-brand">{tag}</div>
				<div className="font-serif text-[18px] font-bold leading-[1.2]">{title}</div>
				<div className="flex items-center gap-5 flex-wrap mt-1">
					<div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted tracking-[0.04em]">
						<ClockIcon /> {time}
					</div>
					<div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted tracking-[0.04em]">
						<MapPinIcon /> {loc}
					</div>
					<div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted tracking-[0.04em]">
						<UsersIcon /> {aud}
					</div>
				</div>
			</div>
			<div className="py-5 px-6 sm:pl-4 flex sm:flex-col items-center sm:items-end justify-center gap-2.5 border-t sm:border-t-0 border-border">
				<div className="font-mono text-[10px] text-text-muted tracking-[0.05em]">{cap}</div>
				<div className={`font-mono text-[10px] tracking-[0.1em] uppercase py-1 px-2.5 rounded-[1px] ${statusClass}`}>{status}</div>
				<div className="text-text-muted transition-all group-hover:translate-x-1 group-hover:text-brand flex items-center justify-center hidden sm:block">
					→
				</div>
			</div>
		</Link>
	);
}
