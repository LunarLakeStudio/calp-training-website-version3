import { Link } from "@tanstack/react-router";
import { Globe, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/dict";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <nav className="sticky top-0 z-50 border-b border-calp-blue/10 bg-white px-6 py-4">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <BrandWordmark />

        <div className="hidden items-center gap-7 text-sm font-medium text-calp-blue lg:flex">
          <HeaderLink to="/courses">{t("nav.courses")}</HeaderLink>
          <HeaderLink to="/trainings">{t("nav.trainings")}</HeaderLink>
          <HeaderLink to="/trainers">{t("nav.trainers")}</HeaderLink>
          <HeaderLink to="/calendar">{t("nav.calendar")}</HeaderLink>
          <HeaderLink to="/apply">{t("nav.apply")}</HeaderLink>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-calp-blue outline-none focus-visible:ring-2 focus-visible:ring-calp-blue">
              <Globe className="h-4 w-4" aria-hidden />
              <span>{current.label}</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGS.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onSelect={() => setLang(l.code)}
                  className={cn(
                    "text-sm",
                    lang === l.code ? "font-bold text-calp-red" : "text-calp-blue",
                  )}
                >
                  {l.native}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/calendar"
            className="rounded-md bg-calp-red px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Find a training
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="transition-colors hover:text-calp-red"
      activeProps={{ className: "text-calp-red" }}
    >
      {children}
    </Link>
  );
}
