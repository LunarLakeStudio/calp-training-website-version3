export type Lang = "en" | "fr" | "es" | "ar";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "fr", label: "FR", native: "Français" },
  { code: "es", label: "ES", native: "Español" },
  { code: "ar", label: "AR", native: "العربية" },
];

type Dict = Record<string, Record<Lang, string>>;

export const t: Dict = {
  "nav.courses": { en: "Courses", fr: "Formations", es: "Cursos", ar: "الدورات" },
  "nav.trainers": { en: "Trainers", fr: "Formateurs", es: "Formadores", ar: "المدربون" },
  "nav.trainings": { en: "Trainings", fr: "Sessions", es: "Sesiones", ar: "التدريبات" },
  "nav.apply": {
    en: "How to apply",
    fr: "Comment postuler",
    es: "Cómo aplicar",
    ar: "كيفية التقديم",
  },
  "nav.calendar": { en: "Calendar", fr: "Calendrier", es: "Calendario", ar: "التقويم" },
  "nav.contact": { en: "Contact", fr: "Contact", es: "Contacto", ar: "تواصل" },
  "cta.explore": {
    en: "Explore Catalogue",
    fr: "Voir le catalogue",
    es: "Ver catálogo",
    ar: "استكشف الدورات",
  },
  "cta.calendar": {
    en: "View Calendar",
    fr: "Voir le calendrier",
    es: "Ver calendario",
    ar: "عرض التقويم",
  },
  "cta.apply": { en: "Apply", fr: "Postuler", es: "Aplicar", ar: "قدّم الآن" },
  "cta.learnMore": {
    en: "Learn More",
    fr: "En savoir plus",
    es: "Saber más",
    ar: "اعرف المزيد",
  },
  "filter.all": { en: "All", fr: "Tous", es: "Todos", ar: "الكل" },
  "filter.topic": { en: "Topic", fr: "Thème", es: "Tema", ar: "الموضوع" },
  "filter.country": { en: "Country", fr: "Pays", es: "País", ar: "البلد" },
  "filter.language": { en: "Language", fr: "Langue", es: "Idioma", ar: "اللغة" },
  "filter.month": { en: "Month", fr: "Mois", es: "Mes", ar: "الشهر" },
};

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.en ?? key;
}
