import { Link } from "@tanstack/react-router";
import { BrandWordmark } from "@/components/site/BrandWordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-calp-navy/5 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <BrandWordmark showSubBrand={false} variant="footer" />
        <div className="flex flex-wrap justify-center gap-7 text-sm font-medium text-calp-slate">
          <Link to="/courses" className="hover:text-calp-navy">Courses</Link>
          <Link to="/trainers" className="hover:text-calp-navy">Trainers</Link>
          <Link to="/trainings" className="hover:text-calp-navy">Trainings</Link>
          <Link to="/calendar" className="hover:text-calp-navy">Calendar</Link>
          <Link to="/apply" className="hover:text-calp-navy">How to Apply</Link>
        </div>
        <Link
          to="/contact"
          className="rounded-full bg-calp-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-calp-red"
        >
          Contact
        </Link>
      </div>
      <div className="border-t border-calp-navy/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-calp-slate md:flex-row">
          <span>© {new Date().getFullYear()} CALP Network. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-calp-navy">Privacy Policy</a>
            <a href="#" className="hover:text-calp-navy">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
