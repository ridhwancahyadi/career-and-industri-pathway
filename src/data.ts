import { SemesterData, CareerMatch, SkillChapter, Mentor, Internship, ActionPlan } from "./types";

export const studentProfile = {
  nim: "225150207111003",
  name: "Rizky Aditya Pratama",
  major: "S1 Ilmu Komunikasi (Communication Science)",
  university: "Universitas Negeri Surabaya (UNESA)",
  angkatan: "2023",
  currentSemester: 5,
  ipk: 3.42,
  totalSks: 97,
  careerGoal: "Social Media & Digital PR Specialist",
  targetSub: "PR & Branding Agency · Jakarta · Target: Juni 2026",
  careerReadinessScore: 67,
  learningStyle: "Visual + Kinesthetic (Creative Production & Case Studies)",
  topStrengths: ["Creative Storytelling", "Crisis PR Plan Formulation"],
  primaryGaps: ["Social Media Listening & Brand Monitoring (Brand24/Synthesio)", "SEO Copywriting & Web Traffic Analytics"]
};

export const semesters: SemesterData[] = [
  {
    number: 1,
    name: "Semester 1",
    academicYear: "2023/2024 Ganjil",
    status: "completed",
    sks: 20,
    cumulativeSks: 20,
    ipk: 3.21,
    cumulativeIpk: 3.21,
    courses: [
      { name: "Pengantar Ilmu Komunikasi", grade: "A-" },
      { name: "Sosiologi Komunikasi", grade: "B" },
      { name: "Teori Komunikasi Kualitatif", grade: "A-" },
      { name: "Pancasila & Identitas National", grade: "A" },
      { name: "Bahasa Indonesia Akademis", grade: "A" }
    ],
    skills: ["Communication Theory", "Sociological Analysis"],
    aiInsight: "Semester pertama berjalan luar biasa di Teori Komunikasi. Perkuat landasan metodologi serta pemahaman psikologi khalayak di semester depan."
  },
  {
    number: 2,
    name: "Semester 2",
    academicYear: "2023/2024 Genap",
    status: "completed",
    sks: 22,
    cumulativeSks: 42,
    ipk: 3.38,
    cumulativeIpk: 3.30,
    courses: [
      { name: "Komunikasi Massa & Digital", grade: "A-" },
      { name: "Psikologi Komunikasi", grade: "B+" },
      { name: "Fotografi & Sinematografi Dasar", grade: "A" },
      { name: "Komunikasi Antarpribadi", grade: "B+" },
      { name: "Bahasa Inggris untuk Komunikasi Bisnis", grade: "A" }
    ],
    skills: ["Visual Composition", "Interpersonal Communication", "Digital Media Dynamics"],
    aiInsight: "Kemampuan komparatif Fotografi & Sinematografi sangat menonjol. Ini menjadi bekal kuat untuk portofolio pembuatan aset konten digital."
  },
  {
    number: 3,
    name: "Semester 3",
    academicYear: "2024/2025 Ganjil",
    status: "completed",
    sks: 21,
    cumulativeSks: 63,
    ipk: 3.45,
    cumulativeIpk: 3.35,
    courses: [
      { name: "Hubungan Masyarakat (Public Relations)", grade: "A" },
      { name: "Komunikasi Organisasi", grade: "B+" },
      { name: "Penulisan Naskah Kampanye", grade: "A-" },
      { name: "Metode Penelitian Komunikasi Kuantitatif", grade: "B+" },
      { name: "Statistika Sosial & Analisis Audiens", grade: "B" }
    ],
    skills: ["Press Release Writing", "Survey Design", "Statistical Analysis (SPSS)"],
    aiInsight: "Sangat unggul di mata kuliah Hubungan Masyarakat & Penulisan Naskah. Pemahaman ini menjadi fondasi utama dalam merancang siaran pers (press release) yang efektif."
  },
  {
    number: 4,
    name: "Semester 4",
    academicYear: "2024/2025 Genap",
    status: "completed",
    sks: 22,
    cumulativeSks: 85,
    ipk: 3.52,
    cumulativeIpk: 3.42,
    courses: [
      { name: "Manajemen Kampanye Digital", grade: "A" },
      { name: "Komunikasi Krisis & Manajemen Isu", grade: "A-" },
      { name: "Kajian Media & Budaya Populer", grade: "B+" },
      { name: "Etika & Regulasi Penyiaran Siber", grade: "A" },
      { name: "Jurnalistik Multimedia & Audio-Visual", grade: "B+" }
    ],
    skills: ["Social Media Planning", "Media Monitoring", "Crisis Mitigation", "Copywriting Basics"],
    aiInsight: "Menguasai Manajemen Kampanye Digital dan Manajemen Isu secara prima. Kombinasi taktis yang meningkatkan peluang karir sebagai PR Strategist."
  },
  {
    number: 5,
    name: "Semester 5",
    academicYear: "Ganjil 2025/2026",
    status: "current",
    sks: 21,
    cumulativeSks: 97,
    ipk: 3.41,
    cumulativeIpk: 3.42,
    courses: [
      { name: "Analitik Media Sosial & Big Data", uts: 82 },
      { name: "Produksi Konten Kreatif Digital", uts: 78 },
      { name: "Hubungan Masyarakat Korporat (Corporate PR)", uts: 85 },
      { name: "Komunikasi Lintas Budaya & Global", uts: 76 },
      { name: "Etika Profesi & Hukum Komunikasi", uts: 91 }
    ],
    skills: ["Advanced Content Production", "Creative Campaign Pitching"],
    gaps: [
      { name: "Social Media Listening (Brand24/Synthesio)", status: "GAP", level: "Tinggi" },
      { name: "SEO & Digital Copywriting Optimization", status: "GAP", level: "Sedang" },
      { name: "Audience Profiling & Surveying", status: "OK" }
    ],
    aiInsight: "Semester ini berjalan sangat dinamis dengan estimasi IPK 3.41. Namun, terdapat gap dalam kompetensi analitik (Social Media Listening) dan optimasi SEO khalayak.",
    aiAction: "Selesaikan pelatihan Hubspot Social Media Certification dan kuasai tools analytics industri untuk memastikan kesiapan magang di atas 75%."
  },
  {
    number: 6,
    name: "Semester 6",
    academicYear: "Genap 2025/2026",
    status: "future",
    sks: 20,
    cumulativeSks: 117,
    ipk: 3.55,
    cumulativeIpk: 3.45,
    courses: [
      { name: "Manajemen Isu Komunikasi Kontemporer (Pilihan)" },
      { name: "Kapita Selekta Content Creation (Pilihan)" },
      { name: "Kerja Praktik / Magang MBKM PR Agency" }
    ],
    skills: ["Crisis PR Auditing", "Brand Strategy", "Data-Driven Advertising"],
    aiInsight: "Rencana AI: Ambil Program Magang Bersertifikat (MBKM) Public Relations di Ogilvy PR atau Telkomsel Corporate Communication Group.",
    aiProjection: "Melalui program magang bernilai tinggi ini, IPK kumulatif diprediksi bertahan stabil pada kisaran 3.55–3.62 saat kelulusan."
  },
  {
    number: 7,
    name: "Semester 7",
    academicYear: "Ganjil 2026/2027",
    status: "future",
    sks: 18,
    cumulativeSks: 135,
    ipk: 3.60,
    cumulativeIpk: 3.48,
    courses: [
      { name: "Metodologi Penelitian Komunikasi Kualitatif" },
      { name: "Audit Komunikasi Organisasi" },
      { name: "Capstone Project (CSR & Community Relations)" }
    ],
    skills: ["Communication Auditing", "Social Impact Assessment", "Campaign Evaluation"],
    aiInsight: "Rencana AI: Rancang Capstone Project berupa audit kesiapan isu keberlanjutan (ESG) pada merek telekomunikasi terkemuka."
  },
  {
    number: 8,
    name: "Semester 8",
    academicYear: "Genap 2026/2027",
    status: "future",
    sks: 6,
    cumulativeSks: 141,
    ipk: 3.70,
    cumulativeIpk: 3.50,
    courses: [
      { name: "Tugas Akhir / Skripsi (Praktik Kampanye PR)" }
    ],
    skills: ["Strategic Brand Governance"],
    aiInsight: "Rencana AI: Tugas Akhir berfokus pada efektivitas penanggulangan hoaks industri digital. Sinkronkan dengan penawaran rekrutmen pasca-magang.",
    aiProjection: "Target lulus berkompetensi tinggi tercapai dengan skor kesiapan karir di atas 92/100."
  }
];

