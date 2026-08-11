import shape1 from "@/assets/course-shape-1.png.asset.json";
import shape2 from "@/assets/course-shape-2.png.asset.json";
import shape3 from "@/assets/course-shape-3.png.asset.json";

const fundamentalsImg = shape1.url;
const strategicImg = shape2.url;
const digitalImg = shape3.url;

export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  topics: string[];
  languages: string[]; // display codes: EN, FR, ES, AR
  level: "Core" | "Advanced" | "Specialized";
  duration: string;
  cover: string;
  downloads: { label: string; kind: "PDF" | "Guide" | "Video"; size?: string }[];
};

const OVERVIEW: Course["downloads"] = [
  { label: "Course Overview", kind: "PDF" },
  { label: "Training Materials", kind: "Guide" },
];

export const courses: Course[] = [
  {
    id: "c1",
    slug: "cva-the-fundamentals",
    title: "CVA – The Fundamentals",
    summary:
      "A 1-day face-to-face workshop establishing a common foundation in the core concepts of Cash and Voucher Assistance.",
    description:
      "The CALP Network's Fundamentals course is a 1-day face to face training workshop targeting all actors involved in humanitarian response. It aims to establish a foundation of knowledge in the fundamental concepts of Cash and Voucher Assistance (CVA) and provide a common basis for policymakers, planners and practitioners alike.",
    topics: ["CVA Fundamentals"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Core",
    duration: "1 Day",
    cover: fundamentalsImg,
    downloads: OVERVIEW,
  },
  {
    id: "c2",
    slug: "core-cva-skills-programme-staff-f2f",
    title: "Core CVA Skills for Programme Staff – Face to Face",
    summary:
      "Five days of face-to-face learning across the programme cycle for staff designing, implementing and monitoring CVA.",
    description:
      "The Core CVA Skills for Programme Staff course is delivered over 5 days in a face-to-face format. It is designed for programme staff responsible for the design, implementation, and monitoring of CVA programmes. Structured around the programme cycle, the course covers the core knowledge and skills required to effectively design, implement, and monitor CVA interventions. It takes a technical and programmatic approach, drawing on practical examples and case studies from a range of humanitarian sectors to support the application of learning in diverse operational contexts.",
    topics: ["CVA Fundamentals", "Programme Design & Implementation"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Core",
    duration: "5 Days",
    cover: strategicImg,
    downloads: OVERVIEW,
  },
  {
    id: "c3",
    slug: "core-cva-skills-programme-staff-online",
    title: "Core CVA Skills for Programme Staff – Online",
    summary:
      "The same programme-cycle curriculum delivered over 12 weeks in a facilitated online format.",
    description:
      "The Core CVA Skills for Programme Staff course is delivered over 12 weeks in an online facilitated format. It is designed for programme staff responsible for the design, implementation, and monitoring of CVA programmes. Structured around the programme cycle, the course covers the core knowledge and skills required to effectively design, implement, and monitor CVA interventions. It takes a technical and programmatic approach, drawing on practical examples and case studies from a range of humanitarian sectors to support the application of learning in diverse operational contexts.",
    topics: ["CVA Fundamentals", "Programme Design & Implementation"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Core",
    duration: "12 Weeks",
    cover: digitalImg,
    downloads: OVERVIEW,
  },
  {
    id: "c4",
    slug: "core-cva-skills-supply-chain-finance-ict",
    title: "Core CVA Skills for Supply Chain, Finance and ICT Staff",
    summary:
      "A 5-day course helping operations staff build a shared language and cross-functional readiness for CVA delivery.",
    description:
      "This is a 5-day course designed for operations staff to strengthen their understanding of the fundamentals of CVA, including CVA modalities, delivery mechanisms, operational implications, and the interoperability of different functions. The course enables participants to develop a shared understanding and common language around CVA programming. It aims to build participants' core competencies to effectively plan, support, and deliver CVA programmes, while promoting the exchange of best practices for key operational activities. The course also fosters cross-functional understanding and collaboration, helping to improve coordination, efficiency, and the overall quality of CVA programme delivery.",
    topics: ["CVA Fundamentals", "Operations (Supply Chain, Finance, ICT)"],
    languages: ["EN"],
    level: "Specialized",
    duration: "5 Days",
    cover: strategicImg,
    downloads: OVERVIEW,
  },
  {
    id: "c5",
    slug: "core-cva-skills-managers",
    title: "Core CVA Skills for Managers",
    summary:
      "A 2-day course equipping managers to integrate CVA into strategic programme management and coordination.",
    description:
      "This 2-day course is designed for managers with the aim of equipping participants to integrate CVA into strategic programme management and coordination. The course aims to inform participants about the latest trends and debates and look closely at how to be operationally ready to run quality CVA. The outcomes support and strengthen the decision-making processes undertaken by programme management staff in organisations that implement cash transfer programming.",
    topics: ["Leadership & Strategy"],
    languages: ["EN"],
    level: "Advanced",
    duration: "2 Days",
    cover: fundamentalsImg,
    downloads: OVERVIEW,
  },
  {
    id: "c6",
    slug: "core-cva-skills-donors",
    title: "Core CVA Skills for Donors",
    summary:
      "Modular sessions strengthening CVA considerations in donors' ways of working, including risk and compliance.",
    description:
      "This course aims to support and strengthen CVA-related considerations within donors' ways of working. The course will aim to inform participants about the latest trends and debates and look closely at specific topics (e.g. risk management & compliance) that are of particular relevance for the audience. This course can be delivered either F2F or online as independent modules, or over 1.5 days if all 6 modules are run consecutively.",
    topics: ["Leadership & Strategy"],
    languages: ["EN"],
    level: "Advanced",
    duration: "1.5 Days (modular)",
    cover: strategicImg,
    downloads: OVERVIEW,
  },
  {
    id: "c7",
    slug: "market-assessment-tools",
    title: "Market Assessment Tools Training",
    summary:
      "Hands-on training in RAM, MAG, EMMA and MSMA — understanding when and how to use each market assessment tool.",
    description:
      "This 5-day (with field work included, 3.5 days without) course covers a range of market assessment tools such as RAM, MAG, EMMA, and MSMA, and helps learners to understand when and how to use different tools.",
    topics: ["Markets & Assessment"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Specialized",
    duration: "5 Days (3.5 without field work)",
    cover: digitalImg,
    downloads: OVERVIEW,
  },
  {
    id: "c8",
    slug: "linking-cva-social-protection",
    title: "Linking Humanitarian CVA with Social Protection",
    summary:
      "A two-part course promoting dialogue between humanitarian staff and social protection stakeholders.",
    description:
      "To promote informed and on-going dialogue between humanitarian staff and SP stakeholders on the ways forward for linking SP and Humanitarian CVA in given regional or country contexts. The full course is delivered in two parts: Part 1 Introduction and Part 2 Design, when combined it is a one-day course. In Part 2 there is an option of an additional half day facilitated practical workshop for stakeholders interested in more technical assistance.",
    topics: ["Social Protection"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Advanced",
    duration: "1 Day (two parts)",
    cover: fundamentalsImg,
    downloads: OVERVIEW,
  },
  {
    id: "c9",
    slug: "monitoring-4-cva",
    title: "Monitoring 4 CVA",
    summary:
      "A 1-day course building field practitioners' confidence to monitor humanitarian cash and voucher programmes.",
    description:
      "This 1-day course aims to develop the knowledge, skills and confidence of field-based practitioners to support and undertake monitoring of humanitarian cash and voucher programmes. The course is based on CALP's Monitoring Guidance for CVA in Emergencies. It includes specific guidance on monitoring multi-purpose grants (MPGs), based on the learning from the ECHO ERC-funded Consortium for the uptake of quality, collaborative, multi-purpose grants.",
    topics: ["Monitoring & Evaluation"],
    languages: ["EN", "ES", "FR", "AR"],
    level: "Core",
    duration: "1 Day",
    cover: digitalImg,
    downloads: OVERVIEW,
  },
  {
    id: "c10",
    slug: "response-analysis",
    title: "Response Analysis",
    summary:
      "Three days of in-depth, scenario-based practice in response analysis and modality decision-making.",
    description:
      "This course tackles response analysis processes and modality and delivery mechanism decisions. It is a 3-day course which provides more in-depth practice and scenario-based learning.",
    topics: ["Response Analysis", "Markets & Assessment"],
    languages: ["EN", "ES", "FR"],
    level: "Advanced",
    duration: "3 Days",
    cover: strategicImg,
    downloads: OVERVIEW,
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function allTopics(): string[] {
  return Array.from(new Set(courses.flatMap((c) => c.topics))).sort();
}

export function allLanguages(): string[] {
  return Array.from(new Set(courses.flatMap((c) => c.languages))).sort();
}
