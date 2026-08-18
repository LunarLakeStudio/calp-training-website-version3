import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { TrainingHubButton } from "@/components/site/TrainingHubButton";
import { CALP_NETWORK_URL } from "@/config/site";



export function SiteFooter() {
  return (
    <footer className="border-t border-calp-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-8 md:grid-cols-3">
        <BrandWordmark showSubBrand={false} />
        <div className="flex flex-wrap items-center gap-4 text-base font-medium md:justify-center">
          <a
            href={CALP_NETWORK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit CALP Network (opens in a new tab)"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-calp-red px-6 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            <span>Visit CALP Network</span>
            <ArrowUpRight className="h-4 w-4 text-white" aria-hidden />
          </a>
          <span className="h-4 w-px bg-calp-blue/20" aria-hidden />
          <TrainingHubButton variant="link" label="Training Hub Login" />
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
