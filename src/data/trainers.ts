import p01 from "@/assets/trainers/portrait-01.jpg";
import p02 from "@/assets/trainers/portrait-02.jpg";
import p03 from "@/assets/trainers/portrait-03.jpg";
import p04 from "@/assets/trainers/portrait-04.jpg";
import p05 from "@/assets/trainers/portrait-05.jpg";
import p06 from "@/assets/trainers/portrait-06.jpg";
import p07 from "@/assets/trainers/portrait-07.jpg";
import p08 from "@/assets/trainers/portrait-08.jpg";
import p09 from "@/assets/trainers/portrait-09.jpg";
import p10 from "@/assets/trainers/portrait-10.jpg";
import p11 from "@/assets/trainers/portrait-11.jpg";
import p12 from "@/assets/trainers/portrait-12.jpg";
import p13 from "@/assets/trainers/portrait-13.jpg";
import p14 from "@/assets/trainers/portrait-14.jpg";
import p15 from "@/assets/trainers/portrait-15.jpg";
import p16 from "@/assets/trainers/portrait-16.jpg";
import p17 from "@/assets/trainers/portrait-17.jpg";
import p18 from "@/assets/trainers/portrait-18.jpg";
import p19 from "@/assets/trainers/portrait-19.jpg";
import p20 from "@/assets/trainers/portrait-20.jpg";
import p21 from "@/assets/trainers/portrait-21.jpg";
import p22 from "@/assets/trainers/portrait-22.jpg";
import p23 from "@/assets/trainers/portrait-23.jpg";
import p24 from "@/assets/trainers/portrait-24.jpg";

const portraits = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12,
  p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24,
];

export type Trainer = {
  id: string;
  name: string;
  location: string;
  languages: string[];
  photo: string;
  region?: string | null;
  courseIds?: string[];
  featured?: boolean;
  organisation?: string;
  certifiedCourses?: string[];
  bio?: string;
  email?: string;
  linkedin?: string;
};


export const TRAINER_REGIONS = [
  "WCAF",
  "ESAF",
  "MENA",
  "Asia",
  "LAC",
  "Europe",
  "Global",
] as const;


const firstNames = [
  "Amina", "Fatou", "Layla", "Noor", "Zara", "Aisha", "Mariam", "Yasmin", "Salma", "Hana",
  "Kwame", "Chidi", "Musa", "Tariq", "Omar", "Idris", "Samir", "Rashid", "Kofi", "Sekou",
  "Elena", "Sofia", "Camila", "Lucia", "Isabela", "Valeria", "Ana", "Maria", "Paula", "Carmen",
  "Diego", "Mateo", "Andres", "Javier", "Rafael", "Luis", "Carlos", "Miguel", "Pablo", "Santiago",
  "Marie", "Claire", "Amelie", "Chloe", "Camille", "Julie", "Sarah", "Emma", "Nora", "Lea",
  "Jean", "Pierre", "Antoine", "Nicolas", "Louis", "Julien", "Thomas", "Maxime", "Hugo", "Adrien",
  "Priya", "Aditi", "Kavya", "Meera", "Anjali", "Divya", "Neha", "Riya", "Sana", "Ishani",
  "Rohan", "Arjun", "Vikram", "Karan", "Aarav", "Aditya", "Rahul", "Nikhil", "Siddharth", "Kabir",
  "Wei", "Ming", "Lin", "Xin", "Jia", "Yun", "Fang", "Hua", "Ling", "Mei",
  "Hiroshi", "Kenji", "Takumi", "Ryo", "Haruto", "Yuki", "Sora", "Kaito", "Ren", "Daichi",
];

const lastNames = [
  "Diallo", "Traoré", "Kamara", "Sesay", "Bello", "Adeyemi", "Okafor", "Mensah", "Nkomo", "Mwangi",
  "Al-Hassan", "El-Sayed", "Haddad", "Nasser", "Farah", "Bahri", "Rahmani", "Karimi", "Saidi", "Zaman",
  "García", "Martínez", "López", "Rodríguez", "González", "Hernández", "Pérez", "Sánchez", "Ramírez", "Torres",
  "Dubois", "Laurent", "Bernard", "Moreau", "Petit", "Lefevre", "Rousseau", "Girard", "Blanc", "Faure",
  "Sharma", "Patel", "Iyer", "Reddy", "Khan", "Singh", "Verma", "Gupta", "Kumar", "Das",
  "Wang", "Chen", "Liu", "Zhang", "Yang", "Huang", "Zhou", "Wu", "Sun", "Zhao",
  "Tanaka", "Suzuki", "Sato", "Yamamoto", "Ito", "Takahashi", "Watanabe", "Nakamura", "Kobayashi", "Kato",
];

const locations = [
  "Dakar, Senegal", "Nairobi, Kenya", "Abuja, Nigeria", "Kampala, Uganda", "Addis Ababa, Ethiopia",
  "Amman, Jordan", "Beirut, Lebanon", "Istanbul, Türkiye", "Cairo, Egypt", "Tunis, Tunisia",
  "Bogotá, Colombia", "Lima, Peru", "Mexico City, Mexico", "Buenos Aires, Argentina", "Panama City, Panama",
  "Paris, France", "Geneva, Switzerland", "Brussels, Belgium", "Madrid, Spain", "Rome, Italy",
  "London, United Kingdom", "Berlin, Germany", "Copenhagen, Denmark", "Oslo, Norway", "Stockholm, Sweden",
  "Delhi, India", "Dhaka, Bangladesh", "Kathmandu, Nepal", "Islamabad, Pakistan", "Colombo, Sri Lanka",
  "Bangkok, Thailand", "Jakarta, Indonesia", "Manila, Philippines", "Yangon, Myanmar", "Hanoi, Vietnam",
  "Kabul, Afghanistan", "Erbil, Iraq", "Sana'a, Yemen", "Juba, South Sudan", "Kinshasa, DRC",
  "Port-au-Prince, Haiti", "Tegucigalpa, Honduras", "Caracas, Venezuela", "Quito, Ecuador", "La Paz, Bolivia",
  "Cape Town, South Africa", "Maputo, Mozambique", "Antananarivo, Madagascar", "Bamako, Mali", "Ouagadougou, Burkina Faso",
];

const languageOptions = ["EN", "FR", "ES", "AR", "PT", "SW", "HI", "UR", "BN", "TR"];

function pickLanguages(i: number): string[] {
  const count = 2 + (i % 3); // 2–4 langs
  const langs = new Set<string>();
  langs.add("EN");
  for (let k = 0; k < count; k++) {
    langs.add(languageOptions[(i * 3 + k * 7) % languageOptions.length]);
  }
  return Array.from(langs);
}

export const trainers: Trainer[] = Array.from({ length: 200 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i * 13) % lastNames.length];
  const name = `${first} ${last}`;
  const courseCount = 1 + (i % 3);
  const courseIds = Array.from(
    { length: courseCount },
    (_, k) => `c${((i * 3 + k * 5) % 10) + 1}`,
  );
  return {
    id: `t${i + 1}`,
    name,
    location: locations[i % locations.length],
    languages: pickLanguages(i),
    photo: portraits[i % portraits.length],
    region: TRAINER_REGIONS[i % TRAINER_REGIONS.length],
    courseIds: Array.from(new Set(courseIds)),
  };
});


export function allTrainerLanguages(): string[] {
  return Array.from(new Set(trainers.flatMap((t) => t.languages))).sort();
}

export function allTrainerCountries(): string[] {
  return Array.from(
    new Set(trainers.map((t) => t.location.split(",").pop()!.trim())),
  ).sort();
}
