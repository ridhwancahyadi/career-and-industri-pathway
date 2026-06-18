import React, { useState, useEffect } from "react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line,
  Area,
  ComposedChart,
  ReferenceLine,
  Label
} from "recharts";
import { 
  Sparkle, 
  Check, 
  Play, 
  Circle, 
  Star, 
  ArrowRight,
  Info,
  Calendar,
  CheckCircle,
  Clock,
  Warning,
  SealCheck,
  Compass,
  Database,
  Shield,
  Cpu,
  AppWindow,
  Briefcase,
  TrendUp
} from "@phosphor-icons/react";
import { studentProfile, semesters, careerTrajectoryData, careerMatches } from "../data";
import { SemesterData } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function TabRoadmap() {
  const [hoveredSemester, setHoveredSemester] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [activeViewMode, setActiveViewMode] = useState<"tracks" | "courses">("tracks");
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [clickedCourseId, setClickedCourseId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expandedMatchIdx, setExpandedMatchIdx] = useState<number | null>(null);
  const [ignoredCareers, setIgnoredCareers] = useState<Record<string, boolean>>({});
  const [nicheSearch, setNicheSearch] = useState<string>("");
  const [submittedNicheList, setSubmittedNicheList] = useState<string[]>([]);

  // Dynamic window size check to handle responsive list-gantt fallback
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger score count up animation on load
  useEffect(() => {
    let start = 0;
    const end = studentProfile.careerReadinessScore;
    if (start === end) return;
    
    const totalDuration = 800; // ms
    const incrementTime = Math.abs(Math.floor(totalDuration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, []);

  const activeInspectSemester = hoveredSemester !== null ? hoveredSemester : selectedSemester;
  const currentSemesterData = semesters.find(s => s.number === activeInspectSemester) || semesters[4];

  // Timeline Column scale definition
  const columns = [
    { num: 1, label: "S1", year: "GANJIL '22", period: "Aug - Dec", color: "emerald" },
    { num: 2, label: "S2", year: "GENAP '23", period: "Jan - Jun", color: "emerald" },
    { num: 3, label: "S3", year: "GANJIL '23", period: "Aug - Dec", color: "emerald" },
    { num: 4, label: "S4", year: "GENAP '24", period: "Jan - Jun", color: "emerald" },
    { num: 5, label: "S5", year: "GANJIL '25", period: "Berjalan ⚡", isCurrent: true, color: "amber" },
    { num: 6, label: "S6", year: "GENAP '26", period: "Rencana MBKM", color: "indigo" },
    { num: 7, label: "S7", year: "GANJIL '26", period: "Proyek Akhir", color: "indigo" },
    { num: 8, label: "S8", year: "GENAP '27", period: "Kelulusan 🎉", color: "teal" },
  ];

  // Lanes / Initiatives defined like Linear.app Gantt layout
  const initiatives = [
    {
      id: "core-comm",
      title: "Humas & Dasar-Dasar Komunikasi",
      subtitle: "Pengantar Humas, Fotografi, & Etika Komunikasi",
      count: "99%",
      status: "completed",
      startSlot: 1, 
      endSlot: 4,   
      color: "emerald",
      gradient: "from-emerald-500/10 to-teal-500/5",
      accentBorder: "border-l-emerald-500",
      textTheme: "text-emerald-800",
      icon: Database,
      milestones: [
        { id: "m-intro", title: "Teori Komunikasi", sem: 2, status: "completed" },
        { id: "m-writing", title: "Penulisan Naskah Humas", sem: 3, status: "completed" },
        { id: "m-media", title: "Dasar Fotografi & Komunikasi Visual", sem: 4, status: "completed" },
      ]
    },
    {
      id: "adv-media",
      title: "Analitik Media & Kampanye Digital",
      subtitle: "Social Listening & Copywriting Gaps",
      count: "74%",
      status: "current",
      color: "amber",
      gradient: "from-amber-500/15 via-orange-500/10 to-amber-300/5",
      accentBorder: "border-l-amber-500",
      textTheme: "text-amber-900",
      startSlot: 4, 
      endSlot: 5,
      icon: Shield,
      milestones: [
        { id: "m-copy", title: "Copywriting & Digital Ads", sem: 4, status: "completed" },
        { id: "m-brand", title: "Brand Advocacy & ESG Campaign", sem: 5, status: "current" },
      ]
    },
    {
      id: "crisis-mgmt",
      title: "Humas Korporat & Krisis Public Relations",
      subtitle: "Risiko reputasi & Penanganan krisis komunikasi",
      count: "16%",
      status: "future",
      color: "indigo",
      gradient: "from-indigo-500/10 to-blue-500/5",
      accentBorder: "border-l-indigo-500",
      textTheme: "text-indigo-800",
      startSlot: 6,
      endSlot: 7,
      icon: Cpu,
      milestones: [
        { id: "m-crisis", title: "Strategi Krisis Humas", sem: 6, status: "future" },
        { id: "m-esg", title: "Penyusunan Kampanye Berkelanjutan (CSR)", sem: 7, status: "future" },
      ]
    },
    {
      id: "prod-launch",
      title: "Proyek Akhir & Portofolio Humas",
      subtitle: "Kampanye Humas Terapan & Skripsi Komunikasi",
      count: "0%",
      status: "future",
      color: "teal",
      gradient: "from-teal-500/10 to-emerald-500/5",
      accentBorder: "border-l-teal-500",
      textTheme: "text-teal-800",
      startSlot: 8,
      endSlot: 8,
      icon: AppWindow,
      milestones: [
        { id: "m-ta", title: "Tugas Akhir Defense", sem: 8, status: "future" },
      ]
    }
  ];

  // Fine-grained Academic Gantt Chart Course Database (Universitas Negeri Surabaya Communication Curriculum)
  const coursesGantt = [
    {
      id: "c-alpro",
      name: "Pengantar Ilmu Komunikasi & Humas",
      category: "Public Relations & Media",
      startSem: 1,
      endSem: 1,
      status: "completed",
      grade: "A-",
      info: "Konsep dasar komunikasi, elemen komunikasi komunikator, pesan, media, komunikan, efek komunikasi, serta peran strategis kehumasan."
    },
    {
      id: "c-oop",
      name: "Sosiologi Komunikasi & Etika PR",
      category: "Public Relations & Media",
      startSem: 2,
      endSem: 2,
      status: "completed",
      grade: "A",
      info: "Dinamika sosial masyarakat digital, regulasi UU ITE, kode etik humas (perhumas/IPRA), dan tanggung jawab etika profesi."
    },
    {
      id: "c-strukdat",
      name: "Teori & Riset Komunikasi Kualitatif",
      category: "Teori & Riset Komunikasi",
      startSem: 2,
      endSem: 2,
      status: "completed",
      grade: "A-",
      info: "Metode framing, semiotika, analisis wacana (Critical Discourse Analysis), riset etnografi media, serta studi khalayak."
    },
    {
      id: "c-db",
      name: "Pengukuran & Audit Komunikasi",
      category: "Analitik & Big Data",
      startSem: 3,
      endSem: 3,
      status: "completed",
      grade: "A",
      info: "Evaluasi program PR/CSR, perancangan kuesioner audit komunikasi internal-eksternal korporat, dan pengolahan data statistik dasar."
    },
    {
      id: "c-rpl",
      name: "Manajemen Kampanye Digital",
      category: "Public Relations & Media",
      startSem: 4,
      endSem: 5,
      status: "current",
      uts: 85,
      info: "Perencanaan strategi kampanye online, Integrated Marketing Communication (IMC), manajemen stakeholder, dan optimalisasi channel penyebaran."
    },
    {
      id: "c-web",
      name: "Analitik Media Sosial & Big Data",
      category: "Public Relations & Media",
      startSem: 4,
      endSem: 5,
      status: "current",
      uts: 78,
      info: "Media listening tool (Brand24), tracking sentimen publik, pengolahan tagar/konversasi di Instagram/TikTok/X, dan visualisasi gelembung topik krisis."
    },
    {
      id: "c-jankom",
      name: "Hubungan Masyarakat Korporat",
      category: "Manajemen Komunikasi & Strategis",
      startSem: 5,
      endSem: 5,
      status: "current",
      uts: 76,
      info: "Pengelolaan reputasi, hubungan pers (media relations), perangkaian rilis berita pers, komunikasi internal karyawan, dan lobbying."
    },
    {
      id: "c-sisdis",
      name: "Krisis & Risiko Public Relations",
      category: "Manajemen Komunikasi & Strategis",
      startSem: 6,
      endSem: 6,
      status: "future",
      info: "Buku panduan taktis krisis (crisis manual book), simulasi respons pers terdesak waktu, penanganan hoaks, serta pemulihan citra paska krisis."
    },
    {
      id: "c-cloud",
      name: "Brand Advocacy & ESG Campaign",
      category: "Analitik & Big Data",
      startSem: 6,
      endSem: 6,
      status: "future",
      info: "Kampanye advocacy keberlanjutan korporat berbasis pilar ESG (Environmental, Social, Governance), kemitraan KOL, serta penyusunan laporan CSR tahunan."
    },
    {
      id: "c-magang",
      name: "Kerja Praktik / Magang MBKM Humas",
      category: "Riset & Magang",
      startSem: 6,
      endSem: 6,
      status: "future",
      info: "Pengalaman magang penuh di agensi PR, korporasi telekomunikasi, FMCG, atau media nasional papan atas senilai 20 SKS terakreditasi."
    },
    {
      id: "c-metopen",
      name: "Metodologi Penelitian Komunikasi",
      category: "Teori & Riset Komunikasi",
      startSem: 7,
      endSem: 7,
      status: "future",
      info: "Metode kuantitatif survei eksplanatif, koding media konten (content analysis), penulisan draf proposal skripsi ilmiah, dan penyusunan instrumen riset."
    },
    {
      id: "c-ta",
      name: "Proyek Skripsi / Tugas Akhir Kampanye",
      category: "Riset & Magang",
      startSem: 7,
      endSem: 8,
      status: "future",
      info: "Penyusunan naskah skripsi analitik PR komprehensif atau rancang bangun kampanye strategi ESG korporat, diakhiri dengan pertanggungjawaban sidang formal."
    }
  ];

  // Helper helper to resolve the dynamic academic icons based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Public Relations & Media":
        return AppWindow;
      case "Teori & Riset Komunikasi":
        return Cpu;
      case "Analitik & Big Data":
        return Database;
      case "Manajemen Komunikasi & Strategis":
        return Shield;
      case "Riset & Magang":
        return Briefcase;
      default:
        return Compass;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="roadmap-tab-root">
      
      {/* ==========================================
          BENTO ROW 1: HERO SPOT & SCORE CARD 
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="roadmap-bento-hero-section">
        
        {/* Module 1: Career Path Title Card (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-teal-200/80 group" id="bento-focus-card">
          
          {/* Visual gradient backdrop */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-50/40 via-emerald-50/15 to-transparent rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0f766e_1.5px,transparent_1.5px)] [background-size:18px_18px]"></div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-teal-50 border border-teal-100 text-teal-700 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkle size={12} weight="fill" className="text-teal-600 animate-pulse" /> AI-Mapped Career Track
              </span>
              <span className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-mono border border-slate-200/80">
                NIM {studentProfile.nim}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-mono font-semibold border border-emerald-100">
                UNESA Student angkatan {studentProfile.angkatan}
              </span>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Roadmap Karir <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 font-black">{studentProfile.careerGoal}</span>
              </h1>
              <p className="text-slate-700 font-medium text-xs flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                Sektor Target: <strong className="text-slate-800">{studentProfile.targetSub}</strong>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 text-emerald-700 text-xs font-bold border border-emerald-100/85 shadow-sm">
                IPK {studentProfile.ipk} (UB Standard)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/80 text-blue-700 text-xs font-bold border border-blue-105 shadow-sm">
                {studentProfile.totalSks} SKS Diselesaikan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/80 text-amber-700 text-xs font-bold border border-amber-105 shadow-sm">
                Angkatan 2022
              </span>
            </div>
          </div>

          {/* Connected AI Insight panel */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3 text-slate-600 text-xs bg-gradient-to-r from-slate-50 to-teal-50/20 p-3.5 rounded-xl border border-slate-200" id="bento-hero-quote">
            <span className="px-2 py-1 bg-teal-600 text-white rounded-md shrink-0 shadow-sm text-[9px] uppercase font-mono font-black tracking-wider select-none">AI SYSTEM INSIGHT</span>
            <p className="italic leading-relaxed text-slate-800">
              "Mahasiswa UNESA {studentProfile.name} berada pada jalur kompetitif menuju Humas Korporat. Rekomendasi 90 hari: selesaikan gap <strong>Media Listening (Brand24)</strong> dan ikuti sertifikasi kehumasan sebelum program Kampus Merdeka Semester 6."
            </p>
          </div>
        </div>

        {/* Module 2: Visual Readiness Score Card (4 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between items-center text-center relative transition-all duration-300 hover:shadow-lg" id="bento-score-card">
          
          <div className="w-full text-left">
            <span className="text-[9px] text-slate-400 font-mono font-black uppercase tracking-widest block">Kesiapan Kerja</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight mt-0.5">Readiness Index Meter</h3>
          </div>

          <div className="relative flex items-center justify-center w-32 h-32 my-4" id="readiness-gauge">
            {/* Visual background glows */}
            <div className="absolute w-28 h-28 rounded-full bg-teal-500/[0.03] blur-xl"></div>
            
            {/* Ping aura */}
            <div className="absolute w-26 h-26 rounded-full border-4 border-teal-550/5 animate-ping"></div>

            {/* Circular Gauge */}
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <circle 
                cx="64" 
                cy="64" 
                r="52" 
                className="stroke-slate-100" 
                strokeWidth="10"
                fill="none" 
              />
              <circle 
                cx="64" 
                cy="64" 
                r="52" 
                stroke="url(#gaugeGradient)"
                className="transition-all duration-1000 ease-out" 
                strokeWidth="10"
                fill="none" 
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - animatedScore / 100)}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0px 2px 4px rgba(13,148,136,0.15))" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-teal-800">{animatedScore}</span>
              <span className="text-[9px] text-slate-400 font-mono font-black tracking-widest uppercase">/100 READY</span>
            </div>
          </div>

          <div className="w-full pt-3 border-t border-slate-100 flex justify-between text-left text-[11px]">
            <div>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Bulan Lalu</span>
              <p className="font-mono text-slate-600 font-bold">55% Ready</p>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Pertumbuhan</span>
              <span className="text-emerald-600 font-mono font-black flex items-center gap-1 justify-end">
                <span>▲</span> +12% Up
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          BENTO ROW 2: IMMERSIVE DUAL-PERSPECTIVE GANTT & TIMELINE VIEW
          ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all duration-305 hover:shadow-lg" id="immersive-linear-timeline-container">
        
        {/* Controls and Title block */}
        <div className="p-6 border-b border-slate-100/90 bg-slate-50/20 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 rounded-xl text-teal-600 border border-teal-100 shadow-sm shrink-0">
                <Compass size={22} weight="fill" className="animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  Interactive Academic Gantt Chart
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                    UNESA ILMU KOMUNIKASI CURRICULUM PATH
                  </span>
                  {isMobile && (
                    <span className="text-[8px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-200 font-mono font-bold animate-pulse">
                      MOBILE LAYOUT ACTIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2.5 max-w-2xl leading-relaxed">
              Visualisasi bento-gantt kurikulum Ilmu Komunikasi UNESA. Alur per semester dirancang untuk menyelaraskan kesiapan karir rill dan deteksi celah kompetensi secara otomatis.
            </p>
          </div>

          {/* Interactive Mode & View Switchers */}
          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/60 flex items-center gap-1 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveViewMode("tracks");
                  setClickedCourseId(null);
                }}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeViewMode === "tracks"
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50"
                }`}
              >
                <TrendUp size={14} weight="bold" /> High-Level Tracks
              </button>
              <button
                onClick={() => {
                  setActiveViewMode("courses");
                  setClickedCourseId(null);
                }}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeViewMode === "courses"
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50"
                }`}
              >
                <Database size={14} weight="bold" /> Course Gantt Grid
              </button>
            </div>

            {/* Interactive Legend Indicator */}
            <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-250 border-slate-200 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Lulus</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Aktif</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Rencana</span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================
            COURSE SYLLABUS DETAIL INSPECTOR WIDGET
            ==================================== */}
        <AnimatePresence>
          {clickedCourseId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-teal-50/30 border-b border-teal-100 overflow-hidden"
            >
              {(() => {
                const targetCourse = coursesGantt.find(c => c.id === clickedCourseId);
                if (!targetCourse) return null;
                const CatIcon = getCategoryIcon(targetCourse.category);
                return (
                  <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1 md:max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {targetCourse.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Semester {targetCourse.startSem} {targetCourse.endSem !== targetCourse.startSem && ` - ${targetCourse.endSem}`}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <CatIcon size={16} className="text-teal-600" />
                        {targetCourse.name}
                        {targetCourse.grade && (
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] rounded font-mono font-bold ml-1">LULUS (Nilai {targetCourse.grade})</span>
                        )}
                        {targetCourse.uts && (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] rounded font-mono font-bold ml-1 animate-pulse">SEDANG BERJALAN (Score UTS: {targetCourse.uts})</span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
                        {targetCourse.info}
                      </p>
                    </div>
                    <div className="flex gap-2 self-stretch md:self-auto items-center justify-end shrink-0">
                      <button
                        onClick={() => {
                          setSelectedSemester(targetCourse.startSem);
                          const element = document.getElementById("semester-detail-panel");
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                      >
                        Buka Detail S{targetCourse.startSem} <ArrowRight size={12} weight="bold" />
                      </button>
                      <button
                        onClick={() => setClickedCourseId(null)}
                        className="p-2 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-lg bg-white cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* RENDER MODE A: RESPONSIVE MOBILE ACCORDION STACK */}
        {isMobile ? (
          <div className="p-4 space-y-4 bg-slate-50/50" id="gantt-mobile-timeline-cards">
            {activeViewMode === "tracks" ? (
              /* High-Level Tracks Mobile View */
              <div className="space-y-3">
                {initiatives.map((lane) => {
                  const isTrackActive = selectedSemester >= lane.startSlot && selectedSemester <= lane.endSlot;
                  return (
                    <div
                      key={lane.id}
                      onClick={() => setSelectedSemester(lane.endSlot)}
                      className={`p-4 bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isTrackActive
                          ? "ring-2 ring-teal-500/20 border-teal-500"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${
                            lane.status === "completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                            lane.status === "current" ? "bg-amber-50 text-amber-600 border border-amber-200 animate-pulse" :
                            "bg-indigo-50/85 text-indigo-600 border border-indigo-100"
                          }`}>
                            <lane.icon size={16} weight="bold" />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase text-slate-800 tracking-wider">
                              {lane.title}
                            </h4>
                            <span className="text-[9px] text-slate-400 font-mono block">Semesters {lane.startSlot}–{lane.endSlot}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                          lane.status === "completed" ? "bg-emerald-50 text-emerald-700 font-black border border-emerald-100" :
                          lane.status === "current" ? "bg-amber-50 text-amber-700 font-black border border-amber-200" :
                          "bg-slate-100 text-slate-500"
                        }`}>
                          {lane.count}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{lane.subtitle}</p>

                      {/* Milestones inside stack */}
                      <div className="space-y-2 pt-2.5 border-t border-slate-100 mt-2.5">
                        <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">Core Checkpoints:</span>
                        {lane.milestones.map((m) => (
                          <div key={m.id} className="flex items-center gap-2 text-xs font-medium">
                            {m.status === "completed" ? (
                              <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            ) : m.status === "current" ? (
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                            ) : (
                              <span className="text-slate-300 font-semibold shrink-0">◇</span>
                            )}
                            <span className={`${m.status === "completed" ? "text-slate-700 font-semibold" : m.status === "current" ? "text-amber-700 font-bold" : "text-slate-400"}`}>
                              {m.title}
                            </span>
                            <span className="text-[8.5px] text-slate-400 font-mono ml-auto">Semester {m.sem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Course Gantt Grid Mobile View (Adaptive Feed style) */
              <div className="space-y-4">
                {Array.from(new Set(coursesGantt.map(c => c.category))).map((cat) => {
                  const catCourses = coursesGantt.filter(c => c.category === cat);
                  const Icon = getCategoryIcon(cat);
                  return (
                    <div key={cat} className="space-y-2.5">
                      <h3 className="text-[10px] uppercase font-black tracking-widest text-[#0f766e] flex items-center gap-1.5 pl-1">
                        <Icon size={14} weight="bold" /> {cat}
                      </h3>
                      <div className="space-y-2">
                        {catCourses.map((course) => {
                          const isCourseActive = selectedSemester === course.startSem || selectedSemester === course.endSem;
                          return (
                            <div
                              key={course.id}
                              onClick={() => {
                                setClickedCourseId(clickedCourseId === course.id ? null : course.id);
                                setSelectedSemester(course.startSem);
                              }}
                              className={`p-3 bg-white rounded-xl border transition-all duration-300 cursor-pointer ${
                                clickedCourseId === course.id
                                  ? "border-teal-500 ring-2 ring-teal-500/10 shadow-sm"
                                  : isCourseActive
                                  ? "border-amber-300 bg-amber-50/[0.02]"
                                  : "border-slate-150 hover:border-slate-300"
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                  {course.name}
                                </h4>
                                {course.grade && (
                                  <span className="shrink-0 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-black border border-emerald-100 rounded">
                                    {course.grade}
                                  </span>
                                )}
                                {course.uts && (
                                  <span className="shrink-0 px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-mono font-black border border-amber-200 rounded animate-pulse">
                                    {course.uts} <span className="text-[8px] font-normal">UTS</span>
                                  </span>
                                )}
                                {!course.grade && !course.uts && (
                                  <span className="shrink-0 px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[8.5px] font-mono font-bold border border-indigo-100 rounded">
                                    S{course.startSem}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono tracking-wide leading-none">
                                Semester {course.startSem}{course.endSem !== course.startSem && `–${course.endSem}`} · SKS Terintegrasi
                              </p>
                              {clickedCourseId === course.id && (
                                <motion.p 
                                  initial={{ opacity: 0, y: 3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-[11px] text-slate-600 mt-2.5 pt-2 border-t border-slate-100 leading-relaxed font-sans"
                                >
                                  {course.info}
                                </motion.p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* RENDER MODE B: FULL-FIDELITY HORIZONTAL GANTT MATRIX */
          <div className="overflow-x-auto" id="timeline-scroll-axis">
            {/* Horizontal Timeline Canvas */}
            <div className="min-w-[1152px]" id="timeline-canvas-frame">
              
              {/* 1. TIMELINE GRID HEADER ROW */}
              <div className="flex border-b border-slate-100 bg-slate-50/40 select-none">
                {/* Left corner title header cell */}
                <div className="w-64 shrink-0 border-r border-slate-200 flex items-center px-5 py-4 bg-slate-100/30">
                  <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span> 
                    {activeViewMode === "tracks" ? "ENGINEERING TRACKS" : "MATA KULIAH / BIDANG"}
                  </span>
                </div>
                
                {/* 8 Columns: S1-S8 column scale header cells */}
                <div className="flex-1 grid grid-cols-8">
                  {columns.map((col) => {
                    const isSelected = col.num === selectedSemester;
                    const isNow = col.isCurrent;
                    
                    return (
                      <div 
                        key={col.num} 
                        onClick={() => setSelectedSemester(col.num)}
                        className={`px-3 py-3 text-center border-r border-slate-100 last:border-r-0 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? "bg-teal-500/[0.04] ring-1 ring-teal-500/10 font-bold" 
                            : "hover:bg-slate-50/80"
                        } ${
                          isNow ? "relative" : ""
                        }`}
                      >
                        {isNow && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2.5 py-[2px] bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-b-md text-[8px] font-mono font-black tracking-widest leading-none shadow-sm animate-pulse z-20">
                            AKTIF
                          </div>
                        )}
                        
                        <span className={`text-xs font-mono font-black leading-none ${
                          isNow ? "text-amber-600" : isSelected ? "text-teal-700" : "text-slate-700"
                        }`}>
                          S{col.num}
                        </span>
                        <span className={`text-[9px] font-mono mt-1 ${
                          isNow ? "text-amber-500 font-bold" : isSelected ? "text-teal-600" : "text-slate-400"
                        }`}>
                          {col.year}
                        </span>
                        <span className="text-[7.5px] text-slate-400 font-mono mt-0.5 scale-90 opacity-75">
                          {col.period}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. THE TIMELINE ROWS WRAPPER (CONTAINING PATH CONNECTING LINES + LANES) */}
              <div className="relative bg-white" id="timeline-row-canvas-area">
                
                {/* Grid Background vertical overlay */}
                <div className="absolute inset-y-0 right-0 w-[896px] grid grid-cols-8 pointer-events-none select-none z-0 opacity-20">
                  {[...Array(8)].map((_, idx) => (
                    <div key={idx} className="h-full border-r border-dashed border-slate-200 last:border-r-0"></div>
                  ))}
                </div>

                {/* SVG connection pipelines (ONLY displayed in tracks view mode) */}
                {activeViewMode === "tracks" && (
                  <svg className="absolute inset-y-0 right-0 w-[896px] h-full pointer-events-none z-0" style={{ pointerEvents: 'none' }}>
                    {/* Curve 1: Connects Lane 1 at S4 to Lane 2 at S4 */}
                    <path 
                      d="M 392,40 C 392,80 392,80 392,120" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      strokeDasharray="5 4"
                      fill="none" 
                      opacity="0.8"
                    />

                    {/* Curve 2: Connects Lane 2 at S5 to Lane 3 at S6 */}
                    <path 
                      d="M 504,120 C 504,160 616,160 616,200" 
                      stroke="#f59e0b" 
                      strokeWidth="2" 
                      strokeDasharray="5 4"
                      fill="none" 
                      opacity="0.85"
                    />

                    {/* Curve 3: Connects Lane 3 at S7 to Lane 4 at S8 */}
                    <path 
                      d="M 728,200 C 728,240 840,240 840,280" 
                      stroke="#6366f1" 
                      strokeWidth="1.5" 
                      strokeDasharray="5 4"
                      fill="none" 
                      opacity="0.6"
                    />
                  </svg>
                )}

                {/* THE VERTICAL CONTENT OF MATRIX */}
                {activeViewMode === "tracks" ? (
                  /* ========================================================
                      TRACK VIEW MODE: ORIGINAL HIGH LEVEL INITLATIVE LANES
                     ======================================================== */
                  <div className="divide-y divide-slate-100">
                    {initiatives.map((lane) => {
                      const isSelected = selectedSemester >= lane.startSlot && selectedSemester <= lane.endSlot;
                      
                      return (
                        <div 
                          key={lane.id} 
                          className="flex hover:bg-slate-50/[0.12] transition-colors duration-300 h-[80px] items-center relative z-10 group"
                        >
                          {/* Left lane label card info */}
                          <div className="w-64 shrink-0 pr-4 flex items-center justify-between border-r border-slate-100 h-full pl-5 bg-white select-none z-10">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl transition-all duration-300 ${
                                lane.status === "completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                lane.status === "current" ? "bg-amber-50 text-amber-600 border border-amber-200 animate-pulse" :
                                "bg-indigo-50/80 text-indigo-600 border border-indigo-100"
                              }`}>
                                <lane.icon size={16} weight="bold" />
                              </div>
                              <div>
                                <h4 className="text-[11px] font-extrabold text-slate-800 tracking-tight leading-snug">{lane.title}</h4>
                                <p className="text-[9px] text-slate-400 font-mono mt-0.5">{lane.subtitle}</p>
                              </div>
                            </div>
                            
                            <span className="font-mono text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                              {lane.count}
                            </span>
                          </div>

                          {/* Gantt Bar spanning scale */}
                          <div className="flex-1 grid grid-cols-8 h-full relative">
                            {/* Gantt floating pill bar */}
                            <div 
                              style={{ 
                                gridColumnStart: lane.startSlot, 
                                gridColumnEnd: lane.endSlot + 1 
                              }}
                              className="absolute self-center h-[38px] z-10 flex items-center pr-2 left-1.5 right-1.5"
                            >
                              <div 
                                onClick={() => setSelectedSemester(lane.endSlot)}
                                className={`w-full h-full rounded-xl border flex items-center px-4 justify-between transition-all duration-300 cursor-pointer select-none border-l-4 ${lane.accentBorder} ${
                                  lane.status === "completed" ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-250 hover:bg-emerald-500/15 text-emerald-950 shadow-[0_2px_8px_rgba(16,185,129,0.02)]" :
                                  lane.status === "current" ? "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-300/5 border-amber-300 hover:bg-amber-500/15 text-amber-950 ring-1 ring-amber-400/15 shadow-[0_4px_12px_rgba(245,158,11,0.05)]" :
                                  "bg-gradient-to-r from-indigo-500/5 to-blue-500/5 border-indigo-150 hover:bg-indigo-500/10 text-indigo-950 shadow-[0_2px_8px_rgba(99,102,241,0.02)]"
                                } hover:-translate-y-0.5 active:translate-y-0`}
                              >
                                <div className="flex items-center gap-2">
                                  {lane.status === "current" && (
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                  )}
                                  <span className="text-[10px] uppercase font-mono font-black tracking-wider leading-none">
                                    {lane.title}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 bg-white/70 rounded-md text-[8px] font-mono font-bold leading-none border border-slate-100">
                                    S{lane.startSlot}-S{lane.endSlot}
                                  </span>
                                  <span className="text-[10px] font-mono font-black opacity-85">{lane.count} Complete</span>
                                </div>
                              </div>
                            </div>

                            {/* Lane Milestones overlays */}
                            {lane.milestones.map((m) => {
                              const isCompleted = m.status === "completed";
                              const isCurrent = m.status === "current";
                              const isActive = selectedSemester === m.sem;

                              return (
                                <div 
                                  key={m.id}
                                  style={{ gridColumnStart: m.sem, gridColumnEnd: m.sem + 1 }}
                                  className="relative h-full flex flex-col items-center justify-end pb-1.5 z-20 group/milestone cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSemester(m.sem);
                                  }}
                                >
                                  {isActive && (
                                    <div className="absolute bottom-6 w-8 h-8 rounded-full bg-teal-500/15 blur-sm animate-pulse"></div>
                                  )}

                                  {/* Tooltip on Hover */}
                                  <div className="absolute top-[2px] opacity-0 group-hover/milestone:opacity-100 pointer-events-none transition-all duration-300 bg-slate-900 text-white text-[9px] font-bold py-1.5 px-2.5 rounded-lg -translate-y-2 shadow-xl whitespace-nowrap z-50">
                                    {m.title} (Semester {m.sem})
                                  </div>

                                  <div className={`w-5 class-indicator h-5 rounded-full flex items-center justify-center transition-all duration-300 bg-white border shadow-sm ${
                                    isActive 
                                      ? "scale-125 border-teal-500 ring-4 ring-teal-500/10 shadow-md" 
                                      : "border-slate-200 hover:border-slate-350 hover:scale-110"
                                  }`}>
                                    {isCompleted ? (
                                      <span className={`text-[10px] font-bold h-full flex items-center justify-center ${isActive ? "text-teal-600" : "text-emerald-500"}`}>✓</span>
                                    ) : isCurrent ? (
                                      <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-300 leading-none">◇</span>
                                    )}
                                  </div>
                                  
                                  <span className={`text-[8px] font-mono mt-1 pointer-events-none font-bold ${
                                    isActive ? "text-teal-700" : "text-slate-400"
                                  }`}>
                                    S{m.sem}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* ========================================================
                      COURSE VIEW MODE: ACCURATE ACADEMIC GANTT CHART IN DETAILS
                     ======================================================== */
                  <div className="divide-y divide-slate-100/70">
                    {coursesGantt.map((course) => {
                      const isHovered = hoveredCourseId === course.id;
                      const isClicked = clickedCourseId === course.id;
                      const CatIcon = getCategoryIcon(course.category);

                      // Determine course color theme
                      const theme = 
                        course.status === "completed" 
                          ? {
                              barBg: "bg-gradient-to-r from-emerald-500/12 to-teal-500/6 hover:bg-emerald-500/[0.18]",
                              border: "border-emerald-550 border-emerald-400/70",
                              stripe: "bg-emerald-500",
                              tag: "bg-emerald-50 text-emerald-800 border-emerald-100",
                              text: "text-emerald-900"
                            }
                          : course.status === "current"
                          ? {
                              barBg: "bg-gradient-to-r from-amber-500/15 via-orange-500/12 to-amber-300/5 hover:bg-amber-500/20 shadow-sm",
                              border: "border-amber-400/80 ring-1 ring-amber-400/10",
                              stripe: "bg-amber-500 animate-pulse",
                              tag: "bg-amber-50 text-amber-900 border-amber-200 animate-pulse",
                              text: "text-amber-950 font-bold"
                            }
                          : {
                              barBg: "bg-gradient-to-r from-indigo-500/5 to-blue-500/5 hover:bg-indigo-500/10",
                              border: "border-indigo-150 border-slate-200",
                              stripe: "bg-indigo-300",
                              tag: "bg-indigo-50/50 text-indigo-700 border-indigo-100",
                              text: "text-slate-650"
                            };

                      return (
                        <div 
                          key={course.id}
                          className="flex hover:bg-slate-50/[0.08] transition-colors duration-300 h-[48px] items-center relative z-10 group"
                        >
                          {/* Course title details (Left Column) */}
                          <div className="w-64 shrink-0 pr-4 flex items-center justify-between border-r border-slate-100 h-full pl-5 bg-white select-none z-10">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <span className="text-slate-400 group-hover:text-teal-600 transition-colors shrink-0">
                                <CatIcon size={12} weight="bold" />
                              </span>
                              <div className="overflow-hidden">
                                <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight truncate group-hover:text-teal-900 transition-colors">
                                  {course.name}
                                </h4>
                                <span className="text-[8px] text-slate-400 font-mono tracking-wide leading-none uppercase block">
                                  {course.category}
                                </span>
                              </div>
                            </div>

                            {/* Badge display grade or sks */}
                            {course.grade ? (
                              <span className="shrink-0 font-mono text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                                {course.grade}
                              </span>
                            ) : course.uts ? (
                              <span className="shrink-0 font-mono text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-md">
                                {course.uts} <span className="text-[7px]">UTS</span>
                              </span>
                            ) : (
                              <span className="shrink-0 font-mono text-[8px] text-indigo-500 font-bold bg-indigo-50 border border-indigo-100/50 px-1 py-0.5 rounded-md">
                                PLAN
                              </span>
                            )}
                          </div>

                          {/* Gantt Matrix lane (Right Column) */}
                          <div className="flex-1 grid grid-cols-8 h-full relative font-sans">
                            
                            {/* Floating Gantt Bar */}
                            <div 
                              style={{ 
                                gridColumnStart: course.startSem, 
                                gridColumnEnd: course.endSem + 1 
                              }}
                              className="absolute self-center h-[30px] z-10 flex items-center pr-2 left-1 right-1"
                              onMouseEnter={() => setHoveredCourseId(course.id)}
                              onMouseLeave={() => setHoveredCourseId(null)}
                              onClick={() => {
                                setClickedCourseId(clickedCourseId === course.id ? null : course.id);
                                setSelectedSemester(course.startSem);
                              }}
                            >
                              <div 
                                className={`w-full h-full rounded-lg border-l-4 border ${theme.border} ${theme.barBg} px-2.5 flex items-center justify-between transition-all duration-300 cursor-pointer select-none`}
                                style={{
                                  borderLeftColor: course.status === "completed" ? "#10b981" : course.status === "current" ? "#f59e0b" : "#6366f1",
                                  boxShadow: isHovered || isClicked ? "0 2px 10px rgba(13,148,136,0.08)" : "none",
                                  transform: isHovered || isClicked ? "translateY(-1px)" : "none"
                                }}
                              >
                                <span className={`text-[9px] font-bold leading-none tracking-tight truncate ${theme.text}`}>
                                  {course.name}
                                </span>

                                <span className="px-1 py-0.5 bg-white/85 text-slate-500 rounded text-[7px] font-mono border border-slate-100 font-bold leading-none pointer-events-none">
                                  S{course.startSem}{course.endSem !== course.startSem && `–S${course.endSem}`}
                                </span>
                              </div>
                            </div>

                            {/* Connection trace guides */}
                            {isHovered && (
                              <div 
                                style={{ gridColumnStart: course.startSem, gridColumnEnd: course.endSem + 1 }}
                                className="absolute inset-y-0 bg-teal-500/[0.02] border-x border-teal-500/10 pointer-events-none z-0"
                              />
                            )}

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Footer selector synchronized guide strip */}
        <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-slate-500 select-none">
          <p className="font-semibold flex items-center gap-2 text-slate-600 leading-tight">
            <Info size={16} className="text-teal-600 shrink-0" />
            <span>SINKRONISASI AKTIF: Ketuk semester di bawah atau elemen apa pun di atas untuk menyesuaikan audit sub-kurikulum Universitas Negeri Surabaya (UNESA).</span>
          </p>
          <div className="flex gap-1">
            {semesters.map((s) => (
              <button 
                key={s.number}
                onClick={() => setSelectedSemester(s.number)}
                className={`w-8 h-8 rounded-lg font-mono text-[10px] font-bold border transition-all duration-300 cursor-pointer flex items-center justify-center shadow-inner ${
                  selectedSemester === s.number 
                    ? "bg-teal-600 text-white border-teal-600 shadow-md transform -translate-y-0.5" 
                    : s.status === "completed" ? "bg-white text-emerald-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/[0.1]" :
                      s.status === "current" ? "bg-amber-50 text-amber-700 border-amber-300 animate-pulse" :
                      "bg-white text-slate-400 border-slate-200 hover:border-slate-350"
                }`}
              >
                S{s.number}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ==========================================================
          BENTO ROW 3: DETAILED SYNC SEMESTER DRAWER (BENTO BOX)
          ========================================================== */}
      <div id="semester-detail-panel" className="animate-fade-in">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedSemester}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`p-6 rounded-2xl border bg-white shadow-md space-y-6 transition-all duration-300 ${
              currentSemesterData.status === "completed" ? "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/[0.01]" :
              currentSemesterData.status === "current" ? "border-amber-300 ring-1 ring-amber-400/20" :
              "border-slate-200 hover:border-slate-300"
            }`}
          >
            {/* Header section in Folder tab look */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] text-[#0f766e] font-mono font-black uppercase tracking-widest block bg-teal-50 px-2 py-0.5 rounded">
                    {currentSemesterData.academicYear}
                  </span>
                  
                  {currentSemesterData.status === "current" ? (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] rounded-md border border-amber-200 font-extrabold uppercase tracking-wide flex items-center gap-1 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Semester Berjalan
                    </span>
                  ) : currentSemesterData.status === "completed" ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] rounded-md border border-emerald-200 font-extrabold uppercase tracking-wide flex items-center gap-1 select-none">
                      ✓ Selesai &amp; Lulus
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] rounded-md border border-indigo-200 font-extrabold uppercase tracking-wide flex items-center gap-1 select-none">
                      🔒 AI-Projection Row
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mt-1.5 leading-tight flex items-center gap-2">
                  {currentSemesterData.name} — Core Module Focus
                </h3>
              </div>

              {/* Technical stats blocks in JetBrains Mono */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="text-slate-500 text-[11px] font-medium leading-none">
                  Semester SKS: <strong className="text-slate-800">{currentSemesterData.sks} SKS</strong> 
                  <span className="mx-1.5 text-slate-300">|</span>
                  Total SKS: <strong className="text-teal-700 font-bold">{currentSemesterData.cumulativeSks} SKS</strong>
                </div>

                {currentSemesterData.status === "completed" ? (
                  <div className="px-3 py-1.5 bg-emerald-50/50 text-emerald-700 rounded-lg border border-emerald-100 font-bold flex items-center gap-2">
                    <span>IPK Semester: <strong>{currentSemesterData.ipk.toFixed(2)}</strong></span>
                    <span className="text-slate-300">|</span>
                    <span>IPK Kumulatif: <strong>{currentSemesterData.cumulativeIpk.toFixed(2)}</strong></span>
                  </div>
                ) : currentSemesterData.status === "current" ? (
                  <div className="px-3 py-1.5 bg-amber-50 text-amber-705 rounded-lg border border-amber-200 font-bold flex items-center gap-2">
                    <span>IPK Estimasi: <strong>{currentSemesterData.ipk.toFixed(2)}</strong></span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg border border-slate-200 font-bold flex items-center gap-2">
                    <span>Target IPK Selesai: <strong>{currentSemesterData.ipk.toFixed(2)}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Sub Bento Grid inside Semester Details Folder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-inner-semester-folder">
              
              {/* Box A: Courses index */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0f766e] mb-3 flex items-center gap-1.5">
                    📚 Mata Kuliah Terintegrasi
                  </h4>
                  <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                    {currentSemesterData.courses.map((course, i) => (
                      <div key={i} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-xl hover:border-slate-300 transition-all border border-slate-100 shadow-sm">
                        <span className="text-slate-700 font-semibold">{course.name}</span>
                        {course.grade && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-black border border-emerald-100 text-[10px]">
                            {course.grade}
                          </span>
                        )}
                        {course.uts && (
                          <span className="text-[9px] text-slate-700 font-mono bg-amber-50 px-2 py-0.5 border border-amber-100 rounded-md">
                            Score UTS: <strong className="text-amber-700 font-black">{course.uts}</strong>
                          </span>
                        )}
                        {!course.grade && !course.uts && (
                          <span className="text-[9px] text-indigo-500 font-mono bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 font-bold">Planned</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 block mt-3 select-none text-[9px] text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> UNIVERSITAS BRAWIJAYA SINKRONISASI API
                </div>
              </div>

              {/* Box B: Competencies and gaps */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0f766e] mb-3 flex items-center gap-1.5">
                    ⚡ Kompetensi Karir (Dikuasai vs Target)
                  </h4>
                  
                  {currentSemesterData.status !== "current" ? (
                    <div className="space-y-3">
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Terbuka di semester ini:</p>
                      <div className="flex flex-wrap gap-1.5 max-h-[145px] overflow-y-auto pr-1">
                        {currentSemesterData.skills.length > 0 ? (
                          currentSemesterData.skills.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-gradient-to-r from-teal-50 to-white text-teal-700 text-[11px] rounded-lg border border-teal-100 flex items-center gap-1 font-semibold shadow-sm">
                              <SealCheck size={12} weight="fill" className="text-teal-600" /> {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Tidak ada skill khusus semester ini</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Semester 5 Active Gaps list with visual alert indicator */
                    <div className="space-y-2.5">
                      <span className="text-[9px] text-orange-600 font-mono uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-orange-400 rounded-full animate-ping"></span> 90-Day Gaps Audit:
                      </span>
                      <div className="space-y-1.5 max-h-[145px] overflow-y-auto pr-1">
                        {currentSemesterData.gaps?.map((gap, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-xl text-xs bg-white border border-slate-100 shadow-sm hover:border-slate-300 transition-colors">
                            <span className="text-slate-800 flex items-center gap-1.5 font-bold">
                              {gap.status === "GAP" ? (
                                <Warning size={14} weight="fill" className="text-rose-500 animate-pulse" />
                              ) : (
                                <CheckCircle size={14} weight="fill" className="text-emerald-500" />
                              )}
                              {gap.name}
                            </span>
                            
                            {gap.status === "GAP" ? (
                              <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 text-[8.5px] rounded-md font-mono font-bold border border-rose-100 uppercase tracking-widest">
                                GAP: {gap.level}
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] rounded-md font-mono font-bold border border-emerald-100 uppercase tracking-widest">
                                OK ✓
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {currentSemesterData.status === "future" && (
                  <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[10px] text-blue-800 flex items-start gap-1.5 font-medium mt-3 leading-relaxed">
                    <Info size={12} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>Rekomendasi Magang MBKM Dikti bernilai konversi 20 SKS penuh untuk percepatan kelulusan.</span>
                  </div>
                )}
              </div>

              {/* Box C: AI Action advisor */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0f766e] flex items-center gap-1.5">
                    <Sparkle size={14} weight="fill" className="text-teal-600 animate-spin-slow" /> AI Actionable Advisor
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                    {currentSemesterData.aiInsight}
                  </p>
                  
                  {currentSemesterData.aiAction && (
                    <div className="text-xs text-amber-900 leading-relaxed p-2.5 bg-amber-500/[0.04] border border-amber-200 rounded-xl font-semibold shadow-sm">
                      💡 <strong>Rencana Aksi S5:</strong> {currentSemesterData.aiAction}
                    </div>
                  )}
                  {currentSemesterData.aiProjection && (
                    <div className="text-xs text-teal-900 leading-relaxed p-2.5 bg-teal-50/60 border border-teal-100 rounded-xl font-semibold shadow-sm">
                      📈 <strong>Prognosis Selesai:</strong> {currentSemesterData.aiProjection}
                    </div>
                  )}
                </div>

                {currentSemesterData.status === "current" && (
                  <div className="text-right pt-2 select-none">
                    <span className="text-[9.5px] font-mono text-teal-700 font-extrabold uppercase tracking-widest inline-flex items-center gap-1.5 hover:underline cursor-pointer group">
                      Isi Gaps Di Tab 2 <ArrowRight size={10} weight="fill" className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ==========================================================
          BENTO ROW 4: CHART MATRIX & MATCH CARDS
          ========================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bento-lower-section">
        
        {/* Trajectory score chart bento module (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4 transition-all duration-300 hover:shadow-lg" id="bento-chart-panel">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Star size={18} className="text-teal-600" /> Proyeksi Kesiapan Industri S1 - S8
              </h2>
              <p className="text-xs text-slate-500">Analisis longitudinal kesiapan kerja riil vs optimal dibanding baseline pasif</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                <span className="font-bold">Aktual (S1-S5)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-teal-500 border-t-2 border-dashed" />
                <span className="font-bold">Proyeksi AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-slate-400 border-t-2 border-dashed" />
                <span className="font-bold">Skenario Pasif</span>
              </div>
            </div>
          </div>

          {/* Line Chart drawing wrap */}
          <div className="h-[240px] bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-sm" id="trajectory-linechart">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={careerTrajectoryData}
                margin={{ top: 15, right: 30, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="baselineAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  tick={{ fill: "#64748b", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  stroke="#94a3b8" 
                  tick={{ fill: "#64748b", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: 16, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                  labelStyle={{ color: "#0f172a", fontWeight: "bold", fontSize: 11, fontFamily: "JetBrains Mono" }}
                  itemStyle={{ color: "#0d9488", fontSize: 11 }}
                />
                
                {/* Benchmark references */}
                <ReferenceLine y={80} stroke="#f43f5e" strokeDasharray="4 4" opacity={0.65}>
                  <Label value="Kesiapan Magang (80)" offset={7} position="top" fill="#e11d48" fontSize={9} fontWeight="700" fontFamily="JetBrains Mono" />
                </ReferenceLine>
                <ReferenceLine y={90} stroke="#10b981" strokeDasharray="4 4" opacity={0.65}>
                  <Label value="Siap Kerja (90)" offset={7} position="top" fill="#059669" fontSize={9} fontWeight="700" fontFamily="JetBrains Mono" />
                </ReferenceLine>

                {/* Shaded Area for Actual curve progress */}
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  fill="url(#chartAreaGradient)" 
                  stroke="none"
                />

                {/* Baseline Area */}
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  fill="url(#baselineAreaGradient)" 
                  stroke="none"
                />

                {/* Baseline Line */}
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#94a3b8" 
                  strokeWidth={1.5} 
                  strokeDasharray="4 4" 
                  dot={{ r: 3.5, fill: '#ffffff', stroke: '#94a3b8', strokeWidth: 1.5 }}
                  name="Skenario Baseline Passive"
                />

                {/* AI Projection Line */}
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#0f766e" 
                  strokeWidth={2} 
                  strokeDasharray="5 3" 
                  dot={{ r: 3.5, fill: '#0f766e' }}
                  name="Proyeksi AI Optimal"
                />

                {/* Actual Line */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#0d9488" 
                  strokeWidth={3} 
                  dot={{ r: 5.5, fill: '#ffffff', stroke: '#0d9488', strokeWidth: 3 }}
                  name="Kemajuan Aktual"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <span className="font-semibold text-slate-800">
               Peluang Terbuka: Selesaikan kontainerisasi Docker (+8 skor) dan REST Security (+6 skor) untuk memicu pertumbuhan kesiapan karir yang agresif.
            </span>
            <div className="px-2.5 py-1.5 bg-teal-600 text-white rounded-lg text-[10px] font-mono font-bold whitespace-nowrap leading-none shadow-sm select-none">
              Optimal ROI: Docker Setup
            </div>
          </div>
        </div>

        {/* Module 3: Match Cards Carousel bento (4 cols) - Career Match AI (M6.1 + M6.9) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4 transition-all duration-300 hover:shadow-lg flex flex-col justify-between" id="bento-matches-panel">
          <div>
            <div className="border-b border-slate-100 pb-3 flex justify-between items-start gap-1">
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass size={16} className="text-teal-600 animate-pulse" /> Career Match AI 🎯
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Analisis probabilitas rekrutmen kecocokan profil &amp; SKKNI</p>
              </div>
              <span className="px-1.5 py-0.5 bg-teal-50 text-teal-800 text-[8px] font-black uppercase rounded block tracking-wider font-mono">
                Probabilistik
              </span>
            </div>

            {/* Edge Case 1 (EC-CM-01) constraint banner when Semester 1-2 active */}
            {selectedSemester <= 2 && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-150 rounded-xl text-[10px] text-blue-800 font-bold leading-normal relative overflow-hidden animate-fade-in" id="early-projection-banner">
                <p>📍 <strong>Proyeksi Awal</strong> — Akurasi klasifikasi rekomendasi akan meningkat seiring dengan lebih banyak data belajar &amp; portofolio aseli yang tersedia di semester mendatang.</p>
                <span className="text-[9px] text-blue-500 font-mono font-black mt-2 inline-block">Estimasi Keandalan: Rendah (35%)</span>
              </div>
            )}

            {/* Edge Case 2 (EC-CM-02) - Search / submit niche careers */}
            <div className="mt-3.5 space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Cari Karir Niche / Bidang Spesifik:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik karir (misal: Virtual Reality Comm, AI Prompt Creator)..."
                  value={nicheSearch}
                  onChange={(e) => setNicheSearch(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-teal-400 focus:bg-white text-slate-800 font-medium"
                />
                {nicheSearch && (
                  <button
                    onClick={() => setNicheSearch("")}
                    className="px-2 bg-slate-100 hover:bg-slate-200 text-slate-400 text-xs rounded-lg"
                  >
                    Batal
                  </button>
                )}
              </div>

              {nicheSearch && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[10px] text-slate-700 space-y-2 animate-fade-in">
                  <p className="font-semibold">⚠️ <strong>Niche Career Warning (EC-CM-02):</strong> Karir spesifik ini tidak ditemukan dalam database keahlian utama nasional.</p>
                  <p className="text-[9px] text-slate-500">Mencocokkan dengan kualifikasi terdekat: <strong>Social Media &amp; Digital PR Specialist (Kecocokan 84%)</strong>.</p>
                  
                  {submittedNicheList.includes(nicheSearch) ? (
                    <div className="text-[9px] text-teal-700 bg-teal-50 border border-teal-150 p-2 rounded-lg font-black text-center">
                      ✓ Karir telah diajukan ke tim moderasi kurikulum akademik!
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSubmittedNicheList(prev => [...prev, nicheSearch]);
                        alert(`Diterima! Usulan karir nirlaba '${nicheSearch}' resmi dikirimkan ke pihak Kaprodi (Koordinator Program Studi) UNESA untuk ditelaah dalam evaluasi kurikulum!`);
                      }}
                      className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-[9px] font-black uppercase tracking-wider block text-center cursor-pointer transition-colors"
                    >
                      Ajukan Karir Baru ke Moderasi Akademik
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* List of 10 match cards with ignore feedback capability (BR-CM-02) */}
            <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1" id="matches-scroll-container">
              {careerMatches
                .filter(m => !ignoredCareers[m.title])
                .filter(m => {
                  if (!nicheSearch) return true;
                  return m.title.toLowerCase().includes(nicheSearch.toLowerCase()) || 
                         m.companyType.toLowerCase().includes(nicheSearch.toLowerCase());
                })
                .map((match, idx) => {
                  const isExpanded = expandedMatchIdx === idx;
                  const isTargetInstance = match.title.includes("Social Media");
                  
                  // SHAP Factors (AC-CM-02) dynamically formatted
                  const shapFactors = [
                    `Eksaminasi Kelulusan Kelas: Didukung oleh perolehan nilai teoritis & formatif yang istimewa (A/A-) di kelas '${match.masteredSkills[0] || "Kurikulum Komunikasi"}' Anda.`,
                    `Profil Kompetensi Personal: Sangat selaras dengan preferensi gaya belajar Anda (${studentProfile.learningStyle}) yang dominan berbasis pengerjaan studi kasus dan produksi kreatif.`,
                    `Kecocokan Standard SKKNI: Kemampuan menulis, mengorganisasi, dan meluncurkan kampanye Anda telah melampaui 80% parameter okupasi nasional.`
                  ];

                  // Dynamically adjust confidence level if semester is 1
                  const confidenceLevel = selectedSemester <= 2 ? "35% (Rendah)" : `${98 - idx * 4}% (Sangat Tinggi)`;

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all duration-300 relative ${
                        isTargetInstance 
                          ? "border-teal-500 bg-teal-500/[0.01] shadow-[0_3px_12px_rgba(13,148,136,0.05)] ring-1 ring-teal-500/10 hover:-translate-y-0.5" 
                          : "border-slate-250 bg-gradient-to-b from-slate-50/40 to-white hover:border-slate-300 hover:-translate-y-0.5 shadow-sm hover:shadow"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <h4 className="text-[11.5px] font-black text-slate-800 leading-tight mt-0.5">{match.title}</h4>
                          <span className="text-[9px] text-slate-400 font-mono font-bold block mt-1">{match.companyType}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-mono font-black block ${
                            match.matchPercent >= 80 ? "text-teal-700" : "text-amber-700"
                          }`}>
                            {match.matchPercent}% Match
                          </span>
                        </div>
                      </div>

                      {/* Display regional salary, Update date & Source - BR-CM-04 */}
                      <p className="text-[9px] text-slate-505 font-medium mt-2 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        💼 <strong>Estimasi Gaji:</strong> {match.salaryRange}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mt-3 text-[8.5px]">
                        <div>
                          <span className="text-emerald-700 font-mono block mb-0.5 font-bold">✓ MATCH (COMPLETED):</span>
                          <p className="text-slate-600 font-semibold truncate text-[9px]">{match.masteredSkills.join(", ")}</p>
                        </div>
                        <div>
                          <span className="text-rose-700 font-mono block mb-0.5 font-bold">⚠ GAPS (TARGET LEARN):</span>
                          <p className="text-slate-600 font-semibold truncate text-[9px]">{match.gapSkills.join(", ")}</p>
                        </div>
                      </div>

                      {/* Expandable Section - SHAP & Reject option */}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setExpandedMatchIdx(isExpanded ? null : idx)}
                          className="text-[9px] font-mono text-teal-650 hover:text-teal-500 font-black cursor-pointer uppercase flex items-center gap-1"
                        >
                          {isExpanded ? "Sembunyikan Analitis ▲" : "Tampilkan Analitis SHAP & Keandalan ▼"}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="mt-2 text-[9px] space-y-2.5 overflow-hidden text-slate-600 border-l-2 border-slate-200 pl-3 leading-relaxed"
                            >
                              <div>
                                <span className="font-bold text-slate-800 uppercase text-[8px] block">Confidence (Keandalan Prediksi):</span>
                                <span className="font-mono text-teal-700 font-extrabold">{confidenceLevel}</span>
                              </div>

                              <div className="space-y-1.5">
                                <span className="font-bold text-slate-800 uppercase text-[8px] block">SHAP Explainability (3 Faktor Kunci - AC-CM-02):</span>
                                {shapFactors.map((f, fIdx) => (
                                  <p key={fIdx} className="text-slate-500 leading-normal pl-2 relative">
                                    <span className="absolute left-0 top-1 text-teal-500 font-bold">•</span> {f}
                                  </p>
                                ))}
                              </div>

                              {/* BR-CM-02 Ignore button right on card */}
                              <div className="pt-1 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIgnoredCareers(prev => ({ ...prev, [match.title]: true }));
                                    alert(`Abaikan rekomendasi '${match.title}'. Feedback tersimpan guna melatih kecocokan model rekam belajar Anda selanjutnya.`);
                                  }}
                                  className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[8.5px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer border border-rose-200/50"
                                >
                                  Abaikan Rekomendasi Ini
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  );
                })}

              {careerMatches.filter(m => !ignoredCareers[m.title]).length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400" id="no-careers-left">
                  <p>Semua rekomendasi karir telah diabaikan.</p>
                  <button
                    type="button"
                    onClick={() => setIgnoredCareers({})}
                    className="mt-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-bold text-xs"
                  >
                    Reset Daftar Karir
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-150 flex items-center justify-between text-[8px] text-slate-400" id="bento-matches-footer">
            <span>SIAKAD Synchronized: Live</span>
            <span>Update: 15 Juni 2026</span>
          </div>
        </div>

      </div>

    </div>
  );
}
