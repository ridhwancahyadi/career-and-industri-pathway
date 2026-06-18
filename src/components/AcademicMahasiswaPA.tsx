import React, { useState } from "react";
import { 
  Users, 
  AlertTriangle, 
  Clock, 
  Sparkle, 
  TrendingDown, 
  TrendingUp,
  User, 
  ChevronRight, 
  CheckCircle,
  FileText,
  MessageSquare,
  ShieldAlert,
  Calendar,
  BookOpen,
  Calculator,
  Briefcase,
  Zap,
  Check,
  Award
} from "lucide-react";

interface AcademicMahasiswaPAProps {
  isDarkMode: boolean;
}

interface StudentPA {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  semester: number;
  ipk: number;
  status: "Aman" | "Perhatian" | "Kritis";
  lastMeeting: string;
  sksCount: number;
  attendance: number;
  aiTutorSess: number;
  targetSks: number;
  realSks: number;
  lateTasks: number;
  aiInsight: string;
  internshipStatus?: "Applied" | "In Progress" | "Completed" | "None";
  internshipCompany?: string;
  internshipRole?: string;
}

// SKS Conversion Program type
interface MBKMType {
  name: string;
  defaultSks: number;
  hoursRequired: number;
  regNo: string;
}

const mbkmPrograms: MBKMType[] = [
  { name: "Magang Industri Bersertifikat (MSIB)", defaultSks: 20, hoursRequired: 900, regNo: "No.81/M/KPT/2026" },
  { name: "Studi Independen Bersertifikat (SIB)", defaultSks: 18, hoursRequired: 810, regNo: "No.82/M/KPT/2026" },
  { name: "Kampus Mengajar Kemendikbud", defaultSks: 20, hoursRequired: 920, regNo: "No.14/M/KPT/2025" },
  { name: "Pertukaran Mahasiswa Merdeka (PMM)", defaultSks: 20, hoursRequired: 880, regNo: "No.40/M/KPT/2026" }
];

