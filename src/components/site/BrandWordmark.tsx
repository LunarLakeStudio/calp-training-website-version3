import { Link } from "@tanstack/react-router";
import calpLogo from "@/assets/calp-logo-red.png.asset.json";

export function BrandWordmark({
  showSubBrand = true,
  variant = "default",
}: {
  showSubBrand?: boolean;
  variant?: "default" | "footer";
}) {
  return (
    <div className="flex items-center gap-3">
      <Link to="/" className="flex items-center gap-2.5">
        <img
          src={calpLogo.url}
          alt="CALP Network"
          className="h-10 w-auto"
        />
        <span className="flex flex-col leading-none">
          <span
            className={
              "font-display text-[15px] font-extrabold tracking-tight " +
              (variant === "footer" ? "text-calp-blue" : "text-calp-red")
            }
          >
            CALP NETWORK
          </span>
          <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-calp-ink">
            Choice &amp; dignity for people in crisis
          </span>
        </span>
      </Link>
      {showSubBrand ? (
        <>
          <span className="h-8 w-px bg-calp-blue/15" aria-hidden />
          <span className="font-display text-sm font-bold text-calp-blue">
            Training Hub
          </span>
        </>
      ) : null}
    </div>
  );
}