export const careerTrajectoryData = [
  { name: "S1", actual: 12, predicted: 12, baseline: 12 },
  { name: "S2", actual: 28, predicted: 28, baseline: 28 },
  { name: "S3", actual: 41, predicted: 41, baseline: 41 },
  { name: "S4", actual: 55, predicted: 55, baseline: 55 },
  { name: "S5", actual: 67, predicted: 67, baseline: 65 },
  { name: "S6", actual: null, predicted: 78, baseline: 71 },
  { name: "S7", actual: null, predicted: 87, baseline: 74 },
  { name: "S8", actual: null, predicted: 94, baseline: 76 }
];

export const careerMatches: CareerMatch[] = [
  {
    title: "Social Media & Digital PR Specialist",
    companyType: "PR & Branding Agency",
    matchPercent: 88,
    salaryRange: "Rp 7.0 – 12.0 jt/bln (Regional: DKI Jakarta - Sourced from JobStreet Scraping as of June 15, 2026)",
    masteredSkills: ["Manajemen Kampanye Digital", "Digital Storytelling", "Press Release Writing", "Fotografi & Sinematografi Dasar"],
    gapSkills: ["Social Media Listening (Brand24/Synthesio)", "SEO Copywriting & Optimization"]
  },
  {
    title: "Corporate Communication Specialist",
    companyType: "Telecommunication Company",
    matchPercent: 76,
    salaryRange: "Rp 8.5 – 15.0 jt/bln (Regional: DKI Jakarta - Sourced from Glints Survey as of June 10, 2026)",
    masteredSkills: ["Hubungan Masyarakat (PR)", "Komunikasi Organisasi", "Crisis Comms & Issue Management"],
    gapSkills: ["Corporate Reputation Auditing", "Media Placement & Influencer Strategy"]
  },
  {
    title: "Content & Brand Strategist",
    companyType: "Tech & E-commerce System",
    matchPercent: 71,
    salaryRange: "Rp 7.5 – 13.0 jt/bln (Regional: Tangerang - Sourced from Kalibrr Scraping as of June 08, 2026)",
    masteredSkills: ["Manajemen Kampanye Digital", "Digital Media Dynamics", "Fotografi & Sinematografi Dasar"],
    gapSkills: ["SEO Copywriting & Web Traffic Analytics", "Brand Advocacy & Cyber Ethics"]
  },
  {
    title: "Media Relations & Press Officer",
    companyType: "Fintech Unicorn",
    matchPercent: 68,
    salaryRange: "Rp 9.0 – 14.5 jt/bln (Regional: DKI Jakarta - Sourced from JobStreet Scraping as of May 28, 2026)",
    masteredSkills: ["Press Release Writing", "Interpersonal Communication", "Komunikasi Massa & Digital"],
    gapSkills: ["Advanced Media Relations Networks", "Media Placement Strategy"]
  },
  {
    title: "ESG Communications Coordinator",
    companyType: "FMCG Conglomerate",
    matchPercent: 65,
    salaryRange: "Rp 8.0 – 13.5 jt/bln (Regional: Surabaya & Sidoarjo - Sourced from Glints Scraping as of June 02, 2026)",
    masteredSkills: ["Komunikasi Krisis & Manajemen Isu", "Penulisan Naskah Kampanye", "Komunikasi Organisasi"],
    gapSkills: ["ESG Narrative Formulation", "Social Impact Assessment"]
  },
  {
    title: "Public Relations Account Executive",
    companyType: "Global Communications Firm",
    matchPercent: 62,
    salaryRange: "Rp 6.0 – 10.0 jt/bln (Regional: DKI Jakarta - Sourced from Kalibrr Scraping as of May 15, 2026)",
    masteredSkills: ["Hubungan Masyarakat (PR)", "Bahasa Inggris untuk Komunikasi Bisnis", "Komunikasi Antarpribadi"],
    gapSkills: ["Integrated Brand Advocacy Plans", "Media Placement & Influencer Strategy"]
  },
  {
    title: "Digital Campaign Analyst",
    companyType: "SaaS Industry",
    matchPercent: 57,
    salaryRange: "Rp 7.0 – 11.5 jt/bln (Regional: Bandung - Sourced from Glints Scraping as of May 24, 2026)",
    masteredSkills: ["Manajemen Kampanye Digital", "Statistika Sosial & Analisis Audiens", "Komunikasi Massa & Digital"],
    gapSkills: ["Social Media Listening (Brand24/Synthesio)", "Advanced Social Hearing Auditing"]
  },
  {
    title: "Employee Relations Advisor",
    companyType: "Manufacturing Conglomerate",
    matchPercent: 54,
    salaryRange: "Rp 6.5 – 10.5 jt/bln (Regional: Gresik & Surabaya - Sourced from JobStreet Scraping as of June 12, 2026)",
    masteredSkills: ["Komunikasi Organisasi", "Psikologi Komunikasi", "Komunikasi Antarpribadi"],
    gapSkills: ["Internal Corporate Reputation Auditing", "Crisis Comms & Issue Management"]
  },
  {
    title: "Crisis Consulting Expert",
    companyType: "Political & PR Advisory",
    matchPercent: 49,
    salaryRange: "Rp 15.0 – 25.0 jt/bln (Regional: DKI Jakarta - Sourced from Executive Search as of May 11, 2026)",
    masteredSkills: ["Komunikasi Krisis & Manajemen Isu", "Metode Penelitian Komunikasi Kuantitatif", "Teori Komunikasi Kualitatif"],
    gapSkills: ["Advanced Social Hearing Auditing", "Crisis Comms Auditing"]
  },
  {
    title: "Government Relations Associate",
    companyType: "State-Owned Enterprise / BUMN",
    matchPercent: 42,
    salaryRange: "Rp 8.0 – 12.5 jt/bln (Regional: DKI Jakarta - Sourced from Portal BUMN as of June 14, 2026)",
    masteredSkills: ["Komunikasi Organisasi", "Hubungan Masyarakat (PR)", "Etika & Regulasi Penyiaran Siber"],
    gapSkills: ["Crisis Comms Auditing", "Corporate Reputation Auditing"]
  }
];

