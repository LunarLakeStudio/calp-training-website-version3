import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { TrainingHubButton } from "@/components/site/TrainingHubButton";
import { CALP_NETWORK_URL } from "@/config/site";



export function SiteFooter() {
  return (
    <footer className="border-t border-calp-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-[1fr_auto_1fr]">
        <BrandWordmark showSubBrand={false} />
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-center">
          <a
            href={CALP_NETWORK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit CALP Network (opens in a new tab)"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-calp-red px-5 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calp-red focus-visible:ring-offset-2"
          >
            <span>Visit CALP Network</span>
            <ArrowUpRight className="h-4 w-4 text-white" aria-hidden />
          </a>
          <TrainingHubButton label="Training Hub Login" />
        </div>


        <div className="flex flex-wrap gap-6 text-base text-calp-blue md:justify-end">
          <Link to="/privacy" className="underline-offset-4 hover:underline">
            Privacy policy
          </Link>

          <a href="#" className="underline-offset-4 hover:underline">
            Cookie policy
          </a>
          <a href="#" className="underline-offset-4 hover:underline">
            Terms of use
          </a>
        </div>
      </div>
      <div className="border-t border-calp-blue/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-calp-blue-75">
          © {new Date().getFullYear()} CALP Network. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
