import { Link } from "@tanstack/react-router";
import { Globe, ChevronDown, Menu } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/dict";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { TrainingHubButton } from "@/components/site/TrainingHubButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  const navItems = [
    { to: "/courses", label: t("nav.courses") },
    { to: "/trainings", label: t("nav.trainings") },
    { to: "/trainers", label: t("nav.trainers") },
    { to: "/calendar", label: t("nav.calendar") },
    { to: "/apply", label: t("nav.apply") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-calp-blue px-6 py-4">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <BrandWordmark variant="onDark" />

        <div className="hidden items-center gap-6 text-base font-medium text-white lg:flex">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-calp-pale-red-soft px-4 py-2 text-base font-medium text-calp-blue transition-opacity hover:opacity-90"
            activeOptions={{ exact: true }}
          >
            {t("nav.home")}
          </Link>
          {navItems.map((item) => (
            <HeaderLink key={item.to} to={item.to}>
              {item.label}
            </HeaderLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-base font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white">
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
                    "text-base",
                    lang === l.code ? "font-bold text-calp-blue" : "text-calp-blue",
                  )}
                >
                  {l.native}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/calendar"
            className="hidden rounded-md bg-white px-5 py-2.5 text-base font-medium text-calp-blue transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Find a training
          </Link>

          <TrainingHubButton className="hidden lg:inline-flex" />

          {/* Mobile / tablet menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open menu"
              className="inline-flex items-center rounded-md border border-white/50 p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <TrainingHubButton className="w-full" />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-base text-calp-blue">
                <Link to="/">{t("nav.home")}</Link>
              </DropdownMenuItem>
              {navItems.map((item) => (
                <DropdownMenuItem key={item.to} asChild className="text-base text-calp-blue">
                  <Link to={item.to}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-base font-medium text-calp-blue">
                <Link to="/calendar">Find a training</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

function HeaderLink({
  to,
  exact,
  children,
}: {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="transition-colors hover:text-calp-pale-red-soft"
      activeProps={{ className: "text-calp-pale-red-soft font-bold" }}
      activeOptions={exact ? { exact: true } : undefined}
    >
      {children}
    </Link>
  );
}