export const skillChapters: SkillChapter[] = [
  {
    id: "chapter1",
    number: 1,
    title: "Fondasi Komunikasi & Humas",
    status: "completed",
    progressText: "5/5 Selesai",
    skills: [
      { name: "Teori & Sosiologi Komunikasi", status: "Dikuasai" },
      { name: "Public Speaking & Key Messaging", status: "Dikuasai" },
      { name: "Creative Script & Press Writing", status: "Dikuasai" },
      { name: "Basic Audio-Visual Production", status: "Dikuasai" },
      { name: "Media Relations & Press Conference", status: "Dikuasai" }
    ]
  },
  {
    id: "chapter2",
    number: 2,
    title: "Komunikasi Digital & Analitik",
    status: "in_progress",
    progressText: "3/5 Selesai",
    skills: [
      { name: "Strategi Konten Media Sosial", status: "Dikuasai" },
      { name: "Manajemen Kampanye Digital", status: "Dikuasai" },
      { name: "Audience Surveying & Profiling", status: "Dikuasai" },
      {
        name: "Social Media Listening (Brand24/Synthesio)",
        status: "GAP",
        priority: "Tinggi",
        actionCard: {
          title: "Belajar Social Media Listening & Brand Sentiment",
          platform: "HubSpot Academy",
          duration: "16 Jam",
          cost: "Gratis",
          buttonText: "Mulai Pelatihan"
        }
      },
      {
        name: "SEO Copywriting & Optimization",
        status: "GAP",
        priority: "Sedang",
        actionCard: {
          title: "Introduction to SEO for Digital Writers",
          platform: "Coursera Tutorial",
          duration: "12 Jam",
          cost: "Rp 120.000",
          buttonText: "Beli Sertifikasi"
        }
      }
    ]
  },
  {
    id: "chapter3",
    number: 3,
    title: "Komunikasi Strategis & Krisis",
    status: "locked",
    aiLockedNote: "Buka chapter ini setelah menyelesaikan Chapter 2. Estimasi pengerjaan: 3–4 bulan.",
    skills: [
      { name: "Crisis Comms & Issue Management", status: "LOCKED" },
      { name: "Corporate Reputation Auditing", status: "LOCKED" },
      { name: "CSR Campaign & Community Development", status: "LOCKED" },
      { name: "Media Placement & Influencer Strategy", status: "LOCKED" },
      { name: "ESG Narrative Formulation", status: "LOCKED" }
    ]
  },
  {
    id: "chapter4",
    number: 4,
    title: "Spesialisasi Brand Advocacy",
    status: "locked",
    aiLockedNote: "Buka setelah memahami pondasi reputasi dan audit komunikasi korporatif.",
    skills: [
      { name: "Brand Advocacy Law & Cyber Ethics", status: "LOCKED" },
      { name: "B2B & Enterprise PR Negotiation", status: "LOCKED" },
      { name: "Data-Driven Public Campaign", status: "LOCKED" },
      { name: "Advanced Social Hearing Auditing", status: "LOCKED" }
    ]
  }
];

