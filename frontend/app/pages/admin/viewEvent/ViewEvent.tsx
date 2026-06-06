import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { GetEventById } from "~/api/events";
import EventHeader from "./eventHeader";
import EventDetails from "./eventDetails";

export default function ViewEvent() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const navigate = useNavigate();

	const [event, setEvent] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			return;
		}

		const fetchEvent = async () => {
			setLoading(true);
			const res = await GetEventById(Number(id));
			if (res.success && res.data) {
				setEvent(res.data);
			}
			setLoading(false);
		};
		fetchEvent();
	}, [id]);

	if (loading) {
		return <div className="p-12 font-mono text-[13px] text-text-muted">Loading event details...</div>;
	}

	if (!event) {
		return <div className="p-12 font-mono text-[13px] text-brand">Event not found or invalid ID.</div>;
	}

	return (
		<div className="w-full bg-background min-h-screen p-8 md:p-12 fade-in-element">
			<button
				onClick={() => navigate(-1)}
				className="mb-8 font-mono text-[12px] uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
				&larr; Back
			</button>
			<div className="max-w-4xl">
				<EventHeader event={event} />
				<EventDetails event={event} />
			</div>
		</div>
	);
}
