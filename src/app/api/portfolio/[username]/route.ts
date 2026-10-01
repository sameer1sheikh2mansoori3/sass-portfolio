import { NextResponse } from "next/server";
import { dbService } from "@/lib/dbService";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const resolved = await params;
    const username = resolved?.username;
    if (!username) {
      return NextResponse.json({ error: "Username parameter missing" }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().trim();
    const portfolio = await dbService.getPortfolio(cleanUsername);

    if (!portfolio) {
      return NextResponse.json(
        { error: `Warrior "${cleanUsername}" has not yet inscribed their chronicle.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, username: cleanUsername, portfolio });
  } catch (error) {
    console.error("Public portfolio get error:", error);
    return NextResponse.json({ error: "Failed to load warrior chronicle" }, { status: 500 });
  }
}