export const actionPlans: ActionPlan[] = [
  {
    month: "Bulan 1",
    title: "Kuasai Media Listening Tools",
    resource: "HubSpot Social Media Monitoring Certification (Free, 16 jam)",
    target: "4 jam / minggu",
    outcome: "+8 Poin Kesiapan Karir",
    progress: 0,
    borderColor: "border-amber-500"
  },
  {
    month: "Bulan 2",
    title: "SEO Copywriting & Optimization",
    resource: "Coursera: Writing for SEO & Audience Strategy (Rp 120.000)",
    target: "3 jam / minggu",
    outcome: "+6 Poin Kesiapan Karir",
    progress: 0,
    borderColor: "border-blue-500"
  },
  {
    month: "Bulan 3",
    title: "Audit Riset Khusus Audiens",
    resource: "Buku: Brand Sentiment Audit & YouTube Social Listening Guides",
    target: "5 jam / minggu",
    outcome: "+10 Poin Kesiapan Karir",
    progress: 0,
    borderColor: "border-teal-500"
  }
];

export const internships: Internship[] = [
  {
    id: "ogilvy",
    company: "Ogilvy PR Indonesia",
    program: "Magang Bersertifikat Kampus Merdeka",
    role: "Public Relations Specialist Intern",
    duration: "6 Bulan (Februari – Juli 2026)",
    sks: 20,
    location: "Jakarta (Hybrid)",
    matchScore: 92,
    skillsMatch: ["Hubungan Masyarakat (PR)", "Creative Script Writing", "Digital Storytelling"],
    skillsToDevelop: ["Media Listening Tools", "Crisis Communication Plans"],
    aiReason: "Ogilvy mencari mahasiswa beralas penulisan naskah (Scriptwriting) & PR kuat. Celah Brand Monitoring akan didukung pelatihan korporat berskala global.",
    badge: "🏆 Paling Sesuai"
  },
  {
    id: "telkomsel",
    company: "PT Telkomsel Indonesia",
    program: "Studi Independen Bersertifikat",
    role: "Brand Communicator Trainee",
    duration: "4 Bulan",
    sks: 14,
    location: "Online",
    matchScore: 79,
    skillsMatch: ["Komunikasi Massa", "Manajemen Isu", "Fotografi Dasar"],
    skillsToDevelop: ["Corporate Governance Narratives", "Public Opinion Mapping"],
    aiReason: "Cocok untuk memahami birokrasi komunikasi korporat dan pembajakan penonton (audience hijacking) industri telekomunikasi terbesar."
  },
  {
    id: "kumparan",
    company: "Kumparan Media Group",
    program: "Magang Industri Mandiri",
    role: "Digital Campaign Associate",
    duration: "3 Bulan",
    sks: 10,
    location: "Jakarta (Onsite)",
    matchScore: 72,
    skillsMatch: ["Photography Basics", "Copywriting Basics"],
    skillsToDevelop: ["SEO Advanced Writing", "Interactive Storytelling Layouts"],
    aiReason: "Menuntut ritme kerja kreatif media online yang tinggi, membangun resume solid di dunia media relations nasional."
  }
];

