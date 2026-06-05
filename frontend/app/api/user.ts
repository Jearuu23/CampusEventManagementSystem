export async function RegisterOrganizer(Credentials: {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	organization: string;
}) {
	const res = await fetch("http://localhost/CEMS/backend/api/auth/register.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(Credentials),
	});

	return res.json().then((data) => data);
}
export async function LoginUser(Credentials: { email: string; password: string }) {
	const res = await fetch("http://localhost/CEMS/backend/api/auth/login.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(Credentials),
	});

	return res.json().then((data) => data);
}

export async function CheckAuth() {
	const res = await fetch("http://localhost/CEMS/backend/api/auth/checkAuth.php", {
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function LogoutUser() {
	const res = await fetch("http://localhost/CEMS/backend/api/auth/logout.php", {
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function GetEvent(id: number) {
	const res = await fetch(`http://localhost/CEMS/backend/api/events/getEvent.php?id=${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return res.json().then((data) => data);
}

export async function GetEventParticipants(eventId: number) {
	const res = await fetch(`http://localhost/CEMS/backend/api/events/getEventParticipants.php?event_id=${eventId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return res.json().then((data) => data);
}
