import React, { useState } from "react";
import { 
  Award, 
  Sparkle, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart2, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  FileSpreadsheet, 
  ArrowUpRight,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// Mock Data for Tracer Study and Curriculum Relevance
const accreditationData = [
  { year: "2022", alignment: 74, jobPlacement: 81 },
  { year: "2023", alignment: 78, jobPlacement: 84 },
  { year: "2024", alignment: 82, jobPlacement: 88 },
  { year: "2025", alignment: 89, jobPlacement: 91 },
  { year: "2026 (Pred)", alignment: 94, jobPlacement: 93.8 }
];

const distributionData = [
  { name: "Unicorn/BUMN", value: 38 },
  { name: "Multinasional", value: 25 },
  { name: "Wiraswasta/Startups", value: 22 },
  { name: "Sektor Publik / Studi Lanjut", value: 15 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface EmergingAlert {
  id: string;
  department: string;
  threatLevel: "Tinggi" | "Sedang";
  skillsSunset: string;
  skillsEmerging: string;
  studentApathyRisk: string;
  remodelAction: string;
}

const emergingAlerts: EmergingAlert[] = [
  {
    id: "e1",
    department: "S1 Ilmu Komunikasi (Konsentrasi Humas Korporat & Digital PR)",
    threatLevel: "Tinggi",
    skillsSunset: "Teori Media Klasik & Komunikasi Cetak (Demand turun 38% y-on-y)",
    skillsEmerging: "Digital Brand Monitoring, Brand24 Listening & Content Analytics (+46% y-on-y)",
    studentApathyRisk: "Risiko ketidaksesuaian skill serapan magang PR di agensi modern Jakarta.",
    remodelAction: "Rekomendasi Rektorat: Alokasi Rp 120jt kemitraan certified Brand24/Hubspot, remodeling silabus praktikum semester 5."
  },
  {
    id: "e2",
    department: "S1 Ilmu Komunikasi (Konsentrasi Kreatif & Penyiaran)",
    threatLevel: "Sedang",
    skillsSunset: "Penyiaran Analog & Teknis TV Tradisional",
    skillsEmerging: "SEO Copywriting, Campaign Strategy, Podcast & Brand Advocacy",
    studentApathyRisk: "Kehilangan kecocokan industri kreatif dan startup nasional yang padat konten.",
    remodelAction: "Sesuaikan kurikulum MK Manajemen Kampanye dengan tambahan subtopik Social Media Campaign Strategy."
  }
];

export default function AcademicEksekutif({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeAlerts, setActiveAlerts] = useState<EmergingAlert[]>(emergingAlerts);
  const [downloadingReport, setDownloadingReport] = useState<boolean>(false);
  const [exportPreview, setExportPreview] = useState<boolean>(false);
  const [curriculumFilter, setCurriculumFilter] = useState<string>("all");

  const triggerExport = () => {
    setDownloadingReport(true);
    setExportPreview(true);
    setTimeout(() => {
      setDownloadingReport(false);
    }, 1500);
  };

  const executeRemodel = (id: string, dept: string) => {
    alert(`Keputusan Eksekutif Diambil: Alokasi anggaran restrukturisasi kurikulum untuk prodi '${dept}' disetujui. Notifikasi perombakan silabus dikirimkan ke Dekan FTE & Kajur.`);
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-eksekutif-root">
      
      {/* 1. EXECUTIVE SLATE HEADER */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900/20 to-slate-900 p-6 rounded-2xl border border-blue-800/20 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Globe size={110} className="text-blue-400 rotate-12" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500 font-extrabold text-[9px] uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
              <ShieldCheck size={11} /> M6.D & AC-AN-04 EXEC SYSTEM
            </span>
            <span className="text-xs text-slate-400 font-mono">Status Akreditasi Kampus: UNGGUL (BAN-PT)</span>
          </div>
          <h2 className="text-xl font-black mt-2 font-sans tracking-tight">Institutional Intelligence &amp; Policy Maker Dashboard</h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
            Portal eksekutif otonom bagi Rektorat, Dekanat, dan Penjaminan Mutu untuk mengawasi pencapaian IKU 1 &amp; IKU 2, menyelaraskan pembiayaan kurikulum prodi, serta mengunduh dokumen akreditasi tanpa siklus survei manual.
          </p>
        </div>
      </div>

      {/* 2. INSTTIUTIONAL MACRO METRICS (M6.D) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="institutional-macro-metrics">
        
        <div className="p-4 bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
            <span>Job Placement Rate (IKU 1)</span>
            <span className="text-emerald-550 text-emerald-500 text-xs font-bold font-mono">🎯 Target 90%</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <strong className="text-3xl font-mono text-emerald-500 font-black">93.8%</strong>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
              <TrendingUp size={12} /> +2.4% y-on-y
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500">
            Alumni terserap industri &lt; 6 bulan sejak kelulusan.
          </div>
        </div>

        <div className="p-4 bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
            <span>Time-to-Employment</span>
            <span className="text-blue-500 text-xs font-bold font-mono">⚡ Akselerasi AI</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <strong className="text-3xl font-mono text-blue-500 font-black">2.3 Bln</strong>
            <span className="text-[10px] text-blue-500 font-bold flex items-center gap-0.5">
              <TrendingDown size={12} /> -52% Durasi
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500">
            Masa pengangguran rata-rata (Turun dari 5.4 bulan biasa).
          </div>
        </div>

        <div className="p-4 bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
            <span>Kurikulum Align Index</span>
            <span className="text-amber-500 text-xs font-bold font-mono">Batas: 70%</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <strong className="text-3xl font-mono text-amber-500 font-black">89.4%</strong>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
              <TrendingUp size={12} /> +14.2%
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500">
            Kesesuaian materi ajar dengan disrupsi skill riil di industri.
          </div>
        </div>

        <div className="p-4 bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
            <span>Nilai Investasi Kurikulum</span>
            <span className="text-slate-400 font-bold text-[8px]">KEDAIREKA &amp; APBN</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <strong className="text-2xl font-mono text-slate-100 font-black">Rp 1.45 B</strong>
            <span className="text-[10px] text-slate-400">Efisiensi 18%</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500">
            Kumulatif pendanaan hibah komersialisasi R&amp;D.
          </div>
        </div>

      </div>

      {/* 3. TRACER STUDY BAN-PT AUTOMATION (AC-AN-04) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="tracer-accreditation-layout">
        
        {/* Left pane: Tracer analytics graphs */}
        <div className="lg:col-span-8 bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-1.5">
                <BarChart2 size={16} /> Tracer Study BAN-PT Output Generator (AC-AN-04)
              </h3>
              <p className="text-[11px] text-slate-500">Grafik pencapaian serapan kerja alumni yang di-cluster secara real-time untuk draf borang akreditasi.</p>
            </div>

            <button 
              onClick={triggerExport}
              disabled={downloadingReport}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap self-start"
            >
              {downloadingReport ? (
                <>
                  <Activity size={14} className="animate-spin text-white" />
                  <span>Sedang Mengekspor Dokumen...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Ekspor Draf Resmi BAN-PT</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="tracer-graphs-row">
            
            <div className="md:col-span-7 space-y-2">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Masa Depan vs Keselarasan Studi (%)</span>
              <div className="w-full h-[180px] pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={accreditationData}>
                    <defs>
                      <linearGradient id="colorAlign" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorJob" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#94a3b8" }} />
                    <YAxis domain={[50, 100]} tick={{ fontSize: 9, fill: "#94a3b8" }} />
                    <Tooltip wrapperStyle={{ fontSize: 10 }} />
                    <Area type="monotone" dataKey="alignment" stroke="#22C55E" name="Kesesuaian Bidang (%)" fillOpacity={1} fill="url(#colorAlign)" strokeWidth={2} />
                    <Area type="monotone" dataKey="jobPlacement" stroke="#3B82F6" name="Job Placement Rate (%)" fillOpacity={1} fill="url(#colorJob)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center items-center p-3 bg-slate-950/40 dark:bg-slate-900/50 rounded-xl border border-slate-815 border-slate-800">
              <strong className="text-[10px] text-slate-400 uppercase tracking-wider block mb-3 font-bold text-center">Sektor Sebaran Distribusi Alumni</strong>
              <div className="w-full h-[120px] relative flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="55%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ fontSize: 9 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 text-[8.5px] w-full px-2">
                {distributionData.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-slate-450 leading-tight">
                    <span className="w-1.5 h-1.5 rounded" style={{ backgroundColor: COLORS[idx] }}></span>
                    <span className="truncate">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="p-3.5 bg-blue-50/10 border border-blue-900/30 rounded-xl text-left text-[11px] leading-relaxed text-slate-350" id="accreditation-summary">
            📍 <strong>Laporan Hasil Tracer Otomatis:</strong> Integrasi API dengan platform karier alumni Universitas secara instan membuktikan <strong>93.8%</strong> alumni Ilmu Komunikasi terserap kerja langsung setelah lulus dengan penempatan di 4 cluster dominan. Hal ini memangkas beban draf borang akreditasi BAN-PT sebesar 90 jam kerja administrasi manual.
          </div>

        </div>

        {/* Right pane: BAN-PT Document preview / exporter (AC-AN-04) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden" id="accreditation-preview-panel">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Pratinjau Draf Borang BAN-PT Kuantitatif</h4>
            
            {exportPreview ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border-2 border-dashed border-blue-500/50 space-y-3 font-mono text-[9px] animate-fade-in text-slate-505 dark:text-slate-300">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
                  <strong className="text-xs font-serif font-black block text-slate-900 dark:text-slate-100 italic">FORMULIR BORANG III-A</strong>
                  <span className="px-1.5 py-0.2 bg-emerald-500 text-white font-sans text-[7px] font-bold rounded">READY TO SUBMIT</span>
                </div>
                <div className="space-y-1.5">
                  <p><strong>Institusi:</strong> Universitas Negeri Surabaya (UNESA)</p>
                  <p><strong>Sub-Sektor:</strong> Traceability Serapan Kinerja Kerja Alumni</p>
                  <p><strong>Rasio Kesesuaian:</strong> 89.4% (Kategori Sangat Tinggi)</p>
                  <p><strong>Masa Tunggu (L-6):</strong> 2.3 Bulan (Standard Internasional)</p>
                  <p><strong>Persentase Bekerja Layak:</strong> 93.8% (Target IKU-1 Terpenuhi)</p>
                  <p><strong>Sebaran Domestik:</strong> DKI Jakarta (45%), Surabaya (31%), Malang (14%), Lainnya (10%)</p>
                </div>
                <div className="pt-2 border-t border-slate-700/20 flex justify-between text-[8px] font-sans text-slate-400">
                  <span>Sandi Hash: SHA-256 Validated</span>
                  <span>Otoritas: LLDIKTI Otonom</span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-201 dark:border-slate-850 rounded-xl text-slate-400 flex flex-col items-center justify-center space-y-2">
                <FileSpreadsheet size={32} className="text-slate-300 animate-bounce" />
                <p className="text-[10px]">Klik &quot;Ekspor Draf Resmi BAN-PT&quot; di samping kiri untuk mengompilasi borang standardisasi akreditasi kualitatif.</p>
              </div>
            )}
            
            <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 rounded-xl text-[9px] text-[#059669]" id="tracer-audit-notice">
              ✓ <strong>Validitas Terjaga:</strong> Seluruh basis data alumni tersingkronisasi asinkron beralaskan feedback token tanda tangan digital industri mitra yang terverifikasi (Zero Fraud Risk).
            </div> 
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-805 mt-4 text-[8.5px] text-slate-400 flex items-center justify-between">
            <span>Dihasilkan oleh: AI Tracer Engine v6.1</span>
            <span>Update: 12 Juni 2026</span>
          </div>
        </div>

      </div>

      {/* 4. CURRICULUM RELEVANCE & EMERGING ALERTS (M6.5) */}
      <div className="bg-slate-900/40 dark:bg-slate-900/10 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-5" id="curriculum-investment-alert-panel">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5ClassName">
              <AlertTriangle className="text-amber-500" size={16} /> M6.5 Curriculum Investment &amp; Emerging Skill Alerts
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Peta peringatan dini (Early Warning) potensi penurunan minat industri atau usang-nya program studi akibat disrupsi kurikulum.</p>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-500 rounded text-[9.5px] font-mono font-bold border border-amber-500/20">
            {activeAlerts.length} Prodi Perlu Pembaruan Materi
          </span>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="p-6 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 rounded-xl text-center text-emerald-800 dark:text-emerald-400 flex flex-col items-center justify-center space-y-2">
            <CheckCircle2 size={32} />
            <strong className="text-xs">Semua Kurikulum Prodi Selaras 100%!</strong>
            <p className="text-[10px] text-slate-400">Pembiayaan dan alokasi silabus dosen selaras dengan trend industri terupdate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="emerging-list-alerts">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-white dark:bg-slate-950/30 border-2 border-amber-500/14 dark:border-amber-500/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm"
              >
                {/* Threat level indicator tag */}
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-bl">
                  SIAGA DISRUPSI: {alert.threatLevel}
                </div>

                <div className="space-y-2.5">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">{alert.department}</h4>
                    <span className="text-[9px] text-slate-400 font-medium">Program Akademik</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] pt-1.5 border-t border-slate-100 dark:border-slate-805">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block font-bold text-[8.5px]">KURIKULUM USANG (SUNSET):</span>
                      <strong className="text-rose-500 text-[10px] block font-medium leading-normal">{alert.skillsSunset}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block font-bold text-[8.5px]">TREN INDUSTRI (EMERGING):</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-[10px] block font-medium leading-normal">{alert.skillsEmerging}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-rose-50/30 dark:bg-rose-950/5 text-rose-800 dark:text-rose-400 text-[10px] rounded-xl border border-rose-203 border-rose-500/10">
                    ⚠ <strong>Risiko Rekrutmen:</strong> {alert.studentApathyRisk}
                  </div>

                  <div className="p-3 bg-blue-50/30 dark:bg-[#1e293b]/20 text-blue-800 dark:text-blue-300 text-[10.5px] rounded-xl border border-blue-105 border-blue-500/10">
                    💡 <strong>Rekomendasi Kebijakan:</strong> {alert.remodelAction}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-805 flex justify-between items-center">
                  <span className="text-[8px] text-slate-450 uppercase font-mono">Kode Rekomendasi: BR-SKL-05</span>
                  <button 
                    onClick={() => executeRemodel(alert.id, alert.department)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10.5px] font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                  >
                    Setujui Anggaran Prodi <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
