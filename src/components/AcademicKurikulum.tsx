import React, { useState } from "react";
import { 
  Sparkle, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ChevronRight, 
  Search,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Award
} from "lucide-react";

interface AcademicKurikulumProps {
  isDarkMode: boolean;
}

interface CourseRelevance {
  name: string;
  sks: number;
  industryMatch: number;
  learningOutcome: number;
  status: "Baik" | "Perlu Review" | "Prioritas Update";
}

export default function AcademicKurikulum({ isDarkMode }: AcademicKurikulumProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("SEMUA");

  const coursesData: CourseRelevance[] = [
    { name: "Pengantar Ilmu Komunikasi", sks: 3, industryMatch: 88, learningOutcome: 79, status: "Baik" },
    { name: "Analitik Media Sosial & Big Data", sks: 3, industryMatch: 78, learningOutcome: 72, status: "Perlu Review" },
    { name: "Riset Khalayak & Media", sks: 3, industryMatch: 71, learningOutcome: 76, status: "Perlu Review" },
    { name: "Humas Korporat & Krisis", sks: 3, industryMatch: 82, learningOutcome: 81, status: "Baik" },
    { name: "Komunikasi Politik & Publik", sks: 3, industryMatch: 58, learningOutcome: 64, status: "Prioritas Update" },
    { name: "Penulisan Naskah Humas", sks: 3, industryMatch: 91, learningOutcome: 83, status: "Baik" },
    { name: "Komunikasi Massa Tradisional", sks: 3, industryMatch: 55, learningOutcome: 70, status: "Prioritas Update" },
    { name: "Produksi Konten Kreatif", sks: 3, industryMatch: 66, learningOutcome: 74, status: "Perlu Review" },
    { name: "Perencanaan Kampanye Strategis", sks: 3, industryMatch: 77, learningOutcome: 78, status: "Baik" },
    { name: "Etika & Hukum Komunikasi", sks: 2, industryMatch: 62, learningOutcome: 71, status: "Perlu Review" }
  ];

  const filteredCourses = coursesData.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "SEMUA" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === "Baik") {
      return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40";
    }
    if (status === "Perlu Review") {
      return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40";
    }
    return "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-250 dark:border-rose-900/40";
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-kurikulum-root">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight">📚 Kesehatan Kurikulum & Perencanaan (Prodi View)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Khusus akses peran Koordinator Program Studi. Tinjauan menyeluruh terhadap kesehatan capaian pembelajaran (CPL) dan sinkronisasi kualifikasi lulusan dengan tren pasar.
        </p>
      </div>

      {/* SECTION 5A — CURRICULUM HEALTH OVERVIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="curriculum-kpi-area">
        
        {/* KPI 1 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Matakuliah Relevan Tinggi</span>
          <strong className="text-3xl font-mono text-emerald-600 dark:text-emerald-400 block mt-1">14 <span className="text-slate-400 text-xs font-sans">dari 22 MK</span></strong>
          <span className="text-[10px] text-slate-500 mt-1 block">Skor kesesuaian industri &gt; 75%</span>
        </div>

        {/* KPI 2 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Matakuliah Perlu Review</span>
          <strong className="text-3xl font-mono text-amber-500 block mt-1">5 <span className="text-slate-400 text-xs font-sans">MK</span></strong>
          <span className="text-[10px] text-slate-500 mt-1 block">Rasio penyesuaian di bawah 60%</span>
        </div>

        {/* KPI 3 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Skill Baru Belum Terakomodasi</span>
          <strong className="text-3xl font-mono text-rose-500 block mt-1">8 <span className="text-slate-400 text-xs font-sans">Kompetensi</span></strong>
          <span className="text-[10px] text-rose-600 mt-1 block font-bold">⚠️ Perlu tindakan prodi</span>
        </div>

        {/* KPI 4 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Rata-rata Capaian LO Prodi</span>
          <strong className="text-3xl font-mono text-blue-500 block mt-1">74%</strong>
          <span className="text-[10px] text-slate-505 text-slate-500 mt-1 block">Indikator IKU-2 Kemdikbud</span>
        </div>

      </div>

      {/* SECTION 5B — COURSE-BY-COURSE RELEVANCE TABLE */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
        }`}
        id="relevance-table-panel"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Metrik Relevansi per Mata Kuliah (Syllabus Audit)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Penilaian periodik per semester terhadap konten mata kuliah.</p>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Mata Kuliah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full text-xs pl-9 pr-4 py-2 rounded-xl border outline-none ${
                  isDarkMode ? "bg-slate-900 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-150 text-slate-700"
                }`}
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`text-xs p-2 rounded-xl border font-semibold outline-none ${
                isDarkMode ? "bg-slate-900 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-150 text-slate-700"
              }`}
            >
              <option value="SEMUA">Semua Status</option>
              <option value="Baik">Konsep Baik</option>
              <option value="Perlu Review">Perlu Audit</option>
              <option value="Prioritas Update">Prioritas Utama</option>
            </select>
          </div>
        </div>

        {/* Real Dynamic UI render Table */}
        <div className="mt-6 overflow-x-auto min-w-0">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px]">Nama Mata Kuliah</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">SKS</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Relevansi Industri</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Capaian LO Mahasiswa</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Status Keaktifan</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-slate-100/50 dark:border-slate-800/40 hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-colors"
                >
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{c.name}</td>
                  <td className="py-3 text-center font-bold text-slate-500">{c.sks} SKS</td>
                  <td className="py-3 text-center font-bold">
                    <span className={c.industryMatch >= 75 ? "text-emerald-500" : c.industryMatch >= 60 ? "text-amber-500" : "text-rose-500"}>
                      {c.industryMatch}%
                    </span>
                  </td>
                  <td className="py-3 text-center font-bold">
                    <span className="text-slate-700 dark:text-slate-350">{c.learningOutcome}%</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase inline-block ${getStatusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 text-right">
          <button 
            onClick={() => alert("Mengunduh Draf Laporan Kesehatan Kurikulum (Excel) untuk keperluan rapat senat prodi...")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl cursor-pointer shadow-sm transition-colors"
          >
            Unduh Laporan Kurikulum Lengkap (xls)
          </button>
        </div>

      </div>

      {/* SECTION 5C — EMERGING SKILLS ALERT PANEL (2x2 Grid) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <Sparkle size={14} className="text-blue-500 animate-pulse" />
            <span>Daftar Skill Baru yang Belum Ada di Kurikulum Prodi</span>
          </h3>
          <p className="text-xs text-slate-505 text-slate-500 mt-0.5">Analisis cerdas dari portal bursa kerja mingguan untuk memfokuskan pimpinan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="emerging-skills-grid">
          
          {/* Card 1 */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm font-bold block">1. Media Listening Tools (Brand24)</strong>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Kategori: Digital Monitoring</span>
              </div>
              <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-bold border border-rose-100 rounded text-[9px] font-mono leading-none">TINGGI (73%)</span>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Tren kebutuhan naik <strong>31% dalam 3 bulan terakhir</strong>. Industri menuntut kemampuan otonom dalam mengukur sentiment krisis publik secara real-time.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Rekomendasi: Tambah Praktikum Lab 2 Pertemuan</span>
              <button 
                onClick={() => alert("Komitmen dikirim ke senat kurikulum UNESA untuk Brand24!")}
                className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Ajukan Proposal →
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm font-bold block">2. SEO & Content Marketing</strong>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Kategori: Digital Copywriting</span>
              </div>
              <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-bold border border-rose-100 rounded text-[9px] font-mono leading-none">TINGGI (61%)</span>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Meningkat <strong>41% dalam 6 bulan</strong>. Keterampilan SEO Copywriting mutlak diperlukan di era digital media monitoring agar campaign dapat viral secara organik.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Rekomendasi: Sertifikasi HubSpot Mandiri</span>
              <button 
                onClick={() => alert("Komitmen dikirim ke senat kurikulum UNESA untuk SEO Content!")}
                className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Ajukan Proposal →
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm font-bold block">3. Generative AI for PR Campaigns</strong>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Kategori: Media Generation</span>
              </div>
              <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 font-bold border border-amber-100 rounded text-[9px] font-mono leading-none">SEDANG (38%)</span>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Melesat dahsyat sebesar <strong>89% dalam 1 tahun</strong>. Sangat vital untuk menyusun taktik promosi kampanye visual yang efisien menggunakan model prompt strategis.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Rekomendasi: Tambah Sub-Topik Pilihan</span>
              <button 
                onClick={() => alert("Komitmen dikirim ke senat kurikulum UNESA untuk Generative AI!")}
                className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Ajukan Proposal →
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
            isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm font-bold block">4. Crisis Simulation Planning</strong>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Kategori: Strategic PR</span>
              </div>
              <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 font-bold border border-amber-100 rounded text-[9px] font-mono leading-none">SEDANG (58%)</span>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Meningkat <strong>22% dalam 4 bulan</strong>. Simulasi taktis mitigasi isu atau boikot digital dari netizen untuk menjaga reputasi brand korporat.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Rekomendasi: Update Standard Pembelajaran Praktikum</span>
              <button 
                onClick={() => alert("Komitmen dikirim ke senat kurikulum UNESA untuk Crisis Simulation!")}
                className="text-xs font-bold text-blue-500 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Ajukan Proposal →
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
