import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ProfileUser = {
	name?: string;
	email?: string;
	phone?: string;
};

function parseUserCookie(value: string): ProfileUser {
	try {
		const parsed = JSON.parse(value) as ProfileUser;
		return parsed ?? {};
	} catch {
		return {};
	}
}

export default async function ProfilePage() {
	const store = cookies();
	const authCookie = (await store).get("auth");
	const userCookie = (await store).get("user");

	if (!authCookie) {
		redirect("/login");
	}

	const user = userCookie ? parseUserCookie(userCookie.value) : {};

	return (
		<div className="page-bg min-h-screen px-6 py-16 sm:px-10">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
				<header className="flex flex-col gap-3">
					<span className="chip">Perfil</span>
					<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						Hola{user.name ? `, ${user.name}` : ""}
					</h1>
					<p className="text-muted-foreground">
						Solo las cuentas autorizadas pueden ver esta pantalla.
					</p>
				</header>

				<section className="card-glass grid gap-4 p-8">
					<div className="card-soft flex flex-col gap-1">
						<span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
							Email
						</span>
						<span className="text-lg font-medium">
							{user.email ?? "No disponible"}
						</span>
					</div>
					<div className="card-soft flex flex-col gap-1">
						<span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
							Phone
						</span>
						<span className="text-lg font-medium">
							{user.phone ?? "No disponible"}
						</span>
					</div>
				</section>

				<Link className="btn-outline w-full text-center sm:w-fit" href="/">
					Volver al inicio
				</Link>
			</div>
		</div>
	);
}
