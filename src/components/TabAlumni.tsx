import React, { useState } from "react";
import { 
  Users, 
  Sparkle, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Clock, 
  ArrowRight,
  Info,
  SealCheck,
  Envelope,
  UserCheck,
  ChatCircleText,
  PaperPlaneTilt
} from "@phosphor-icons/react";
import { mentors } from "../data";
import { Mentor } from "../types";

export default function TabAlumni() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(mentors[0]);
  const [showScheduler, setShowScheduler] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>("Sabtu, 20 Juni 2026 - 10:00 WIB");
  const [bookingGoal, setBookingGoal] = useState<string>(
    "Saya ingin mendiskusikan: transisi ke Digital PR & Branding, persiapan magang MBKM semester 6 di agensi komunikasi, dan tips menyusun portofolio kampanye kreatif."
  );
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleOpenScheduler = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    // Prefill intent depending on who we selected
    if (mentor.id === "mentor1") {
      setBookingGoal("Saya ingin mendiskusikan: transisi ke Digital PR & Branding, persiapan magang MBKM semester 6 di agensi komunikasi, dan tips menyusun portofolio kampanye kreatif.");
    } else if (mentor.id === "mentor2") {
      setBookingGoal(`Saya ingin mendiskusikan: karir sebagai ${mentor.role} di ${mentor.company}, manajemen kampanye media sosial, dan strategi penanganan krisis PR.`);
    } else {
      setBookingGoal(`Saya ingin konsultasi mengenai portofolio campaign saya, tips lolos rekrutmen di ${mentor.company}, serta kesiapan kurikulum semester 6.`);
    }
    setShowScheduler(true);
    setBookingSuccess(false);
  };

  const handleRequestMentoring = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowScheduler(false);
      setBookingSuccess(false);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="alumni-tab-root">
      
      {/* SECTION 4A: HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md" id="alumni-header-panel">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Users size={24} className="text-teal-655" /> Alumni Universitas Negeri Surabaya (UNESA) Yang Siap Membantu
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Direkomendasikan secara personal oleh AI berdasarkan kecocokan <strong>prodi (Ilmu Komunikasi UNESA)</strong>, kesamaan jalur karir, serta lokasi target karir yaitu <strong>Jakarta</strong>.
        </p>
      </div>

      {/* SECTION 4B: TOP 5 MENTOR CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="mentors-grid-parent">
        
        {/* Featured Card (Spans full width on grid) */}
        <div className="lg:col-span-2" id="featured-mentor-wrapper">
          <div className="bg-white p-6 rounded-2xl border-2 border-teal-500 shadow-md relative overflow-hidden flex flex-col justify-between" id="mentor-card-featured">
            <span className="absolute -top-3 left-4 px-2.5 py-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[10px] font-black tracking-widest rounded-full uppercase flex items-center gap-1 shadow-md">
              <Sparkle size={10} weight="fill" /> Rekomendasi Teratas — Kesamaan Jalur Terbesar
            </span>

            <div>
              <div className="flex flex-col md:flex-row gap-5 items-start">
                {/* Huge Avatar */}
                <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center text-2xl font-black shrink-0 shadow-inner">
                  {mentors[0].initials}
                </div>

                {/* Major credentials */}
                <div className="space-y-1.5 flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{mentors[0].name}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {mentors[0].batch} — <strong className="text-teal-700">{mentors[0].role}</strong> di <strong className="text-emerald-700 font-semibold">{mentors[0].company}</strong>
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-bold border border-teal-200/60 self-start shadow-sm">
                      Pengalaman: {mentors[0].experience}
                    </span>
                  </div>

                  {/* Similarity indicators */}
                  <div className="flex flex-wrap items-center gap-1.5 py-1">
                    {mentors[0].similarity.map((sim, key) => (
                      <span key={key} className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-bold flex items-center gap-1 shadow-sm">
                        <UserCheck size={12} weight="fill" className="text-teal-605" /> {sim}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {mentors[0].tags.map((tag, key) => (
                      <span key={key} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] border border-slate-200 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Match description */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-teal-800">💡 Alasan Kecocokan AI:</span>
                    <p className="mt-1 italic">"{mentors[0].aiReason}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book action */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end" id="featured-mentor-ctas">
              <button 
                onClick={() => handleOpenScheduler(mentors[0])}
                className="px-5 py-2.1 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-lg text-xs uppercase tracking-wide transition-all cursor-pointer shadow-sm"
              >
                Jadwalkan Sesi Mentoring
              </button>
              <button className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all cursor-pointer">
                Lihat Portofolio Karir Ahmad
              </button>
            </div>
          </div>
        </div>

        {/* Regular cards (2–5) */}
        {mentors.slice(1).map((mentor) => (
          <div 
            key={mentor.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-teal-300 shadow-sm transition-all flex flex-col justify-between"
            id={`mentor-card-${mentor.id}`}
          >
            <div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-slate-50 text-teal-700 border border-slate-200 flex items-center justify-center text-lg font-black shrink-0">
                  {mentor.initials}
                </div>

                <div className="space-y-1 w-full">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">{mentor.name}</h4>
                      <p className="text-xs text-slate-600 font-bold">{mentor.batch}</p>
                    </div>
                    <span className="text-[10px] font-mono text-teal-750 bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100 font-bold">
                      Exp: {mentor.experience}
                    </span>
                  </div>

                  <p className="text-xs text-teal-750 font-bold">
                    <strong>{mentor.role}</strong> di <strong className="text-emerald-705">{mentor.company}</strong>
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {mentor.similarity.map((sim, key) => (
                      <span key={key} className="px-1.5 py-0.5 rounded bg-slate-50 text-[9px] text-slate-700 border border-slate-200 font-medium">
                        {sim}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1.5 animate-pulse">
                    {mentor.tags.map((tag, key) => (
                      <span key={key} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-snug mt-3 p-2.5 bg-slate-50 rounded border border-slate-200 italic font-sans font-medium">
                {mentor.aiReason}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2 justify-end">
              <button 
                onClick={() => handleOpenScheduler(mentor)}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded font-bold text-[10px] uppercase tracking-wide border border-slate-200 transition-all cursor-pointer"
              >
                Booking Sesi
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* SECTION 4C: MENTORING SESSION REPORT & SCHEDULER POPUP */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-sm" id="alumni-recent-session-reports">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Status Sesi Mentor</h3>
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          <ChatCircleText size={32} className="text-slate-400 mx-auto mb-2" />
          <p className="font-bold text-slate-700">Belum ada sesi aktif terjadwal</p>
          <p className="text-[11px] mt-0.5">Jadwalkan sesi pertama Anda dengan menekan tombol booking di atas.</p>
        </div>
      </div>

      {/* Booking Form Overlay Modal (High fidelity React popup) */}
      {showScheduler && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none" id="scheduler-overlay-modal">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-scale-up">
            
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3.5 mb-4">
              <div>
                <span className="text-[10px] text-teal-700 font-extrabold uppercase tracking-wider block">Form Pengajuan Sesi</span>
                <h3 className="text-base font-black text-slate-900">Konsultasi Dengan {selectedMentor.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-semibold">{selectedMentor.role} @ {selectedMentor.company}</p>
              </div>
              <button 
                onClick={() => setShowScheduler(false)}
                className="text-slate-400 hover:text-slate-900 font-extrabold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Success screen */}
            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3" id="booking-success-anim">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto ring-4 ring-emerald-500/15 border border-emerald-200">
                  <SealCheck size={32} weight="fill" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Yey, Request Terkirim!</h4>
                <p className="text-xs text-slate-600 px-4 leading-relaxed font-sans">
                  Permintaan sesi mentoring telah diteruskan ke alumni <strong>{selectedMentor.name}</strong> melalui LinkedIn/SIAKAD UNESA. Anda akan menerima notifikasi email setelah dikonfirmasi.
                </p>
              </div>
            ) : (
              /* Actual form layout */
              <form onSubmit={handleRequestMentoring} className="space-y-4">
                
                {/* Time picker options */}
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Pilih Jadwal Alternatif:</label>
                  <div className="grid grid-cols-1 gap-2 text-xs text-slate-700">
                    <label className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer flex items-center gap-2 hover:border-teal-400 font-medium">
                      <input 
                        type="radio" 
                        name="scheduleOption" 
                        defaultChecked
                        onChange={() => setBookingDate("Sabtu, 20 Juni 2026 - 10:00 WIB")}
                      />
                      <span>Sabtu, 20 Juni 2026 - 10:00 WIB</span>
                    </label>

                    <label className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer flex items-center gap-2 hover:border-teal-400 font-medium">
                      <input 
                        type="radio" 
                        name="scheduleOption" 
                        onChange={() => setBookingDate("Kamis, 18 Juni 2026 - 19:30 WIB")}
                      />
                      <span>Kamis, 18 Juni 2026 - 19:30 WIB</span>
                    </label>

                    <label className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer flex items-center gap-2 hover:border-teal-400 font-medium">
                      <input 
                        type="radio" 
                        name="scheduleOption" 
                        onChange={() => setBookingDate("Minggu, 21 Juni 2026 - 15:00 WIB")}
                      />
                      <span>Minggu, 21 Juni 2026 - 15:00 WIB</span>
                    </label>
                  </div>
                </div>

                {/* Intent text input */}
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Topik Diskusi (AI Prefilled Suggestion):</label>
                  <textarea 
                    rows={4}
                    value={bookingGoal}
                    onChange={(e) => setBookingGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-3 text-slate-800 focus:border-teal-555 outline-none leading-relaxed font-sans"
                  />
                  <span className="text-[10px] text-teal-700 font-bold block">✨ Topik ini disesuaikan dengan kurva skill-gap Anda secara khusus.</span>
                </div>

                {/* Submit row */}
                <div className="pt-3 border-t border-slate-100 flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowScheduler(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-black rounded-lg uppercase tracking-wide flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <PaperPlaneTilt size={14} weight="bold" /> Kirim Request Mentoring
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
