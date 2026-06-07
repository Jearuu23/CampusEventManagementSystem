import React, { useState, useEffect } from "react";

export type NotificationType = "success" | "error" | "info";

export interface NotificationEvent {
	message: string;
	type: NotificationType;
}

export const notify = (message: string, type: NotificationType = "info") => {
	const event = new CustomEvent<NotificationEvent>("app-notification", {
		detail: { message, type },
	});
	window.dispatchEvent(event);
};

export default function NotificationContainer() {
	const [notifications, setNotifications] = useState<{ id: number; message: string; type: NotificationType }[]>([]);

	useEffect(() => {
		const handleNotify = (e: Event) => {
			const customEvent = e as CustomEvent<NotificationEvent>;
			const id = Date.now() + Math.random();
			setNotifications((prev) => [...prev, { id, ...customEvent.detail }]);

			setTimeout(() => {
				setNotifications((prev) => prev.filter((n) => n.id !== id));
			}, 4000);
		};

		window.addEventListener("app-notification", handleNotify);
		return () => window.removeEventListener("app-notification", handleNotify);
	}, []);

	if (notifications.length === 0) return null;

	return (
		<div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
			{notifications.map((n) => (
				<div
					key={n.id}
					className={`px-5 py-3.5 rounded-[2px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] font-mono text-[11px] tracking-[0.05em] uppercase flex items-center justify-between gap-4 fade-in-element transition-all pointer-events-auto min-w-[280px] max-w-[400px] z-[9999] ${
						n.type === "success"
							? "bg-[#0d2214] text-[#4ade80] border border-[#16a34a]"
							: n.type === "error"
								? "bg-[#2b1010] text-[#f87171] border border-[#dc2626]"
								: "bg-[#1a1a0f] text-text-primary border border-brand"
					}`}>
					<span>{n.message}</span>
					<button
						onClick={() => setNotifications((prev) => prev.filter((notif) => notif.id !== n.id))}
						className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-1 flex items-center justify-center shrink-0 text-inherit">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
			))}
		</div>
	);
}
