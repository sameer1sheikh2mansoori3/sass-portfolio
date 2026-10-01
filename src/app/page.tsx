import PortfolioView from "@/components/PortfolioView";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Page() {
  return <PortfolioView portfolio={PORTFOLIO_DATA} />;
}
