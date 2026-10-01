import Link from "next/link";
import { notFound } from "next/navigation";
import { dbService } from "@/lib/dbService";
import PortfolioView from "@/components/PortfolioView";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: UserPageProps) {
  const { username } = await params;
  const portfolio = await dbService.getPortfolio(username);

  if (!portfolio) {
    return {
      title: "Warrior Not Found // Spartan Portfolio",
    };
  }

  return {
    title: `${portfolio.hero.name} — Spartan 3D Portfolio`,
    description: portfolio.hero.doctrine || portfolio.hero.title,
    openGraph: {
      title: `${portfolio.hero.name} — Spartan 3D Portfolio`,
      description: portfolio.hero.doctrine,
    },
  };
}

export default async function UserPortfolioPage({ params }: UserPageProps) {
  const { username } = await params;
  const cleanUsername = username ? username.toLowerCase().trim() : "";

  const portfolio = await dbService.getPortfolio(cleanUsername);

  if (!portfolio) {
    return (
      <div className="min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 rounded-full border border-[#C1440E] bg-[#C1440E]/15 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(193,68,14,0.4)]">
          ⚔
        </div>
        <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3">
          CHRONICLE VOID // 404
        </div>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-black mb-4 tracking-wider">
          WARRIOR UNREGISTERED
        </h1>
        <p className="font-inter text-sm sm:text-base text-[#6B7A8F] max-w-md mb-8 leading-relaxed">
          No Spartan record exists under the seal of <span className="text-[#C1440E] font-bold">@{cleanUsername}</span>. This battlefield awaits its rightful conqueror.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#C1440E] text-[#E8E2D6] font-mono text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_25px_#C1440E] transition-all"
          >
            ⚔ Claim This Seal
          </Link>
          <Link
            href="/"
            className="px-7 py-3.5 border border-[#E8E2D6]/20 bg-[#0A0A0B]/80 text-[#E8E2D6] font-mono text-xs tracking-widest uppercase rounded-sm hover:border-[#C1440E] transition-all"
          >
            Return to Citadel
          </Link>
        </div>
      </div>
    );
  }

  const shareBanner = (
    <div
      key="warrior-share-banner"
      className="fixed top-0 left-0 right-0 z-50 bg-[#C1440E]/20 border-b border-[#C1440E]/40 backdrop-blur-md px-4 py-2 flex items-center justify-between text-[11px] font-mono text-[#E8E2D6]"
    >
      <Link
        href="/signup"
        className="px-3 py-1 rounded bg-[#C1440E] text-[#E8E2D6] hover:bg-[#d94d12] font-semibold text-[10px] tracking-wider uppercase transition-colors"
      >
        ⚔ Inscribe Your Own Portfolio
      </Link>
    </div>
  );

  return <PortfolioView portfolio={portfolio}  />;
}
