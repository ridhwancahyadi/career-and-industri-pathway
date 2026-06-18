import React, { useState } from "react";
import { 
  Sparkle, 
  Compass, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Activity, 
  Users, 
  DollarSign, 
  Briefcase,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Interfaces and models
interface SkillDecayAlert {
  id: string;
  skillName: string;
  retentionScore: number;
  marketDemandIncrease: number;
  daysRemainingBeforeThreshold: number;
  desc: string;
}

interface ScoutOpportunity {
  id: string;
  title: string;
  category: "hackathon" | "project" | "research" | "scholarship";
  provider: string;
  deadline: string;
  matchScore: number;
  reason: string;
}

// 1. Skill Decay Alerts (M6.8) - Maximum 3 per week constraint (BR-SDA-02)
const decayAlerts: SkillDecayAlert[] = [
  {
    id: "d1",
    skillName: "Docker & Containers",
    retentionScore: 61,
    marketDemandIncrease: 23,
    daysRemainingBeforeThreshold: 12,
    desc: "Ingatan jangka panjang Anda seputar multi-stage container build menurun ke bawah batas aman 75% akibat tidak dipraktikkan 3 bulan terakhir. Sementara itu, 23% lowongan fintech Jakarta minggu ini secara aktif mewajibkannya."
  },
  {
    id: "d2",
    skillName: "REST API Design Advanced",
    retentionScore: 68,
    marketDemandIncrease: 15,
    daysRemainingBeforeThreshold: 8,
    desc: "Pola pengerjaan kuis menunjukkan pengulangan konsep JWT security & rate limiting mulai melemah. Permintaan industri fintech naik sebesar 15%."
  }
];

// 2. Scouted Opportunities (M6.10) - Sourced from research signals & post-exam low load periods
const scoutOpportunities: ScoutOpportunity[] = [
  {
    id: "o1",
    title: "Kolaborasi Riset NLP & Sentimen Pasar Saham",
    category: "research",
    provider: "Sekretariat Dekan FTE - Lab Kecerdasan Buatan",
    deadline: "30 Juni 2026",
    matchScore: 92,
    reason: "Menilai argument depth tinggi tulisan tugas akhir Anda seputar Natural Language Processing. Sangat ideal untuk mendaftar sebelum deadline kuota terisi."
  },
  {
    id: "o2",
    title: "National Fintech Hackathon 2026",
    category: "hackathon",
    provider: "Bank Indonesia Ecosystem Integration",
    deadline: "12 Juli 2026",
    matchScore: 88,
    reason: "Menunjang target karir spesialisasi Anda di startup teknologi keuangan. Peluang memenangkan pendanaan capstone serta internship pass."
  },
  {
    id: "o3",
    title: "Djarum Beasiswa Plus XL",
    category: "scholarship",
    provider: "Djarum Foundation",
    deadline: "25 Juli 2026",
    matchScore: 85,
    reason: "IPK Anda saat ini (3.42) melampaui batas administrasi 3.20. Proaktif dicalonkan sebelum masa pendaftaran ditutup."
  }
];

// 3. Counterfactual Cohort Data (M6.9)
const counterfactualPaths = [
  {
    id: "p1",
    title: "Magang Backend Bersertifikat (MBKM Tokopedia)",
    cohortSize: 18,
    medianTimeToEmployment: "2.1 Bulan",
    startingSalaryRange: "Rp 9.5 – 14.5 jt/bln",
    threeYearTrajectory: "91% Naik ke Lead Developer",
    confidenceInterval: "82% - 94% Akurasi Prediksi",
    relevanceText: "Disarankan. Sangat sesuai dengan target Backend Engineer Anda.",
    skillsGain: ["Kubernetes", "Redis", "Stateless Architecture"],
    chartData: [
      { name: "S5 Kesiapan", score: 67 },
      { name: "S6 Lulus", score: 79 },
      { name: "1 Th Karir", score: 88 },
      { name: "3 Th Karir", score: 94 }
    ],
    isReliable: true
  },
  {
    id: "p2",
    title: "Kuliah Reguler Mandiri (Tanpa Program Magang)",
    cohortSize: 12,
    medianTimeToEmployment: "5.4 Bulan",
    startingSalaryRange: "Rp 5.5 – Rp 8.0 jt/bln",
    threeYearTrajectory: "54% Tetap di Software Engineer Junior",
    confidenceInterval: "74% - 81% Akurasi Prediksi",
    relevanceText: "Berisiko. Mengakibatkan gap praktis yang semakin meluas saat bersaing di bursa kerja.",
    skillsGain: ["Teori Sistem Terdistribusi", "Konsep Paper Dasar"],
    chartData: [
      { name: "S5 Kesiapan", score: 67 },
      { name: "S6 Lulus", score: 70 },
      { name: "1 Th Karir", score: 74 },
      { name: "3 Th Karir", score: 76 }
    ],
    isReliable: true
  },
  {
    id: "p3",
    title: "Magang Mandiri BUMN (Enterprise Banking)",
    cohortSize: 4, // Intentionally < 10 to demonstrate cluster size constraint BR-CCE-01
    medianTimeToEmployment: "4.2 Bulan",
    startingSalaryRange: "Rp 7.0 – Rp 10.0 jt/bln",
    threeYearTrajectory: "62% Tech Specialist Perbankan",
    confidenceInterval: "60% - 68% Akurasi Prediksi",
    relevanceText: "Belum disarankan dikarenakan keterbatasan jumlah kluster data historis.",
    skillsGain: ["Java Spring Boot", "Legacy Systems Support"],
    chartData: [],
    isReliable: false // Overfitting warning
  }
];

export default function TabOpportunityScout() {
  const [activePathId, setActivePathId] = useState<string>("p1");
  const [alerts, setAlerts] = useState<SkillDecayAlert[]>(decayAlerts);
  const [learningSimulationId, setLearningSimulationId] = useState<string | null>(null);
  const [scoutedItems, setScoutedItems] = useState<ScoutOpportunity[]>(scoutOpportunities);
  const [rejectedCount, setRejectedCount] = useState<{ [key: string]: number }>({});

  const activePath = counterfactualPaths.find(p => p.id === activePathId) || counterfactualPaths[0];

  // M6.8 Action trigger: simulating starting refresher session
  const handleStartReview = (skillName: string) => {
    setLearningSimulationId(skillName);
    
    // Smoothly restore the skill retention back to >95% to model active review loops
    setTimeout(() => {
      setAlerts(prev => prev.filter(item => item.skillName !== skillName));
      setLearningSimulationId(null);
    }, 1800);
  };

  // M6.10 Learning from rejection logic (AC-POS-04)
  const handleRejectOpportunity = (oppId: string, category: string) => {
    setScoutedItems(prev => prev.filter(item => item.id !== oppId));
    
    const nextCount = (rejectedCount[category] || 0) + 1;
    setRejectedCount(prev => ({ ...prev, [category]: nextCount }));

    if (nextCount >= 3) {
      alert(`AC-POS-04 Triggered: Sistem mendeteksi Anda telah menolak 3 peluang dalam kategori '${category}'. Kami akan berhenti merokemendasikan sementara waktu untun menghindari ketidaksesuaian minat.`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="opportunity-scout-root">
      
      {/* HEADER OVERVIEW */}
      <div className="bg-gradient-to-r from-teal-900/60 via-emerald-950/40 to-slate-900 p-5 rounded-2xl border border-teal-800/30 relative overflow-hidden shadow-md" id="scout-header">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Flame size={100} className="text-teal-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500 text-white shadow-sm flex items-center gap-1">
              <Sparkle size={10} className="animate-spin-slow" /> M6.8, M6.9, M6.10 OVERVIEW
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1.5 font-sans tracking-tight">Proactive Opportunity Scout &amp; Career Trajectory Simulator</h2>
          <p className="text-xs text-slate-350 mt-1 leading-relaxed max-w-2xl">
            Sistem cerdas di belakang layar yang aktif memonitor degradasi memorisasi skill (M6.8), mengalkulasi counterfactual roadmap alumni UNESA (M6.9), serta mengalirkan tawaran riset, lomba, dan beasiswa saat beban kognitif Anda rendah (M6.10).
          </p>
        </div>
      </div>

      {/* TOP SECTION: DYNAMIC SKILL DECAY ALERT (M6.8) */}
      <div className="bg-slate-900/40 dark:bg-slate-900/10 border border-slate-200 dark:border-[#1e293b] p-5 rounded-2xl shadow-sm space-y-4" id="decay-alerts-panel">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <Flame size={16} /> Dynamic Skill Decay Alerts (AC-SDA-01)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Notifikasi dikirim saat retention &lt; 75% berpapasan dengan lonjakan demand industri &gt; 10%.</p>
          </div>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-mono font-bold leading-none select-none">
            Frekuensi: {alerts.length} Terdeteksi Minggu Ini (Batas: 3)
          </span>
        </div>

        {learningSimulationId && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200/50 rounded-xl text-xs font-mono flex items-center gap-2.5">
            <RefreshCw size={14} className="animate-spin text-blue-500" />
            <span>Sedang menstrukturkan sesi refresh kilat 45 menit untuk skill '{learningSimulationId}'...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="decay-cards">
          <AnimatePresence mode="popLayout">
            {alerts.length === 0 ? (
              <div className="col-span-2 p-5 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-2xl text-center border border-emerald-100 text-emerald-800 dark:text-emerald-400 flex flex-col items-center justify-center space-y-2">
                <CheckCircle2 size={32} />
                <h4 className="text-xs font-bold font-sans">Semua Skill Anda Dalam Batas Aman!</h4>
                <p className="text-[10px] text-slate-450">Kemampuan ingatan jangka panjang Anda sejalan dengan trend spesifikasi fintech terkini.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-slate-900/10 border-2 border-rose-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 px-2 py-1 bg-rose-500 text-white font-mono text-[8px] font-black rounded-bl uppercase">
                    SIAGA MELURUH
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">{alert.skillName}</h4>
                    <div className="flex items-center gap-3 py-1 text-[9.5px] font-bold">
                      <span className="text-rose-600">Retensi: {alert.retentionScore}%</span>
                      <span className="text-teal-650 text-teal-650 text-teal-600">Demand: +{alert.marketDemandIncrease}%</span>
                      <span className="text-slate-400">Ambang: {alert.daysRemainingBeforeThreshold} hari lagi</span>
                    </div>
                    <p className="text-[10px] text-slate-505 dark:text-slate-300 leading-relaxed font-sans">{alert.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-805 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 font-mono">Quantified alert AC-SDA-02</span>
                    <button
                      onClick={() => handleStartReview(alert.skillName)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black rounded-lg cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                    >
                      Mulai Sesi Review 45 Menit <ArrowRight size={11} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LOWER GRID: COUNTERFACTUAL VS SCOUT FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="scout-main-grid">
        
        {/* LEFT COLUMN: COUNTERFACTUAL DECISION ENGINE (M6.9) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-[#1e293b] p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4" id="counterfactual-panel">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              <Compass size={18} className="text-blue-500" /> Career Counterfactual Simulator (M6.9)
            </div>
            <p className="text-[11px] text-slate-500">
              Proyeksi karir probabilistik berdasarkan clustering kemiripan rekam DNA Anda dengan N-alumni Universitas Negeri Surabaya (UNESA).
            </p>
          </div>

          {/* Path switcher buttons list */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-205 dark:border-slate-800" id="path-switcher">
            {counterfactualPaths.map((p) => {
              const isActive = activePathId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePathId(p.id)}
                  className={`py-2 rounded-lg text-[9.5px] font-bold text-center leading-tight cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-450 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {p.id === "p1" ? "MBKM Tokopedia" : p.id === "p2" ? "Tanpa Magang" : "Mandiri BUMN"}
                </button>
              );
            })}
          </div>

          {/* Simulator Data Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePath.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.12 }}
              className="space-y-4"
              id="simulation-view"
            >
              
              {/* Overfitting alert - BR-CCE-01 & AC-CCE-01 */}
              {!activePath.isReliable ? (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-201 dark:border-slate-800 rounded-xl space-y-2 text-center" id="cc-unreliable-warning">
                  <AlertTriangle className="text-amber-500 mx-auto" size={24} />
                  <strong className="text-xs text-slate-800 dark:text-slate-250 block">BR-CCE-01 Cluster Size Not Met</strong>
                  <p className="text-[10px] text-slate-450 leading-relaxed">
                    Data belum cukup — proyeksi counterfactual akan tersedia setelah <strong>N &gt;= 10</strong> alumni dengan profil belajar serupa berhasil terafiliasi di sub-klaster ini. Saat ini baru ada <strong>{activePath.cohortSize} alumni</strong>.
                  </p>
                </div>
              ) : (
                <div className="space-y-4" id="cc-reliable-data">
                  {/* Stats Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Est. Masa Menganggur</span>
                      <strong className="text-lg font-mono text-blue-600 block mt-0.5">{activePath.medianTimeToEmployment}</strong>
                      <span className="text-[8px] text-slate-400 leading-none block mt-0.5">Rata-rata pasca wisuda</span>
                    </div>
                    <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 rounded-xl">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Gaji Awal Ditawarkan</span>
                      <strong className="text-lg font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">{activePath.startingSalaryRange}</strong>
                      <span className="text-[8px] text-slate-400 leading-none block mt-0.5">Sesuai scraping JobStreet 2026</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 rounded-xl text-[10px]" id="cc-details-bulletin">
                    <div className="text-slate-800 dark:text-slate-250 font-bold flex items-center gap-1.5">
                      <Target size={12} className="text-blue-500" /> Hasil Rekomendasi Karir 3 Tahun
                    </div>
                    <p className="text-slate-505 dark:text-slate-400 mt-1">{activePath.threeYearTrajectory}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {activePath.skillsGain.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 text-blue-700 dark:text-blue-400 text-[8.5px] font-bold rounded">
                          +{s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recharts Trajectory Progress */}
                  <div className="space-y-1">
                    <span className="text-[9.5px] text-slate-400 font-bold block uppercase tracking-wider">
                      Uji Proyeksi Kesiapan Karir (%) vs Garis Batas Rata-rata
                    </span>
                    <div className="w-full h-[150px] pt-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activePath.chartData}>
                          <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                          <Tooltip wrapperStyle={{ fontSize: 10 }} />
                          <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Footer constraints notice */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-805 flex items-center justify-between text-[8px] text-slate-400" id="cc-notice-line">
            <span>Ukuran Klaster Aktif: <strong>N = {activePath.cohortSize} Alumni UNESA</strong></span>
            <span>Akurasi Konfidensi: <strong>{activePath.confidenceInterval}</strong> (AC-CCE-03)</span>
          </div>
        </div>

        {/* RIGHT COLUMN: PROACTIVE OPPORTUNITY SCOUT (M6.10) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-[#1e293b] p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4" id="scout-feed-panel">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0D9488] flex items-center gap-1.5">
              <Activity size={16} /> Opportunity Scout Feed (M6.10)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Sistem aktif mendorong peluang riset terpersonalisasi di waktu beban kognitif terendah.</p>
          </div>

          <div className="space-y-3" id="scout-items">
            <AnimatePresence mode="popLayout_only">
              {scoutedItems.length === 0 ? (
                <div className="p-6 text-center text-[10px] text-slate-450 space-y-1 block bg-slate-55 shadow-inner rounded-xl border border-dotted">
                  <p>Semua penawaran dikesampingkan atau belum divalidasi ulang.</p>
                  <p>Sistem akan memindai opportunities baru dalam waktu 24 jam ke depan.</p>
                </div>
              ) : (
                scoutedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`scout-${item.id}`}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 bg-slate-50 dark:bg-slate-900/30 border border-slate-205 dark:border-slate-800 rounded-xl space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-1.5 py-0.5 text-[8px] font-mono font-black uppercase rounded ${
                        item.category === 'research' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        item.category === 'hackathon' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}>
                        {item.category}
                      </span>
                      <strong className="text-teal-650 text-teal-600 font-bold text-[10.5px]">{item.matchScore}% Match Score</strong>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">{item.title}</h4>
                      <p className="text-[8.5px] text-slate-450 leading-none mt-1">Penyelenggara: {item.provider}</p>
                    </div>

                    <p className="text-[9.5px] text-slate-505 dark:text-slate-350 leading-relaxed font-semibold">{item.reason}</p>

                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/40 flex items-center justify-between text-[9px]">
                      <span className="text-slate-400 font-bold">Deadline: {item.deadline}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleRejectOpportunity(item.id, item.category)}
                          className="px-2 py-1 text-[8.5px] text-rose-600 hover:bg-rose-50 rounded italic cursor-pointer"
                        >
                          Abaikan
                        </button>
                        <button
                          className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[8.5px] font-black cursor-pointer flex items-center gap-0.5 transition-colors"
                        >
                          Daftar <ExternalLink size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="p-3 bg-teal-50/40 border border-teal-100/50 rounded-xl text-[9px] text-slate-500 block leading-normal" id="load-period-advisory">
            💡 <strong>Cognitive Load Advisory:</strong> Deteksi kurva kelelahan belajar di M5 menunjukkan rentang waktu sore pukul 16:00 - 18:00 adalah timing optimal untuk Anda merespons tawaran aktif ini.
          </div>
        </div>

      </div>

    </div>
  );
}
