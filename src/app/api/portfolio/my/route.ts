import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { dbService } from "@/lib/dbService";
import { createDefaultPortfolio } from "@/lib/data";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let portfolio = await dbService.getPortfolio(user.username);
    if (!portfolio) {
      portfolio = createDefaultPortfolio(user.username);
      await dbService.savePortfolio(user.username, user.userId, portfolio);
    }

    return NextResponse.json({ success: true, portfolio, user });
  } catch (error) {
    console.error("Get my portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { portfolio } = body;

    if (!portfolio || typeof portfolio !== "object") {
      return NextResponse.json({ error: "Invalid portfolio data payload" }, { status: 400 });
    }

    await dbService.savePortfolio(user.username, user.userId, portfolio);
    return NextResponse.json({
      success: true,
      message: "Portfolio chronicle inscribed successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Save my portfolio error:", error);
    return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 });
  }
}
