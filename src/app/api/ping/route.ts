import { GET as healthGet, HEAD as healthHead } from "../health/route";

export const dynamic = "force-dynamic";

export const GET = healthGet;
export const HEAD = healthHead;
