#!/usr/bin/env node

/**
 * Spartan Citadel Backend Keep-Alive Sentinel
 * Hits your deployed backend every 2 minutes so it never goes to sleep on Render/Railway/Glitch.
 *
 * Usage:
 *   node scripts/keep-alive.js [OPTIONAL_URL]
 *   npm run keep-alive
 */

const targetUrlArg = process.argv[2];
const targetUrl =
  targetUrlArg ||
  process.env.KEEP_ALIVE_URL ||
  process.env.BACKEND_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const endpoint = targetUrl.replace(/\/$/, "") + "/api/health";
const INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

console.log("=================================================");
console.log("⚔ SPARTAN CITADEL // 2-MINUTE KEEP-ALIVE SENTINEL");
console.log("=================================================");
console.log(`🎯 Target Endpoint : ${endpoint}`);
console.log(`⏱ Frequency       : Every 2 minutes (120,000 ms)`);
console.log(`🛡 Mission         : Keep deployed backend awake 24/7`);
console.log("=================================================\n");

let pingCount = 0;

async function ping() {
  pingCount++;
  const timeStr = new Date().toLocaleTimeString();
  const start = Date.now();

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "User-Agent": "Spartan-External-Sentinel/1.0",
        "Cache-Control": "no-cache",
      },
    });

    const elapsed = Date.now() - start;

    if (res.ok) {
      let data = {};
      try {
        data = await res.json();
      } catch {}

      console.log(
        `[#${pingCount}] [${timeStr}] ✅ AWAKE: 200 OK (${elapsed}ms) | Uptime: ${data.uptimeSeconds || 0}s | DB: ${data.database || "active"}`
      );
    } else {
      console.log(
        `[#${pingCount}] [${timeStr}] ⚠ WARNING: Server responded with HTTP ${res.status} (${elapsed}ms)`
      );
    }
  } catch (err) {
    const elapsed = Date.now() - start;
    console.log(
      `[#${pingCount}] [${timeStr}] ❌ CONNECT ERROR (${elapsed}ms): ${err.message}`
    );
  }
}

// Initial ping immediately
ping();

// Recurring loop every 2 minutes
setInterval(ping, INTERVAL_MS);
