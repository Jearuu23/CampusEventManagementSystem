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
		body: JSON.stringify(Credentials),
	});

	return res.json().then((data) => data);
}
export async function LoginOrganizer(Credentials: { email: string; password: string }) {
	const res = await fetch("http://localhost/CEMS/backend/api/auth/login.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Credentials),
	});

	return res.json().then((data) => data);
}
