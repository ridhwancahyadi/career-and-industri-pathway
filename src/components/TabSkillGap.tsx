import React, { useState } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { 
  Sparkle, 
  Check, 
  Lock, 
  Play, 
  Warning, 
  Compass, 
  Notebook, 
  List, 
  Books, 
  CaretRight, 
  CaretDown, 
  SealCheck,
  Rocket,
  Plus,
  ArrowRight,
  Info,
  CheckCircle
} from "@phosphor-icons/react";
import { studentProfile, skillChapters, actionPlans } from "../data";
import { ChapterSkill } from "../types";
import { motion, AnimatePresence } from "motion/react";

const radarData = [
  { subject: "Backend Dev", value: 72, fullMark: 100 },
  { subject: "Database", value: 68, fullMark: 100 },
  { subject: "System Design", value: 35, fullMark: 100 },
  { subject: "DevOps/Cloud", value: 20, fullMark: 100 },
  { subject: "Soft Skills", value: 80, fullMark: 100 },
  { subject: "AI Literacy", value: 45, fullMark: 100 }
];

export default function TabSkillGap() {
  const [expandedChapter, setExpandedChapter] = useState<string>("chapter2");
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [actionProgress, setActionProgress] = useState<{ [key: string]: number }>({
    "Kuasai Docker & Containers": 0,
    "REST API Design Patterns Advanced": 0,
    "System Design Fundamentals": 0
  });

  const toggleChapter = (id: string) => {
    setExpandedChapter(expandedChapter === id ? "" : id);
  };

  const handleStartCourse = (title: string) => {
    setActiveCourse(title);
    
    // Simulate learning progress over several intervals
    let curr = 0;
    const interval = setInterval(() => {
      curr += 20;
      setActionProgress(prev => ({
        ...prev,
        [title]: curr
      }));
      if (curr >= 100) {
        clearInterval(interval);
      }
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="skillgap-tab-root">
      {/* SECTION 2A: SKILL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="overview-grid">
        {/* Radar Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-between" id="radar-container">
          <div className="w-full text-left mb-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Compass size={20} className="text-teal-600" /> Analisis Kompetensi Radar
            </h3>
            <p className="text-xs text-slate-500">Peta visual kapabilitas Anda vs standar industri fintech</p>
          </div>

          <div className="w-full h-[220px] flex items-center justify-center py-2" id="radar-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#334155', fontSize: 10, fontWeight: "bold" }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                <Radar
                  name={studentProfile.name}
                  dataKey="value"
                  stroke="#0d9488"
                  fill="#14b8a6"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[10px] text-center text-slate-750 mt-2 font-mono">
            Radar DNA diperbarui otomatis dari hasil UTS, tugas, dan sertifikasi.
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4" id="metric-cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit border border-emerald-100">
                <Check size={24} weight="bold" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-slate-900">14</span>
                <p className="text-sm font-bold text-emerald-700 mt-1">Skill Dikuasai</p>
                <p className="text-xs text-slate-500 mt-1">Lulus validasi otomatis &amp; terintegrasi portofolio</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col justify-between">
              <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl w-fit border border-rose-100 animate-pulse">
                <Warning size={24} weight="fill" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-slate-900">6</span>
                <p className="text-sm font-bold text-rose-700 mt-1">Skill Gap Kritis</p>
                <p className="text-xs text-slate-500 mt-1">Menjadi bottleneck kesiapan rekrutmen Tokopedia</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
              <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl w-fit border border-amber-100">
                <Rocket size={24} weight="fill" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-slate-900">4 Bulan</span>
                <p className="text-sm font-bold text-amber-700 mt-1">Estimasi Target</p>
                <p className="text-xs text-slate-500 mt-1">Dengan rencana belajar 5.5 jam per minggu</p>
              </div>
            </div>
          </div>

          {/* AI Helper Banner */}
          <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200/60 flex items-center gap-3 shadow-inner" id="skill-gap-alert-container">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
            </span>
            <div className="text-xs text-slate-700 font-medium">
              <span className="font-bold text-teal-800">✨ Rekomendasi SKS Terintegrasi:</span> Docker dan MQ dapat dikonversikan sebagai <strong>4 SKS Sensus Kerja Praktik</strong> pada semester 6 mandiri!
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2B: VERTICAL CODECADEMY-STYLE SKILL PATH */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm" id="skillpath-panel">
        <div className="mb-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Notebook size={22} className="text-teal-600" /> Jalur Kurikulum Social Media & Digital PR Specialist
          </h2>
          <p className="text-xs text-slate-500 font-medium">Kurikulum terstruktur berbasis demand pasar agensi komunikasi & media Jakarta, dikustomisasi untuk Universitas Negeri Surabaya (UNESA)</p>
        </div>

        {/* Chapters list */}
        <div className="space-y-4" id="chapters-accordion-group">
          {skillChapters.map((ch, idx) => {
            const isExpanded = expandedChapter === ch.id;
            const isCompleted = ch.status === "completed";
            const isInProgress = ch.status === "in_progress";
            const isLocked = ch.status === "locked";

            return (
              <div 
                key={ch.id} 
                className={`rounded-xl border transition-all overflow-hidden ${
                  isCompleted ? "border-emerald-200 bg-emerald-50/10" :
                  isInProgress ? "border-teal-200 bg-white" :
                  "border-slate-200 bg-slate-50/50 opacity-80"
                }`}
                id={`chapter-${ch.id}`}
              >
                {/* Header Row */}
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-50 transition-all select-none"
                  onClick={() => !isLocked && toggleChapter(ch.id)}
                >
                  <div className="flex items-center gap-3">
                    {/* Status circle badges */}
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200 shadow-sm">
                        ✓
                      </div>
                    ) : isInProgress ? (
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-extrabold text-xs border border-teal-200 animate-pulse">
                        S{ch.number}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs border border-slate-200">
                        <Lock size={12} weight="bold" />
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Chapter {ch.number}</span>
                      <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5 leading-snug">
                        {ch.title}
                        {isCompleted && (
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-mono font-bold">Dikuasai</span>
                        )}
                        {isInProgress && (
                          <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded text-[9px] font-bold uppercase">3/5 Selesai</span>
                        )}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {ch.progressText && (
                      <span className="text-xs text-slate-600 font-mono font-bold bg-slate-100 p-1.5 rounded">{ch.progressText}</span>
                    )}
                    {!isLocked ? (
                      isExpanded ? <CaretDown size={18} className="text-slate-400" /> : <CaretRight size={18} className="text-slate-400" />
                    ) : (
                      <span className="text-xs text-slate-400 font-mono italic">Terkunci</span>
                    )}
                  </div>
                </div>

                {/* Expanded Skill Path cards */}
                {isExpanded && !isLocked && (
                  <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3" id={`skills-inside-chapter-${ch.id}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ch.skills.map((skill, k) => {
                        const isSkillGap = skill.status === "GAP";
                        return (
                          <div 
                            key={k} 
                            className={`p-3.5 rounded-lg border transition-all ${
                              isSkillGap 
                                ? "bg-rose-50/50 border-rose-200 shadow-sm" 
                                : "bg-white border-slate-200 opacity-95 shadow-sm"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                  {isSkillGap ? (
                                    <Warning size={14} className="text-rose-500" />
                                  ) : (
                                    <CheckCircle size={14} weight="fill" className="text-emerald-505" />
                                  )}
                                  {skill.name}
                                </h4>
                                <p className="text-[10px] text-slate-500">
                                  {isSkillGap ? `Skill gap prioritas ${skill.priority}` : "Lulus uji kompetensi otomatis"}
                                </p>
                              </div>

                              {isSkillGap ? (
                                <span className={`px-2 py-0.5 text-[9px] rounded font-mono font-bold uppercase ${
                                  skill.priority === "Tinggi" ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-amber-100 text-amber-700 border border-amber-200"
                                }`}>
                                  {skill.priority}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold uppercase tracking-wider">
                                  Verified
                                </span>
                              )}
                            </div>

                            {/* Action recommendation callout inside GAP skill */}
                            {isSkillGap && skill.actionCard && (
                              <div className="mt-3 p-3 bg-amber-50/40 rounded-lg border border-amber-200" id="gap-cta-block">
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <p className="text-[10px] text-amber-800 font-black flex items-center gap-1 leading-tight uppercase">
                                      <Sparkle size={12} weight="fill" className="animate-spin-slow text-amber-600" /> REKOMENDASI BELAJAR AI:
                                    </p>
                                    <p className="text-xs font-black text-slate-900 mt-1 leading-snug">{skill.actionCard.title}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                                      <span>Platform: {skill.actionCard.platform}</span>
                                      <span>•</span>
                                      <span className="text-emerald-600 font-bold">{skill.actionCard.cost}</span>
                                      <span>•</span>
                                      <span>Durasi: {skill.actionCard.duration}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2 text-[10px]" id="learning-progress-block">
                                  <div className="flex-1">
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                      <div 
                                        className="h-full bg-gradient-to-r from-amber-500 to-teal-500 transition-all duration-300"
                                        style={{ width: `${actionProgress[skill.actionCard.title] || 0}%` }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-semibold">
                                      <span>Progres</span>
                                      <span>{actionProgress[skill.actionCard.title] || 0}%</span>
                                    </div>
                                  </div>

                                  <button 
                                    onClick={() => skill.actionCard && handleStartCourse(skill.actionCard.title)}
                                    className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded text-[10px] transition-all shrink-0 uppercase cursor-pointer"
                                  >
                                    {(actionProgress[skill.actionCard.title] || 0) > 0 ? "Maju..." : skill.actionCard.buttonText}
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* locked visual notes */}
                {isLocked && ch.aiLockedNote && (
                  <div className="p-4 bg-slate-50/55 text-xs text-slate-500 italic font-medium flex items-center gap-2 border-t border-slate-100">
                    <Lock size={14} className="text-slate-400 shrink-0" /> {ch.aiLockedNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2C: 90-DAY ACTION PLAN */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm" id="action-plan-panel">
        <div className="mb-6">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Rocket size={22} className="text-teal-600" /> Rencana Aksi Akselerasi 90 Hari
          </h2>
          <p className="text-xs text-slate-500 font-medium">Langkah konkrit yang dirancang khusus untuk menutup skill gap sebelum pendaftaran magang Tokopedia dibuka</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="90day-action-grid">
          {actionPlans.map((plan, i) => {
            const isMonth1 = plan.month === "Bulan 1";
            const isMonth2 = plan.month === "Bulan 2";
            const borderCol = isMonth1 ? "border-amber-200" : isMonth2 ? "border-blue-200" : "border-teal-200";
            const labelCol = isMonth1 ? "text-amber-700 bg-amber-50 border border-amber-100" : isMonth2 ? "text-blue-700 bg-blue-50 border border-blue-100" : "text-teal-700 bg-teal-50 border border-teal-100";
            const titleCode = plan.title;

            return (
              <div 
                key={i} 
                className={`p-5 rounded-2xl border bg-white flex flex-col justify-between ${borderCol} transition-transform hover:scale-[1.01] shadow-sm`}
                id={`action-plan-card-${i}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full ${labelCol}`}>
                      {plan.month}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">Target: {plan.target}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 mb-2 leading-tight">{plan.title}</h3>
                  
                  <div className="space-y-2 text-xs pb-3 text-slate-600">
                    <p className="flex items-start gap-1 leading-normal">
                      <span className="text-teal-700 font-bold">Sumber:</span> {plan.resource}
                    </p>
                    <p className="flex items-start gap-1 p-2 bg-slate-50 rounded text-[11px] text-teal-850 font-medium border border-teal-100">
                      🏆 <span className="font-bold">Luaran:</span> {plan.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-teal-500 transition-all duration-300" 
                        style={{ width: `${actionProgress[titleCode] || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold font-mono">Progres: {actionProgress[titleCode] || 0}%</span>
                  </div>

                  <button 
                    onClick={() => handleStartCourse(titleCode)}
                    className="px-3 py-1.5 bg-slate-10 w text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded font-bold text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    {(actionProgress[titleCode] || 0) > 0 ? "Maju..." : "Mulai"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeCourse && (
        <div className="fixed bottom-4 right-4 p-4 bg-white border-2 border-teal-500 text-slate-800 rounded-xl shadow-2xl z-50 animate-bounce duration-500 max-w-sm flex items-start gap-3">
          <Sparkle size={32} weight="fill" className="text-teal-600 shrink-0" />
          <div>
            <h4 className="text-xs font-black text-teal-700">⚡ Kelas Disinkronkan dengan ACIP!</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Belajarmu sedang dipantau oleh asisten AI. Setiap checkpoint materi yang diselesaikan otomatis menambah <strong>skor Kesiapan Karir</strong>.
            </p>
            <button 
              onClick={() => setActiveCourse(null)}
              className="mt-2 text-[10px] text-slate-500 hover:text-slate-700 font-bold underline cursor-pointer"
            >
              Tutup Notifikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
