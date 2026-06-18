import React, { useState } from "react";
import { 
  Check, 
  X, 
  Sparkle, 
  FileText, 
  ChevronRight, 
  MessageSquare, 
  AlertCircle,
  Clock,
  ThumbsUp,
  UserCheck
} from "lucide-react";

interface AcademicPenilaianProps {
  isDarkMode: boolean;
}

interface Submission {
  id: string;
  studentName: string;
  initials: string;
  avatarColor: string;
  course: string;
  assignment: string;
  aiScore: number;
  status: "Menunggu Review" | "Disetujui";
  timeText: string;
  essayText: string;
  criteria: { name: string; score: number; max: number }[];
  aiReasoning: string;
}

export default function AcademicPenilaian({ isDarkMode }: AcademicPenilaianProps) {
  const submissionsData: Submission[] = [
    {
      id: "sub-1",
      studentName: "Budi Santoso",
      initials: "BS",
      avatarColor: "bg-blue-500",
      course: "Humas Korporat & Krisis",
      assignment: "Tugas 3 — Penyusunan Crisis PR Simulation Protocol",
      aiScore: 82,
      status: "Menunggu Review",
      timeText: "3 jam lalu",
      criteria: [
        { name: "Kejelasan Mitigasi Isu", score: 28, max: 35 },
        { name: "Alur Komunikasi Siaran Darurat", score: 31, max: 35 },
        { name: "Analisis Audiens Terdampak", score: 23, max: 30 }
      ],
      aiReasoning: "Analisis resolusi krisis sudah jelas dan menggunakan taktik proaktif. Siaran pers terstruktur dengan baik namun keterbukaan respon juru bicara bisa diperjelas di simulasi. Matriks penanganan hoaks belum didefinisikan secara komprehensif.",
      essayText: "Crisis protocol ini dirancang untuk menangani potensi isu kebocoran data pengguna digital. Langkah pertama adalah pembentukan tim tanggap darurat (Crisis Room) dalam 12 jam pertama, pemilihan spokesperson, dan penyiapan siaran pers klarifikasi awal. Alur komunikasi dirancang secara berjenjang antar divisi."
    },
    {
      id: "sub-2",
      studentName: "Dian Pramesti",
      initials: "DP",
      avatarColor: "bg-emerald-500",
      course: "Analitik Media Sosial & Big Data",
      assignment: "Tugas 2 — Laporan Analisis Sentimen Jejaring Media Sosial",
      aiScore: 94,
      status: "Menunggu Review",
      timeText: "5 jam lalu",
      criteria: [
        { name: "Struktur Data & Key metrics", score: 38, max: 40 },
        { name: "Visualisasi Media Listening", score: 28, max: 30 },
        { name: "Rekomendasi Konten Strategis", score: 28, max: 30 }
      ],
      aiReasoning: "Sangat komprehensif. Penggunaan matriks sentimen (positif/negatif/netral) sangat baik didukung dengan grafik trend mingguan. Rekomendasi taktis branding sangat relevan dengan pola engagement netizen.",
      essayText: "Analisis sentimen dilakukan dengan monitoring kata kunci reputasi di TikTok dan Twitter. Dari 4.200 sebutan, 65% bernada netral-positif dengan sebaran keterlibatan tertinggi pada konten video edukasi interaktif."
    },
    {
      id: "sub-3",
      studentName: "Fajar Septian",
      initials: "FS",
      avatarColor: "bg-teal-500",
      course: "Humas Korporat & Krisis",
      assignment: "Tugas 3 — Penyusunan Crisis PR Simulation Protocol",
      aiScore: 76,
      status: "Menunggu Review",
      timeText: "1 hari lalu",
      criteria: [
        { name: "Kejelasan Mitigasi Isu", score: 24, max: 35 },
        { name: "Alur Komunikasi Siaran Darurat", score: 26, max: 35 },
        { name: "Analisis Audiens Terdampak", score: 26, max: 30 }
      ],
      aiReasoning: "Identifikasi risiko komunikasi kurang spesifik, banyak tumpang tindih antara krisis operasional dan reputasi media.",
      essayText: "Protokol krisis ini merujuk pada penyiapan rilis pers singkat yang diunggah ke Instagram Story. Kami menyarankan untuk menunggu sampai situasi benar-benar mereda dengan sendirinya agar netizen tidak terpancing."
    },
    {
      id: "sub-4",
      studentName: "Ayu Wulandari",
      initials: "AW",
      avatarColor: "bg-purple-500",
      course: "Riset Khalayak & Media",
      assignment: "Kuis 1 — Penyusunan Skema Kuesioner Survey Khalayak",
      aiScore: 80,
      status: "Disetujui",
      timeText: "2 hari lalu",
      criteria: [
        { name: "Skala Pengukuran (Likert)", score: 40, max: 50 },
        { name: "Validitas Konstruk Pertanyaan", score: 40, max: 50 }
      ],
      aiReasoning: "Metodologi survey kuantitatif dipahami dengan baik. Validitas konstruk didukung teori komunikasi massa yang valid.",
      essayText: "Skema kuesioner dirancang mengukur perilaku konsumsi berita digital mahasiswa UNESA di era disinformasi politik. Menggunakan skala interval 1-5 dengan instrumen validitas reliabilitas teruji."
    },
    {
      id: "sub-5",
      studentName: "Arif Maulana",
      initials: "AM",
      avatarColor: "bg-rose-500",
      course: "Humas Korporat & Krisis",
      assignment: "Tugas 3 — Penyusunan Crisis PR Simulation Protocol",
      aiScore: 54,
      status: "Menunggu Review",
      timeText: "2 hari lalu",
      criteria: [
        { name: "Kejelasan Mitigasi Isu", score: 18, max: 35 },
        { name: "Alur Komunikasi Siaran Darurat", score: 18, max: 35 },
        { name: "Analisis Audiens Terdampak", score: 18, max: 30 }
      ],
      aiReasoning: "Jawaban sangat pendek. Langkah mitigasi krisis tidak dibahas mendalam, hanya menyarankan membuat posting klarifikasi singkat tanpa struktur penanganan reputasi yang sistemis.",
      essayText: "Mitigasinya adalah mengirim rilis pers singkat secara tergesa-gesa atau membuat reels Instagram klarifikasi 15 detik agar netizen tahu kami telah berupaya melakukan perbaikan seadanya."
    }
  ];

  const [submissions, setSubmissions] = useState<Submission[]>(submissionsData);
  const [selectedSubId, setSelectedSubId] = useState<string>("sub-1");
  const selectedSub = submissions.find(s => s.id === selectedSubId) || submissions[0];

  // Manual feedback state
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [customScore, setCustomScore] = useState<number>(selectedSub.aiScore);

  // Sync state when selection changes
  React.useEffect(() => {
    setFeedbackText("");
    setCustomScore(selectedSub.aiScore);
  }, [selectedSubId]);

  // Pre-written AI feedback templates
  const feedbackTemplates = [
    "Lengkapi analisis audiens terdampak secara spesifik →",
    "Perjelas draf siaran pers agar sesuai kaidah piramida terbalik jurnalistik →",
    "Tambahkan taktik program mitigasi isu (manajemen hoaks eksternal) →"
  ];

  const handleApplyTemplate = (tpl: string) => {
    const rawText = tpl.replace(" →", "");
    if (feedbackText.includes(rawText)) return;
    setFeedbackText(prev => prev ? `${prev}\n- ${rawText}` : `- ${rawText}`);
  };

  const handleApprove = () => {
    alert(`Nilai ${customScore}/100 dan umpan balik berhasil dipublikasikan untuk ${selectedSub.studentName}!`);
    setSubmissions(prev => 
      prev.map(s => s.id === selectedSub.id ? { ...s, status: "Disetujui", aiScore: customScore } : s)
    );
  };

  const handleReject = () => {
    const manualGrade = prompt("Masukkan nilai manual baru untuk mahasiswa ini:", selectedSub.aiScore.toString());
    if (manualGrade) {
      const parsedNum = parseInt(manualGrade);
      if (!isNaN(parsedNum)) {
        setCustomScore(parsedNum);
        alert(`Skor AI ditolak. Nilai disesuaikan ke ${parsedNum}/100 secara manual.`);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-penilaian-root">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight">📋 Penilaian AI (AI-Assisted Grading Center)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Review esai hasil analisis mahasiswa secara cerdas dibantu mesin penilai otomatis berbasis rubrik standar kelulusan mata kuliah.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* LEFT PANEL — Submission Queue (width: 280-320px) */}
        <div className="w-full xl:w-80 shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Antrian Penilaian ({submissions.length})</h3>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold px-2 py-0.5 rounded-full">
              7 pending
            </span>
          </div>

          <div 
            className={`rounded-2xl border p-4 max-h-[640px] overflow-y-auto space-y-3 shadow-sm ${
              isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
            }`}
            id="submission-queue-list"
          >
            {submissions.map((sub) => {
              const isSelected = sub.id === selectedSubId;
              const isApproved = sub.status === "Disetujui";
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex gap-3 relative overflow-hidden ${
                    isSelected 
                      ? "bg-blue-600/10 border-blue-500 shadow-md scale-[1.01]" 
                      : isDarkMode
                        ? "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900" 
                        : "bg-slate-50/60 border-slate-200/50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  id={`queue-item-${sub.id}`}
                >
                  {/* Left border accent */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                    isApproved ? "bg-emerald-500" : "bg-amber-500"
                  }`} />

                  {/* Initials Avatar */}
                  <div className={`w-9 h-9 rounded-full ${sub.avatarColor} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                    {sub.initials}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold block truncate">{sub.studentName}</strong>
                      <span className="text-[9px] text-slate-400 font-mono">{sub.timeText}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                      <span>{sub.course}</span>
                      <span>•</span>
                      <span className="truncate">{sub.assignment}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-[9px] font-extrabold uppercase rounded px-1.5 py-0.5 ${
                        isApproved 
                          ? "bg-emerald-500/10 text-emerald-500" 
                          : "bg-amber-500/10 text-amber-500 animate-pulse"
                      }`}>
                        {sub.status}
                      </span>
                      <span className="text-[11px] font-mono font-black text-blue-500">
                        {sub.aiScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL — Grading Interface */}
        <div className="flex-1 space-y-6">
          
          {/* Assignment header detail */}
          <div 
            className={`rounded-2xl border p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm ${
              isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
            }`}
            id="submission-detail-header"
          >
            <div>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 rounded block w-max">
                {selectedSub.course}
              </span>
              <h3 className="text-base font-black tracking-tight mt-1.5">{selectedSub.assignment}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                <span>Mahasiswa: <strong>{selectedSub.studentName}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={13} /> Dikirim {selectedSub.timeText}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Status Kelayakan:</span>
              <span className="px-2 py-1 bg-green-50 dark:bg-emerald-950/20 text-emerald-600 font-bold rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                Lolos Plagiarisme (9%)
              </span>
            </div>
          </div>

          {/* AI SCORING SUMMARY (blue-50 card equivalent) */}
          <div 
            className={`rounded-2xl border p-5 space-y-4 border-l-4 border-l-blue-500 shadow-sm ${
              isDarkMode 
                ? "bg-blue-950/10 border-blue-900/40" 
                : "bg-blue-50/70 border-blue-200"
            }`}
            id="ai-grading-summary-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black">
                <Sparkle size={16} className="text-blue-500" />
                <span>✨ Ulasan & Rekomendasi Skor AI</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-black uppercase rounded">
                Asisten AI Penilai
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              
              {/* Circular indicator style representation */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative w-24 h-24 rounded-full border-4 border-blue-500/20 flex flex-col items-center justify-center bg-blue-600/5">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">{selectedSub.aiScore}</span>
                  <span className="text-[10px] text-slate-400 font-bold">/ 100</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-blue-800 dark:text-blue-300">Rekomendasi Skor</h4>
                  <p className="text-[11px] text-slate-500 max-w-[150px] leading-relaxed">Menunggu verifikasi mandiri dari dosen sebelum dipublikasikan.</p>
                </div>
              </div>

              {/* Score Breakdown Table */}
              <div className="flex-1 w-full space-y-2.5">
                {selectedSub.criteria.map((cr, cIdx) => (
                  <div key={cIdx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-650 dark:text-slate-400 font-medium">{cr.name}</span>
                      <strong className="text-blue-500">{cr.score} <span className="text-slate-400">/ {cr.max}</span></strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${(cr.score / cr.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* AI Reasoning */}
            <div className="pt-3 border-t border-blue-200/50 dark:border-blue-900/30 text-xs text-blue-900 dark:text-blue-300 leading-relaxed font-semibold italic border-l-2 border-blue-500 pl-3">
              &quot;{selectedSub.aiReasoning}&quot;
            </div>
          </div>

          {/* ESSAY PREVIEW (scrollable text area) */}
          <div 
            className={`rounded-2xl border p-5 space-y-3 shadow-sm ${
              isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
            }`}
            id="essay-content-preview"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Konten Esai Mahasiswa</h4>
              <span className="text-[10px] text-slate-500 font-mono">312 Kata Terdeteksi</span>
            </div>

            <div className="max-h-56 overflow-y-auto text-xs leading-relaxed space-y-3 p-3 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl whitespace-pre-line border border-slate-100 dark:border-slate-800">
              {selectedSub.essayText}
              <div className="p-2 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20 text-[10px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span><strong>Catatan AI:</strong> Mahasiswa belum banyak melampirkan instrumen stakeholder skunder pada bab penutup. Hal ini mengurangi nilai orisinalitas analisis.</span>
              </div>
            </div>
          </div>

          {/* FEEDBACK TEMPLATES */}
          <div className="space-y-3" id="ai-templates-section">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkle size={14} className="text-blue-500 animate-pulse" />
              <span>Saran Kalimat Umpan Balis Otomatis AI</span>
            </h4>
            <div className="flex flex-col gap-2">
              {feedbackTemplates.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyTemplate(tpl)}
                  className={`p-2.5 rounded-xl border text-left text-xs text-slate-700 dark:text-slate-300 font-medium transition-all hover:scale-[1.005] hover:border-blue-300 cursor-pointer ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          {/* FEEDBACK TEXT AREA */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">Umpan Balik Akademik (Dosen)</label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tulis umpan balik komprehensif untuk mahasiswa ini, atau klik template asisten AI di atas untuk menyisipkan otomatis..."
              rows={4}
              className={`w-full text-xs p-3 rounded-xl border outline-none leading-relaxed font-sans ${
                isDarkMode ? "bg-[#090e1b] border-[#1e293b] text-slate-100 focus:border-blue-500" : "bg-white border-slate-205 text-slate-800 focus:border-blue-500"
              }`}
            />
          </div>

          {/* ACTION ROW (bottom of right panel) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Sesuaikan Nilai Akhir:</span>
              <input
                type="number"
                value={customScore}
                onChange={(e) => setCustomScore(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className={`w-16 p-2 rounded-xl text-center border font-mono font-black text-sm ${
                  isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
                }`}
                max={100}
                min={0}
              />
              <span className="text-slate-400 text-xs">/ 100</span>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 text-rose-500 hover:bg-slate-800" 
                    : "bg-white border-slate-200 text-rose-700 hover:bg-slate-50"
                }`}
              >
                Tolak Skor AI
              </button>

              <button
                onClick={handleApprove}
                className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <UserCheck size={14} />
                <span>Setujui & Publikasikan Nilai</span>
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 font-medium">
            💡 <strong>Disclaimer:</strong> Keputusan akhir kelulusan sepenuhnya berada under kendali Dr. Siti. Rekomendasi skor AI murni alat bantu peraba rubrik pertama.
          </p>

        </div>

      </div>

    </div>
  );
}
