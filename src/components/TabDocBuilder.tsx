import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Sparkle, 
  Copy, 
  Download, 
  Check, 
  ArrowsClockwise, 
  Envelope,
  Plus,
  Trash,
  Info,
  CheckSquare
} from "@phosphor-icons/react";
import { studentProfile } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface JdTemplate {
  id: string;
  role: string;
  company: string;
  keywords: string[];
  description: string;
}

const targetJds: JdTemplate[] = [
  {
    id: "tokopedia",
    role: "Corporate Communication Specialist Intern",
    company: "Tokopedia",
    keywords: ["Brand Advocacy", "Crisis PR", "Media Listening", "Brand24", "Campaign Strategy", "Press Release", "Agile"],
    description: "Membangun strategi komunikasi korporat, mengelola krisis PR, analisis media listening menggunakan Brand24, mendesain campaign kreatif, menyusun press release resmi, serta berkolaborasi dalam tim Agile."
  },
  {
    id: "goto",
    role: "Marketing Communication Trainee",
    company: "GoTo Group",
    keywords: ["Copywriting", "SEO Copywriting", "Social Media", "KAMPANYE KREATIF", "Brand Monitoring", "Content Analytics", "Agile"],
    description: "Merancang pesan copywriting promosi, optimasi SEO Copywriting, kelola akun social media, merancang KAMPANYE KREATIF, monitoring kompetitor, serta kerja sama tim Scrum Agile."
  },
  {
    id: "bca",
    role: "CSR & Media Relations Intern",
    company: "BCA",
    keywords: ["CSR Strategy", "Media Relations", "Press Conference", "CSR Program", "Brand Reputation", "Stakeholder Engagement", "Documentation"],
    description: "Merumuskan strategi CSR berkelanjutan, menjaga relasi media pers, mengorganisir press conference, menyusun rilis program CSR, menjaga reputasi brand korporat."
  }
];

const PRESET_SUMMARY_TOKOPEDIA = "Mahasiswa S1 Ilmu Komunikasi Universitas Negeri Surabaya (UNESA) berprestasi (IPK 3.42) dengan 97 SKS selesai. Fokus pada strategi kehumasan kreatif, media listening menggunakan Brand24, serta penulisan press release korporat. Berpengalaman dalam metodologi Agile Scrum dan manajemen krisis komunikasi, berkomitmen meningkatkan reputasi korporat di era digital.";
const PRESET_SUMMARY_GOTO = "Mahasiswa S1 Ilmu Komunikasi Universitas Negeri Surabaya (UNESA) berprestasi (IPK 3.42). Fokus membangun copywriting kreatif, optimasi SEO, serta manajemen kampanye media sosial multi-platform. Berkolaborasi aktif menggunakan Scrum Agile untuk mengembangkan brand awareness produk skala nasional.";
const PRESET_SUMMARY_BCA = "Mahasiswa S1 Ilmu Komunikasi Universitas Negeri Surabaya (UNESA) (IPK 3.42) dengan spesialisasi CSR & Media Relations. Berpengalaman membina hubungan baik dengan media nasional, merancang program CSR berdampak sosial, serta mengorganisir press conference yang efektif.";

