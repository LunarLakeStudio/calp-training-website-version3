import { Link } from "@tanstack/react-router";
import calpLogo from "@/assets/calp-logo-official.png.asset.json";
import calpLogoWhite from "@/assets/calp-logo-white.png.asset.json";

export function BrandWordmark({
  variant = "default",
}: {
  showSubBrand?: boolean;
  variant?: "default" | "footer" | "onDark";
}) {
  const logo = variant === "onDark" ? calpLogoWhite : calpLogo;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link to="/" className="shrink-0">
        <img
          src={logo.url}
          alt="CALP Network — choice and dignity for people in crisis"
          className="h-11 w-auto"
        />
      </Link>
    </div>
  );
}
