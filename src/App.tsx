import React, { useState } from "react";
import { 
  LayoutDashboard, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Settings,
  Sun,
  Moon,
  Sparkle,
  Compass,
  Sliders,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Flame,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import custom modular academic views (Dosen/Lecturer)
import AcademicBeranda from "./components/AcademicBeranda";
import AcademicPenilaian from "./components/AcademicPenilaian";
import AcademicPeringatan from "./components/AcademicPeringatan";
import AcademicKarir from "./components/AcademicKarir";
import AcademicKurikulum from "./components/AcademicKurikulum";
import AcademicMahasiswaPA from "./components/AcademicMahasiswaPA";
import AcademicRiset from "./components/AcademicRiset";
import AcademicEksekutif from "./components/AcademicEksekutif";
import AcademicPengaturan from "./components/AcademicPengaturan";

// Import custom modular student views (Mahasiswa)
import TabRoadmap from "./components/TabRoadmap";
import TabSkillGap from "./components/TabSkillGap";
import TabIndustryPulse from "./components/TabIndustryPulse";
import TabInternships from "./components/TabInternships";
import TabAlumni from "./components/TabAlumni";
import TabDocBuilder from "./components/TabDocBuilder";
import TabInterviewCoach from "./components/TabInterviewCoach";
import TabOpportunityScout from "./components/TabOpportunityScout";

import { studentProfile } from "./data";

export default function App() {
  const [viewMode, setViewMode] = useState<"dosen" | "mahasiswa">("dosen");
  const [activeTab, setActiveTab] = useState<string>("beranda");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // Defaulting to dark mode for immediate elegant presentation of black/blue base
  });

  const toggleDarkMode = () => {
    const nextVal = !isDarkMode;
    setIsDarkMode(nextVal);
    localStorage.setItem("theme", nextVal ? "dark" : "light");
  };

  const academicMenuItems = [
    { id: "beranda", label: "Beranda Kelas", desc: "Today Alert & Class Overview", icon: LayoutDashboard },
    { id: "penilaian", label: "Penilaian AI", desc: "AI-Assisted Grading Center", icon: FileCheck },
    { id: "peringatan", label: "Peringatan Dini", desc: "Automated Early Warning", icon: AlertTriangle },
    { id: "karir", label: "Karir & Industri", desc: "Industry Alignment Pulse", icon: TrendingUp },
    { id: "kurikulum", label: "Kurikulum Insight", desc: "CPL Assessment & Health", icon: BookOpen },
    { id: "mahasiswapa", label: "Mahasiswa PA", desc: "Academic Advising Board", icon: GraduationCap },
    { id: "riset", label: "Riset & Publikasi", desc: "Research Output & TA", icon: Award },
    { id: "eksekutif", label: "Eksekutif & IKU", desc: "Institutional & BAN-PT View", icon: Globe },
    { id: "pengaturan", label: "Pengaturan", desc: "Sistem & Rubrik Config", icon: Settings }
  ];

  const studentMenuItems = [
    { id: "roadmap", label: "Roadmap Karir", desc: "AI Gantt & Trajectory", icon: Compass },
    { id: "skillgap", label: "Analisis Skill Gap", desc: "Curriculum Matcher", icon: Sliders },
    { id: "industrypulse", label: "Tren Industri", desc: "Demand & Salary Index", icon: TrendingUp },
    { id: "internships", label: "Lowongan Magang", desc: "Recommended Internships", icon: Briefcase },
    { id: "alumni", label: "Network Alumni", desc: "Peer Mentorship Hub", icon: Users },
    { id: "docbuilder", label: "AI Doc Builder", desc: "CV & Cover Letter Drafting", icon: FileText },
    { id: "interview", label: "Simulasi & Coach AI", desc: "Mock Interview & Persona", icon: MessageSquare },
    { id: "opportunity", label: "Opportunity & Scout", desc: "Scout Alert & Counterfactual", icon: Flame }
  ];

  const menuItems = viewMode === "dosen" ? academicMenuItems : studentMenuItems;

  const renderActiveTab = () => {
    if (viewMode === "dosen") {
      switch (activeTab) {
        case "beranda":
          return <AcademicBeranda isDarkMode={isDarkMode} onNavigate={(tab) => setActiveTab(tab)} />;
        case "penilaian":
          return <AcademicPenilaian isDarkMode={isDarkMode} />;
        case "peringatan":
          return <AcademicPeringatan isDarkMode={isDarkMode} onNavigate={(tab) => setActiveTab(tab)} />;
        case "karir":
          return <AcademicKarir isDarkMode={isDarkMode} />;
        case "kurikulum":
          return <AcademicKurikulum isDarkMode={isDarkMode} />;
        case "mahasiswapa":
          return <AcademicMahasiswaPA isDarkMode={isDarkMode} />;
        case "riset":
          return <AcademicRiset isDarkMode={isDarkMode} />;
        case "eksekutif":
          return <AcademicEksekutif isDarkMode={isDarkMode} />;
        case "pengaturan":
          return <AcademicPengaturan isDarkMode={isDarkMode} />;
        default:
          return <AcademicBeranda isDarkMode={isDarkMode} onNavigate={(tab) => setActiveTab(tab)} />;
      }
    } else {
      switch (activeTab) {
        case "roadmap":
          return <TabRoadmap />;
        case "skillgap":
          return <TabSkillGap />;
        case "industrypulse":
          return <TabIndustryPulse />;
        case "internships":
          return <TabInternships />;
        case "alumni":
          return <TabAlumni />;
        case "docbuilder":
          return <TabDocBuilder />;
        case "interview":
          return <TabInterviewCoach />;
        case "opportunity":
          return <TabOpportunityScout />;
        default:
          return <TabRoadmap />;
      }
    }
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-300 flex flex-col lg:flex-row font-sans selection:bg-teal-100 selection:text-teal-900 ${
        isDarkMode 
          ? "dark bg-[#02050e] bg-gradient-to-br from-[#02050e] via-[#091225] to-[#01040b] text-slate-100 animate-fade-in" 
          : "bg-slate-50 text-slate-850"
      }`} 
      id="acip-app-root"
    >
      
      {/* 1. FIXED LEFT SIDEBAR */}
      <aside 
        className={`w-full lg:w-72 border-b lg:border-b-0 lg:border-r p-6 flex flex-col justify-between shrink-0 lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:z-30 overflow-y-auto transition-all duration-300 ${
          isDarkMode 
            ? "bg-[#050914] border-[#1e293b]/75 text-slate-200" 
            : "bg-[#F1F5F9] border-slate-200 text-slate-800"
        }`} 
        id="left-sidebar-panel"
      >
        
        <div className="space-y-6">
          {/* Platform Identity with inline premium theme toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-150/40 border-slate-200" id="platform-identity-wrapper">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl text-white font-black text-xl shadow-md flex items-center justify-center tracking-tight select-none transition-all duration-300 ${
                viewMode === "dosen" 
                   ? "bg-blue-600 shadow-blue-500/10" 
                   : "bg-teal-600 shadow-teal-500/10"
              }`}>
                AC
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-widest uppercase">ACIP</h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  viewMode === "dosen" ? "text-blue-500" : "text-teal-550 text-teal-500"
                }`}>
                  {viewMode === "dosen" ? "Lecturer Dashboard" : "Student Core Portal"}
                </p>
              </div>
            </div>

            {/* Double-state theme switcher control */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                isDarkMode 
                  ? "bg-slate-900 text-amber-400 border-slate-800 hover:bg-slate-850" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
              title={isDarkMode ? "Matikan Mode Gelap" : "Aktifkan Mode Gelap"}
              id="theme-toggle-button"
            >
              {isDarkMode ? (
                <Sun size={17} className="animate-spin-slow text-amber-400" />
              ) : (
                <Moon size={17} className="text-slate-600" />
              )}
            </button>
          </div>

          {/* Double-state Segment Switcher for Portals */}
          <div 
            className={`p-1 rounded-xl flex items-center gap-1 border transition-all duration-300 ${
              isDarkMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-200/50 border-slate-205"
            }`}
            id="role-switcher-container"
          >
            <button 
              onClick={() => {
                setViewMode("dosen");
                setActiveTab("beranda");
              }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                viewMode === "dosen"
                  ? isDarkMode 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "bg-white text-blue-900 shadow-sm font-black"
                  : "text-slate-400 hover:text-slate-350"
              }`}
              id="portal-btn-dosen"
            >
              Dosen
            </button>
            <button 
              onClick={() => {
                setViewMode("mahasiswa");
                setActiveTab("roadmap");
              }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                viewMode === "mahasiswa"
                  ? isDarkMode 
                    ? "bg-teal-600 text-white shadow-md shadow-teal-500/20" 
                    : "bg-white text-teal-905 bg-white text-teal-900 shadow-sm font-black"
                  : "text-slate-400 hover:text-slate-350"
              }`}
              id="portal-btn-mahasiswa"
            >
              Mahasiswa
            </button>
          </div>

          {viewMode === "dosen" ? (
            /* Lecturer Persona Snapshot Card */
            <div 
              className={`p-4 rounded-2xl border text-center relative overflow-hidden shadow-sm transition-all duration-350 animate-fade-in ${
                isDarkMode ? "bg-slate-900/40 border-[#1e293b]/50" : "bg-white border-slate-200"
              }`} 
              id="lecturer-sidebar-profile"
            >
              <div className="absolute top-0 right-0 p-1 opacity-20">
                <Sparkle size={48} className="text-blue-500 animate-pulse" />
              </div>

              {/* Initials Avatar */}
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-black mx-auto shadow-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-blue-950/40 text-blue-400 border border-blue-900/40" 
                    : "bg-gradient-to-tr from-blue-500 to-blue-600 text-white"
                }`}
              >
                SR
              </div>

              <div className="mt-2.5">
                <h3 className="text-xs font-black leading-tight text-slate-900 dark:text-slate-100">Dr. Siti Rahayu Pertiwi, M.Kom</h3>
                
                {/* Role badge */}
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black mt-2 capitalize ${
                  isDarkMode ? "bg-blue-950/50 text-blue-300 border border-blue-900/30" : "bg-blue-50 text-blue-700 border border-blue-100"
                }`}>
                  Dosen · Koordinator Prodi
                </span>

                <p className="text-[9px] text-slate-505 text-slate-500 font-bold mt-1.5">Universitas Negeri Surabaya</p>
              </div>

              {/* Semester Active indicators */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Semester aktif</span>
                  <strong className={`text-xs ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>Genap 2025/2026</strong>
                </div>
                <div 
                  className={`px-2.5 py-1 border text-[9.5px] font-mono font-black shadow-inner rounded transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-blue-950/20 border-blue-900/40 text-blue-400" 
                      : "bg-blue-50 border-blue-100 text-blue-700"
                  }`}
                >
                  115 Mhs Asuhan
                </div>
              </div>
            </div>
          ) : (
            /* Student Persona Snapshot Card */
            <div 
              className={`p-4 rounded-2xl border text-center relative overflow-hidden shadow-sm transition-all duration-350 animate-fade-in ${
                isDarkMode ? "bg-slate-900/40 border-[#1e293b]/50" : "bg-white border-slate-200"
              }`} 
              id="student-sidebar-profile"
            >
              <div className="absolute top-0 right-0 p-1 opacity-20">
                <Sparkle size={48} className="text-teal-500 animate-pulse" />
              </div>

              {/* Initials Avatar */}
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-black mx-auto shadow-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-teal-950/40 text-teal-400 border border-teal-900/40" 
                    : "bg-gradient-to-tr from-teal-500 to-teal-600 text-white"
                }`}
              >
                RA
              </div>

              <div className="mt-2.5">
                <h3 className="text-xs font-black leading-tight text-slate-900 dark:text-slate-100">Rizky Aditya Pratama</h3>
                
                {/* Role badge */}
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black mt-2 capitalize ${
                  isDarkMode ? "bg-teal-950/50 text-teal-300 border border-teal-900/30" : "bg-teal-50 text-teal-700 border border-teal-100"
                }`}>
                  Mahasiswa · Angkatan {studentProfile.angkatan}
                </span>

                <p className="text-[9px] text-slate-505 text-slate-500 font-bold mt-1.5">{studentProfile.major}</p>
              </div>

              {/* IPK / Target indicators */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Karir</span>
                  <strong className={`text-xs ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>{studentProfile.careerGoal}</strong>
                </div>
                <div 
                  className={`px-2.5 py-1 border text-[9.5px] font-mono font-black shadow-inner rounded transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-teal-950/20 border-teal-900/40 text-teal-400" 
                      : "bg-teal-50 border-teal-100 text-teal-700"
                  }`}
                >
                  IPK: {studentProfile.ipk}
                </div>
              </div>
            </div>
          )}

          {/* Tab switching buttons */}
          <nav className="space-y-1.5" id="sidebar-nav-tabs">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-3 group relative cursor-pointer ${
                    isActive 
                      ? isDarkMode
                        ? viewMode === "dosen"
                          ? "bg-blue-950/30 border border-blue-900/50 text-blue-400 font-bold shadow-md"
                          : "bg-teal-950/30 border border-teal-900/50 text-teal-400 font-bold shadow-md"
                        : "bg-white border border-slate-200/50 text-slate-800 font-bold shadow-sm" 
                      : isDarkMode
                        ? "text-slate-400 hover:text-white hover:bg-slate-900/40"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/30"
                  }`}
                  id={`sidebar-tab-btn-${item.id}`}
                >
                  {/* Left indicator glow */}
                  {isActive && (
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-md transition-all duration-300 ${
                      viewMode === "dosen" ? "bg-blue-600" : "bg-teal-600"
                    }`}></span>
                  )}

                  <IconComp 
                    size={18} 
                    className={`shrink-0 transition-colors ${
                      isActive 
                        ? viewMode === "dosen" ? "text-blue-500" : "text-teal-500"
                        : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                    }`} 
                  />
                  <div>
                    <span className="text-[11px] block font-bold leading-none">{item.label}</span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Brand credit line */}
        <div className="pt-6 border-t border-slate-200/40 dark:border-slate-800 mt-6 lg:mt-0" id="sidebar-credit-block">
          <p className="text-[10px] text-slate-400 font-mono text-center">
            AI Campus Intelligence Platform
          </p>
          <p className={`text-[9px] font-mono text-center mt-0.5 font-bold transition-all duration-300 ${
            viewMode === "dosen" ? "text-[#2563EB]" : "text-teal-500"
          }`}>
            ACIP v2.6 · Surabaya
          </p>
        </div>

      </aside>

      {/* 2. RIGHT SCROLLABLE MAIN CONTENT CANVAS */}
      <main className="flex-1 lg:pl-72 min-w-0" id="main-content-region">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8" id="scrolling-content-envelope">
          
          {/* Framer motion wrapper for entering transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              id={`tab-content-container-${activeTab}`}
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

    </div>
  );
}
