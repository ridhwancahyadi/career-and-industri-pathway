import React, { useState } from "react";
import { 
  AlertTriangle, 
  User, 
  MessageSquare, 
  Clock, 
  Sparkle, 
  CheckCircle,
  HelpCircle,
  ArrowUpRight,
  FolderSync,
  Mail,
  UserCheck,
  Building2,
  ListFilter,
  Plus
} from "lucide-react";

interface AcademicPeringatanProps {
  isDarkMode: boolean;
  onNavigate?: (tab: string) => void;
}

interface AtRiskStudent {
  id: string;
  name: string;
  course: string;
  semester: number;
  riskLevel: "TINGGI" | "SEDANG" | "RENDAH";
  signals: string[];
  industriPilihan: string; 
  insightGeneral: string;
  insightKhusus: string;
}

export default function AcademicPeringatan({ isDarkMode, onNavigate }: AcademicPeringatanProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("SEMUA");
  const [students, setStudents] = useState<AtRiskStudent[]>([
    {
      id: "risk-1",
      name: "Arif Maulana",
      course: "Humas Korporat & Krisis (Kelas B)",
      semester: 5,
      riskLevel: "TINGGI",
      signals: [
        "📉 Penyerahan draf solusi krisis terlampaui batas waktu",
        "⏰ Ketidakhadiran bimbingan praktis 3x berturut",
        "💬 Belum aktif berkonsultasi di forum AI Coach"
      ],
      industriPilihan: "FMCG & Corporate Relations",
      insightGeneral: "Mahasiswa di angkatan Kelas B masih beradaptasi dengan penyusunan draf mitigasi isu real-time yang ketat. Dinamika kelas secara statistik memerlukan pembekalan manajemen tenggat waktu pengerjaan.",
      insightKhusus: "Sangat direkomendasikan memberi bimbingan tambahan terkait draf komunikasi ESG (Lingkungan & Sosial). Mahasiswa memiliki penguasaan konsep yang orisinal, namun membutuhkan stimulus bimbingan agar pengerjaan draf rilis pers lebih terstruktur waktu."
    },
    {
      id: "risk-2",
      name: "Dewi Kusuma",
      course: "Humas Korporat & Krisis (Kelas B)",
      semester: 5,
      riskLevel: "SEDANG",
      signals: [
        "📚 Teoretis sangat kuat namun ragu mengaplikasikan tools digital",
        "📋 Evaluasi taktis krisis belum tuntas disinkronkan"
      ],
      industriPilihan: "International Digital PR Agency",
      insightGeneral: "Secara umum, tingkat pemahaman teori komunikasi interpersonal mahasiswa sangat matang. Kendala utama terletak pada kecemasan transisi menggunakan tools visual modern.",
      insightKhusus: "Guna menunjang impian berkarir di agensi global, dorong mahasiswa berpartner aktif dalam peer study group dengan asisten dosen untuk mengupas Brand24. Rasa percaya dirinya akan tumbuh pesat begitu ia terbiasa memegang dashboard analitik sentimen."
    },
    {
      id: "risk-3",
      name: "Eko Prasetya",
      course: "Humas Korporat & Krisis (Kelas B)",
      semester: 5,
      riskLevel: "SEDANG",
      signals: [
        "📊 Presensi kuliah kualitatif di bawah 78%",
        "📉 Skor uji formatif analisis sentimen khalayak perlu pengulangan"
      ],
      industriPilihan: "Pemerintahan & BUMN Relations",
      insightGeneral: "Secara statistik prodi, penurunan kehadiran jam pagi disebabkan oleh kesibukan organisasi kemahasiswaan himpunan atau komitmen magang mandiri di luar kampus.",
      insightKhusus: "Sebagai pengajar, kita dapat mendukung mahasiswa menyinkronkan aktivitas eksternalnya agar tidak berbenturan dengan perkuliahan. Karir humas pemerintahan membutuhkan stabilitas kepatuhan regulasi akademik."
    },
    {
      id: "risk-4",
      name: "Sinta Rahmawati",
      course: "Analitik Media Sosial & Big Data (Kelas A)",
      semester: 5,
      riskLevel: "SEDANG",
      signals: [
        "💻 Memerlukan review mandiri lanjut pada model pemetaan khalayak"
      ],
      industriPilihan: "Tech Startup & Growth Marketing",
      insightGeneral: "Mayoritas mahasiswa kelas A membutuhkan bimbingan intensif dalam mengomparasikan data sentimen positif vs negatif di ekosistem digital multi-platform.",
      insightKhusus: "Mahasiswa ini menunjukkan inisiatif tinggi untuk mengulik data. Bantu arahkan ia menggunakan studi kasus rilis kampanye GoTo pada asisten praktikum ruang lab guna melatih kecepatan parsing big data media sosial."
    },
    {
      id: "risk-5",
      name: "Rizki Ananda",
      course: "Riset Khalayak & Media (Kelas C)",
      semester: 5,
      riskLevel: "RENDAH",
      signals: [
        "📉 Penyesuaian minor metode penentuan uji kuesioner Likert"
      ],
      industriPilihan: "Humas Kampus & Pendidikan (UNESA)",
      insightGeneral: "Secara kolektif, Kelas C menunjukkan tingkat penyelesaian draf bab metodologi riset yang tepat waktu. Hanya terjadi penyesuaian skala variabel secara berkala.",
      insightKhusus: "Optimalkan pemahaman riset mahasiswa dengan menyodorkan ulasan pembahasan jurnal internal Humas UNESA. Keuletan belajarnya sangat baik dan berpotensi lulus dengan pujian (Cum Laude)."
    }
  ]);

  const [consultationsScheduled, setConsultationsScheduled] = useState<Record<string, boolean>>({});
  const [customIndustryInput, setCustomIndustryInput] = useState<Record<string, string>>({});

  const handleScheduleConsultation = (studentId: string, name: string) => {
    setConsultationsScheduled(prev => ({ ...prev, [studentId]: true }));
    alert(`📅 Undangan konsultasi privat tatap muka telah terkirim secara resmi ke Portal Mahasiswa ${name}!`);
  };

  const handleSendMessage = (name: string) => {
    const text = prompt(`Tulis pesan langsung (DM) ke ${name} lewat sistem internal ACIP:`, `Halo ${name}, Ibu melihat ada beberapa kendala progres di kelas akhir-akhir ini. Bisakah kita meluangkan waktu berdiskusi?`);
    if (text) alert(`Pesan berhasil dikirim langsung ke platform chat ${name}.`);
  };

  // Allows dynamic industry update so the student can customize or add custom industry
  const updateIndustry = (studentId: string, newIndustry: string) => {
    if (!newIndustry.trim()) return;
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          industriPilihan: newIndustry,
          insightKhusus: `Disesuaikan untuk target Karir **${newIndustry}**: Agar memiliki daya saing tinggi, arahkan mahasiswa menyertakan studi kasus riil ${newIndustry} ke draf portfolio tugas akhirnya. Beri masukan teoretis pilar representatif komunikasi yang relevan untuk memperkuat portofolio.`
        };
      }
      return s;
    }));
  };

  const filteredStudents = selectedFilter === "SEMUA" 
    ? students 
    : students.filter(s => s.course.includes(selectedFilter));

  return (
    <div className="space-y-6 animate-fade-in" id="academic-peringatan-root">
      
      {/* Header */}
      <div id="ew-header">
        <h2 className="text-xl font-black tracking-tight" id="ew-title">⚠️ EWS (Early Warning System) Bimbingan &amp; Asistensi Akademik</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Deteksi otomatis kebutuhan asistensi mahasiswa guna mendampingi capaian kompetensi secara non-judgmental, inklusif, dan adaptif berbasis target minat industri kerja lulusan.
        </p>
      </div>

      {/* RISK SUMMARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="risk-metric-cards-row">
        
        {/* Card 1 - High Risk */}
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider block">Asistensi Tingkat Tinggi</span>
            <strong className="text-3xl font-black text-rose-700 dark:text-rose-450 mt-1 block">1 Mahasiswa</strong>
            <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-bold">
              <span>Perlu pendampingan draf isu eksternal</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xl font-bold">
            ⚠️
          </div>
        </div>

        {/* Card 2 - Medium Risk */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block">Asistensi Tingkat Sedang</span>
            <strong className="text-3xl font-black text-amber-700 dark:text-amber-400 mt-1 block">3 Mahasiswa</strong>
            <span className="text-[10px] text-amber-600 mt-1 flex items-center gap-1 font-bold">
              <span>Pendampingan pemakaian tools &amp; riset</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
        </div>

        {/* Card 3 - Low Risk */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/45 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider block">Capaian Kompetensi Optimal</span>
            <strong className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1 block">1 Mahasiswa</strong>
            <span className="text-[10px] text-emerald-650 mt-1 flex items-center gap-1 font-bold">
              <span>Siap dilepas magang industri</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl font-bold">
            ✓
          </div>
        </div>

      </div>

      {/* FILTER AND STUDENT GROUP */}
      <div 
        className={`rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
          isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
        }`}
        id="at-risk-list-panel"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider">
              Daftar Pendampingan Belajar Mahasiswa Ilmu Komunikasi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Pantau capaian akademis dan dukung impian karir mahasiswa tanpa menjudge kelemahan mereka.</p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 text-xs font-bold" id="early-warning-filter-pills">
            {["SEMUA", "Humas", "Analitik", "Riset"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  selectedFilter === opt 
                    ? "bg-teal-650 text-white border-teal-500" 
                    : isDarkMode
                      ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-350"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {opt === "SEMUA" ? "Semua Kelas" : opt === "Humas" ? "Humas Korporat" : opt === "Analitik" ? "Analitik Medsos" : "Riset Khalayak"}
              </button>
            ))}
          </div>
        </div>

        {/* List of Student Cards with custom industry inputs */}
        <div className="mt-6 space-y-5" id="at-risk-cards-group">
          {filteredStudents.map((st) => {
            const isHigh = st.riskLevel === "TINGGI";
            const isMedium = st.riskLevel === "SEDANG";
            const isScheduled = consultationsScheduled[st.id];

            return (
              <div
                key={st.id}
                className={`rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isHigh 
                    ? "border-l-4 border-l-rose-500" 
                    : isMedium 
                      ? "border-l-4 border-l-amber-500" 
                      : "border-l-4 border-l-emerald-500"
                } ${
                  isDarkMode ? "bg-slate-900/20 border-slate-800" : "bg-slate-50/50 border-slate-200"
                }`}
                id={`student-alert-card-${st.id}`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-base font-black text-slate-900 dark:text-zinc-100">{st.name}</strong>
                      <span className={`px-2 py-0.5 text-[8px] font-black rounded-full ${
                        isHigh 
                          ? "bg-rose-100 text-rose-700" 
                          : isMedium 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {isHigh ? "REKOMENDASI INTENSIF" : isMedium ? "REKOMENDASI BERKALA" : "SIAP MAGANG MANDIRI"}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-bold block mt-1">{st.course} • Semester {st.semester}</span>
                  </div>

                  {/* Signals in badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {st.signals.map((sig, iIndex) => (
                      <span 
                        key={iIndex} 
                        className="px-2.5 py-1 bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-800 rounded-lg text-[9px] font-bold text-slate-700 dark:text-slate-350"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC INDUSTRI PILIHAN PANEL */}
                <div className="mt-4 p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <span className="text-[10px] font-black text-slate-600 block uppercase tracking-wide">
                      💼 Industri Impian / Target Magang Mahasiswa:
                    </span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-150 rounded text-[9px] font-black inline-block">
                      {st.industriPilihan}
                    </span>
                  </div>
                  
                  {/* Interactive field allowing student or lecturer to add new custom target industry */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Ubah atau tambahkan industri baru..."
                      value={customIndustryInput[st.id] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomIndustryInput(prev => ({ ...prev, [st.id]: val }));
                      }}
                      className="flex-1 px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-lg text-[10.5px] text-slate-800 dark:text-slate-100 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedIndustry = customIndustryInput[st.id];
                        if (updatedIndustry && updatedIndustry.trim()) {
                          updateIndustry(st.id, updatedIndustry);
                          setCustomIndustryInput(prev => ({ ...prev, [st.id]: "" }));
                        }
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:border-slate-400 border border-slate-200 text-[10px] font-black rounded-lg cursor-pointer flex items-center gap-1 transition-all"
                    >
                      <Plus size={12} /> Perbarui
                    </button>
                  </div>
                </div>

                {/* DOUBLE DOSEN POV INSIGHT PANEL - Made Bold, High Contrast & Highly Prominent */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* General Insight (Sourced from cohort trends) */}
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-200/80 shadow-inner">
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[9.5px] font-black rounded uppercase inline-block mb-2 tracking-wide font-mono">
                      📢 POV DOSEN: INSIGHT GENERAL (UMUM COHORT)
                    </span>
                    <p className="font-extrabold text-slate-800 dark:text-slate-100 text-[12px] md:text-[13px] leading-relaxed mt-1">
                      {st.insightGeneral}
                    </p>
                    <span className="text-[9px] text-blue-500 font-bold mt-2 block">💡 Rekomendasi tindakan kolektif: Selaraskan modul praktikum mingguan di kelas bersangkutan.</span>
                  </div>

                  {/* Specific Insight - Highly supportive, completely non-judgmental */}
                  <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border-2 border-teal-200/80 shadow-inner">
                    <span className="px-2 py-0.5 bg-teal-600 text-white text-[9.5px] font-black rounded uppercase inline-block mb-2 tracking-wide font-mono">
                      🎯 POV DOSEN: INSIGHT KHUSUS (INDIVIDUAL MAHASISWA)
                    </span>
                    <p className="font-extrabold text-slate-800 dark:text-indigo-100 text-[12px] md:text-[13px] leading-relaxed mt-1">
                      {st.insightKhusus}
                    </p>
                    <span className="text-[9px] text-teal-600 font-bold mt-2 block">✨ Pendekatan individual: Fokus pada bimbingan humanis serta pendampingan portofolio strategis.</span>
                  </div>

                </div>

                {/* Actions button strip */}
                <div className="mt-4 pt-4 border-t border-slate-100/10 flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => handleScheduleConsultation(st.id, st.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-colors flex items-center gap-1.5 ${
                      isScheduled 
                        ? "bg-emerald-600 text-white" 
                        : "bg-teal-600 hover:bg-teal-500 text-white shadow-sm"
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>{isScheduled ? "Undangan Terkirim ✓" : "Jadwalkan Konsultasi"}</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage(st.name)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer bg-white dark:bg-slate-900 border-slate-200 text-slate-755 hover:bg-slate-100 text-slate-700"
                    title="Kirim pesan langsung/DM"
                  >
                    <Mail size={14} className="inline mr-1" />
                    <span>Kirim Pesan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
