export async function register() {
  // Only run keep-alive in nodejs server runtime (not edge or client)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startKeepAliveService } = await import("@/lib/keepAliveService");
    startKeepAliveService();
  }
}
