import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbService } from "@/lib/dbService";
import { hashPassword, signJwt, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).toLowerCase().trim();
    const cleanEmail = String(email).toLowerCase().trim();

    if (!/^[a-zA-Z0-9_-]{3,24}$/.test(cleanUsername)) {
      return NextResponse.json(
        { error: "Username must be 3-24 characters (letters, numbers, underscores, dashes only)" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check existing username
    const existingUser = await dbService.findUserByUsername(cleanUsername);
    if (existingUser) {
      return NextResponse.json(
        { error: `The username "${cleanUsername}" is already claimed by another warrior.` },
        { status: 409 }
      );
    }

    // Check existing email
    const existingEmail = await dbService.findUserByEmail(cleanEmail);
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await dbService.createUser({
      username: cleanUsername,
      email: cleanEmail,
      passwordHash,
    });

    const token = signJwt({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create warrior account. Please try again." },
      { status: 500 }
    );
  }
}
