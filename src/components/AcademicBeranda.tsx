import React, { useState } from "react";
import { 
  AlertTriangle, 
  FileCheck, 
  TrendingUp, 
  Calendar, 
  Sparkle, 
  ArrowRight,
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  Plus,
  Send,
  Download,
  FileText
} from "lucide-react";

interface AcademicBerandaProps {
  isDarkMode: boolean;
  onNavigate: (tab: string) => void;
}

export default function AcademicBeranda({ isDarkMode, onNavigate }: AcademicBerandaProps) {
  // Heatmap interactive state
  const [selectedCell, setSelectedCell] = useState<{ student: string, topic: string, score: number } | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ student: string, topic: string, score: number } | null>(null);

  const students = [
    { name: "M.A", fullName: "Arif Maulana" },
    { name: "D.K", fullName: "Dewi Kusuma" },
    { name: "E.P", fullName: "Eko Prasetya" },
    { name: "S.R", fullName: "Sinta Rahmawati" },
    { name: "R.A", fullName: "Rizki Ananda" },
    { name: "B.S", fullName: "Budi Santoso" },
    { name: "D.P", fullName: "Dian Pramesti" },
    { name: "F.S", fullName: "Fajar Septian" },
    { name: "C.M", fullName: "Citra Maharani" },
    { name: "N.H", fullName: "Nurul Hidayah" }
  ];

  const topics = [
    "Riset Khalayak",
    "Analisis Tren Isu",
    "Press Release",
    "Media Monitoring",
    "Krisis Komunikasi",
    "Evaluasi Kampanye"
  ];

  // Static matrix scoring corresponding to the student and topic idx
  const heatmapData: number[][] = [
    [85, 45, 90, 75, 80, 88], // M.A (Arif Maulana)
    [92, 55, 62, 88, 70, 74], // D.K
    [78, 48, 80, 65, 82, 80], // E.P
    [85, 88, 71, 90, 85, 91], // S.R
    [80, 42, 65, 75, 60, 68], // R.A
    [88, 75, 82, 91, 88, 90], // B.S
    [95, 90, 89, 96, 92, 94], // D.P
    [76, 52, 60, 70, 75, 78], // F.S
    [89, 81, 85, 84, 91, 89], // C.M
    [45, 30, 40, 50, 55, 48]  // N.H (Nurul Hidayah - Kritis)
  ];

  const getCellColor = (score: number) => {
    if (score >= 80) return "bg-[#22C55E] text-white hover:ring-2 hover:ring-emerald-400";
    if (score >= 50) return "bg-[#F59E0B] text-white hover:ring-2 hover:ring-amber-400";
    return "bg-[#EF4444] text-white hover:ring-2 hover:ring-rose-400";
  };

  const [reviewScheduled, setReviewScheduled] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in" id="academic-beranda-root">
      
      {/* SECTION 1A — TODAY ALERT BANNER */}
      <div 
        className={`border-l-4 border-amber-500 rounded-r-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 shadow-sm ${
          isDarkMode 
            ? "bg-amber-950/20 text-amber-100" 
            : "bg-amber-50 text-amber-900"
        }`}
        id="today-alert-banner"
      >
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 font-black text-sm">
            <Sparkle size={18} className="text-amber-500 animate-pulse" />
            <span>✨ 3 hal yang perlu perhatian Anda hari ini:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span 
              onClick={() => onNavigate("peringatan")}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium cursor-pointer transition-colors border ${
                isDarkMode 
                  ? "bg-slate-900/60 border-amber-900/40 hover:bg-slate-900 text-amber-300" 
                  : "bg-white border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <AlertTriangle size={13} className="text-rose-500" />
              <span>⚠ 4 mahasiswa Humas Krisis berisiko — deadline portofolio 3 hari lagi</span>
            </span>
            <span 
              onClick={() => onNavigate("penilaian")}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium cursor-pointer transition-colors border ${
                isDarkMode 
                  ? "bg-slate-900/60 border-amber-900/40 hover:bg-slate-900 text-amber-300" 
                  : "bg-white border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <FileCheck size={13} className="text-teal-500" />
              <span>📋 7 esai menunggu review Anda di Grading Center</span>
            </span>
            <span 
              onClick={() => onNavigate("karir")}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium cursor-pointer transition-colors border ${
                isDarkMode 
                  ? "bg-slate-900/60 border-amber-900/40 hover:bg-slate-900 text-amber-300" 
                  : "bg-white border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <TrendingUp size={13} className="text-amber-500" />
              <span>📈 Skill Gap baru: Cloud Computing naik 31% di industri</span>
            </span>
          </div>
        </div>
        <button 
          onClick={() => onNavigate("peringatan")}
          className="text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span>Lihat Semua</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* SECTION POV DOSEN: ACTIONABLE KPI METRIC CARDS (Direct Answer: What's Needed & Next Action) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="dosen-actionable-kpis">
        
        {/* KPI Card 1: Academic Threat */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-rose-500/30" 
            : "bg-white hover:bg-slate-50 border-rose-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider font-mono">1. Ancaman Akademik</span>
              <AlertTriangle className="text-rose-500" size={18} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-rose-500">4 Mahasiswa</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Bimbingan personal luar kelas (Sem 5)
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tindakan Dosen:</span>
            <button 
              onClick={() => {
                alert("Membuka profil peringatan dini untuk menghubungi Nurul Hidayah, Fajar Septian, Arif Maulana, dan Eko Prasetya.");
                onNavigate("peringatan");
              }}
              className="text-xxs font-black text-rose-500 dark:text-rose-400 hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              Hubungi Nurul &amp; 3 Mhs →
            </button>
          </div>
        </div>

        {/* KPI Card 2: Queue Grading */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-teal-500/30" 
            : "bg-white hover:bg-slate-50 border-teal-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-teal-500 tracking-wider font-mono">2. Koreksi Praktikum</span>
              <FileCheck className="text-teal-500" size={18} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-teal-500">7 Esai Taktis</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Review draf rilis pers &amp; analisis krisis
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tindakan Dosen:</span>
            <button 
              onClick={() => onNavigate("penilaian")}
              className="text-xxs font-black text-teal-600 dark:text-teal-400 hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              Selesaikan Penilaian AI →
            </button>
          </div>
        </div>

        {/* KPI Card 3: Industry Gap */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-amber-500/30" 
            : "bg-white hover:bg-slate-50 border-amber-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider font-mono">3. Gap Relevansi</span>
              <TrendingUp className="text-amber-500" size={18} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-amber-500">73% Industri</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Tool Media Listening (Brand24) di Silabus
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tindakan Dosen:</span>
            <button 
              onClick={() => onNavigate("karir")}
              className="text-xxs font-black text-amber-600 dark:text-amber-400 hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              Sematkan Modul Baru →
            </button>
          </div>
        </div>

        {/* KPI Card 4: Student Intention */}
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-sm flex flex-col justify-between ${
          isDarkMode 
            ? "bg-[#090e1b] hover:bg-[#0c1428] border-blue-500/30" 
            : "bg-white hover:bg-slate-50 border-blue-200"
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider font-mono">4. Minat Karir Mhs</span>
              <Users className="text-blue-500" size={18} />
            </div>
            <div className="mt-2 text-2xl font-mono font-black text-blue-500">82% Kreatif</div>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-normal">
              <strong>Kebutuhan:</strong> Link &amp; Match dengan PR Agency Mitra
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tindakan Dosen:</span>
            <button 
              onClick={() => {
                alert("Mengundang mentor praktisi Ogilvy Indonesia & Tokopedia untuk memberikan kuliah umum digital branding pekan depan.");
              }}
              className="text-xxs font-black text-blue-600 dark:text-blue-400 hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              Undang Praktisi Tamu →
            </button>
          </div>
        </div>

      </div>

      {/* SECTION POV DOSEN: PUSAT REKOMENDASI & INSIGHT CERDAS AI */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090f1d] border-blue-900/50" : "bg-blue-50/40 border-blue-200"
        }`}
        id="insight-paling-tebal-section"
      >
        <div className="flex items-center justify-between pb-3 border-b border-blue-150/30 dark:border-blue-900/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="text-sm font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Pusat Analisis &amp; Rekomendasi Karir Mahasiswa (AI Advisory Portal)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-[10px] text-blue-800 dark:text-blue-300 rounded-full font-black uppercase tracking-widest animate-pulse">
            Sistem Aktif
          </span>
        </div>

        {/* Both General and Specific Insights columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          
          {/* Column A: Insight General */}
          <div className="space-y-3 p-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              <span className="text-emerald-500">▶</span>
              <span>General Insights (Pemetaan Sektor &amp; Kurikulum)</span>
            </div>
            
            <div className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-350">
              <p>
                <strong className="text-slate-900 dark:text-slate-50 block font-extrabold mb-0.5">1. Kebutuhan Industri Public Relations &amp; Big Data (Sektor Umum)</strong>
                Sinyal penyerapan pasar menunjukkan <span className="font-extrabold text-[#2563EB] dark:text-blue-400">peningkatan 34% pada pencarian spesialis krisis media digital</span>. Modul kuliah penanganan rumor &amp; mitigasi khalayak memiliki relevansi sangat tinggi tahun ini.
              </p>
              <p className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <strong className="text-slate-900 dark:text-slate-50 block font-extrabold mb-0.5">2. Titik Lemah Kurikulum (Gap Assessment)</strong>
                Terdapat <span className="font-extrabold text-rose-600 dark:text-rose-400">73% gap kompetensi praktis</span> pada alat monitoring sentimen s0cial media (misal: Brand24). AI merekomendasikan penambahan latihan studi kasus mandiri guna melengkapi kerangka teoritis mahasiswa.
              </p>
            </div>
          </div>

          {/* Column B: Insight Khusus */}
          <div className="space-y-3 p-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              <span className="text-teal-500">▶</span>
              <span>Specialized Insights (Monitoring &amp; Rekomendasi Kasus Personal)</span>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-350">
              <p>
                <strong className="text-slate-900 dark:text-slate-50 block font-extrabold mb-0.5">1. Kasus Prioritas Akademik (Nurul Hidayah — Sem 5)</strong>
                Mengalami transisi pola pemahaman (IPK 3.12 ke 2.41) disertai penurunan login portal. AI menyarankan <span className="font-extrabold text-blue-600 dark:text-blue-400">bimbingan empatik non-struktural</span> mengenai penulisan rilis pers sebelum evaluasi akademik formal.
              </p>
              <p className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <strong className="text-slate-900 dark:text-slate-50 block font-extrabold mb-0.5">2. Optimalisasi Jalur Karir (Reza Firmansyah — Sem 5)</strong>
                Menunjukkan ritme penugasan unggul dan penguasaan riset s0cial media listening. Sangat disarankan diarahkan menuju program <span className="font-extrabold text-teal-600 dark:text-teal-400">Magang Executive Humas di BUMN/FMCG</span> skala nasional.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1B — CLASS OVERVIEW CARDS (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="class-overview-cards-area">
        
        {/* Course Card 1 */}
        <div 
          className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 relative ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-slate-100" 
              : "bg-white border-slate-200 text-slate-800"
          }`}
          id="course-card-pwl"
        >
          <div>
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold tracking-tight">Analitik Media Sosial & Big Data</h3>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                isDarkMode ? "bg-teal-950/40 text-teal-400" : "bg-teal-50 text-teal-700"
              }`}> Kelas A · 38 Mhs </span>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Keterlibatan rata-rata</span>
                  <strong className="text-emerald-500">82%</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "82%" }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100/50 dark:border-slate-800">
                <span className="text-xs text-slate-500">Mahasiswa Berisiko</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-250 dark:border-amber-900/40 rounded">
                  3 Mhs
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Tugas Menunggu Review</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-250 dark:border-rose-900/40 rounded">
                  5 Tugas
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate("penilaian")}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
              >
                Lihat Kelas →
              </button>
              <button 
                onClick={() => alert("Kirim kuis atau tugas baru ke mahasiswa Mulai Pembelajaran Kelas A")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer border transition-colors ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                Beri Tugas
              </button>
            </div>

            {/* AI Insight Strip */}
            <div className={`p-2.5 rounded-xl border flex items-start gap-1.5 text-[10px] leading-normal ${
              isDarkMode 
                ? "bg-blue-950/20 border-blue-900/40 text-blue-300" 
                : "bg-blue-50 border-blue-105 text-blue-700"
            }`}>
              <span className="animate-pulse">✨</span>
              <p>5 mahasiswa performa meningkat 2 minggu terakhir</p>
            </div>
          </div>
        </div>

        {/* Course Card 2 */}
        <div 
          className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 relative ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-slate-100" 
              : "bg-white border-slate-200 text-slate-800"
          }`}
          id="course-card-rpl"
        >
          {/* Red dot indicator */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>

          <div>
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold tracking-tight">Humas Korporat & Krisis</h3>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                isDarkMode ? "bg-amber-950/40 text-amber-400" : "bg-amber-50 text-amber-700"
              }`}> Kelas B · 42 Mhs </span>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Keterlibatan rata-rata</span>
                  <strong className="text-amber-500">74%</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: "74%" }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100/50 dark:border-slate-800">
                <span className="text-xs text-slate-500">Mahasiswa Berisiko</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-250 dark:border-rose-900/40 rounded animate-pulse">
                  7 Mhs
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Tugas Menunggu Review</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-650 dark:text-amber-400 border border-amber-250 dark:border-amber-900/40 rounded">
                  2 Tugas
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate("peringatan")}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors relative"
              >
                Lihat Kelas →
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              </button>
              <button 
                onClick={() => alert("Kirim kuis baru ke mahasiswa Kelas B")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer border transition-colors ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                Beri Tugas
              </button>
            </div>

            {/* AI Insight Strip */}
            <div className={`p-2.5 rounded-xl border flex items-start gap-1.5 text-[10px] leading-normal ${
              isDarkMode 
                ? "bg-blue-950/20 border-blue-900/40 text-blue-300" 
                : "bg-blue-50 border-blue-105 text-blue-700"
            }`}>
              <span className="animate-pulse">✨</span>
              <p>Topik 'Media Listening' paling banyak menimbulkan kesulitan — 23 dari 42 mahasiswa menunjukkan pemahaman rendah</p>
            </div>
          </div>
        </div>

        {/* Course Card 3 */}
        <div 
          className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 relative ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-slate-100" 
              : "bg-white border-slate-200 text-slate-800"
          }`}
          id="course-card-bdt"
        >
          <div>
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold tracking-tight">Riset Khalayak & Media</h3>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                isDarkMode ? "bg-emerald-950/40 text-emerald-400" : "bg-emerald-50 text-emerald-700"
              }`}> Kelas C · 35 Mhs </span>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Keterlibatan rata-rata</span>
                  <strong className="text-emerald-500">89%</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "89%" }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100/50 dark:border-slate-800">
                <span className="text-xs text-slate-500">Mahasiswa Berisiko</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900/40 rounded">
                  1 Mhs
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Tugas Menunggu Review</span>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-green-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-905 rounded">
                  ✓ Selesai
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex gap-2">
              <button 
                onClick={() => alert("Kinerja Kelas C sangat baik!")}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
              >
                Lihat Kelas →
              </button>
              <button 
                onClick={() => alert("Kirim kuis baru ke mahasiswa Kelas C")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer border transition-colors ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                Beri Tugas
              </button>
            </div>

            {/* AI Insight Strip */}
            <div className={`p-2.5 rounded-xl border flex items-start gap-1.5 text-[10px] leading-normal ${
              isDarkMode 
                ? "bg-blue-950/20 border-blue-900/40 text-blue-300" 
                : "bg-blue-50 border-blue-105 text-blue-700"
            }`}>
              <span className="animate-pulse">✨</span>
              <p>Kelas ini konsisten di atas rata-rata prodi selama 4 minggu berturut-turut</p>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 1C — STUDENT PERFORMANCE HEATMAP */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
        }`}
        id="comprehension-heatmap-section"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black tracking-tight flex items-center gap-2">
              <span>Peta Pemahaman Kelas — Humas Korporat & Krisis (Kelas B)</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                isDarkMode ? "bg-amber-950 text-amber-400" : "bg-amber-100 text-amber-700"
              }`}>FOKUS KRITIS</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Setiap sel menunjukkan tingkat pemahaman satu mahasiswa di satu topik berdasarkan pengerjaan tugas & kuis AI. Klik/sorot sel untuk melihat detail.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#22C55E]"></span>
              <span>≥ 80% (Paham)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#F59E0B]"></span>
              <span>50-79% (Sedang)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#EF4444]"></span>
              <span>&lt; 50% (Rendah)</span>
            </div>
          </div>
        </div>

        {/* Heatmap Matrix Block */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          
          {/* Real interactive map */}
          <div className="flex-1 overflow-x-auto min-w-0" id="heatmap-interactive-grid">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 pr-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Mahasiswa (Inisial)</th>
                  {topics.map((t, idx) => (
                    <th key={idx} className="py-2 px-1 text-center text-[9px] font-bold text-slate-505 text-slate-500 leading-tight max-w-[90px] truncate">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((st, sIdx) => (
                  <tr 
                    key={sIdx} 
                    className="border-b border-slate-100/50 dark:border-slate-800/40 hover:bg-slate-50/20 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="py-2.5 pr-4 text-xs font-bold whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${
                          sIdx === 0 || sIdx === 9 
                            ? "bg-rose-950/40 text-rose-400 border border-rose-900/30" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350"
                        }`}>
                          {st.name}
                        </span>
                        <span>{st.fullName}</span>
                      </div>
                    </td>
                    {topics.map((tp, tIdx) => {
                      const score = heatmapData[sIdx][tIdx];
                      const isSelected = selectedCell?.student === st.fullName && selectedCell?.topic === tp;
                      return (
                        <td key={tIdx} className="py-2.5 px-1 text-center">
                          <div 
                            onClick={() => setSelectedCell({ student: st.fullName, topic: tp, score })}
                            onMouseEnter={() => setHoveredCell({ student: st.fullName, topic: tp, score })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-8 h-8 rounded-lg mx-auto transition-all cursor-pointer flex items-center justify-center text-[10px] font-extrabold ${getCellColor(score)} ${
                              isSelected ? "ring-4 ring-blue-500/80 scale-110 shadow-lgz" : ""
                            }`}
                            id={`cell-${sIdx}-${tIdx}`}
                          >
                            {score}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Drill-down panel displaying the clicked/highlighted state */}
          <div className="w-full md:w-72 shrink-0 flex flex-col justify-between" id="heatmap-drilldown-inspector">
            <div className={`p-4 rounded-xl border transition-all duration-300 h-full flex flex-col justify-between ${
              isDarkMode ? "bg-slate-900/60 border-[#1e293b]" : "bg-slate-50 border-slate-200"
            }`}>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-3">
                  <Sparkle size={14} className="text-amber-500" />
                  <span>Inspektor Topik</span>
                </h4>

                {(selectedCell || hoveredCell) ? (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Mahasiswa Aktif</span>
                      <strong className="text-sm">{(selectedCell || hoveredCell)?.student}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Topik Analisis</span>
                      <strong className="text-xs">{(selectedCell || hoveredCell)?.topic}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-50 block text-slate-500">Nilai Rata-rata</span>
                      <span className={`inline-block px-3 py-1 text-base font-black rounded-xl mt-1 text-white ${(selectedCell || hoveredCell)!.score >= 80 ? 'bg-emerald-600' : (selectedCell || hoveredCell)!.score >= 50 ? 'bg-amber-600' : 'bg-rose-600'}`}>
                        {(selectedCell || hoveredCell)?.score}%
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] leading-relaxed text-slate-500">
                      {(selectedCell || hoveredCell)!.score < 50 ? (
                        <p className="text-rose-600 dark:text-rose-400 font-medium">
                          ✨ <strong>Intervensi Direkomendasikan:</strong> Pemahaman di materi ini kritis. AI menyarankan untuk memberikan latihan remedial singkat atau mengaitkan mahasiswa dengan peer mentor di kelas.
                        </p>
                      ) : (selectedCell || hoveredCell)!.score < 80 ? (
                        <p className="text-amber-605 dark:text-amber-400 font-medium">
                          ✨ <strong>Latihan Mandiri:</strong> Berikan kuis formatif tambahan di sub-topik yang bersangkutan untuk mendorong peningkatan ke zona aman.
                        </p>
                      ) : (
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                          ✨ <strong>Tingkatan Lanjut:</strong> Mahasiswa sudah menguasai materi ini dengan sangat mantap. Dapat direkomendasikan menjadi asisten kelompok studi teman sebaya.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 space-y-2">
                    <BookOpen size={24} className="mx-auto text-slate-300 animate-bounce" />
                    <p className="text-xs">Klik salah satu kotak nilai mahasiswa untuk membaca rekomendasi intervensi edukasional.</p>
                  </div>
                )}
              </div>

              {(selectedCell || hoveredCell) && (
                <button 
                  onClick={() => {
                    alert(`Intervensi disiapkan untuk ${(selectedCell || hoveredCell)?.student}`);
                    setSelectedCell(null);
                  }}
                  className="w-full mt-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Hubungi Mahasiswa
                </button>
              )}
            </div>
          </div>

        </div>

        {/* AI summary box (blue-50) */}
        <div className={`mt-6 p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-blue-500 ${
          isDarkMode 
            ? "bg-blue-950/20 border-[#1e293b] text-blue-300" 
            : "bg-[#EFF6FF] border-blue-200 text-blue-800"
        }`}>
          <div className="flex items-start gap-2.5">
            <span className="text-lg leading-none mt-0.5 animate-spin-slow">✨</span>
            <div className="space-y-1">
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 rounded self-start inline-block">✨ AI Insight</span>
              <p className="text-xs leading-relaxed font-semibold">
                Topik <strong>&quot;Krisis Komunikasi&quot;</strong> adalah bottleneck kelas ini — 31 dari 42 mahasiswa masih di bawah 60%. Rekomendasi: tambahkan satu sesi review 90 menit sebelum UAS menggunakan papan tulis digital terpadu.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setReviewScheduled(true);
              alert("Sesi Review Tambahan 90 menit bertemakan 'Krisis Komunikasi' berhasil dijadwalkan di kalender akademik mahasiswa!");
            }}
            disabled={reviewScheduled}
            className={`px-4 py-2 text-xs font-black rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              reviewScheduled 
                ? "bg-emerald-500 text-white" 
                : "bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
            }`}
          >
            {reviewScheduled ? (
              <>
                <CheckCircle size={14} />
                <span>Terjadwal ✓</span>
              </>
            ) : (
              <span>Jadwalkan Review ✓</span>
            )}
          </button>
        </div>

      </div>

      {/* SECTION 1D — QUICK ACTIONS ROW (bottom, 4 buttons) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="academic-quick-actions-row">
        <button 
          onClick={() => alert("Menyiapkan dokumen PDF Laporan Komprehensif Kelas Dr. Siti...")}
          className="p-3 bg-gradient-to-tr from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all hover:-translate-y-0.5"
        >
          <Sparkle size={15} />
          <span>✨ Generate Laporan Kelas</span>
        </button>

        <button 
          onClick={() => {
            const msg = prompt("Tulis pesan pengumuman publik untuk seluruh 115 mahasiswa:");
            if (msg) alert("Pengumuman berhasil disebarkan ke feed ACIP Mahasiswa!");
          }}
          className={`p-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer border transition-all hover:-translate-y-0.5 ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-teal-400 hover:bg-slate-900" 
              : "bg-white border-slate-205 text-teal-700 hover:bg-slate-50"
          }`}
        >
          <Send size={15} />
          <span>📢 Kirim Pengumuman</span>
        </button>

        <button 
          onClick={() => alert("Membuka Modul Pembuat Kuis / Form Evaluasi Format")}
          className={`p-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer border transition-all hover:-translate-y-0.5 ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-blue-400 hover:bg-slate-900" 
              : "bg-white border-slate-205 text-blue-700 hover:bg-slate-50"
          }`}
        >
          <Plus size={15} />
          <span>📝 Buat Kuis Baru</span>
        </button>

        <button 
          onClick={() => alert("Mengunduh lembaran absensi kehadiran berformat Excel (xls)")}
          className={`p-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer border transition-all hover:-translate-y-0.5 ${
            isDarkMode 
              ? "bg-[#090e1b] border-[#1e293b] text-slate-200 hover:bg-slate-900" 
              : "bg-white border-slate-205 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Download size={15} />
          <span>📥 Unduh Absensi</span>
        </button>
      </div>

    </div>
  );
}
