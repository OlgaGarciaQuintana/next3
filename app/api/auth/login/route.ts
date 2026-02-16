import crypto from "node:crypto";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

function verifyPassword(password: string, storedHash: string) {
	const [salt, originalHash] = storedHash.split(":");
	if (!salt || !originalHash) {
		return false;
	}

	const hash = crypto.scryptSync(password, salt, 64);
	const originalBuffer = Buffer.from(originalHash, "hex");

	if (hash.length !== originalBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(hash, originalBuffer);
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const email = String(formData.get("email") ?? "").trim().toLowerCase();
	const password = String(formData.get("password") ?? "");

	if (!email || !password) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.passwordHash) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const isValid = verifyPassword(password, user.passwordHash);
	if (!isValid) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const response = NextResponse.redirect(new URL("/profile", request.url), 303);
	response.cookies.set("auth", user.id, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
	});
	response.cookies.set(
		"user",
		JSON.stringify({ name: user.name, email: user.email, phone: user.phone }),
		{
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
		}
	);

	return response;
}
