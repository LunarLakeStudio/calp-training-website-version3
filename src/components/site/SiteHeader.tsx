import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";
import { LANGS } from "@/i18n/dict";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "@/components/site/BrandWordmark";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="sticky top-0 z-50 border-b border-calp-blue/5 bg-white/85 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <BrandWordmark />
          <div className="hidden gap-6 text-sm font-medium text-calp-ink lg:flex">
            <HeaderLink to="/courses">{t("nav.courses")}</HeaderLink>
            <HeaderLink to="/trainers">{t("nav.trainers")}</HeaderLink>
            <HeaderLink to="/trainings">{t("nav.trainings")}</HeaderLink>
            <HeaderLink to="/calendar">{t("nav.calendar")}</HeaderLink>
            <HeaderLink to="/apply">{t("nav.apply")}</HeaderLink>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-calp-blue/10 px-1 py-1 text-[10px] font-bold uppercase tracking-wider">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "rounded-full px-2 py-0.5 transition-colors",
                  lang === l.code
                    ? "bg-calp-blue text-white"
                    : "opacity-40 hover:opacity-100",
                )}
                aria-label={`Switch language to ${l.native}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link
            to="/contact"
            className="rounded-full bg-calp-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-calp-red"
          >
            {t("nav.contact")}
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
      className="transition-colors hover:text-calp-blue"
      activeProps={{ className: "text-calp-blue" }}
    >
      {children}
    </Link>
  );
}
