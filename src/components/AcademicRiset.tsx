import React, { useState } from "react";
import { 
  Award, 
  Sparkle, 
  BookOpen, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Send,
  User,
  ThumbsUp,
  FileText,
  Flame,
  Globe,
  Briefcase,
  Users,
  Search,
  ChevronRight,
  Target
} from "lucide-react";

interface AcademicRisetProps {
  isDarkMode: boolean;
}

interface ThesisStudent {
  name: string;
  title: string;
  progress: number;
  lastUpdate: string;
  status: "On Track" | "Perlu Review" | "Tertinggal" | "Hampir Selesai" | "Kritis";
}

interface IndustryRDBrief {
  id: string;
  company: string;
  problem: string;
  grantType: "Kedaireka" | "Simlitabmas" | "Mandiri Corp";
  budget: string;
  techStack: string[];
  commercializationPotential: "Sangat Tinggi" | "Tinggi" | "Sedang";
}

interface StudentRACandidate {
  id: string;
  name: string;
  gpa: number;
  mod3SkillGapFit: string;
  mod4ArgumentDepth: number; // Modul 4 argument depth score
  specialization: string;
  matchScore: number;
}

export default function AcademicRiset({ isDarkMode }: AcademicRisetProps) {
  const thesisStudents: ThesisStudent[] = [
    { name: "Andi Prasetyo", title: "Strategi Kampanye Digital Humas Pariwisata Jatim Park", progress: 80, lastUpdate: "3 hr lalu", status: "On Track" },
    { name: "Maya Sartika", title: "Analisis Pembingkaian Isu (Framing) Boikot Brand di Media Sosial", progress: 60, lastUpdate: "1 mg lalu", status: "Perlu Review" },
    { name: "Hendra Gunawan", title: "Representasi Maskulinitas Baru dalam Iklan Digital di YouTube", progress: 40, lastUpdate: "3 mg lalu", status: "Tertinggal" },
    { name: "Laila Fitri", title: "Manajemen Komunikasi Krisis PT KAI Terhadap Sentimen Netizen Twitter", progress: 90, lastUpdate: "1 hr lalu", status: "Hampir Selesai" },
    { name: "Dimas Wahyu", title: "Pola Komunikasi Antarpribadi Mahasiswa Rantau Ilmu Komunikasi UNESA", progress: 20, lastUpdate: "5 mg lalu", status: "Kritis" }
  ];

  // M6.5 Industry Demand - Research Context (R&D Problems)
  const industryBriefs: IndustryRDBrief[] = [
    {
      id: "b1",
      company: "PT GoTo Gojek Tokopedia Tbk",
      problem: "Analisis efektivitas pesan branding dalam kampanye digital GoFood Hemat untuk meningkatkan konversi audiens Gen-Z.",
      grantType: "Kedaireka",
      budget: "Rp 320.000.000",
      techStack: ["Audience Profiling", "Social Media Analytics", "Brand Message Strategy"],
      commercializationPotential: "Sangat Tinggi"
    },
    {
      id: "b2",
      company: "PT Unilever Indonesia Tbk",
      problem: "Evaluasi taktik narasi krisis lingkungan hidup dan manajemen reputasi publik pasca boikot produk di portal digital.",
      grantType: "Simlitabmas",
      budget: "Rp 180.000.000",
      techStack: ["Crisis Management", "Public Relations Strategy", "Content Analysis"],
      commercializationPotential: "Tinggi"
    },
    {
      id: "b3",
      company: "PT Telekomunikasi Selular (Telkomsel)",
      problem: "Kampanye adaptasi inklusi digital untuk mengedukasi kelompok lansia tentang keamanan transaksi digital finansial.",
      grantType: "Mandiri Corp",
      budget: "Rp 210.000.000",
      techStack: ["Community Relations", "Educational Video Advocacy", "Audience Mapping"],
      commercializationPotential: "Sedang"
    }
  ];

  // M6.2 & M4 Integration (Automated RA Recruiter Candidates pool)
  const raCandidates: StudentRACandidate[] = [
    { id: "ra-1", name: "Maya Sartika", gpa: 3.52, mod3SkillGapFit: "Sesuai (Paham Content Analysis)", mod4ArgumentDepth: 88, specialization: "Audience & Sentimen Analis", matchScore: 94 },
    { id: "ra-2", name: "Andi Prasetyo", gpa: 3.25, mod3SkillGapFit: "Sesuai (Kuasai Social Media Monitoring)", mod4ArgumentDepth: 81, specialization: "Digital Campaign Strategist", matchScore: 89 },
    { id: "ra-3", name: "Hendra Gunawan", gpa: 2.81, mod3SkillGapFit: "Cukup (Paham Adobe Creative Cloud)", mod4ArgumentDepth: 62, specialization: "Creative & Design Director", matchScore: 78 }
  ];

  const [selectedBriefId, setSelectedBriefId] = useState<string>("b1");
  const activeBrief = industryBriefs.find(b => b.id === selectedBriefId) || industryBriefs[0];
  const [recruitedList, setRecruitedList] = useState<string[]>([]);
  const [proposalDrafted, setProposalDrafted] = useState<boolean>(false);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "On Track":
      case "Hampir Selesai":
        return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-150";
      case "Perlu Review":
        return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-205";
      default:
        return "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-450 border border-rose-250 animate-pulse";
    }
  };

  const handleRecruitRA = (studentName: string) => {
    if (recruitedList.includes(studentName)) return;
    setRecruitedList(prev => [...prev, studentName]);
    alert(`Asisten Riset Direkrut: Ajakan kolaborasi beralas peta skill (Modul 3) & kualitas kognitif (Modul 4) dikirimkan ke email asrama & chat WA ${studentName}.`);
  };

  const handleDraftProposal = () => {
    setProposalDrafted(true);
    alert(`AI Proposal Generator: Proposal Hibah Riset Terapan ${activeBrief.grantType} bertajuk 'Penyelesaian Solusi R&D ${activeBrief.company}' berhasil disintesis sesuai format BKD & LPPM Kemendikbudristek!`);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-riset-root">
      
      {/* POV HIGHLIGHT BANNER */}
      <div className="bg-gradient-to-r from-violet-900/60 via-indigo-950/40 to-slate-900 p-5 rounded-2xl border border-violet-800/30 relative overflow-hidden shadow-md" id="riset-header">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award size={100} className="text-violet-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-500 text-white shadow-sm flex items-center gap-1">
              <Flame size={10} className="animate-pulse" /> DOSEN SEBAGAI RESEARCHER &amp; GRANT HUNTER
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1.5 font-sans tracking-tight">Market-Driven Applied Research &amp; RA Recruiting (Modul 6)</h2>
          <p className="text-xs text-slate-350 mt-1 leading-relaxed max-w-2xl">
            Tingkatkan nilai komersialisasi riset Anda dari sekadar &quot;menara gading&quot; akademik menjadi riset terapan bermitra industri. Saring proposal dana hibah (Kedaireka / Simlitabmas), rekrut mahasiswa bertumpu peta kompetensi objektif, dan selesaikan tantangan nyata.
          </p>
        </div>
      </div>

      {/* SECTION 7A — MY RESEARCH ACTIVITY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="my-research-metrics">
        
        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Paper Sedang Review (Scopus)</span>
          <strong className="text-3xl font-mono text-blue-600 block mt-1">2 Naskah</strong>
          <span className="text-[10px] text-slate-500 mt-1 block">Journal of Communication &amp; PR</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block font-bold">Paper Terbit (Tahun ini)</span>
          <strong className="text-3xl font-mono text-emerald-600 dark:text-emerald-400 block mt-1">1 Paper</strong>
          <span className="text-[10px] text-slate-500 mt-1 block">Sinta 2 Jurnal Kajian Media</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Bimbingan Tugas Akhir</span>
          <strong className="text-3xl font-mono text-amber-500 block mt-1">5 Mahasiswa</strong>
          <span className="text-[10px] text-slate-505 text-slate-500 mt-1 block">Mahasiswa Aktif Tingkat Akhir</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Dana R&amp;D Tersebar</span>
          <strong className="text-3xl font-mono text-blue-605 text-teal-500 block mt-1">Rp 500 jt</strong>
          <span className="text-[10px] text-slate-500 mt-1 block">Kumulatif Grant Terpakai</span>
        </div>

      </div>

      {/* NEW: M6.5 INDUSTRY DEMAND RESEARCH PORTAL (THE GRANT HUNTER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="industry-briefs-and-proposal-section">
        
        {/* Left Side: Briefs List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0D9488] flex items-center gap-1.5">
              <Globe size={16} /> Industry Demand Dashboard: Research Context (M6.5)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Pantau kendala R&amp;D rill yang sedang dihadapi sektor korporasi mitra minggu ini untuk merumuskan usulan proposal riset bernilai tinggi.</p>
          </div>

          <div className="space-y-3">
            {industryBriefs.map((brief) => (
              <div 
                key={brief.id}
                onClick={() => setSelectedBriefId(brief.id)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-start gap-4 ${
                  brief.id === selectedBriefId 
                    ? "bg-violet-600/10 border-violet-500 shadow-md scale-[1.005]" 
                    : isDarkMode
                      ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900"
                      : "bg-slate-50/60 border-slate-200/60 hover:bg-slate-100"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">{brief.company}</span>
                    <span className="text-[8px] px-1.5 py-0.2 bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 rounded font-black font-mono">
                      {brief.grantType}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-505 dark:text-slate-350 leading-relaxed font-semibold line-clamp-2">{brief.problem}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[8px] text-slate-400 block uppercase font-bold">POTENSI DANA</span>
                  <strong className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block">{brief.budget}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-violet-50/40 dark:bg-violet-950/10 border border-violet-150 dark:border-violet-900/35 rounded-xl space-y-3.5">
            <div className="flex md:items-center justify-between flex-col md:flex-row gap-3">
              <div>
                <span className="text-[9px] font-black uppercase text-violet-700 dark:text-violet-400 block tracking-widest flex items-center gap-1">
                  <Sparkle size={10} className="animate-spin-slow" /> FORMULA PROPOSAL HIBAH AI
                </span>
                <p className="text-[11px] text-slate-650 dark:text-slate-300 mt-1 font-semibold">
                  Judul Riset Sesuai Kebutuhan {activeBrief.company}:
                </p>
                <p className="text-xs font-black text-violet-705 dark:text-violet-100 font-serif italic mt-0.5">
                  &quot;Formulasi Strategi Komunikasi {activeBrief.techStack[0]} dan {activeBrief.techStack[1]} untuk Kasus R&amp;D {activeBrief.company}&quot;
                </p>
              </div>

              <button
                onClick={handleDraftProposal}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm transition-colors shrink-0 flex items-center justify-center gap-1.5 self-start"
              >
                <FileText size={13} />
                <span>Format Proposal LPPM</span>
              </button>
            </div>
            
            {proposalDrafted && (
              <div className="p-2.5 bg-emerald-500/10 text-[#059669] border border-emerald-500/30 rounded-lg text-[10px] font-mono flex items-center gap-2">
                <CheckCircle size={12} />
                <span>Dokumen Draf Proposal berhasil disintesis dan didaftarkan ke sistem SIMLITABMAS Kampus!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: M6.2 & M4 Automated RA Recruiter PANEL */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0D9488] flex items-center gap-1.5">
              <Users size={16} /> Automated RA Recruiter (M6.2 &amp; M4 Integration)
            </h3>
            <p className="text-[11px] text-slate-500">
              Saring dan rekrut asisten riset (Research Assistant) menggunakan peta kompetensi objektif (Modul 3) &amp; kedalaman menulis kritis (Modul 4), bukan sekadar IPK kertas.
            </p>
          </div>

          <div className="space-y-3 py-3" id="ra-recommenders-pool">
            <span className="text-[9.5px] text-slate-400 font-bold block uppercase tracking-wider">
              MAHASISWA DIREKOMENDASIKAN UNTUK PROYEK HIBAH INI:
            </span>

            {raCandidates.map((stud) => {
              const recruited = recruitedList.includes(stud.name);
              return (
                <div 
                  key={stud.id}
                  className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-205 dark:border-slate-800 rounded-xl space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-black text-[9px] flex items-center justify-center">
                        {stud.name.charAt(0)}
                      </span>
                      <div>
                        <strong className="text-xs font-black text-slate-800 dark:text-slate-100 block">{stud.name}</strong>
                        <span className="text-[8.5px] text-slate-400 font-bold">{stud.specialization}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-violet-650 dark:text-violet-400 font-mono">
                      Match: {stud.matchScore}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px] bg-white dark:bg-slate-950/40 p-2 rounded border border-slate-100 dark:border-slate-805 leading-relaxed font-semibold">
                    <div>
                      <span className="text-slate-400 block font-bold">Fokus Skill (M3):</span>
                      <span className="text-slate-650 dark:text-slate-350">{stud.mod3SkillGapFit}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Argument Depth (M4):</span>
                      <strong className="text-[#3b82f6]">{stud.mod4ArgumentDepth}/100 Score</strong>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/50 dark:border-slate-800/40 text-[9px]">
                    <span className="text-slate-400 font-bold">IPK Kertas: {stud.gpa}</span>
                    <button
                      onClick={() => handleRecruitRA(stud.name)}
                      disabled={recruited}
                      className={`px-2.5 py-1 rounded text-[8.5px] font-black cursor-pointer transition-colors ${
                        recruited 
                          ? "bg-emerald-500 text-white" 
                          : "bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
                      }`}
                    >
                      {recruited ? "Undangan Dikirim ✓" : "Saring & Rekrut RA"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 rounded-xl text-[9px] text-slate-400 leading-normal" id="pi-advisory-line">
            💡 <strong>Sistem Integritas:</strong> Menghindari prasangka akademik berlebih. Penyaringan beralaskan pencapaian tulisan terdalam (M4) membuktikan daya kritis riset asisten yang sesungguhnya.
          </div>
        </div>

      </div>

      {/* NEW: M6.3 INDUSTRY PROJECT BRIDGE PI MONITORING */}
      <div 
        className={`rounded-2xl border p-5 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
        }`}
        id="industry-project-bridge-monitoring"
      >
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0D9488] flex items-center gap-1.5">
              <Target size={16} /> M6.3 Industry Project Bridge (Principal Investigator Core)
            </h3>
            <p className="text-[11px] text-slate-500">Membimbing mahasiswa tingkat akhir untuk menyelesaikan tantangan R&amp;D korporat, mengubah luarannya menjadi portofolio mahasiswa sekaligus publikasi ilmiah dosen.</p>
          </div>
          <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase rounded">
            PI STATUS: ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <strong className="text-xs text-slate-800 dark:text-slate-100 font-black">Brief GoTo GoFood Campaign</strong>
                <span className="px-1.5 py-0.2 bg-teal-50 text-teal-700 text-[8.5px] font-bold rounded">Digital Campaign</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Grup Bimbingan Ilkom Kelompok 2 saat ini aktif merancang kampanye kreatif digital GoFood.</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[8.5px] text-slate-405 text-slate-400 font-bold uppercase block">KONVERSI LUARAN:</span>
              <div className="flex items-center gap-1.5 text-[9.5px]">
                <strong className="text-blue-500 font-bold block">✓ Portofolio Mahasiswa</strong>
                <strong className="text-emerald-500 font-bold block">✓ Draf Paper Sinta-2</strong>
              </div>
            </div>
            <button 
              onClick={() => alert("Asosiasi status BKD & publikasi jurnal berhasil diperbarui!")}
              className="w-full py-1.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-black rounded-lg cursor-pointer transition-colors"
            >
              Inspeksi Draft Publikasi Jurnal
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <strong className="text-xs text-slate-800 dark:text-slate-100 font-black">Brief Unilever Reputational Audit</strong>
                <span className="px-1.5 py-0.2 bg-rose-50 text-rose-700 text-[8.5px] font-bold rounded">Crisis PR</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Riset penanganan krisis reputasi lingkungan hidup oleh asuhan Hendra Gunawan. Sesuai dengan fokus karir spesialis Crisis PR.</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[8.5px] text-slate-400 font-bold uppercase block">KONVERSI LUARAN:</span>
              <div className="flex items-center gap-1.5 text-[9.5px]">
                <strong className="text-blue-500 font-bold block">✓ Komitmen Karir</strong>
                <strong className="text-emerald-500 font-bold block">✓ Buku Draft Ajar Dosen</strong>
              </div>
            </div>
            <button 
              onClick={() => alert("Asosiasi status BKD & publikasi jurnal berhasil diperbarui!")}
              className="w-full py-1.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-black rounded-lg cursor-pointer transition-colors"
            >
              Inspeksi Draft Publikasi Jurnal
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <strong className="text-xs text-slate-800 dark:text-slate-100 font-black">Brief Telkomsel Digital Inclusion</strong>
                <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 text-[8.5px] font-bold rounded">Community Relations</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-1">Program edukasi komunikasi publik literasi digital lansia. Maya Sartika berperan sebagai pimpinan asisten mahasiswa bimbingan.</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[8.5px] text-slate-400 font-bold uppercase block">KONVERSI LUARAN:</span>
              <div className="flex items-center gap-1.5 text-[9.5px]">
                <strong className="text-blue-500 font-bold block">✓ Rekomendasi Karir</strong>
                <strong className="text-emerald-500 font-bold block">✓ Draft Seminar Scopus</strong>
              </div>
            </div>
            <button 
              onClick={() => alert("Asosiasi status BKD & publikasi jurnal berhasil diperbarui!")}
              className="w-full py-1.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-black rounded-lg cursor-pointer transition-colors"
            >
              Inspeksi Draft Publikasi Jurnal
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 7B — STUDENT THESIS MONITORING */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
        }`}
        id="thesis-monitoring-table-panel"
      >
        <div className="pb-4 border-b border-slate-105 border-slate-150/40 dark:border-slate-800">
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Monitoring Kemajuan Tugas Akhir</h3>
          <p className="text-xs text-slate-500 mt-0.5">Pantau real-time dekomposisi militer bab skripsi mahasiswa secara ringkas.</p>
        </div>

        <div className="mt-6 overflow-x-auto min-w-0">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-150/40 dark:border-slate-800">
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px]">Nama Mahasiswa</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px]">Judul Tugas Akhir (TA)</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Progres Total</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Terakhir Update</th>
                <th className="py-2.5 font-black uppercase text-slate-400 text-[10px] text-center">Status Kelayakan</th>
              </tr>
            </thead>
            <tbody>
              {thesisStudents.map((th, idx) => (
                <tr 
                  key={idx}
                  className="border-b border-slate-150/20 dark:border-slate-800/40 hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-colors"
                >
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-100">{th.name}</td>
                  <td className="py-3 text-slate-500 max-w-[280px] truncate" title={th.title}>{th.title}</td>
                  
                  {/* Progress bar inside td */}
                  <td className="py-3 text-center min-w-[120px]">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${th.progress}%` }}></div>
                      </div>
                      <span className="font-mono text-[10px] font-bold">{th.progress}%</span>
                    </div>
                  </td>

                  <td className="py-3 text-center text-slate-400 font-mono text-[10px]">{th.lastUpdate}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase leading-none inline-block ${getStatusBadgeClass(th.status)}`}>
                      {th.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 7C — AI WRITING QUALITY REVIEW */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
        }`}
        id="ai-writing-review-panel"
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-150/40 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkle size={14} className="text-blue-500 animate-pulse" />
              <span>✨ Analisis Kualitas Argumen Akademis AI — Draft Terkini Hendra Gunawan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Penilai kematangan riset kognitif mahasiswa untuk mempercepat masa bimbingan tatap muka.</p>
          </div>

          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase rounded">
            ✨ AI Audit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          
          {/* Quality Circle Metric (62/100) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="relative w-24 h-24 rounded-full border-4 border-amber-500/20 flex flex-col items-center justify-center bg-amber-500/5">
              <span className="text-3xl font-black text-amber-600 font-mono">62</span>
              <span className="text-[10px] text-slate-400 font-bold font-mono">/ 100</span>
            </div>
            <strong className="text-xs font-bold text-amber-600 mt-3 block text-center">Kualitas Argumen: Cukup</strong>
            <p className="text-[10.5px] text-slate-400 text-center mt-1">Perlu perbaikan metodologi mendasar.</p>
          </div>

          {/* Details points */}
          <div className="md:col-span-9 space-y-4">
            
            <div className="space-y-2">
              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 font-black rounded text-[9px] uppercase tracking-wider block w-max">Kelebihan Metodologi</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ✓ Latar belakang masalah dinilai kokoh dan terperinci serta well-cited (28 referensi terdaftar).
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 text-rose-700 font-black rounded text-[9px] uppercase tracking-wider block w-max">Kelemahan & Koreksi Kritis</span>
              <p className="text-xs font-bold text-slate-705 dark:text-slate-300">
                ⚠ Jabaran metodologi belum seutuhnya menjelaskan tahapan validasi dataset yang representatif secara saintifik.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/20 text-blue-700 font-black rounded text-[9px] uppercase tracking-wider block w-max">Saran Formula AI</span>
              <p className="text-xs leading-relaxed text-slate-705 dark:text-slate-300 font-semibold italic">
                &quot;Tambahkan seksi khusus yang menguraikan kerangka semiotika Roland Barthes secara runtut pada bab analisis denotasi-konotasi iklan YouTube untuk meredam interpretasi subjektif.&quot;
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert("Ulasan kualitas asisten AI berhasil dikreditkan ke draf chat online Hendra Gunawan!")}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Send size={14} />
                <span>Kirim Feedback Penilaian ke Mahasiswa</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
