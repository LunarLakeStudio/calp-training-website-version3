import { Link } from "@tanstack/react-router";
import calpLogo from "@/assets/calp-logo-official.png.asset.json";

export function BrandWordmark(_props: {
  showSubBrand?: boolean;
  variant?: "default" | "footer";
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link to="/" className="shrink-0">
        <img
          src={calpLogo.url}
          alt="CALP Network — choice and dignity for people in crisis"
          className="h-11 w-auto"
        />
      </Link>
    </div>
  );
}
