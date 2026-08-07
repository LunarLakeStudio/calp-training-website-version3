import { courses } from "./courses";

export type Training = {
  id: string;
  courseId: string;
  city: string;
  country: string;
  startDate: string; // ISO
  endDate: string;
  language: string; // EN | FR | ES | AR | Multi
  trainer: string;
  venue: string;
  deadline: string; // ISO
  format: "Face-to-Face" | "Online" | "Hybrid";
};

export const trainings: Training[] = [
  {
    id: "t1",
    courseId: "c1",
    city: "Amman",
    country: "Jordan",
    startDate: "2026-10-12",
    endDate: "2026-10-16",
    language: "EN",
    trainer: "Layla Haddad",
    venue: "CALP Regional Hub, Amman",
    deadline: "2026-09-20",
    format: "Face-to-Face",
  },
  {
    id: "t2",
    courseId: "c8",
    city: "Online",
    country: "Global",
    startDate: "2026-11-04",
    endDate: "2026-11-15",
    language: "EN",
    trainer: "Marcus Okafor",
    venue: "Virtual cohort",
    deadline: "2026-10-25",
    format: "Online",
  },
  {
    id: "t3",
    courseId: "c2",
    city: "Nairobi",
    country: "Kenya",
    startDate: "2026-12-01",
    endDate: "2026-12-12",
    language: "EN",
    trainer: "Aisha N'Diaye",
    venue: "Sarova Panafric",
    deadline: "2026-11-10",
    format: "Face-to-Face",
  },
  {
    id: "t4",
    courseId: "c4",
    city: "Dakar",
    country: "Senegal",
    startDate: "2026-09-22",
    endDate: "2026-09-26",
    language: "FR",
    trainer: "Jean-Baptiste Sarr",
    venue: "Radisson Blu Dakar",
    deadline: "2026-09-05",
    format: "Face-to-Face",
  },
  {
    id: "t5",
    courseId: "c7",
    city: "Bogotá",
    country: "Colombia",
    startDate: "2026-10-05",
    endDate: "2026-10-18",
    language: "ES",
    trainer: "María González",
    venue: "Casa CALP Bogotá",
    deadline: "2026-09-15",
    format: "Hybrid",
  },
  {
    id: "t6",
    courseId: "c5",
    city: "Beirut",
    country: "Lebanon",
    startDate: "2026-11-18",
    endDate: "2026-11-21",
    language: "AR",
    trainer: "Rami Khoury",
    venue: "Beirut Digital District",
    deadline: "2026-11-01",
    format: "Face-to-Face",
  },
  {
    id: "t7",
    courseId: "c6",
    city: "Bangkok",
    country: "Thailand",
    startDate: "2026-10-18",
    endDate: "2026-10-20",
    language: "EN",
    trainer: "Priya Chandran",
    venue: "UN Conference Centre",
    deadline: "2026-10-01",
    format: "Face-to-Face",
  },
  {
    id: "t8",
    courseId: "c3",
    city: "Online",
    country: "Global",
    startDate: "2026-09-14",
    endDate: "2026-10-14",
    language: "EN",
    trainer: "Elena Rossi",
    venue: "Self-paced platform",
    deadline: "2026-09-10",
    format: "Online",
  },
  {
    id: "t9",
    courseId: "c1",
    city: "Geneva",
    country: "Switzerland",
    startDate: "2027-02-02",
    endDate: "2027-02-06",
    language: "EN",
    trainer: "Sophie Laurent",
    venue: "Palais Wilson",
    deadline: "2027-01-15",
    format: "Face-to-Face",
  },
  {
    id: "t10",
    courseId: "c2",
    city: "Manila",
    country: "Philippines",
    startDate: "2027-01-19",
    endDate: "2027-01-30",
    language: "EN",
    trainer: "Ramon Cruz",
    venue: "Ateneo Rockwell",
    deadline: "2027-01-05",
    format: "Face-to-Face",
  },
  {
    id: "t11",
    courseId: "c6",
    city: "Ciudad de Panamá",
    country: "Panama",
    startDate: "2026-11-24",
    endDate: "2026-11-26",
    language: "ES",
    trainer: "Carmen Vega",
    venue: "Regional Humanitarian Hub",
    deadline: "2026-11-05",
    format: "Face-to-Face",
  },
  {
    id: "t12",
    courseId: "c4",
    city: "Kampala",
    country: "Uganda",
    startDate: "2027-03-09",
    endDate: "2027-03-13",
    language: "EN",
    trainer: "Grace Owino",
    venue: "Speke Resort",
    deadline: "2027-02-20",
    format: "Face-to-Face",
  },
  {
    id: "t13",
    courseId: "c5",
    city: "Istanbul",
    country: "Türkiye",
    startDate: "2027-02-16",
    endDate: "2027-02-19",
    language: "EN",
    trainer: "Zeynep Aydın",
    venue: "Istanbul Convention Centre",
    deadline: "2027-02-01",
    format: "Face-to-Face",
  },
  {
    id: "t14",
    courseId: "c7",
    city: "Online",
    country: "Global",
    startDate: "2027-03-23",
    endDate: "2027-04-03",
    language: "EN",
    trainer: "David Ochieng",
    venue: "Virtual cohort",
    deadline: "2027-03-10",
    format: "Online",
  },
  {
    id: "t15",
    courseId: "c8",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    startDate: "2027-04-06",
    endDate: "2027-04-10",
    language: "FR",
    trainer: "Fatou Diallo",
    venue: "Radisson Blu Abidjan",
    deadline: "2027-03-20",
    format: "Face-to-Face",
  },
  {
    id: "t16",
    courseId: "c3",
    city: "Amman",
    country: "Jordan",
    startDate: "2027-05-11",
    endDate: "2027-05-14",
    language: "AR",
    trainer: "Layla Haddad",
    venue: "CALP Regional Hub, Amman",
    deadline: "2027-04-25",
    format: "Face-to-Face",
  },
  {
    id: "t17",
    courseId: "c1",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2027-02-23",
    endDate: "2027-02-27",
    language: "EN",
    trainer: "Nadia Rahman",
    venue: "BRAC Learning Centre",
    deadline: "2027-02-10",
    format: "Face-to-Face",
  },
  {
    id: "t18",
    courseId: "c2",
    city: "Online",
    country: "Global",
    startDate: "2027-06-01",
    endDate: "2027-06-14",
    language: "EN",
    trainer: "Aisha N'Diaye",
    venue: "Virtual cohort",
    deadline: "2027-05-18",
    format: "Online",
  },
];

export function getTraining(id: string): Training | undefined {
  return trainings.find((t) => t.id === id);
}

export function getTrainingsForCourse(courseId: string): Training[] {
  return trainings
    .filter((t) => t.courseId === courseId)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getCourseForTraining(training: Training) {
  return courses.find((c) => c.id === training.courseId);
}

export type TrainingFilter = {
  country?: string;
  courseId?: string;
  language?: string;
  month?: string; // YYYY-MM
};

export function filterTrainings(f: TrainingFilter): Training[] {
  return trainings
    .filter((t) => (f.country ? t.country === f.country : true))
    .filter((t) => (f.courseId ? t.courseId === f.courseId : true))
    .filter((t) => (f.language ? t.language === f.language : true))
    .filter((t) => (f.month ? t.startDate.startsWith(f.month) : true))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function allCountries(): string[] {
  return Array.from(new Set(trainings.map((t) => t.country))).sort();
}

export function allTrainingLanguages(): string[] {
  return Array.from(new Set(trainings.map((t) => t.language))).sort();
}

export function upcomingTrainings(limit?: number): Training[] {
  const now = new Date().toISOString().slice(0, 10);
  const list = trainings
    .filter((t) => t.startDate >= now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return limit ? list.slice(0, limit) : list;
}