export default function AcademicMahasiswaPA({ isDarkMode }: AcademicMahasiswaPAProps) {
  const studentsPAData: StudentPA[] = [
    {
      id: "pa-1",
      name: "Nurul Hidayah",
      initials: "NH",
      avatarBg: "bg-rose-500",
      semester: 5,
      ipk: 2.41,
      status: "Kritis",
      lastMeeting: "6 minggu lalu",
      sksCount: 84,
      attendance: 71,
      aiTutorSess: 3,
      targetSks: 18,
      realSks: 15,
      lateTasks: 4,
      internshipStatus: "None",
      aiInsight: "Nurul menunjukkan penurunan IPK konsisten sejak Semester 3 (3.12 → 2.89 → 2.41). Pola akademik ini, dikombinasikan dengan sangat rendahnya tingkat keterlibatan di platform selama 3 minggu terakhir, mengindikasikan kemungkinan tingginya hambatan non-akademis (misal: faktor finansial / masalah keluarga). Sangat disarankan untuk memulai diskusi dengan pertanyaan empati terkait kondisi di luar perkuliahan sebelum membahas rencana studi secara kaku."
    },
    {
      id: "pa-2",
      name: "Reza Firmansyah",
      initials: "RF",
      avatarBg: "bg-blue-500",
      semester: 5,
      ipk: 3.67,
      status: "Aman",
      lastMeeting: "2 minggu lalu",
      sksCount: 92,
      attendance: 96,
      aiTutorSess: 28,
      targetSks: 22,
      realSks: 22,
      lateTasks: 0,
      internshipStatus: "In Progress",
      internshipCompany: "PT Telkomsel Indonesia",
      internshipRole: "Corporate Communication Specialist Intern",
      aiInsight: "Performa Reza luar biasa stabil di barisan depan prodi Ilmu Komunikasi. Aktif mengulas materi menggunakan asisten AI internal dan merupakan kandidat asisten laboratorium riset media & hubungan masyarakat."
    },
    {
      id: "pa-3",
      name: "Ayu Wulandari",
      initials: "AW",
      avatarBg: "bg-amber-500",
      semester: 3,
      ipk: 2.89,
      status: "Perhatian",
      lastMeeting: "1 bulan lalu",
      sksCount: 48,
      attendance: 84,
      aiTutorSess: 9,
      targetSks: 20,
      realSks: 18,
      lateTasks: 2,
      internshipStatus: "Applied",
      internshipCompany: "Dekoruma",
      internshipRole: "Creative Copywriter Apprentice",
      aiInsight: "Ayu sedang berada di masa adaptasi materi inti Penulisan Naskah Humas dan teori opini publik. Sedikit penurunan kognitif bisa ditanggulangi dengan program asisten klinik tutor sebaya."
    },
    {
      id: "pa-4",
      name: "Bima Prakoso",
      initials: "BP",
      avatarBg: "bg-emerald-500",
      semester: 7,
      ipk: 3.82,
      status: "Aman",
      lastMeeting: "3 minggu lalu",
      sksCount: 128,
      attendance: 98,
      aiTutorSess: 32,
      targetSks: 15,
      realSks: 15,
      lateTasks: 0,
      internshipStatus: "Completed",
      internshipCompany: "Gojek Tokopedia (GoTo Group)",
      internshipRole: "Public Relations Specialist Intern",
      aiInsight: "Bima sedang menyelesaikan persiapan tugas akhir bertema Komunikasi Krisis Media Sosial. Karir readiness index sangat tinggi, sudah diproyeksikan match dengan 5 tawaran posisi PR di startup nasional."
    },
    {
      id: "pa-5",
      name: "Fajar Septian",
      initials: "FS",
      avatarBg: "bg-purple-500",
      semester: 3,
      ipk: 3.21,
      status: "Aman",
      lastMeeting: "2 minggu lalu",
      sksCount: 52,
      attendance: 90,
      aiTutorSess: 15,
      targetSks: 20,
      realSks: 20,
      lateTasks: 1,
      internshipStatus: "None",
      aiInsight: "Fajar berprogres dalam rentang kurva normal kelas semester 3. Keterampilan berbicara publik (Public Speaking) masih berkembang stabil untuk mata kuliah teknik negosiasi."
    },
    {
      id: "pa-6",
      name: "Citra Maharani",
      initials: "CM",
      avatarBg: "bg-pink-500",
      semester: 5,
      ipk: 3.54,
      status: "Aman",
      lastMeeting: "1 minggu lalu",
      sksCount: 90,
      attendance: 95,
      aiTutorSess: 21,
      targetSks: 21,
      realSks: 21,
      lateTasks: 0,
      internshipStatus: "In Progress",
      internshipCompany: "Shopee Indonesia",
      internshipRole: "Digital Campaign Strategist Assistant",
      aiInsight: "Citra membuktikan efikasi pemahaman matang pada materi analisis khalayak digital. Menjabat kepemimpinan aktif di Himpunan Mahasiswa Ilmu Komunikasi (HIMAKOM) tanpa mengorbankan IKU-2 pribadinya."
    },
    {
      id: "pa-7",
      name: "Rizal Hakim",
      initials: "RH",
      avatarBg: "bg-orange-500",
      semester: 7,
      ipk: 2.73,
      status: "Perhatian",
      lastMeeting: "5 minggu lalu",
      sksCount: 114,
      attendance: 78,
      aiTutorSess: 6,
      targetSks: 18,
      realSks: 14,
      lateTasks: 3,
      internshipStatus: "Applied",
      internshipCompany: "PT Bank Danamon Tbk",
      internshipRole: "Internal Corporate Comms Liaison",
      aiInsight: "Rizal fokus mencari komitmen magang luar namun masih terkendala penyelesaian mata kuliah Penulisan Naskah Humas. Direkomendasikan melakukan re-planning skema belajar semester ini."
    },
    {
      id: "pa-8",
      name: "Indah Permata Sari",
      initials: "IP",
      avatarBg: "bg-teal-500",
      semester: 1,
      ipk: 3.10,
      status: "Aman",
      lastMeeting: "Baru mulai",
      sksCount: 20,
      attendance: 92,
      aiTutorSess: 10,
      targetSks: 20,
      realSks: 20,
      lateTasks: 0,
      internshipStatus: "None",
      aiInsight: "Indah sebagai maba menunjukkan kesiapan kuliah sangat handal. Aktif dalam interaksi laboratorium, disarankan terus dipertahankan ritmenya ke depan."
    }
  ];

  const [selectedStudentId, setSelectedStudentId] = useState<string>("pa-1");
  const activeStudent = studentsPAData.find(s => s.id === selectedStudentId) || studentsPAData[0];

  // BR-IM-03 SKS conversion calculator state
  const [selectedProgramIdx, setSelectedProgramIdx] = useState<number>(0);
  const selectedProg = mbkmPrograms[selectedProgramIdx];
  const [inputSks, setInputSks] = useState<number>(20);
  const [weeksServed, setWeeksServed] = useState<number>(18);
  const [conversionReport, setConversionReport] = useState<string>("");

  // M6.2 Aggregate - Syllabus adjustment feedback state
  const [silabusAdjusted, setSilabusAdjusted] = useState<boolean>(false);

  const calculateConversion = () => {
    const formulas = [
      "MK Kampanye Komunikasi CSR (3 SKS)",
      "MK Analitik Opini Publik (3 SKS)",
      "MK Praktik Kerja Kehumasan Industri (10 SKS)",
      "MK Media Listening & Sentiment (4 SKS)"
    ];
    
    const maxSks = selectedProg.defaultSks;
    const computedSks = Math.min(maxSks, Math.round((weeksServed / 18) * maxSks));
    
    setConversionReport(
      `✓ Kalkulasi Sukses beralas Aturan Kemendikbudristek ${selectedProg.regNo}: Direkomendasikan konversi penuh sebanyak ${computedSks} SKS. Pengurangan porsi kuliah reguler semester 5 untuk sub-pembelajaran: [${formulas.slice(0, Math.ceil(computedSks/5)).join(", ")}].`
    );
  };

  const getStatusPill = (status: "Aman" | "Perhatian" | "Kritis") => {
    if (status === "Aman") return "bg-emerald-50 text-emerald-700 border border-emerald-150";
    if (status === "Perhatian") return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-rose-50 text-rose-700 border border-rose-250 animate-pulse";
  };

  const adjustClassSyllabus = () => {
    setSilabusAdjusted(true);
    alert(
      "Notifikasi AI: Dosen menyetujui penyesuaian bahan ajar minggu depan! Silabus MK Analitik Media Sosial diubah untuk melatih penjejakan sentimen opini publik, menutup celah gap kompetensi kelas."
    );
  };

  const approveCredits = () => {
    alert(
      `SKS Program MBKM disetujui! Mengonversi ${Math.min(selectedProg.defaultSks, Math.round((weeksServed / 18) * selectedProg.defaultSks))} SKS untuk program '${selectedProg.name}' Mahasiswa ${activeStudent.name}. Log dikirimkan ke Biro Administrasi Akademik (BAA).`
    );
    setConversionReport("");
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-mahasiswapa-root">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            🎓 Bimbingan PA &amp; Kurikulum Advisor <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-indigo-600 text-white font-mono">Modul 6</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dukung kelulusan tepat waktu &amp; penyetaraan program magang Kampus Merdeka secara komprehensif bagi bimbingan PA Anda.
          </p>
        </div>
      </div>

      {/* NEW SECTION: M6.3 FACULTY MONITORING BOARD - MAGANG PORTAL & MILESTONE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="faculty-monitoring-board">
        
        {/* MAGANG BAR STATUS (M6.3 Board) */}
        <div className="lg:col-span-4 p-5 bg-white dark:bg-slate-950/20 shadow-sm border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-indigo-600 flex items-center gap-1">
              <Briefcase size={14} /> M6.3 Faculty Monitoring Board: Magang
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Pantau status magang luar kampus mahasiswa PA tanpa interogasi kaku satu per satu.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-center border border-indigo-500/15">
              <span className="text-[8px] text-indigo-400 uppercase font-black block">Applied (Mendaftar)</span>
              <strong className="text-lg font-mono text-indigo-500 font-extrabold mt-0.5 block">2 Mhs</strong>
            </div>
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-center border border-amber-500/15">
              <span className="text-[8px] text-amber-500 uppercase font-bold block">In Progress</span>
              <strong className="text-lg font-mono text-amber-500 font-extrabold mt-0.5 block">2 Mhs</strong>
            </div>
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-center border border-emerald-500/15">
              <span className="text-[8px] text-emerald-500 uppercase font-bold block">Completed</span>
              <strong className="text-lg font-mono text-emerald-550 text-emerald-500 font-extrabold mt-0.5 block">1 Mhs</strong>
            </div>
          </div>

          <div className="text-[10px] bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl text-slate-505 dark:text-slate-400 leading-normal border border-slate-100 dark:border-slate-800/40">
            ✓ <strong>AI Sync:</strong> Status rekrutmen terhubung otomatis lewat API portal Kampus Merdeka Kemendikbudristek mitra.
          </div>
        </div>

        {/* M6.2 AGGREGATE PANEL — CLASS COMPETENCY HEATMAP & FEEDBACK SYLLABUS EDIT */}
        <div className="lg:col-span-4 p-5 bg-white dark:bg-slate-950/20 shadow-sm border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-indigo-600 flex items-center gap-1">
                <BookOpen size={14} /> M6.2 Class Competency Heatmap
              </h3>
              <span className="text-[8.5px] px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded font-bold">1 Kelas Diampu</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Metrik agregat gap kemampuan kelas praktikum Kehumasan & Analitik.</p>
          </div>

          {/* Mini heatmap */}
          <div className="space-y-1.5 py-2.5">
            <div className="flex justify-between text-[9px] font-bold">
              <span className="text-slate-450">Penyusunan Narasi &amp; Crisis Release</span>
              <span className="text-rose-500">70% Gap Besar</span>
            </div>
            <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500" style={{ width: "70%" }}></div>
            </div>

            <div className="flex justify-between text-[9px] font-semibold">
              <span className="text-slate-450">Analitik Sentimen &amp; Hearing (Brand24)</span>
              <span className="text-[#3b82f6]">45% Gap Sedang</span>
            </div>
            <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "45%" }}></div>
            </div>
          </div>

          {/* Action to adjust syllabus */}
          <div>
            <button
              onClick={adjustClassSyllabus}
              disabled={silabusAdjusted}
              className={`w-full py-2 px-3 rounded-xl text-[10.5px] font-black cursor-pointer transition-colors text-center ${
                silabusAdjusted 
                  ? "bg-emerald-500 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
              }`}
            >
              {silabusAdjusted ? "Saran Pengajaran Disinkronkan ✓" : "Siasati Silabus Belajar"}
            </button>
            <p className="text-[8.5px] text-slate-500 text-center mt-1">AI merekomendasikan pembekalan ulasan taktik PR rilis minggu depan.</p>
          </div>
        </div>

        {/* BR-IM-03 INDUCTIVE CREDIT CONVERSION CALCULATOR */}
        <div className="lg:col-span-4 p-5 bg-white dark:bg-slate-950/20 shadow-sm border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase text-indigo-600 flex items-center gap-1">
              <Calculator size={14} /> BR-IM-03 SKS Conversion Calculator
            </h3>
            <p className="text-[10px] text-slate-400">Penyetaraan jam magang MBKM otonom menjadi kredit SKS resmi universitas.</p>
          </div>

          <div className="space-y-2 py-3">
            <div className="space-y-1">
              <label className="text-[8.5px] text-slate-400 uppercase font-black block">Pilih Keterlibatan MBKM</label>
              <select 
                value={selectedProgramIdx}
                onChange={(e) => {
                  setSelectedProgramIdx(Number(e.target.value));
                  setConversionReport("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2 text-[10.5px] text-slate-800 dark:text-slate-100"
              >
                {mbkmPrograms.map((p, idx) => (
                  <option key={idx} value={idx}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[8.5px] text-slate-400 uppercase font-black block">Direncanakan (Minggu)</label>
                <input 
                  type="number"
                  value={weeksServed}
                  onChange={(e) => {
                    setWeeksServed(Math.max(1, Number(e.target.value)));
                    setConversionReport("");
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2 text-xs font-mono"
                />
              </div>
              <div className="space-y-1 flex flex-col justify-end">
                <button
                  onClick={calculateConversion}
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-black cursor-pointer transition-colors"
                >
                  Hitung Konversi
                </button>
              </div>
            </div>
          </div>

          {conversionReport ? (
            <div className="space-y-2 animate-fade-in">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-[#059669] text-[9.5px] rounded-lg border border-emerald-100 leading-relaxed font-semibold">
                {conversionReport}
              </div>
              <button
                onClick={approveCredits}
                className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9.5px] font-black uppercase tracking-wider rounded-lg transition-all"
              >
                Setujui SKS Hasil Magang ✓
              </button>
            </div>
          ) : (
            <div className="text-[8.5px] text-slate-500 leading-normal text-center italic">
              *Syarat minimal 18 minggu bimbingan untuk konversi 20 SKS penuh.
            </div>
          )}
        </div>

      </div>

      {/* Dual Pane Layout (Student List + Detail Panel) */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* LEFT TAB: STUDENT LIST */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Daftar Mahasiswa Asuhan</h3>
            <span className="text-[11px] text-[#4F46E5] font-bold hover:underline cursor-pointer">Lihat Semua 22 Mahasiswa →</span>
          </div>

          <div 
            className={`rounded-2xl border p-4 space-y-3 shadow-sm ${
              isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
            }`}
            id="pa-student-list-container"
          >
            {studentsPAData.map((st) => {
              const isSelected = st.id === selectedStudentId;
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStudentId(st.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected 
                      ? "bg-[#4F46E5]/10 border-[#4F46E5] shadow-md scale-[1.005]" 
                      : isDarkMode
                        ? "bg-slate-900/40 border-slate-800 hover:border-slate-705 hover:bg-slate-900" 
                        : "bg-slate-50/60 border-slate-200/50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  id={`student-pa-${st.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Circle Avatar */}
                    <div className={`w-9 h-9 rounded-full ${st.avatarBg} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                      {st.initials}
                    </div>

                    <div className="min-w-0">
                      <strong className="text-xs font-black block truncate text-slate-800 dark:text-slate-100">{st.name}</strong>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Sem {st.semester} • Ikom UNESA</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* IPK Label */}
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 font-semibold block uppercase">IPK</span>
                      <strong className={`text-xs font-bold leading-tight ${st.ipk < 2.75 ? "text-rose-500" : "text-slate-800 dark:text-slate-205"}`}>{st.ipk}</strong>
                    </div>

                    {/* Status badge */}
                    <span className={`px-2.5 py-1 rounded text-[9.5px] font-black uppercase ${getStatusPill(st.status)}`}>
                      {st.status}
                    </span>

                    <ChevronRight size={15} className="text-slate-405 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SUB PANEL: STUDENT COMPREHENSIVE DRILL DOWN */}
        <div className="w-full xl:w-[480px] shrink-0" id="pa-student-detail-panel">
          
          <div 
            className={`rounded-2xl border p-5 space-y-5 shadow-md ${
              isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-205"
            }`}
          >
            {/* Header Profil */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-150/40 dark:border-slate-808">
              <div className={`w-14 h-14 rounded-full ${activeStudent.avatarBg} text-white font-black text-lg flex items-center justify-center shrink-0 shadow-inner`}>
                {activeStudent.initials}
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-black truncate">{activeStudent.name}</h3>
                <span className="text-xs text-slate-500 block mt-0.5">Ilmu Komunikasi UNESA • Angkatan 2023</span>
                <div className="flex gap-4 mt-2 text-[10px] font-mono font-bold text-slate-400">
                  <span>Semester {activeStudent.semester}</span>
                  <span>•</span>
                  <span>SKS Lulus: {activeStudent.sksCount} SKS</span>
                  <span>•</span>
                  <span>Target SKS: 144 SKS</span>
                </div>
              </div>
            </div>

            {/* IPK Bench / Indicators Summary row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-center border border-slate-201 dark:border-slate-800/40">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">IPK Terkini</span>
                <strong className={`text-lg font-mono font-black block mt-0.5 ${activeStudent.ipk < 2.75 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
                  {activeStudent.ipk}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-center border border-slate-201 dark:border-slate-800/40">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">Kehadiran Kelas</span>
                <strong className={`text-lg font-mono font-black block mt-0.5 ${activeStudent.attendance < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {activeStudent.attendance}%
                </strong>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-center border border-slate-210 dark:border-slate-800/40">
                <span className="text-[9px] text-slate-400 font-bold block uppercase font-bold">Magang MBKM</span>
                <strong className="text-xs font-mono font-black text-blue-500 mt-1 block">
                  {activeStudent.internshipStatus === "None" ? "None" : `${activeStudent.internshipStatus} (${activeStudent.internshipCompany || ""})`}
                </strong>
              </div>
            </div>

            {/* AI SYSTEM HOLISTIC ANALYSIS (blue-50 card layout) */}
            <div className={`p-4 rounded-xl border border-l-4 border-l-indigo-600 space-y-2 leading-relaxed text-xs shadow-sm ${
              isDarkMode 
                ? "bg-indigo-950/20 border-[#1e293b] text-indigo-300" 
                : "bg-indigo-50 border-indigo-200 text-indigo-800"
            }`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-base animate-pulse">✨</span>
                  <span className="font-black uppercase tracking-wider text-[10px]">✨ Analisis AI Pembimbing</span>
                </div>
                <span className="text-[9px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.2 rounded font-black uppercase">M4: PA Insight</span>
              </div>
              <p className="font-semibold">{activeStudent.aiInsight}</p>
            </div>

            {/* PROGRESS BARS DETAIL (6 items representing indices metrics) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Metrik Keberhasilan Strategis</h4>

              {/* Trajectory */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">IPK Trajectory (3 Semester)</span>
                {activeStudent.ipk < 2.75 ? (
                  <span className="text-rose-500 flex items-center gap-1 font-bold">Turun Berturut-Turut <TrendingDown size={14} /></span>
                ) : (
                  <span className="text-emerald-500 font-bold">Stabil Meningkat ✓</span>
                )}
              </div>

              {/* Attendance bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Kehadiran Rata-rata</span>
                  <strong className={activeStudent.attendance >= 80 ? 'text-emerald-500' : 'text-amber-500'}>{activeStudent.attendance}% / 100%</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${activeStudent.attendance >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${activeStudent.attendance}%` }}></div>
                </div>
              </div>

              {/* AI learning usage */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Keterlibatan Belajar Mandiri (AI Tutor)</span>
                  <strong className="text-blue-500">{activeStudent.aiTutorSess} Sesi / Bulan</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (activeStudent.aiTutorSess / 30) * 100)}%` }}></div>
                </div>
              </div>

              {/* Late Task */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Tugas Terlambat Mengumpul Bulan Ini</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  activeStudent.lateTasks > 0 
                  ? "bg-rose-50 border border-rose-200 text-rose-600 animate-pulse" 
                  : "bg-emerald-50 border border-emerald-100 text-emerald-600"
                }`}>
                  {activeStudent.lateTasks} Tugas
                </span>
              </div>
            </div>

            {/* ACTION PANEL */}
            <div className="pt-4 border-t border-slate-150/40 dark:border-slate-800 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => alert(`📅 Mengirimkan undangan Google Meet & Sesi Tatap Muka formal ke Kalender ${activeStudent.name}...`)}
                  className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer text-center"
                >
                  Jadwalkan Konsultasi
                </button>
                <button 
                  onClick={() => {
                    const ct = prompt(`Masukkan ringkasan poin pembicaraan bimbingan PA dengan ${activeStudent.name}:`);
                    if (ct) alert(`Laporan bimbingan rasio resmi berhasil diunggah ke Portal SIAM UNESA.`);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-bold border cursor-pointer text-center ${
                    isDarkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  Catat Hasil Pertemuan
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => alert(`Pesan khusus telah dialokasikan langsung lewat Telegram/WhatsApp Mahasiswa.`)}
                  className={`py-2.5 rounded-xl text-xs font-bold border cursor-pointer text-center ${
                    isDarkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  Kirim Pesan Chat
                </button>
                <button 
                  onClick={() => {
                    const confirmEsc = confirm(`Apakah Anda yakin ingin mengevaluasi & mengeskalasikan kasus ${activeStudent.name} ke Ketua Jurusan dan Konselor Psikologi Universitas?`);
                    if (confirmEsc) alert("Kasus resmi dikirimkan lampiran datanya ke helpdesk konselor asuhan!");
                  }}
                  className="py-2.5 bg-amber-500 hover:bg-amber-600 text-[#000] rounded-xl text-xs font-black cursor-pointer text-center"
                >
                  ⚠ Eskalasi ke Kajur
                </button>
              </div>

              <div className="text-[9px] text-center text-slate-400 italic pt-1 font-medium">
                💡 Seluruh tindak lanjut keputusan kaku studi sepenuhnya prerogatif Dosen Pembimbing murni.
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
