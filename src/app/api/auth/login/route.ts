import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbService } from "@/lib/dbService";
import { comparePassword, signJwt, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body; // identifier can be username or email

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).toLowerCase().trim();

    // Check user by username first, then by email
    let user = await dbService.findUserByUsername(cleanIdentifier);
    if (!user) {
      user = await dbService.findUserByEmail(cleanIdentifier);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Warrior identity not found in records." },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid cipher credentials (incorrect password)." },
        { status: 401 }
      );
    }

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
      maxAge: 30 * 24 * 60 * 60,
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate warrior. Please try again." },
      { status: 500 }
    );
  }
}
