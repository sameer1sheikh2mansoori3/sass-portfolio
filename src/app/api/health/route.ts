import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "disconnected";

  try {
    const mongo = await connectDB();
    if (mongo) {
      dbStatus = mongo.connection.readyState === 1 ? "connected" : "connecting";
    }
  } catch (err) {
    dbStatus = `error: ${err instanceof Error ? err.message : "failed"}`;
  }

  const responseTimeMs = Date.now() - startTime;

  return NextResponse.json(
    {
      status: "alive",
      message: "⚔ Spartan citadel backend is awake and battle-ready!",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: dbStatus,
      latencyMs: responseTimeMs,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Backend-Status": "Active",
      },
    }
  );
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "X-Backend-Status": "Active",
      "Cache-Control": "no-store",
    },
  });
}
