import React, { useState } from "react";
import { 
  TrendingUp, 
  Map, 
  Award, 
  Sparkle, 
  ArrowUpRight, 
  ExternalLink,
  BookOpen,
  Briefcase,
  Users,
  Target,
  FileText,
  AlertTriangle,
  Info,
  Layers
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface AcademicKarirProps {
  isDarkMode: boolean;
}

export default function AcademicKarir({ isDarkMode }: AcademicKarirProps) {
  const [selectedPilar, setSelectedPilar] = useState<string | null>("media-listening");

  // Hardcoded Student Desires vs Industry Needs detailed mapping
  const linkMatchData = [
    {
      id: "media-listening",
      pilar: "Big Data & Analitika Media",
      studentInterest: "Analisis Sentimen, Riset Khalayak Modern, Monitoring Berita",
      industryDemand: "Social Media Listening (Brand24/Synthesio), Excel Sentiment Mining, SEO Optimization",
      matchPercent: 42,
      status: "MISMATCH", // "MATCH" | "PARTIAL" | "MISMATCH",
      statusLabel: "Mismatch (Gap Kritis)",
      why: "89% mahasiswa sangat tertarik dengan analisis psikologi khalayak di media sosial, namun kurikulum saat ini masih mengajarkan teori riset khalayak klasik (kuesioner/survei fisik) tanpa membekali tools scraping digital modern & platform analytics.",
      actionNeeded: "Segera integrasikan praktikum penggunaan dashboard Brand24 selama 2 pertemuan pada mata kuliah Analitik Media Sosial & Big Data.",
      metric: "73% Lowongan PR Agency mencari ahli analitik real-time."
    },
    {
      id: "crisis-campaign",
      pilar: "Manajemen Kampanye & Krisis",
      studentInterest: "Penyusunan Rilis Pers, Manajemen Isu, Mitigasi Hoax",
      industryDemand: "Crisis Comms Response, Digital Storytelling, CSR Framework",
      matchPercent: 91,
      status: "MATCH",
      statusLabel: "Match Sempurna",
      why: "Ada keselarasan tinggi! Mahasiswa menyukai tantangan simulasi krisis humas, dan kurikulum Anda sudah memuat modul bedah kasus krisis. Industri di Fintech & BUMN pun memerlukan respons cepat terhadap isu siber.",
      actionNeeded: "Pertahankan performa ini. Rekomendasikan sertifikasi Certified PR Officer khusus bagi mahasiswa berkinerja tinggi.",
      metric: "84% Mahasiswa lulus simulasi dengan nilai A/A-."
    },
    {
      id: "digital-copywriting",
      pilar: "PR & Digital Copywriting",
      studentInterest: "SEO Copywriting, Kreator Konten, Naskah Kampanye Kreatif",
      industryDemand: "SEO Copywriting, Web Traffic Analytics, Conversion Optimization",
      matchPercent: 78,
      status: "PARTIAL",
      statusLabel: "Partial Match",
      why: "Mahasiswa mahir dalam merangkai kata dan penulisan naskah persuasif di media sosial, namun belum dibekali pemahaman aspek teknis seperti riset kata kunci (keyword research) dan konversi traffic blog.",
      actionNeeded: "Sisipkan modul 1 sesi mengenai Google Keyboard Planner & SEMRush dalam perkuliahan Digital Copywriting.",
      metric: "68% lowongan menyukai pelamar dengan portofolio terukur SEO."
    },
    {
      id: "media-relations",
      pilar: "Media Relations & KOL",
      studentInterest: "KOL Partnering, Event Management, Cyber Ethics",
      industryDemand: "Media Relations Network, Media Placement & Influencer Strategy",
      matchPercent: 88,
      status: "MATCH",
      statusLabel: "Match Stabil",
      why: "Keinginan mahasiswa untuk aktif berkolaborasi dengan KOL & influencer ditunjang oleh materi kemitraan media eksternal yang diajarkan pada praktikum humas digital agency.",
      actionNeeded: "Undang alumni atau praktisi agensi global (seperti Ogilvy) sebagai dosen tamu untuk sesi studi kasus rill.",
      metric: "Mitra korporat eksternal aktif: 12 korporasi s/d Juni 2026."
    },
    {
      id: "photo-video",
      pilar: "Multimedia & Sinematografi",
      studentInterest: "Fotografi & Sinematografi Kreatif, TikTok Content",
      industryDemand: "Video Production & Editing Basics, Brand Narrative Formulation",
      matchPercent: 65,
      status: "PARTIAL",
      statusLabel: "Partial (Perlu Upgrade)",
      why: "Mahasiswa sangat antusias memproduksi video berdurasi pendek (TikTok/Reels), namun industri membutuhkan penajaman pada struktur narasi pesan brand (brand narrative) dan kualitas estetika produksi formal.",
      actionNeeded: "Alokasikan penggunaan Lab Humas untuk sertifikasi penyusunan naskah video bercerita (brand storytelling).",
      metric: "49% lowongan agensi menuntut portfolio komersial rill."
    }
  ];

  // Hardcoded Indonesian industry dummy data (June 2026)
  const skillData = [
    { name: "Public Relations (PR)", value: 91, status: "taught", color: "#15803D", label: "Sudah Diajarkan" },
    { name: "Social Media Strategy", value: 84, status: "taught", color: "#15803D", label: "Sudah Diajarkan" },
    { name: "Social Media Listening (Brand24)", value: 73, status: "gap", color: "#B91C1C", label: "Belum Ada" },
    { name: "Digital Copywriting & SEO", value: 68, status: "taught", color: "#15803D", label: "Sudah Diajarkan" },
    { name: "SEO & Traffic Analytics", value: 61, status: "gap", color: "#B91C1C", label: "Belum Ada" },
    { name: "Crisis Comms Response", value: 58, status: "partial", color: "#B45309", label: "Perlu Perhatian" },
    { name: "Video Production & Editing", value: 49, status: "gap", color: "#B91C1C", label: "Belum Ada" },
    { name: "KOL Partnering & Outreaching", value: 38, status: "gap", color: "#B91C1C", label: "Belum Ada" }
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="academic-karir-root">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight">🗺️ Karir &amp; Industri (Career Intelligence for Faculty)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sinyal kebutuhan dunia kerja terintegrasi langsung dengan perencanaan prodi untuk mengukur relevansi silabus dengan tren rekrutmen nasional &amp; lokal.
          </p>
        </div>
        <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/35 rounded-full flex items-center gap-1.5 text-xxs font-black text-teal-500 uppercase tracking-widest leading-none">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
          <span>Analisis Bursa Kerja Aktif</span>
        </div>
      </div>

      {/* ACTIONABLE CAREER INTELLIGENCE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="career-intelligence-kpis">
        
        {/* KPI 1: Curriculum Sync */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-teal-500/30" 
            : "bg-white hover:bg-slate-50 border-teal-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider font-mono">1. Relevansi Kurikulum</span>
              <BookOpen className="text-teal-500" size={17} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-teal-600 dark:text-teal-400">77.0%</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Pembaruan Modul Analisis Media Sosial
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Langkah Strategis:</span>
            <button 
              onClick={() => alert("Mengajukan penambahan lisensi Brand24/Synthesio ke Fakultas untuk menunjang praktikum kelas B.")}
              className="text-xxs font-black text-teal-650 dark:text-teal-400 hover:underline uppercase block text-left"
            >
              Ajukan Lisensi Brand24 →
            </button>
          </div>
        </div>

        {/* KPI 2: Core Gap */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-rose-500/30" 
            : "bg-white hover:bg-slate-50 border-rose-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider font-mono">2. Kesenjangan Utama</span>
              <AlertTriangle className="text-rose-500" size={17} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-rose-500">2 Gap Kritis</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Media Listening &amp; SEO Tools
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Langkah Strategis:</span>
            <button 
              onClick={() => {
                const element = document.getElementById("student-vs-industry-matcher");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setSelectedPilar("media-listening");
                }
              }}
              className="text-xxs font-black text-rose-500 dark:text-rose-400 hover:underline uppercase block text-left"
            >
              Inspeksi Detail Gap →
            </button>
          </div>
        </div>

        {/* KPI 3: Match Level */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-amber-500/30" 
            : "bg-white hover:bg-slate-50 border-amber-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider font-mono">3. Kesesuaian Minat</span>
              <Target className="text-amber-500" size={17} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-amber-500">74.2% Match</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Penajaman Hard-Skill Data Analyst
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Langkah Strategis:</span>
            <button 
              onClick={() => alert("Mengunduh modul pelatihan data analytics minor yang disukai mahasiswa.")}
              className="text-xxs font-black text-amber-600 dark:text-amber-400 hover:underline uppercase block text-left"
            >
              Unduh Panduan Penajaman →
            </button>
          </div>
        </div>

        {/* KPI 4: Tracer Target */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-blue-500/30" 
            : "bg-white hover:bg-slate-50 border-blue-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-blue-550 dark:text-blue-400 tracking-wider font-mono">4. Hasil Tracer Study</span>
              <Award className="text-blue-500" size={17} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-blue-600 dark:text-blue-400">73% Alumni</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Waktu Tunggu Kerja di Bawah 3 Bulan
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Langkah Strategis:</span>
            <button 
              onClick={() => alert("Membuka rekapitulasi data tracer study alumni prodi Ilmu Komunikasi standard BAN-PT.")}
              className="text-xxs font-black text-blue-650 dark:text-blue-400 hover:underline uppercase block text-left"
            >
              Buka Rekapitulasi Tracer →
            </button>
          </div>
        </div>

      </div>

      {/* SECTION 4A — INDUSTRY SKILLS PULSE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT: Horizontal Bar Chart representing Top 8 Skill Paling Dicari */}
        <div 
          className={`xl:col-span-7 rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-sm ${
            isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
          }`}
          id="skills-demands-chart"
        >
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Top 8 Skill Paling Dicari — Ilmu Komunikasi &amp; Humas</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Berdasarkan analisis cerdas terhadap 6.124 lowongan PR, Branding, dan Social Media Specialist aktif nasional (Diperbarui Juni 2026).</p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-2 text-[9px] font-bold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-600 block"></span>
                  <span>Sudah diajarkan</span>
                </span>
                <span className="flex items-center gap-1 text-amber-655 text-amber-600">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 block"></span>
                  <span>Perlu perhatian</span>
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded bg-rose-600 block"></span>
                  <span>Belum diajarkan</span>
                </span>
              </div>
            </div>
            
            {/* Custom Interactive HTML Bar Layout for 100% rendering safety */}
            <div className="mt-6 space-y-4">
              {skillData.map((item, idx) => {
                const barColorClass = 
                  item.status === "taught" 
                    ? "bg-emerald-500" 
                    : item.status === "partial" 
                      ? "bg-amber-500" 
                      : "bg-rose-500";
                
                const cardTint = 
                  item.status === "taught" 
                    ? "text-emerald-500" 
                    : item.status === "partial" 
                      ? "text-amber-500" 
                      : "text-rose-500";

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">#{idx+1}</span>
                        <strong className="font-bold">{item.name}</strong>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-slate-400">Diminta:</span>
                        <strong className="text-slate-800 dark:text-slate-200">{item.value}%</strong>
                        <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase leading-none ${
                          item.status === 'taught' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-100' :
                          item.status === 'partial' ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200' :
                          'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-205'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                    {/* Visual Bar Container */}
                    <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden relative shadow-inner">
                      <div 
                        className={`h-full ${barColorClass} transition-all duration-1000`} 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100/50 dark:border-slate-800 text-[10px] text-slate-400 text-center font-medium">
            Sistem secara rutin membaca pipeline lowongan agensi PR, korporasi telekomunikasi, FMCG, agensi branding, dan media digital nasional.
          </div>
        </div>

        {/* RIGHT: 3 AI Insight Cards (xl:col-span-5) */}
        <div className="xl:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">✨ Rekomendasi Integrasi Kurikulum AI</h3>
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-[9px] text-blue-700 dark:text-blue-300 rounded font-black uppercase">AI Engine</span>
          </div>

          {/* Card 1 (Red Accent) */}
          <div className={`p-4 rounded-xl border border-l-4 border-l-rose-500 text-xs space-y-2 leading-relaxed shadow-sm ${
            isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/35 rounded text-[9px] font-black uppercase tracking-wider">Gap Kritis</span>
            <p className="font-semibold text-slate-705 dark:text-slate-300">
              ⚠ <strong>Media Listening Analytics (Brand24)</strong> belum terakomodasi di silabus Analitik Media Sosial semester ini, padahal <strong>73% lowongan PR Agency</strong> menggunakannya secara rill.
            </p>
            <button 
              onClick={() => alert("Mengirimkan draf revisi penambahan modul Social Listening (Pertemuan 11 & 12) ke Komisi Kurikulum Prodi!")}
              className="text-blue-500 font-extrabold flex items-center gap-1.5 hover:underline bg-transparent border-0 cursor-pointer pt-1 text-[10px] uppercase tracking-wider"
            >
              <span>Ajukan ke Komite Kurikulum →</span>
            </button>
          </div>

          {/* Card 2 (Green Accent) */}
          <div className={`p-4 rounded-xl border border-l-4 border-l-emerald-500 text-xs space-y-2 leading-relaxed shadow-sm ${
            isDarkMode ? "bg-slate-900/10 border-slate-805" : "bg-white border-slate-200"
          }`}>
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/35 rounded text-[9px] font-black uppercase tracking-wider">Aman Konseptual</span>
            <p className="font-semibold text-slate-705 dark:text-slate-300">
              ✓ Modul <strong>Manajemen Kampanye Digital</strong> yang Anda ampu sangat selaras dengan bursa kerja — 84% lowongan humas di Surabaya &amp; Jakarta membutuhkan kehumasan terpadu ini.
            </p>
          </div>

          {/* Card 3 (Amber Accent) */}
          <div className={`p-4 rounded-xl border border-l-4 border-l-amber-500 text-xs space-y-2 leading-relaxed shadow-sm ${
            isDarkMode ? "bg-slate-900/10 border-slate-805" : "bg-white border-slate-200"
          }`}>
            <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/35 rounded text-[9px] font-black uppercase tracking-wider">Tren Meningkat</span>
            <p className="font-semibold text-slate-705 dark:text-slate-300">
              📈 Strategi narasi keberlanjutan (ESG) meningkat pesat <strong>sebesar 41% dalam 6 bulan terakhir</strong>. Sinyal kuat menyematkan modul Brand Advocacy &amp; CSR di semester depan.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION POV DOSEN: STUDENT DESIRES VS INDUSTRY DEMANDS LINK & MATCH */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-xl ${
          isDarkMode ? "bg-[#091024]/70 border-teal-500/15" : "bg-white border-slate-200"
        }`}
        id="student-vs-industry-matcher"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h3 className="text-sm font-black uppercase text-slate-800 dark:text-slate-100 tracking-wider">
                Link &amp; Match: Minat Kompetensi Mahasiswa vs. Kebutuhan Industri (Lecturer POV)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Analisis preferensi skill yang dikejar mahasiswa (portofolio mandiri) dibandingkan dengan deskripsi pekerjaan yang dicari industri dwi-bulanan.
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-[9.5px] font-black text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-900/30 font-mono">
            SUMBER: SURVEY PRODI UNESA &amp; JOBS PORTAL (Juni 2026)
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          
          {/* Column List Table (Col Span 7) */}
          <div className="xl:col-span-7 space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Pilar Kompetensi &amp; Indeks Kecocokan</h4>
            
            <div className="space-y-2">
              {linkMatchData.map((item, idx) => {
                const isSelected = selectedPilar === item.id;
                const statusColor = 
                  item.status === 'MATCH' 
                    ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25' 
                    : item.status === 'PARTIAL' 
                      ? 'text-amber-500 bg-amber-500/10 border-amber-500/25' 
                      : 'text-rose-500 bg-rose-500/10 border-rose-500/25 animate-pulse';

                const progressColor = 
                  item.status === 'MATCH' 
                    ? 'bg-emerald-500' 
                    : item.status === 'PARTIAL' 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500';

                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedPilar(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? (isDarkMode ? "bg-[#0c142b] border-teal-500/70 shadow-lg scale-[1.01]" : "bg-teal-50/40 border-teal-400/80 shadow-md scale-[1.01]")
                        : (isDarkMode ? "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700" : "bg-slate-50/50 border-slate-150 hover:bg-slate-50 hover:border-slate-300")
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xxs text-slate-400">0{idx+1}.</span>
                          <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">{item.pilar}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Interest Mhs: <span className="text-slate-650 dark:text-slate-300">{item.studentInterest}</span></p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded border ${statusColor}`}>
                          {item.statusLabel}
                        </span>
                        <div className="text-[10px] font-mono font-bold mt-1 text-slate-605 dark:text-slate-200">
                          {item.matchPercent}% Match
                        </div>
                      </div>
                    </div>

                    {/* Progress Match index */}
                    <div className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
                      <div className={`h-full ${progressColor}`} style={{ width: `${item.matchPercent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drill-down Detail Panel (Col Span 5) */}
          <div className="xl:col-span-5">
            {selectedPilar ? (() => {
              const selectedItem = linkMatchData.find(item => item.id === selectedPilar)!;
              const accentColor = 
                selectedItem.status === 'MATCH' 
                  ? 'border-emerald-500/40 text-emerald-500' 
                  : selectedItem.status === 'PARTIAL' 
                    ? 'border-amber-500/40 text-amber-500' 
                    : 'border-rose-500/40 text-rose-500';

              const indicatorBadge = 
                selectedItem.status === 'MATCH' 
                  ? 'bg-emerald-500' 
                  : selectedItem.status === 'PARTIAL' 
                    ? 'bg-amber-500' 
                    : 'bg-rose-500';

              return (
                <div 
                  className={`p-5 rounded-2xl border-2 h-full flex flex-col justify-between transition-all duration-300 ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/85">
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-mono">Detail Analisis Gap</h5>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                        <span className={`w-2.5 h-2.5 rounded-full ${indicatorBadge}`}></span>
                        <span>{selectedItem.matchPercent}% Match</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider block">Pilar Kompetensi</span>
                      <strong className="text-sm text-slate-805 dark:text-slate-100">{selectedItem.pilar}</strong>
                    </div>

                    {/* Compare Block */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-100/40 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                      <div>
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-wider block">🗣️ Keinginan Mahasiswa</span>
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-normal mt-1">{selectedItem.studentInterest}</p>
                      </div>
                      <div className="border-l border-slate-250 dark:border-slate-800 pl-3">
                        <span className="text-[9px] font-black text-teal-500 uppercase tracking-wider block">💼 Kebutuhan Industri</span>
                        <p className="text-[11px] text-slate-700 dark:text-slate-250 font-bold leading-normal mt-1">{selectedItem.industryDemand}</p>
                      </div>
                    </div>

                    {/* Why gap exists */}
                    <div className="space-y-1">
                      <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider block">🔍 Mengapa ini terjadi?</span>
                      <p className="text-xs text-slate-650 dark:text-slate-350 leading-normal font-semibold">
                        {selectedItem.why}
                      </p>
                    </div>

                    {/* Live Metric */}
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300 bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">
                      <Info size={14} className="shrink-0" />
                      <span className="font-bold text-[11px]">{selectedItem.metric}</span>
                    </div>
                  </div>

                  {/* Immediate Action Needed */}
                  <div className={`mt-6 p-4 rounded-xl border-l-4 border bg-rose-500/5 dark:bg-rose-950/5 leading-relaxed ${accentColor}`}>
                    <span className="text-[10px] font-mono font-black uppercase block tracking-wider mb-1">🚨 Tindakan Akademik Dosen:</span>
                    <p className="text-[11.5px] text-slate-800 dark:text-slate-200 font-bold leading-relaxed">{selectedItem.actionNeeded}</p>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => alert(`Mereposisi silabus sub-topik mata kuliah untuk melatih kompetensi ${selectedItem.pilar}!`)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10.5px] font-black tracking-wide cursor-pointer uppercase transition-all duration-300 hover:scale-102"
                      >
                        Sinkronkan RPS Modul ✓
                      </button>
                      <button 
                        onClick={() => alert(`Tugas praktikum portofolio industri berhasil disebarkan ke Mahasiswa PA Dr. Siti.`)}
                        className={`px-2.5 py-1.5 rounded text-[10px] font-black uppercase transition-colors shrink-0 ${
                          isDarkMode 
                            ? "bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800" 
                            : "bg-white border border-slate-305 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Beri Latihan Portofolio
                      </button>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="flex flex-col items-center justify-center h-full p-8 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                <Layers size={32} className="text-slate-400 animate-bounce" />
                <p className="text-xs text-slate-500">Pilih salah satu pilar kompetensi di tabel kiri untuk menganalisis kecocokan secara detail.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 4B — CURRICULUM RELEVANCE SCORE */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
        }`}
        id="curriculum-scores-benchmark-panel"
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Skor Relevansi Mata Kuliah Anda vs Kebutuhan Industri Saat Ini</h3>
            <p className="text-xs text-slate-500 mt-0.5">Persentase kecocokan capaian pembelajaran (LO) silabus mata kuliah yang Anda ampu dengan tren industri.</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          
          {/* Web Lanjut */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <strong className="font-bold">Analitik Media Sosial &amp; Big Data</strong>
              <strong className="text-amber-500">78% (Cukup Relevan)</strong>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: "78%" }}></div>
            </div>
          </div>

          {/* RPL */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <strong className="font-bold">Manajemen Kampanye Digital</strong>
              <strong className="text-emerald-500">82% (Sangat Relevan)</strong>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: "82%" }}></div>
            </div>
          </div>

          {/* Basis Data */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <strong className="font-bold">Hubungan Masyarakat Korporat</strong>
              <strong className="text-amber-500">71% (Perlu Pembaruan Modul)</strong>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-amber-550 bg-amber-500" style={{ width: "71%" }}></div>
            </div>
          </div>

          {/* AI Warning Box */}
          <div className={`p-4 rounded-xl border border-l-4 border-l-blue-500 text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            isDarkMode 
              ? "bg-blue-950/20 border-[#1e293b] text-blue-300" 
              : "bg-[#EFF6FF] border-blue-200 text-blue-800"
          }`}>
            <div className="flex items-center gap-2.5">
              <span className="text-base animate-pulse">✨</span>
              <p className="font-semibold">
                Skor di bawah 75% menunjukkan bahwa sebagian materi pembelajaran mungkin sudah termakan zaman. Ini bukan penilaian dari mutu pengajaran Anda, melainkan sinyal dinamis dinamika bursa kerja luar.
              </p>
            </div>

            <button
              onClick={() => alert("Mengunduh Paket Draf Rekomendasi Kurikulum Baru Komprehensif (Syllabus-as-a-Service) oleh AI!")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg cursor-pointer whitespace-nowrap transition-colors"
            >
              Minta Rekomendasi Modul Kurikulum
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 4C — GRADUATE OUTCOME SNAPSHOT */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
        }`}
        id="tracer-study-outcome-snapshot"
      >
        <div>
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Outcome Karir Alumni — Prodi Ilmu Komunikasi UNESA</h3>
          <p className="text-xs text-slate-500 mt-0.5">Tracer study otomatis yang disetujui alumni secara berkala (247 dari estimasi 1.200 alumni terdata dari portal alumni).</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Bekerja &lt; 3 Bulan</span>
            <strong className="text-3xl font-mono text-emerald-600 dark:text-emerald-400 block mt-1">73%</strong>
            <span className="text-[9px] text-slate-500 block mt-1">Standar IKU prodi: &ge; 70%</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Relevansi Bidang Studi</span>
            <strong className="text-3xl font-mono text-amber-500 block mt-1">61%</strong>
            <span className="text-[9px] text-slate-500 block mt-1">Humas Korporat, PR Agency &amp; Creative media</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Rata-rata Gaji Awal</span>
            <strong className="text-2xl font-mono text-blue-600 dark:text-blue-400 block mt-1.5">Rp 8.2 jt/bln</strong>
            <span className="text-[9px] text-slate-500 block mt-1">IKU Regional: &ge; Rp 4.5 jt</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Lanjut S2 / Beasiswa</span>
            <strong className="text-3xl font-mono text-indigo-505 text-teal-500 block mt-1">12%</strong>
            <span className="text-[9px] text-slate-500 block mt-1">LPDP, MEXT & Beasiswa Unggulan</span>
          </div>

        </div>

        <div className="mt-5 text-right">
          <button 
            onClick={() => alert("Mengunduh laporan Tracer Study lengkap versi standar instrumen akreditasi BAN-PT bidang Ilmu Komunikasi...")}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-end gap-1.5 ml-auto cursor-pointer"
          >
            <span>Unduh Laporan Komprehensif Tracer Study (PDF)</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
