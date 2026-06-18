import React, { useState } from "react";
import { 
  Briefcase, 
  Sparkle, 
  Check, 
  MapPin, 
  Calendar, 
  Notebook, 
  Compass, 
  GraduationCap, 
  Clock, 
  Calculator,
  ArrowRight,
  SealCheck,
  Buildings,
  CheckSquare
} from "@phosphor-icons/react";
import { internships, studentProfile } from "../data";
import { Internship } from "../types";

interface TabInternshipsProps {
  onSelectInternshipForLetter?: (intern: Internship) => void;
  onSwitchTab?: (tabName: string) => void;
}

export default function TabInternships({ onSelectInternshipForLetter, onSwitchTab }: TabInternshipsProps) {
  const [selectedInternId, setSelectedInternId] = useState<string>("tokopedia");
  const [submittedToLecturer, setSubmittedToLecturer] = useState<boolean>(false);

  // Selected Internship Object
  const activeIntern = internships.find(item => item.id === selectedInternId) || internships[0];

  const handleApplyToLecturer = () => {
    setSubmittedToLecturer(true);
    setTimeout(() => {
      setSubmittedToLecturer(false);
    }, 4000);
  };

  // Dynamic Credits and Course Converters details
  const getSksConversionSchema = (id: string) => {
    switch (id) {
      case "tokopedia":
        return {
          total: 20,
          remaining: 25,
          coursesPaid: [
            { name: "Magang MBKM Kehumasan (Mata Kuliah Wajib)", credit: 4 },
            { name: "Analitik Media Sosial & Big Data (Pilihan)", credit: 3 },
            { name: "Manajemen Krisis PR (Pilihan)", credit: 3 },
            { name: "Kredit MBKM Bebas Tambahan", credit: 10 }
          ]
        };
      case "goto":
        return {
          total: 14,
          remaining: 31,
          coursesPaid: [
            { name: "Magang Magang MBKM Kreatif (Mata Kuliah Wajib)", credit: 4 },
            { name: "Prinsip-Prinsip Rancang Kampanye", credit: 3 },
            { name: "Kredit MBKM Bebas Tambahan", credit: 7 }
          ]
        };
      case "bca":
        return {
          total: 10,
          remaining: 35,
          coursesPaid: [
            { name: "Magang MBKM Corporate PR (Mata Kuliah Wajib)", credit: 4 },
            { name: "Hubungan Media & CSR", credit: 3 },
            { name: "Kredit MBKM Bebas Tambahan", credit: 3 }
          ]
        };
      default:
        return { total: 0, remaining: 45, coursesPaid: [] };
    }
  };

  const currentConversion = getSksConversionSchema(selectedInternId);

  return (
    <div className="space-y-6 animate-fade-in" id="internships-tab-root">
      
      {/* SECTION 3A: HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative overflow-hidden" id="internship-header-panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Briefcase size={24} className="text-teal-600" /> Rekomendasi Magang Berbasis Kompetensimu
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Dicocokkan dengan <strong>847 lowongan aktif</strong> dari mitra Kampus Merdeka &amp; industri · Diperbarui 2 jam lalu</p>
          </div>
          <div className="bg-teal-50/50 p-3 rounded-lg border border-teal-200/50 max-w-sm shrink-0">
            <span className="text-[10px] text-teal-700 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkle size={13} weight="fill" className="text-teal-605 animate-pulse" /> AI Smart Matching Engine
            </span>
            <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-sans">
              AI mencocokkan profilmu dengan persyaratan nyata dari lowongan industri — bukan sekadar menyamakan keyword. Kami membandingkan 18 dimensi kompetensi dari SIAKAD UNESA.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3B: MBKM SMART MATCH PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="internship-grid">
        
        {/* Recommended Internship Cards */}
        <div className="lg:col-span-8 space-y-4" id="internship-cards-list">
          <div className="flex items-center gap-2 mb-2 p-2 relative bg-teal-50/30 border border-teal-100 rounded-lg text-xs leading-none">
            <Sparkle size={14} weight="fill" className="text-teal-600 animate-pulse shrink-0" />
            <span className="text-slate-800 font-bold">
              Menampilkan <strong>3 mitra magang teratas</strong> paling relevan dengan background Kampanye Kreatif + Media Monitoring murni Anda:
            </span>
          </div>

          {internships.map((intern) => {
            const isSelected = selectedInternId === intern.id;
            return (
              <div 
                key={intern.id}
                onClick={() => setSelectedInternId(intern.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                  isSelected 
                    ? "bg-white border-teal-500 shadow-md ring-1 ring-teal-500/20" 
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
                id={`internship-card-${intern.id}`}
              >
                {intern.badge && (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[9px] font-black tracking-wider rounded-full uppercase flex items-center gap-1 shadow-md">
                    <Sparkle size={10} weight="fill" /> {intern.badge}
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{intern.program}</span>
                      <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">{intern.role}</h3>
                      <p className="text-xs font-bold text-teal-700 flex items-center gap-1 mt-0.5">
                        <Buildings size={14} /> {intern.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 text-right">
                        <span className="text-[10px] text-slate-400 block leading-none font-bold">Match Score</span>
                        <strong className="text-teal-600 text-sm font-mono font-black">{intern.matchScore}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Core details layout */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-700 font-semibold mb-4 select-none">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {intern.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {intern.duration}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><GraduationCap size={12} /> Konversi {intern.sks} SKS</span>
                  </div>

                  {/* Skills check block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 border-b border-slate-100 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-700 uppercase tracking-wider mb-1 font-black">✓ Kompetensimu Sesuai ({intern.skillsMatch.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {intern.skillsMatch.map((skill, k) => (
                          <span key={k} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] rounded border border-emerald-100 font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-700 uppercase tracking-wider mb-1 font-black">⚠ Gap Perlu Dikembangkan ({intern.skillsToDevelop.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {intern.skillsToDevelop.map((skill, k) => (
                          <span key={k} className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] rounded border border-rose-100 font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Reason callout */}
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-1.5 leading-relaxed">
                    <span className="text-teal-700 shrink-0 font-bold">✨ AI Match Justification:</span>
                    <span className="italic">"{intern.aiReason}"</span>
                  </div>
                </div>

                {/* SKS CTA Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-end" id={`internship-ctas-${intern.id}`}>
                  {onSelectInternshipForLetter && onSwitchTab && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInternshipForLetter(intern);
                        onSwitchTab("documents"); // Switch to CV & cover letter tab
                      }}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-lg text-xs tracking-wide transition-all uppercase flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <Sparkle size={14} weight="fill" /> Buat Cover Letter AI
                    </button>
                  )}
                  <button className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold transition-all cursor-pointer">
                    Lihat Dokumen Detail Lowongan
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* SECTION 3C: INTERACTIVE SKS CONVERTER */}
        <div className="lg:col-span-4" id="internship-sks-converter">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-4 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator size={22} className="text-teal-600" />
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Kalkulator Konversi SKS</h3>
                <p className="text-[10px] text-slate-400 font-bold">Verifikasi otomatis SKS MBKM universitas</p>
              </div>
            </div>

            {/* Selection display */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5" id="converter-meta">
              <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Lowongan Terpilih</span>
              <p className="text-xs font-black text-slate-900">{activeIntern.company}</p>
              <p className="text-[11px] text-teal-700 font-bold">{activeIntern.role}</p>
              <div className="p-1.5 bg-white text-[10px] text-slate-600 font-mono rounded mt-2 border border-slate-200 flex justify-between items-center">
                <span>Total Konversi SKS:</span>
                <strong className="text-teal-800 text-xs font-black">{currentConversion.total} SKS (OK)</strong>
              </div>
            </div>

            {/* Conversion course maps */}
            <div className="space-y-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mata Kuliah Konversi Setara:</p>
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                {currentConversion.coursesPaid.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="text-slate-700 flex items-center gap-1 font-medium">
                      <CheckSquare size={13} weight="fill" className="text-teal-600 shrink-0" /> {c.name}
                    </span>
                    <strong className="text-slate-900 font-mono font-bold">{c.credit} SKS</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics outcome info */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between text-[11px]">
                <span>Sisa SKS wajib setelah MBKM:</span>
                <strong className="text-slate-800 font-mono font-bold">{currentConversion.remaining} SKS</strong>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                *Proyek akhir magang diperbolehkan dikerjakan paralel sebagai Bab 1-3 Skripsi Tugas Akhir di Universitas Negeri Surabaya (UNESA).
              </p>
            </div>

            {/* Applying CTA */}
            <div>
              <button 
                onClick={handleApplyToLecturer}
                className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  submittedToLecturer 
                    ? "bg-emerald-500 text-white" 
                    : "bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
                }`}
              >
                {submittedToLecturer ? "✓ Berhasil Diajukan ke Kaprodi!" : "Ajukan Konversi SKS ke Kaprodi →"}
              </button>
              {submittedToLecturer && (
                <p className="text-[9px] text-emerald-605 font-bold text-center mt-1.5 animate-pulse">
                  Dokumen persetujuan SIAKAD dikirim ke Dr. Dian (Kaprodi Ilmu Komunikasi UNESA).
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