export const mentors: Mentor[] = [
  {
    id: "mentor1",
    name: "Rania Amanda Putri",
    initials: "RA",
    batch: "Angkatan 2019",
    role: "Senior Associate Public Relations",
    company: "Ogilvy PR Indonesia",
    location: "Jakarta",
    experience: "4 tahun",
    aiReason: "Rania memiliki spesialisasi penanganan krisis PR korporat, lulus UNESA dengan IPK 3.52 dan memulai karirnya di agensi branding murni sebelum mengelola klien teknologi raksasa.",
    tags: ["Crisis Comms", "Brand Strategy", "Creative Writing", "Account Service"],
    similarity: ["🎓 Prodi sama", "💼 Target industri sama", "📍 Lokasi Jakarta"]
  },
  {
    id: "mentor2",
    name: "Dewi Rahayu Putri",
    initials: "DR",
    batch: "Angkatan 2020",
    role: "Corporate Communication Specialist",
    company: "PT GoTo Gojek Tokopedia Tbk",
    location: "Jakarta",
    experience: "3 tahun",
    aiReason: "Dewi menguasai public narrative dan rilis pers berbasis ESG berskala multinasional, berpengalaman memandu program magang komunikasi siber.",
    tags: ["Corporate Communications", "PR Campaign Analysis", "ESG Narrative", "Media Pitching"],
    similarity: ["🎓 Prodi sama", "📍 Lokasi Jakarta"]
  },
  {
    id: "mentor3",
    name: "Budi Santoso",
    initials: "BS",
    batch: "Angkatan 2018",
    role: "Digital Marketing Lead",
    company: "Narasi Kreatif Nusantara (Narasi TV)",
    location: "Jakarta",
    experience: "5 tahun",
    aiReason: "Budi ahli dalam orkestrasi kampanye sosial khalayak masif, membantu memahami media placement taktis dan kemitraan KOL strategis.",
    tags: ["Digital Campaigns", "Social Listening Analytics", "KOL Recruitment", "Audience Engagement"],
    similarity: ["🎓 Prodi sama", "📍 Lokasi Jakarta"]
  },
  {
    id: "mentor4",
    name: "Sari Indah Lestari",
    initials: "SI",
    batch: "Angkatan 2021",
    role: "Social Media Strategist",
    company: "Shopee Indonesia Operations",
    location: "Jakarta",
    experience: "2 tahun",
    aiReason: "Sari beralih sukses dari program magang Kampus Merdeka ke posisi full-time. Sangat relevan diajak berdiskusi teknis portofolio kampanye PR digital.",
    tags: ["Social Media Trends", "Digital Copywriting", "TikTok Campaign", "Analytics Reporting"],
    similarity: ["🎓 Prodi sama", "💼 Target industri sama", "📍 Lokasi Jakarta"]
  },
  {
    id: "mentor5",
    name: "Fajar Nugroho",
    initials: "FN",
    batch: "Angkatan 2018",
    role: "Corporate & Communications Manager",
    company: "Google Southeast Asia",
    location: "Singapore",
    experience: "6 tahun",
    aiReason: "Fajar mengelola reputasi regional google siber di Asia Tenggara. Sangat andal memberikan perspektif strategis tingkat global.",
    tags: ["Global PR Strategy", "Tech Regulatory", "Cross-cultural Communication", "High-Stakes Crisis"],
    similarity: ["🎓 Prodi sama", "📍 Top Student"]
  }
];

export const trendingSkills = [
  { name: "Public Relations (PR)", value: 89, hasIt: true, scale: "green" },
  { name: "Social Media Analytics", value: 82, hasIt: true, scale: "green" },
  { name: "Social Media Listening", value: 71, hasIt: false, scale: "rose" },
  { name: "SEO Copywriting", value: 68, hasIt: false, scale: "rose" },
  { name: "Crisis Communication", value: 61, hasIt: true, scale: "green" },
  { name: "Corporate PR Strategy", value: 54, hasIt: true, scale: "green" },
  { name: "Media Auditing & Analytics", value: 49, hasIt: false, scale: "rose" },
  { name: "ESG & Sustainability PR", value: 45, hasIt: false, scale: "amber" }
];
