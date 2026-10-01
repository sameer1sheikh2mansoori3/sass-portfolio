declare global {
  var __spartanKeepAliveInterval: NodeJS.Timeout | undefined;
}

export function startKeepAliveService() {
  // Prevent duplicate intervals in development hot-reloading
  if (global.__spartanKeepAliveInterval) {
    return;
  }

  // Interval duration: 2 minutes (120,000 milliseconds)
  const INTERVAL_MS = 2 * 60 * 1000;

  const pingBackend = async () => {
    try {
      // Priority of URLs: Custom backend url -> Render external URL -> App URL -> Localhost fallback
      const baseUrl =
        process.env.KEEP_ALIVE_URL ||
        process.env.PING_TARGET_URL ||
        process.env.RENDER_EXTERNAL_URL ||
        process.env.NEXT_PUBLIC_APP_URL ||
        "http://localhost:3000";

      const targetEndpoint = `${baseUrl.replace(/\/$/, "")}/api/health`;

      const response = await fetch(targetEndpoint, {
        method: "GET",
        headers: {
          "User-Agent": "Spartan-KeepAlive-Sentinel/1.0",
          "X-Keep-Alive-Source": "internal-sentinel",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          `[KEEP-ALIVE SENTINEL] ⚔ Ping succeeded (${new Date().toLocaleTimeString()}): ${targetEndpoint} - Uptime: ${data.uptimeSeconds}s - DB: ${data.database}`
        );
      } else {
        console.warn(
          `[KEEP-ALIVE SENTINEL] ⚠ Ping returned status ${response.status} from ${targetEndpoint}`
        );
      }
    } catch (err) {
      console.warn(
        `[KEEP-ALIVE SENTINEL] Ping dispatch note: ${err instanceof Error ? err.message : "Connection attempt recorded"}`
      );
    }
  };

  // Initial ping after 10 seconds of server boot
  setTimeout(pingBackend, 10000);

  // Recurring loop every 2 minutes
  global.__spartanKeepAliveInterval = setInterval(pingBackend, INTERVAL_MS);

  console.log(
    `[KEEP-ALIVE SENTINEL] 🛡 Automated 2-minute backend keep-alive sentinel initialized.`
  );
}
