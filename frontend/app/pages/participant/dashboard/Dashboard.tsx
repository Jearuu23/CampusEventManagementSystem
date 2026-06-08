import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "~/contexts/auth/AuthContext";
import { notify } from "~/components/Notification";
import { GetParticipantDashboard } from "~/api/user";
import type { ParticipantDashboardData } from "~/types/user";
import { routeLinks } from "~/constants";

export default function Dashboard() {
	const { user } = useAuth();
	const [data, setData] = useState<ParticipantDashboardData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) return; // Wait for the auth context to finish loading

		async function fetchData() {
			const res = await GetParticipantDashboard();
			if (res.success && res.data) {
				setData(res.data);
			} else {
				notify(res.message || "Failed to load dashboard data.", "error");
			}
			console.log("user dashboard data:", user);
			setLoading(false);
		}
		fetchData();
	}, [user]);

	const handleDownloadCertificate = (eventName: string) => {
		const printWindow = window.open("", "", "width=800,height=600");
		if (!printWindow) return;
		printWindow.document.write(`
			<html>
			<head>
				<title>Certificate - ${eventName}</title>
				<style>
					body { font-family: 'Georgia', serif; text-align: center; padding: 40px; background: #f9f9f9; margin: 0; }
					.cert { border: 8px solid #c8401e; padding: 60px 40px; background: white; outline: 2px solid #a8873a; outline-offset: -16px; }
					h1 { font-size: 48px; color: #c8401e; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; }
					h2 { font-size: 36px; margin: 20px 0; color: #111; }
					p { font-size: 18px; color: #555; margin: 10px 0; font-style: italic; }
					.event { font-weight: bold; font-size: 26px; margin: 30px 0; color: #222; font-style: normal; }
				</style>
			</head>
			<body>
				<div class="cert">
					<h1>Certificate of Attendance</h1>
					<p>This is to proudly certify that</p>
					<h2>${user?.firstName} ${user?.lastName}</h2>
					<p>has successfully participated in</p>
					<div class="event">${eventName}</div>
					<p>Awarded on ${new Date().toLocaleDateString()}</p>
				</div>
				<script>window.print();</script>
			</body>
			</html>
		`);
		printWindow.document.close();
	};

	if (loading) {
		return <div className="p-12 font-mono text-[13px] text-text-muted">Loading dashboard...</div>;
	}

	return (
		<div className="w-full bg-background min-h-[calc(100vh-56px)] p-8 md:p-12 fade-in-element text-text-primary">
			<div className="max-w-6xl mx-auto">
				<header className="mb-10">
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand mb-4 flex items-center gap-2.5 before:content-[''] before:block before:w-4 before:h-px before:bg-brand">
						Participant Portal
					</div>
					<h1 className="font-serif text-[clamp(32px,3vw,48px)] font-bold mb-2">Welcome back, {user?.firstName || "Participant"}</h1>
					<p className="text-text-muted text-[14px] font-light">Track your event participation, earn points, and view your certificates.</p>
				</header>

				{/* Points Overview */}
				<section className="bg-surface-secondary border border-border p-8 rounded-[4px] mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h2 className="font-mono text-[12px] uppercase tracking-wider text-text-muted mb-2">Total Points Earned</h2>
						<div className="font-serif text-[48px] font-bold text-brand leading-none">
							{data?.points || 0} <span className="text-[20px] text-text-primary font-normal">pts</span>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="bg-background border border-border px-6 py-4 rounded-[4px] text-center">
							<div className="font-serif text-[24px] font-bold">{data?.attendedCount || 0}</div>
							<div className="font-mono text-[10px] uppercase text-text-muted mt-1">Events Attended</div>
						</div>
						<div className="bg-background border border-border px-6 py-4 rounded-[4px] text-center">
							<div className="font-serif text-[24px] font-bold">{data?.upcomingCount || 0}</div>
							<div className="font-mono text-[10px] uppercase text-text-muted mt-1">Upcoming</div>
						</div>
					</div>
				</section>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Earning History */}
					<section>
						<h3 className="font-serif text-[24px] font-bold mb-6 border-b border-border pb-4">Recent Activity</h3>
						<div className="flex flex-col gap-4">
							{!data?.activities?.length ? (
								<div className="text-[13px] text-text-muted">No recent activity found.</div>
							) : (
								data.activities.map((act) => (
									<Link
										key={act.id}
										to={routeLinks.participantViewEvent.replace(":id", (act as any).eventId?.toString() || "")}
										className="flex items-center justify-between p-4 bg-surface-secondary border border-border rounded-[2px] transition-colors hover:border-border-strong group no-underline cursor-pointer">
										<div>
											<div className="text-[13px] font-medium text-text-primary group-hover:text-brand transition-colors">
												<span className="capitalize">{act.action}</span>: {act.event}
											</div>
											<div className="text-[11px] text-text-muted mt-1">{act.date}</div>
										</div>
										<div className="font-mono text-[13px] text-[#16a34a] font-bold">+{act.points} pts</div>
									</Link>
								))
							)}
						</div>
					</section>

					{/* Event Certificates */}
					<section>
						<h3 className="font-serif text-[24px] font-bold mb-6 border-b border-border pb-4">Event Certificates</h3>
						<div className="flex flex-col gap-4">
							{!data?.activities?.filter((act) => act.action === "attended" && act.points > 0)?.length ? (
								<div className="text-[13px] text-text-muted">Attend events to earn certificates.</div>
							) : (
								data.activities
									.filter((act) => act.action === "attended" && act.points > 0)
									.map((act) => (
										<div
											key={`cert-${act.id}`}
											className="flex items-center justify-between p-4 bg-surface-secondary border border-border rounded-[2px] transition-colors hover:border-border-strong">
											<div>
												<div className="text-[13px] font-medium text-text-primary">Certificate of Attendance</div>
												<div className="font-mono text-[11px] text-brand mt-1">
													<Link
														to={routeLinks.participantViewEvent.replace(":id", (act as any).eventId?.toString() || "")}
														className="hover:underline">
														{act.event}
													</Link>
												</div>
											</div>
											<button
												onClick={() => {
													handleDownloadCertificate(act.event);
													notify(`Downloaded certificate for ${act.event}`, "success");
												}}
												className="px-4 py-2 bg-background border border-brand text-brand font-mono text-[10px] uppercase tracking-wider rounded-[2px] hover:bg-brand hover:text-background transition-colors cursor-pointer">
												Download
											</button>
										</div>
									))
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