export default function TabDocBuilder() {
  const [activeSubTab, setActiveSubTab] = useState<"cv" | "letter">("cv");
  
  // State for CV fields
  const [cvName, setCvName] = useState<string>(studentProfile.name);
  const [cvEmail, setCvEmail] = useState<string>("rizky.aditya@student.unesa.ac.id");
  const [cvPhone, setCvPhone] = useState<string>("+62 812-7482-1925");
  const [cvLinkedin, setCvLinkedin] = useState<string>("linkedin.com/in/rizkyaditya");
  const [cvGithub, setCvGithub] = useState<string>("linkedin.com/in/rizkyaditya-pr");
  const [cvSummary, setCvSummary] = useState<string>(
    "Mahasiswa S1 Ilmu Komunikasi semester 5 di Universitas Negeri Surabaya (UNESA) dengan IPK 3.42. Memiliki pengalaman praktis dalam perencanaan kampanye PR kreatif, penulisan siaran pers (press release), serta analisis performa media sosial. Aktif mengembangkan skill Media Listening dengan platform Brand24 untuk merespons krisis reputasi dengan cepat dan berkolaborasi secara solid."
  );

  // Skills
  const [cvSkills, setCvSkills] = useState<Array<{ name: string; level: number }>>([
    { name: "Public Relations Strategy", level: 85 },
    { name: "SEO & Copywriting", level: 80 },
    { name: "Media Listening (Brand24)", level: 35 },
    { name: "Crisis Communication Planning", level: 75 },
    { name: "Social Media Analytics", level: 80 },
    { name: "Agile Project Coordination", level: 70 }
  ]);

  // Projects
  const [cvProjects, setCvProjects] = useState<Array<{ title: string; period: string; desc: string }>>([
    { 
      title: "Riset Audiens & Kampanye Digital Branding UNESA", 
      period: "Semester 4", 
      desc: "Merancang dan mengeksekusi kampanye kesadaran merek digital melalui Instagram dan TikTok untuk mitra mahasiswa, menghasilkan kenaikan keterlibatan sebesar 42%." 
    },
    { 
      title: "Penyusunan Crisis PR Simulation Protocol", 
      period: "Semester 4", 
      desc: "Menyusun skenario penanganan krisis reputasi korporat fiktif, mengkoordinir siaran pers simulasi darurat, dan mengorganisir simulasi konferensi pers kelompok." 
    },
    { 
      title: "Analisis Opini Publik Pilkada Jawa Timur", 
      period: "Semester 3", 
      desc: "Melakukan analisis deskriptif kualitatif sentimen media massa cetak dan digital terkait citra audiens calon gubernur menggunakan matriks komunikasi politik." 
    }
  ]);

  // Certifications
  const [cvCerts, setCvCerts] = useState<string[]>([
    "Sertifikasi Kompetensi Humas Muda (BNSP-2024)",
    "HubSpot: Inbound Marketing Certified (2023)"
  ]);

  // Interactive ATS Job Targeting State
  const [selectedJdId, setSelectedJdId] = useState<string>("tokopedia");
  const [customJdText, setCustomJdText] = useState<string>(
    "Kami mencari Corporate Communication Specialist yang memiliki pemahaman tentang humas dan penulisan press release. Berpengalaman dalam strategi kampanye reputasi, menguasai monitoring media eksternal (media listening), serta mampu berkolaborasi aktif menggunakan Agile dalam iklim dinamika agensi."
  );
  
  const [atsEyeTrack, setAtsEyeTrack] = useState<boolean>(true); // Eye track matches highlight in A4
  const [atsAuditing, setAtsAuditing] = useState<boolean>(false);
  const [summaryGenerating, setSummaryGenerating] = useState<boolean>(false);
  const [bulletEnhancing, setBulletEnhancing] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [aligningAtsLoad, setAligningAtsLoad] = useState<boolean>(false);

  // New High-Fidelity ATS & CV Features
  const [cvTemplateStyle, setCvTemplateStyle] = useState<"ats" | "creative">("ats");
  const [viewMode, setViewMode] = useState<"live" | "raw_text">("live");
  const [atsScoreExpanded, setAtsScoreExpanded] = useState<boolean>(true);

  // Extract keywords based on simple dictionary if user pastes custom description
  const extractKeywordsFromText = (text: string): string[] => {
    const commonTechKeywords = [
      "Node.js", "REST API", "SQL", "PostgreSQL", "Docker", "Git", "Agile", "Redis", 
      "Microservices", "Security", "Unit Testing", "Python"
    ];
    const lowercaseText = text.toLowerCase();
    const found = commonTechKeywords.filter(kw => {
      const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      return regex.test(lowercaseText);
    });
    return found.length > 0 ? found : ["Node.js", "REST API", "PostgreSQL", "SQL"];
  };

  const getActiveKeywords = () => {
    if (selectedJdId === "custom") {
      return extractKeywordsFromText(customJdText);
    }
    const jd = targetJds.find(j => j.id === selectedJdId);
    return jd ? jd.keywords : ["Node.js", "REST API", "PostgreSQL", "SQL"];
  };

  const activeKeywords = getActiveKeywords();

  // Dynamic Real-time ATS Parsing Analyzer logic
  const cvFullTextForAts = [
    cvSummary,
    ...cvProjects.map(p => p.title + " " + p.desc),
    ...cvSkills.map(s => s.name),
    ...cvCerts
  ].join(" ").toLowerCase();

  const matchedKeywords = activeKeywords.filter(kw => {
    const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    return regex.test(cvFullTextForAts);
  });

  const missingKeywords = activeKeywords.filter(kw => !matchedKeywords.includes(kw));

  // 1. Keyword Score (Max 40)
  const scoreKeyword = activeKeywords.length > 0 
    ? Math.round((matchedKeywords.length / activeKeywords.length) * 40) 
    : 0;

  // 2. Action Verbs Score (Max 20)
  const actionVerbsList = [
    "membangun", "merancang", "memangkas", "mengoptimalkan", "mengembangkan", 
    "mengintegrasikan", "implementasi", "mengonseptualisasikan", "kolaborasi", 
    "menyinkronkan", "analisis", "built", "engineered", "optimized", "implemented", 
    "designed", "menulis"
  ];
  const matchedVerbs = actionVerbsList.filter(verb => cvFullTextForAts.includes(verb));
  let scoreVerbs = 0;
  if (matchedVerbs.length >= 4) scoreVerbs = 20;
  else if (matchedVerbs.length >= 2) scoreVerbs = 15;
  else if (matchedVerbs.length >= 1) scoreVerbs = 10;

  // 3. Quantifiable Achievements metrics (Max 30)
  const hasPercentage = /%/.test(cvFullTextForAts);
  const hasNumbers = /\b\d+\b/.test(cvFullTextForAts);
  let scoreQuantify = 10; // Baseline format points
  if (hasPercentage) scoreQuantify += 10;
  if (hasNumbers) scoreQuantify += 10;

  // 4. Formatting standards (Max 10)
  const scoreLayout = 10; // A4 standard compliant single-column layout

  const currentAtsScore = scoreKeyword + scoreVerbs + scoreQuantify + scoreLayout;

  // Cover Letter states
  const [clRole, setClRole] = useState<string>("Corporate Communication Specialist Intern — Tokopedia (MBKM)");
  const [clTone, setClTone] = useState<string>("tech_forward");
  const [clHighlights, setClHighlights] = useState<string[]>([
    "ipk", "rest_api", "fintech"
  ]);
  const [clGenerating, setClGenerating] = useState<boolean>(false);
  const [clGenerated, setClGenerated] = useState<boolean>(true); // Pre-generated
  const [clContent, setClContent] = useState<string>(`Surabaya, 11 Juni 2026

Tim Rekrutmen MBKM
PT Tokopedia (GoTo Group)
Jakarta

Perihal: Lamaran Program Magang Bersertifikat — Corporate Communication Specialist

Dengan hormat,

Perkenalkan, saya Rizky Aditya Pratama, mahasiswa semester 5 Program Studi Ilmu Komunikasi di Universitas Negeri Surabaya (UNESA) dengan IPK 3.42. Saya mengajukan lamaran untuk Program Magang Bersertifikat posisi Corporate Communication Specialist di Tokopedia sebagai bagian dari program MBKM semester genap 2025/2026.

Selama lima semester perkuliahan, saya telah membangun fondasi teoretis dan praktis yang solid dalam komunikasi korporat: mulai dari perencanaan kampanye humas kreatif, penyusunan press release, media relations, hingga pengukuran sentiment audiens digital. Proyek akademik yang paling relevan adalah penyusunan proposal program kampanye brand advocacy berbasis mahasiswa untuk UNESA, yang mencakup taktik branding media sosial, manajemen konten, serta simulasi manajemen krisis humas — keterampilan yang relevan dengan ekosistem dinamis Tokopedia.

Saya sangat tertarik dengan Tokopedia karena dua alasan spesifik. Pertama, reputasi Tokopedia sebagai pelopor e-commerce nasional yang memiliki strategi komunikasi inovatif — mengelola reputasi publik di tengah jutaan transaksi harian adalah tantangan belajar yang luar biasa untuk mengasih insting taktis PR saya. Kedua, budaya kerja terbuka di Tokopedia memberikan peluang emas untuk berkolaborasi lintas divisi secara dinamis, yang selaras dengan nilai-nilai komunikasi profesional yang saya pelajari.

Saya menyadari bahwa saat ini saya masih melengkapi kepakaran saya dalam Media Listening & Brand Monitoring (Brand24) — kompetensi yang saya pahami krusial untuk melacak sentimen publik Tokopedia. Sebagai bentuk komitmen aktif, saya sedang menuntaskan kursus analisis brand sentiment dan media listening bersertifikat mandiri demi mempercepat kesiapan kerja saya menjelang program dimulai.

Saya melampirkan CV dan portfolio kampanye digital saya sebagai bahan pertimbangan. Saya sangat senang dengan kesempatan mendiskusikan lebih jauh mengenai kontribusi yang dapat saya hadirkan di Tokopedia.

Terima kasih atas bimbingan dan perhatian Bapak/Ibu.

Hormat saya,

Rizky Aditya Pratama
rizky.aditya@student.unesa.ac.id | +62 812-7482-1925
linkedin.com/in/rizkyaditya | linkedin.com/in/rizkyaditya-pr`);

  const handleAuditAts = () => {
    setAtsAuditing(true);
    setTimeout(() => {
      setAtsAuditing(false);
    }, 800);
  };

  const handleGenerateSummary = () => {
    setSummaryGenerating(true);
    setTimeout(() => {
      setSummaryGenerating(false);
      setCvSummary(
        "Mahasiswa S1 Ilmu Komunikasi Universitas Negeri Surabaya (UNESA) (IPK 3.42 / 97 SKS) dengan fokus mendalam pada Public Relations, Social Media Branding, dan Crisis Communications. Berkomitmen kuat memformulasikan narasi korporas yang strategis serta terampil mengaplikasikan tools monitoring s0cial media."
      );
    }, 700);
  };

  const handleEnhanceBullets = () => {
    setBulletEnhancing(true);
    setTimeout(() => {
      setBulletEnhancing(false);
      const enhancedProj = [...cvProjects];
      enhancedProj[0] = {
        title: "Daftar Portofolio Kampanye Branding Kreatif (Digital Branding)",
        period: "Semester 4",
        desc: "Merancang proposal kampanye branding kreatif berbasis mahasiswa UNESA, meningkatkan keterlibatan (engagement rate) audiens media sosial sebesar 42% melalui audiens targeting taktis."
      };
      setCvProjects(enhancedProj);
    }, 800);
  };

  // Quick Inject missing keyword directly inside Resume Summary gracefully
  const handleQuickInjectKeyword = (keyword: string) => {
    if (cvSummary.toLowerCase().includes(keyword.toLowerCase())) return;
    setCvSummary(prev => {
      const sentence = ` Memiliki pemahaman kuat mengenai implementasi teknik ${keyword} pada ekosistem komunikasi digital.`;
      return prev + sentence;
    });
  };

  // Smart Surgical Auto-Optimization of the CV text to hit 95%+ ATS Score
  const handleAtsAutoAlign = () => {
    setAligningAtsLoad(true);
    setTimeout(() => {
      setAligningAtsLoad(false);
      
      // Select appropriate preset text depending on JD
      if (selectedJdId === "tokopedia") {
        setCvSummary(PRESET_SUMMARY_TOKOPEDIA);
        const projects = [...cvProjects];
        projects[0] = {
          title: "Riset Audiens & Kampanye Digital Branding UNESA",
          period: "Semester 4",
          desc: "Merancang proposal kampanye brand advocacy di media sosial Tokopedia, menjangkau 5.000+ audiens mahasiswa, mengintegrasikan analisis Media Listening Brand24 serta didukung kerangka Agile."
        };
        setCvProjects(projects);
        
        // Boost Media Listening skill level to reflect active learning
        const skills = [...cvSkills];
        const mediaIdx = skills.findIndex(s => s.name.includes("Media Listening"));
        if (mediaIdx !== -1) {
          skills[mediaIdx].level = 75;
          setCvSkills(skills);
        }
      } else if (selectedJdId === "goto") {
        setCvSummary(PRESET_SUMMARY_GOTO);
        const projects = [...cvProjects];
        projects[0] = {
          title: "Creative SEO Content Plan & Copywriting",
          period: "Semester 4",
          desc: "Mengembangkan riset kata kunci dan SEO Copywriting, meningkatkan kunjungan organik blog sebesar 45% melalui penulisan konten promotif teroptimasi dalam sprint Agile korporasi."
        };
        setCvProjects(projects);
      } else {
        // BCA
        setCvSummary(PRESET_SUMMARY_BCA);
        const projects = [...cvProjects];
        projects[0] = {
          title: "CSR & Media Relations Strategic Plan",
          period: "Semester 4",
          desc: "Membangun program hubungan media strategis, merancang siaran pers publikasi CSR nasional, divalidasi dengan coverage report media terverifikasi."
        };
        setCvProjects(projects);
      }
    }, 900);
  };

  const handleAddCert = () => {
    setCvCerts([...cvCerts, "Universitas Negeri Surabaya: Workshop Media Listening & Crisis Communication (2026)"]);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(activeSubTab === "cv" ? cvSummary : clContent);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleGenerateCoverLetter = () => {
    setClGenerating(true);
    setTimeout(() => {
      setClGenerating(false);
      setClGenerated(true);
      setClContent(`Surabaya, 14 Juni 2026

Tim Rekrutmen Coorporate Relations
PT Ogilvy PR Indonesia
Jakarta

Perihal: Lamaran Program Magang Bersertifikat — Social Media & Public Relations Intern

Dengan hormat,

Berdasarkan rekomendasi otomatis analisis ACIP, saya Rizky Aditya Pratama, mahasiswa Ilmu Komunikasi berprestasi dari Universitas Negeri Surabaya (UNESA) (IPK 3.42) bermaksud mengajukan lamaran magang Public Relations Specialist di Ogilvy Indonesia. Saya menargetkan mengaplikasikan pemahaman kampanye draf krisis reputasi saya secara aktif sebelum program Kampus Merdeka Semester 6 dimulai.

Didukung bekal 5 semester penguasaan Public Relations, analisis s0cial media, dan penulisan kreatif, saya meyakini dapat langsung berkontribusi pada penyusunan rilis pers strategis dan sentiment monitoring di Ogilvy sesuai praktik terbaik industri kreatif.

Hormat saya,
Rizky Aditya Pratama`);
    }, 1000);
  };

  // Helper function to inject highlight elements if Track mode is active
  const renderAtsHighlightedText = (text: string) => {
    if (!atsEyeTrack || activeKeywords.length === 0) return text;

    // Build regular expression for matching keywords
    const sortedKeywords = [...activeKeywords].sort((a, b) => b.length - a.length);
    const escapedKeywords = sortedKeywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) => {
          const isMatch = activeKeywords.some(kw => kw.toLowerCase() === part.toLowerCase());
          return isMatch ? (
            <mark 
              key={index} 
              className="bg-teal-100 text-teal-950 font-bold px-0.5 rounded-sm select-all relative group cursor-help transition-all duration-150 hover:bg-teal-200"
            >
              {part}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-50 font-mono">
                ✓ Parsed
              </span>
            </mark>
          ) : part;
        })}
      </>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in" id="documents-tab-root">
      
      {/* Sub Tabs Toggle buttons */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit select-none" id="docs-sub-tabs">
        <button 
          onClick={() => setActiveSubTab("cv")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === "cv" 
              ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText size={16} /> CV Builder Terintegrasi
        </button>
        <button 
          onClick={() => setActiveSubTab("letter")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === "letter" 
              ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Envelope size={16} /> Generator Cover Letter AI
        </button>
      </div>

      {/* RENDER ACTIVE SUB TAB */}
      {activeSubTab === "cv" ? (
        /* CV BUILDER LAYOUT: LEFT PANEL (EDITOR) + RIGHT PANEL (A4 LIVE PREVIEW) */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="cv-workspace-grid">
          
          {/* Left Panel: CV Editor & AI Tools */}
          <div className="xl:col-span-6 space-y-6" id="cv-editor-panel">
            
            {/* 1. Targeting Panel & Real-time ATS Dashboard */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-100 uppercase tracking-wider">ATS MATCH ENGINE V2</span>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mt-1.5">
                  🎯 Optimisasi Kata Kunci &amp; Cek Lowongan Target
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Analisis instan kompatibilitas resume Anda terhadap mesin pelacak pelamar kerja.</p>
              </div>

              {/* Selector targeting lowongan */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block mb-1.5">Pilih Target Lowongan Kerja</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {targetJds.map(jd => (
                      <button 
                        key={jd.id}
                        onClick={() => setSelectedJdId(jd.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col transition-all cursor-pointer ${
                          selectedJdId === jd.id 
                            ? "border-teal-500 bg-teal-50/25 ring-1 ring-teal-550/10 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        id={`target-jd-${jd.id}`}
                      >
                        <span className="text-[9px] text-slate-400 font-serif font-black uppercase tracking-widest">{jd.company}</span>
                        <strong className="text-[11px] text-slate-800 font-extrabold leading-tight mt-0.5">{jd.role}</strong>
                      </button>
                    ))}
                    <button 
                      onClick={() => setSelectedJdId("custom")}
                      className={`p-2.5 rounded-xl border text-left flex flex-col transition-all cursor-pointer ${
                        selectedJdId === "custom" 
                          ? "border-teal-550 border-teal-500 bg-teal-50/25 ring-1 ring-teal-550/10 shadow-sm font-bold text-teal-800" 
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                      id="target-jd-custom"
                    >
                      <span className="text-[9px] text-emerald-600 font-serif font-black uppercase tracking-widest">Kustom JD</span>
                      <strong className="text-[11px] text-slate-800 font-extrabold leading-tight mt-0.5">Tempel Deskripsi</strong>
                    </button>
                  </div>
                </div>

                {/* Custom pasting container */}
                {selectedJdId === "custom" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-250 border-slate-200 space-y-2"
                    id="custom-jd-container"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">Papan Tempel Deskripsi Pekerjaan</span>
                      <span className="text-[9px] bg-teal-50 border border-teal-200 text-teal-700 px-1.5 py-0.5 rounded font-mono font-bold uppercase">Dynamic Keyword Parser</span>
                    </div>
                    <textarea 
                      rows={3}
                      value={customJdText}
                      onChange={(e) => setCustomJdText(e.target.value)}
                      placeholder="Tempel deskripsi lowongan kerja atau syarat sertifikasi yang ingin Anda lamar di sini. Sistem akan otomatis menyaring kata kunci krusial..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-teal-400 font-sans leading-relaxed shadow-inner"
                    />
                  </motion.div>
                )}

                {/* ATS Real-time Interactive Score Metre */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-slate-700">Analisis ATS Real-time</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">Auto Scan</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Score badge */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-3.5 bg-white border border-slate-200 rounded-xl">
                      <span className="text-3xl font-black font-mono tracking-tighter text-teal-655">{currentAtsScore}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ATS SCORE / 100</span>
                    </div>

                    <div className="md:col-span-8 space-y-2.5 text-xs text-slate-600">
                      {/* Keyword stats */}
                      <div className="flex justify-between font-medium">
                        <span>Keyword Cocok: <strong className="text-slate-800">{matchedKeywords.length} dari {activeKeywords.length}</strong></span>
                        <span className="font-mono text-xs">{scoreKeyword}/40</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded overflow-hidden">
                        <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${(scoreKeyword/40)*100}%` }}></div>
                      </div>

                      {/* Other stats in mini grid */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Check className="text-emerald-500" /> Action Verbs: <strong className="text-slate-850 font-bold">{scoreVerbs}/20</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Check className="text-emerald-500" /> Metriks: <strong className="text-slate-850 font-bold">{scoreQuantify - 10}/20</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations with Collapsible Details */}
                  <div className="pt-2 border-t border-slate-200 text-[11px] space-y-3" id="ats-audit-recs">
                    {/* 1. Missing Keywords */}
                    {missingKeywords.length > 0 ? (
                      <div className="space-y-1.5">
                        <p className="font-bold text-slate-800 flex items-center gap-1">
                          <Info size={14} className="text-amber-500 shrink-0" /> 
                          Kata Kunci Target yang Perlu Ditambahkan:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {missingKeywords.map(kw => (
                            <button 
                              key={kw}
                              onClick={() => handleQuickInjectKeyword(kw)}
                              title="Klik untuk menyisipkan ke Professional Summary"
                              className="px-2 py-0.5 bg-white border border-rose-200 text-rose-700 text-[10px] rounded hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer flex items-center gap-1 font-mono font-semibold shadow-sm"
                            >
                              + {kw}
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-slate-400 font-mono italic">Tips: Klik kata kunci di atas untuk melengkapi resume Anda secara cerdas.</p>
                      </div>
                    ) : (
                      <div className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50/50 p-2 rounded border border-emerald-100">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        Luar biasa! Seluruh kata kunci target rekruter berhasil diserap.
                      </div>
                    )}

                    {/* 2. Interactive ATS Compliance Inspector */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2.5">
                      <button 
                        onClick={() => setAtsScoreExpanded(!atsScoreExpanded)}
                        className="w-full text-left flex justify-between items-center font-bold text-slate-800 uppercase tracking-widest text-[9px] cursor-pointer"
                      >
                        <span>✓ Kepatuhan Format Ekstra (ATS Auditor)</span>
                        <span>{atsScoreExpanded ? "Sembunyikan ▲" : "Detail Pasca Audit ▼"}</span>
                      </button>

                      {atsScoreExpanded && (
                        <div className="space-y-2 pt-1 border-t border-slate-100 font-sans">
                          {/* Checked single column */}
                          <div className="flex items-start justify-between text-[11px]">
                            <div className="flex gap-1.5 text-slate-650">
                              <span className="text-emerald-500">✓</span>
                              <div>
                                <span className="font-semibold text-slate-800 block">Struktur Kolom Resume</span>
                                <span className="text-[9px] text-slate-400 block">Single-Column vs Multi-Column</span>
                              </div>
                            </div>
                            {cvTemplateStyle === "ats" ? (
                              <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] rounded font-bold uppercase">Lulus Cek</span>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[9px] rounded font-bold uppercase" title="Beberapa parsing software lawas mendistorsi kolom ganda">Rekomendasi Kolom Tunggal</span>
                            )}
                          </div>

                          {/* Checked graphs/progress-bars */}
                          <div className="flex items-start justify-between text-[11px]">
                            <div className="flex gap-1.5 text-slate-650">
                              <span className={cvTemplateStyle === "ats" ? "text-emerald-500" : "text-yellow-500"}>
                                {cvTemplateStyle === "ats" ? "✓" : "⚠"}
                              </span>
                              <div>
                                <span className="font-semibold text-slate-800 block">Elemen Grafis &amp; Rating Bulat</span>
                                <span className="text-[9px] text-slate-400 block">Visual skill indicators</span>
                              </div>
                            </div>
                            {cvTemplateStyle === "ats" ? (
                              <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] rounded font-bold uppercase">100% Aman</span>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-red-50 border border-red-250 text-red-650 text-[9px] rounded font-bold uppercase">Resiko Tinggi</span>
                            )}
                          </div>

                          {/* Quantifiable achievements check */}
                          <div className="flex items-start justify-between text-[11px]">
                            <div className="flex gap-1.5 text-slate-650">
                              <span className={scoreQuantify >= 30 ? "text-emerald-505 text-emerald-500" : "text-amber-500"}>
                                {scoreQuantify >= 30 ? "✓" : "⚡"}
                              </span>
                              <div>
                                <span className="font-semibold text-slate-800 block">Metrik Kuantitatif &amp; Angka (%)</span>
                                <span className="text-[9px] text-slate-400 block">Mengukur pencapaian kerja</span>
                              </div>
                            </div>
                            {scoreQuantify >= 30 ? (
                              <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] rounded font-black whitespace-nowrap">Ada Angka &amp; %</span>
                            ) : (
                              <button 
                                onClick={handleEnhanceBullets}
                                className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] rounded font-bold uppercase hover:bg-amber-100 cursor-pointer"
                              >
                                Tambah Metrik
                              </button>
                            )}
                          </div>

                          {/* Standard Resume File Naming */}
                          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] space-y-1 mt-1 font-mono">
                            <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-wider">💾 Saran Nama File PDF:</span>
                            <span className="text-slate-700 font-bold block select-all">
                              Rizky_Aditya_Pratama_Backend_Intern_{selectedJdId === "custom" ? "Custom_Lowongan" : targetJds.find(j => j.id === selectedJdId)?.company}.pdf
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="pt-3 border-t border-slate-205 border-slate-200 flex flex-wrap gap-2">
                    <button 
                      onClick={handleAtsAutoAlign}
                      disabled={aligningAtsLoad}
                      className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-1 cursor-pointer transition-all shadow-sm"
                    >
                      <Sparkle size={14} weight="fill" />
                      {aligningAtsLoad ? "Menyinkronkan AI ATS..." : "⚡ Suntik AI ATS (Auto-Align)"}
                    </button>
                    
                    <button 
                      onClick={() => setAtsEyeTrack(!atsEyeTrack)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        atsEyeTrack 
                          ? "bg-teal-50 border-teal-200 text-teal-700" 
                          : "bg-white border-slate-205 text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      👁️ Sorot Kata Kunci ATS: {atsEyeTrack ? "AKTIF" : "NON"}
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* 2. Profil CV Editor Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  📝 Editor Informasi &amp; Konten Resume
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Edit dan sempurnakan CV Anda untuk disesuaikan secara dinamis.</p>
              </div>

              {/* Personal Info inputs */}
              <div className="space-y-3" id="cv-personal-fields">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1. Informasi Kontak</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="personal-inputs">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={cvName} 
                      onChange={(e) => setCvName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-teal-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold">Email Kemahasiswaan</label>
                    <input 
                      type="text" 
                      value={cvEmail} 
                      onChange={(e) => setCvEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-teal-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold">Nomor Handphone</label>
                    <input 
                      type="text" 
                      value={cvPhone} 
                      onChange={(e) => setCvPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-teal-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold">LinkedIn Profile</label>
                    <input 
                      type="text" 
                      value={cvLinkedin} 
                      onChange={(e) => setCvLinkedin(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:border-teal-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* AI Professional Summary generator */}
              <div className="space-y-2 pt-3 border-t border-slate-100" id="cv-summary-field">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">2. Rangkuman Profesional (Summary)</span>
                  <button 
                    onClick={handleGenerateSummary}
                    disabled={summaryGenerating}
                    className="text-[10px] text-teal-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkle size={12} weight="fill" />
                    {summaryGenerating ? "Generating..." : "✨ Tulis Otomatis dengan AI"}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  value={cvSummary}
                  onChange={(e) => setCvSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-teal-400 leading-relaxed font-sans"
                />
              </div>

              {/* Custom Projects edit & regenerate bullets */}
              <div className="space-y-3 pt-3 border-t border-slate-100" id="cv-projects-edit">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">3. Proyek Akademik (Terverifikasi Dosen)</span>
                  <button 
                    onClick={handleEnhanceBullets}
                    disabled={bulletEnhancing}
                    className="text-[10px] text-teal-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkle size={12} weight="fill" />
                    {bulletEnhancing ? "Mengonversi..." : "✨ Perkuat Bullet Points"}
                  </button>
                </div>

                <div className="space-y-2">
                  {cvProjects.map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between" id={`proj-p-${idx}`}>
                      <div className="flex justify-between items-start">
                        <strong className="text-xs text-slate-900">{p.title}</strong>
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">{p.period}</span>
                      </div>
                      <textarea 
                        rows={2}
                        value={p.desc}
                        onChange={(e) => {
                          const updated = [...cvProjects];
                          updated[idx].desc = e.target.value;
                          setCvProjects(updated);
                        }}
                        className="w-full bg-transparent border-0 text-slate-600 text-[11px] p-0 pt-1 leading-snug outline-none focus:ring-0 resize-none font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and Action buttons */}
              <div className="space-y-3 pt-3 border-t border-slate-100" id="cv-certifications-edit">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">4. Sertifikasi Industri ({cvCerts.length})</span>
                  <button 
                    onClick={handleAddCert}
                    className="text-[10px] text-teal-700 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                  >
                    <Plus size={12} weight="bold" /> Tambah
                  </button>
                </div>
                <div className="space-y-1.5" id="certs-inputs-list">
                  {cvCerts.map((cert, idx) => (
                    <div key={idx} className="flex justify-between bg-slate-50 p-2 rounded text-xs text-slate-700 border border-slate-200 font-medium">
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill set sliders */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">5. Tingkatan Kompetensi Teknis</span>
                <div className="grid grid-cols-2 gap-3" id="skills-adjusters">
                  {cvSkills.map((sk, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                        <span>{sk.name}</span>
                        <span>{sk.level}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sk.level}
                        onChange={(e) => {
                          const updated = [...cvSkills];
                          updated[idx].level = parseInt(e.target.value);
                          setCvSkills(updated);
                        }}
                        className="w-full accent-teal-500 h-1 bg-slate-100 rounded-lg cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel: High-fidelity white A4 page mockup with Toolbar */}
          <div className="xl:col-span-6 flex flex-col items-center" id="cv-preview-panel">
            
            {/* Style & Scan Selection Toolbars */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-3" id="cv-preview-toolbar">
              <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200 select-none">
                <span className="text-[9px] uppercase font-bold text-slate-500 pl-2">Template:</span>
                <div className="flex gap-1 text-[10px]">
                  <button
                    onClick={() => {
                      setCvTemplateStyle("ats");
                      setViewMode("live");
                    }}
                    className={`px-2 py-0.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                      cvTemplateStyle === "ats" && viewMode === "live"
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    📄 ATS Standard
                  </button>
                  <button
                    onClick={() => {
                      setCvTemplateStyle("creative");
                      setViewMode("live");
                    }}
                    className={`px-2 py-0.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                      cvTemplateStyle === "creative" && viewMode === "live"
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    🎨 Creative
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200 select-none">
                <span className="text-[9px] uppercase font-bold text-slate-500 pl-2">Tampilan:</span>
                <div className="flex gap-1 text-[10px]">
                  <button
                    onClick={() => setViewMode("live")}
                    className={`px-2 py-0.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                      viewMode === "live"
                        ? "bg-slate-700 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    👁️ LIVE Kertas
                  </button>
                  <button
                    onClick={() => setViewMode("raw_text")}
                    className={`px-2 py-0.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                      viewMode === "raw_text"
                        ? "bg-slate-700 text-white shadow-sm"
                        : "bg-white text-slate-650 hover:text-slate-800"
                    }`}
                  >
                    🖥️ Scan Parser
                  </button>
                </div>
              </div>
            </div>

            {/* CONDITIONAL RENDER CANVAS / TERMINAL */}
            {viewMode === "raw_text" ? (
              /* High-Contrast terminal scan view */
              <div className="w-full max-w-[500px] h-[720px] bg-slate-950 text-emerald-400 rounded-xl p-6 border border-slate-800 shadow-lg text-[10px] flex flex-col justify-between overflow-y-auto font-mono leading-relaxed" id="ats-parsing-terminal">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-500 text-[8px]">
                    <span>[MOCK PARSER ENGINE - READY]</span>
                    <span>Taleo / Workday ASCII Dump V2.0</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-white font-bold select-none">[INFO] parsed_contact_data:</p>
                    <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 text-emerald-300">
                      NAME  : "{cvName.toUpperCase()}"<br/>
                      EMAIL : "{cvEmail}"<br/>
                      PHONE : "{cvPhone}"<br/>
                      SOCIAL: ["{cvLinkedin}", "{cvGithub}"]
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-white font-bold select-none">[INFO] matched_target_keywords ({matchedKeywords.length}):</p>
                    <div className="flex flex-wrap gap-1">
                      {matchedKeywords.map(kw => (
                        <span key={kw} className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 text-[9px] font-mono">
                          {kw} (MATCHED)
                        </span>
                      ))}
                    </div>
                  </div>

                  {missingKeywords.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-rose-400 font-bold select-none">[WARNING] omitted_keywords ({missingKeywords.length}):</p>
                      <div className="flex flex-wrap gap-1">
                        {missingKeywords.map(kw => (
                          <span key={kw} className="px-1.5 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-900 text-[9px] font-mono">
                            {kw} (MISSING)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <p className="text-white font-bold select-none">[INFO] full_text_stream_output:</p>
                    <div className="bg-slate-900/80 p-3 rounded border border-slate-800 text-slate-350 text-[9px] h-[220px] overflow-y-auto whitespace-pre-wrap select-all font-mono">
{`=== START OF PARSED RESUME TEXT ===
FULLNAME: ${cvName.toUpperCase()}
MAJOR: ${studentProfile.major}
INSTITUTION: ${studentProfile.university}
CONTACT MATRIX: ${cvEmail} | Tel: ${cvPhone} | Linkedin: ${cvLinkedin} | GitHub: ${cvGithub}

[SECTION]: PROFESSIONAL SUMMARY
${cvSummary}

[SECTION]: CORE SKILLS & MATRIX RATINGS
${cvSkills.map(s => `• ${s.name}: ${s.level}%`).join("\n")}

[SECTION]: WORK AND PROJECTS
${cvProjects.map(p => `- TITLE: ${p.title} (${p.period})\n  DETAILS: ${p.desc}`).join("\n\n")}

[SECTION]: FORMAL CREDENTIALS
S1 Ilmu Komunikasi - Universitas Negeri Surabaya (UNESA)
Cumulative GPA: ${studentProfile.ipk} (Standardized)
Completed coursework: ${studentProfile.totalSks} SKS / 142 SKS

[SECTION]: ACADEMIC AND INDUSTRIAL CERTIFICATIONS
${cvCerts.map(c => `* ${c}`).join("\n")}
=== END OF COMPILER STREAM ===`}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-[8px] text-slate-500 flex justify-between select-none">
                  <span>Standard: ATS Harvard Format Compliant</span>
                  <span>Scanned: Now</span>
                </div>
              </div>
            ) : (
              /* A4 paper live mockup canvas */
              <div className="w-full max-w-[500px] h-[720px] bg-white text-slate-800 rounded-xl p-8 border border-slate-200 shadow-md text-[10px] flex flex-col justify-between overflow-y-auto" id="resume-a4-canvas">
                <div>
                  {/* Visual Header */}
                  <div className="text-center pb-4 border-b border-slate-200 relative">
                    <h1 className="text-xl font-bold uppercase tracking-tight text-slate-950">{cvName}</h1>
                    <p className="text-[9px] text-slate-500 font-semibold font-mono mt-0.5">{studentProfile.major} — {studentProfile.university}</p>
                    
                    {/* Contact matrix row */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[8px] text-slate-600 font-mono">
                      <span>{cvEmail}</span>
                      <span>|</span>
                      <span>{cvPhone}</span>
                      <span>|</span>
                      <span>{cvLinkedin}</span>
                      <span>|</span>
                      <span>{cvGithub}</span>
                    </div>
                  </div>

                  {/* CHOOSE RENDER STANDARD SINGLE COLUMN VS SIDE-BAR CREATIVE LAYOUT */}
                  {cvTemplateStyle === "ats" ? (
                    /* Strict Single-Column Standard ATS Layout - Maximum Compatibility */
                    <div className="space-y-4 mt-4 h-full">
                      {/* Summary */}
                      <div className="space-y-1">
                        <h3 className="font-extrabold uppercase tracking-wide text-teal-800 border-b border-teal-800/10 pb-0.5 text-[9px]">Professional Summary</h3>
                        <p className="text-slate-700 text-[8.5px] leading-relaxed pr-1 text-justify">
                          {renderAtsHighlightedText(cvSummary)}
                        </p>
                      </div>

                      {/* Skills inline */}
                      <div className="space-y-1">
                        <h3 className="font-extrabold uppercase tracking-wide text-teal-800 border-b border-teal-800/10 pb-0.5 text-[9px]">Technical Competencies</h3>
                        <div className="text-[8.5px] text-slate-750 leading-relaxed font-sans">
                          <strong>Core Backend Stack:</strong> {cvSkills.map(s => `${s.name} (${s.level}%)`).join(" · ")}
                        </div>
                      </div>

                      {/* Academic Projects */}
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold uppercase tracking-wide text-teal-800 border-b border-teal-800/10 pb-0.5 text-[9px]">Academic Projects (Verified SIAKAD)</h3>
                        <div className="space-y-2">
                          {cvProjects.map((p, i) => (
                            <div key={i} className="text-[8.5px]">
                              <div className="flex justify-between font-bold text-slate-900">
                                <span className="font-extrabold">{renderAtsHighlightedText(p.title)}</span>
                                <span className="text-slate-500 font-mono font-normal text-[8px]">{p.period}</span>
                              </div>
                              <p className="text-slate-600 text-[8px] leading-relaxed mt-0.5 text-justify">{renderAtsHighlightedText(p.desc)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Education details */}
                      <div className="space-y-1">
                        <h3 className="font-extrabold uppercase tracking-wide text-teal-800 border-b border-teal-800/10 pb-0.5 text-[9px]">Education Credentials</h3>
                        <div className="text-[8.5px]">
                          <div className="flex justify-between font-bold text-slate-900">
                            <strong>S1 Ilmu Komunikasi</strong>
                            <span className="font-normal font-mono text-slate-500 text-[8px]">2023 – Sekarang</span>
                          </div>
                          <p className="text-slate-700 font-medium">Universitas Negeri Surabaya, Surabaya</p>
                          <p className="text-slate-550 text-[8px] mt-0.5">IPK Kumulatif: <strong>{studentProfile.ipk}</strong> / 4.00 · Kredit Diselesaikan: <strong>{studentProfile.totalSks} SKS</strong> / 142 SKS</p>
                        </div>
                      </div>

                      {/* Certs list */}
                      <div className="space-y-1">
                        <h3 className="font-extrabold uppercase tracking-wide text-teal-800 border-b border-teal-800/10 pb-0.5 text-[9px]">Industry Certifications</h3>
                        <div className="space-y-0.5 leading-snug">
                          {cvCerts.map((cert, i) => (
                            <div key={i} className="text-[8px] text-slate-600">• {renderAtsHighlightedText(cert)}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Elegant Double Column Layout with Side Info */
                    <div className="grid grid-cols-12 gap-4 mt-4 h-full">
                      
                      {/* Left Column (Skills + Certs) */}
                      <div className="col-span-4 border-r border-slate-100 pr-3 space-y-4">
                        
                        {/* Skills */}
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Core Skills</h3>
                          <div className="space-y-1.5">
                            {cvSkills.map((sk, i) => (
                              <div key={i} className="text-[8px] font-medium leading-tight">
                                <span>{renderAtsHighlightedText(sk.name)}</span>
                                <div className="w-full h-1 bg-slate-100 rounded overflow-hidden mt-0.5">
                                  <div className="h-full bg-slate-705 bg-slate-700" style={{ width: `${sk.level}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certs */}
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Certifications</h3>
                          <div className="space-y-1 leading-snug">
                            {cvCerts.map((cert, i) => (
                              <p key={i} className="text-[7.5px] text-slate-500">• {renderAtsHighlightedText(cert)}</p>
                            ))}
                          </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Languages</h3>
                          <p className="text-[8px]">Indonesian (Native)<br/><span className="text-slate-500">English (Professional Work)</span></p>
                        </div>
                      </div>

                      {/* Right Column (Summary + Projects + Edu) */}
                      <div className="col-span-8 pl-1 space-y-4">
                        
                        {/* Summary */}
                        <div className="space-y-1">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Professional Summary</h3>
                          <p className="text-slate-650 text-[8.5px] leading-relaxed italic pr-1">
                            {renderAtsHighlightedText(cvSummary)}
                          </p>
                        </div>

                        {/* Academic Projects */}
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Verified Academic Projects</h3>
                          <div className="space-y-2.5">
                            {cvProjects.map((p, i) => (
                              <div key={i} className="text-[8.5px]">
                                <div className="flex justify-between font-bold text-slate-900">
                                  <span>{renderAtsHighlightedText(p.title)}</span>
                                  <span className="text-slate-500 font-mono font-normal text-[8px]">{p.period}</span>
                                </div>
                                <p className="text-slate-500 text-[8px] leading-normal mt-0.5 pr-1">{renderAtsHighlightedText(p.desc)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-1">
                          <h3 className="font-extrabold uppercase tracking-widest text-[#0c4a6e] border-b border-sky-900/10 pb-0.5">Education Credentials</h3>
                          <div className="text-[8.5px]">
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>S1 Ilmu Komunikasi</span>
                              <span className="font-normal font-mono text-slate-500 text-[8px]">2023 – Sekarang</span>
                            </div>
                            <p className="text-slate-600">Universitas Negeri Surabaya, Surabaya</p>
                            <p className="text-slate-705 text-[8px] mt-0.5">IPK Kumulatif: <strong>{studentProfile.ipk}</strong> | Diselesaikan: <strong>{studentProfile.totalSks} SKS</strong> / 142 SKS</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Watermark/Footer tag */}
                <div className="pt-3 border-t border-slate-200 text-center text-[7px] text-slate-400 uppercase tracking-widest font-mono">
                  Terverifikasi secara Kriptografi oleh ACIP SIAKAD Universitas Negeri Surabaya
                </div>
              </div>
            )}

            {/* Print/Download Button */}
            <button className="mt-4 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-lg text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md cursor-pointer">
              <Download size={16} weight="bold" /> Download PDF Curriculum Vitae
            </button>
          </div>

        </div>
      ) : (
        /* SUB-TAB 5B: COVER LETTER BUILDER */
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-in" id="coverletter-pane">
          
          {/* Phase 1: Context Input Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="context-letter-inputs">
            
            <div className="space-y-2">
              <label className="text-[11px] text-slate-700 font-black uppercase tracking-wider block">1. Target Posisi Lowongan:</label>
              <select 
                value={clRole} 
                onChange={(e) => setClRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none hover:border-slate-300 transition-colors"
              >
                <option value="Social Media Intern — Ogilvy PR Indonesia (MBKM)">Social Media Intern — Ogilvy PR Indonesia (MBKM)</option>
                <option value="Corporate Communications Intern — PT Telkomsel">Corporate Communications Intern — PT Telkomsel</option>
                <option value="Creative Copywriting Intern — GoTo Group">Creative Copywriting Intern — GoTo Group</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-700 font-black uppercase tracking-wider block">2. Model Persona / Tone Of Voice:</label>
              <div className="flex flex-col gap-2 text-xs text-slate-600 py-1" id="cl-persona-radios">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input 
                    type="radio" 
                    name="clTone" 
                    checked={clTone === "tech_forward"}
                    onChange={() => setClTone("tech_forward")}
                  />
                  <span>Enthusiastic &amp; Tech-Forward (Startup)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input 
                    type="radio" 
                    name="clTone" 
                    checked={clTone === "formal"}
                    onChange={() => setClTone("formal")}
                  />
                  <span>Professional &amp; Formal (Enterprise)</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-700 font-black uppercase tracking-wider block">3. Highlight Keunggulan Anda:</label>
              <div className="flex flex-wrap gap-2 pt-1" id="highlights-checklist">
                <span className="px-2 py-1 rounded bg-teal-50 text-teal-700 text-[10px] border border-teal-100 font-black tracking-wide">• IPK 3.42 UNESA</span>
                <span className="px-2 py-1 rounded bg-teal-50 text-teal-700 text-[10px] border border-teal-100 font-black tracking-wide">• PR &amp; Campaign</span>
                <span className="px-2 py-1 rounded bg-teal-50 text-teal-700 text-[10px] border border-teal-100 font-black tracking-wide">• Brand Storytelling</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleGenerateCoverLetter}
              disabled={clGenerating}
              className="w-full md:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-lg text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkle size={16} weight="fill" className="animate-pulse" />
              {clGenerating ? "Menyusun Surat dengan AI..." : "✨ Generate Cover Letter Dengan AI"}
            </button>
          </div>

          {/* Phase 2: Generated Output preview */}
          {clGenerated && (
            <div className="border-t border-slate-100 pt-6 space-y-4 font-sans" id="cl-generated-workspace">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-mono font-bold">
                  Word count: <strong className="text-slate-800">387 Kata</strong> | Tone: <strong className="text-teal-700">Tech-Forward ✓</strong> | Model: <strong className="text-slate-650">Gemini-3.5-flash</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyText}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 text-xs rounded border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-sm font-semibold transition-colors"
                  >
                    <Copy size={13} /> {copyStatus ? "Disalin!" : "Salin Teks"}
                  </button>
                </div>
              </div>

              {/* Editable content widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="cl-preview-wrap">
                <div className="lg:col-span-8">
                  <textarea 
                    rows={12}
                    value={clContent}
                    onChange={(e) => setClContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-5 text-xs text-slate-800 font-mono outline-none focus:border-teal-400 leading-relaxed max-h-[480px] overflow-y-auto"
                  />
                </div>

                <div className="lg:col-span-4" id="cl-tips-and-download">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                    <span className="text-[10px] text-teal-750 font-black uppercase tracking-wider block">✨ Analisis Strategi AI:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      Cover letter ini secara sangat cerdas menyebutkan <strong className="text-teal-700">gap skill Docker secara proaktif</strong> di paragraf 4, lalu menyertakan bekal kursus penutup celah (Dicoding) sebagai aksi nyata.
                    </p>
                    <div className="p-3 bg-white border border-slate-200 border-l-4 border-l-amber-500 text-[11px] text-slate-600 font-medium leading-relaxed">
                      💡 <strong>Tips Recruiter:</strong> Menyebutkan kelemahan Anda diiringi rencana aksi konkrit meningkatkan kepercayaan rekruter Tokopedia sebesar <strong>34%</strong> (survey).
                    </div>
                    <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-200 flex items-center justify-center gap-1 cursor-pointer">
                      <Download size={14} /> Download PDF Cover Letter
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
