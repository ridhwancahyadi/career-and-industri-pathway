import React from "react";
import { 
  TrendUp, 
  Sparkle, 
  Warning, 
  CheckCircle, 
  Info, 
  Buildings, 
  Money,
  Coins
} from "@phosphor-icons/react";
import { trendingSkills } from "../data";

export default function TabIndustryPulse() {
  const [targetIndustries, setTargetIndustries] = React.useState<string[]>([
    "Agensi PR & Digital Branding (Ogilvy, Edelman, dsb)",
    "Korporasi Telekomunikasi & Inovasi (Telkomsel, Indosat, dsb)",
    "FMCG & Corporate Relations (Unilever, Nestle, dsb)",
    "E-commerce & Tech Campaign (Tokopedia, GoTo, dsb)"
  ]);
  const [newIndustry, setNewIndustry] = React.useState("");

  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIndustry.trim() && !targetIndustries.includes(newIndustry.trim())) {
      setTargetIndustries([...targetIndustries, newIndustry.trim()]);
      setNewIndustry("");
    }
  };

  const handleRemoveIndustry = (ind: string) => {
    setTargetIndustries(targetIndustries.filter(item => item !== ind));
  };

  return (
    <div className="space-y-6 animate-fade-in" id="industry-pulse-tab-root">
      
      {/* SECTOR PREFERENCE INPUT: STUDENT TARGET INDUSTRIES */}
      <div className="bg-white rounded-2xl p-6 border border-slate-205 shadow-md space-y-4" id="target-industries-selector-panel">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯 Custom Industri Tujuan &amp; Karir Impian</span>
              <span className="px-2 py-0.5 bg-teal-50 text-[9px] text-teal-700 rounded font-black uppercase">Mahasiswa Choice</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Tambahkan atau sesuaikan daftar sektor industri yang Anda incar untuk menyelaraskan rekomendasi radar AI.
            </p>
          </div>
        </div>

        {/* List of current Industries with remove option */}
        <div className="flex flex-wrap gap-2 pt-1" id="current-industries-list">
          {targetIndustries.map((ind, i) => (
            <span 
              key={i}
              className="px-3 py-1.5 bg-teal-50 dark:bg-slate-900 border border-teal-150 rounded-full text-xs font-semibold text-teal-800 dark:text-teal-300 flex items-center gap-2 shadow-sm"
            >
              <span>{ind}</span>
              <button 
                type="button"
                onClick={() => handleRemoveIndustry(ind)}
                className="text-teal-500 hover:text-teal-800 dark:text-teal-400 font-bold border-0 bg-transparent cursor-pointer text-xs ml-1"
                title="Hapus"
              >
                ✕
              </button>
            </span>
          ))}
          {targetIndustries.length === 0 && (
            <p className="text-xs text-rose-500 font-medium">Belum ada industri tujuan yang terpilih. Tambahkan sektor di bawah.</p>
          )}
        </div>

        {/* Input Form to add customized industry */}
        <form onSubmit={handleAddIndustry} className="flex gap-2 max-w-md pt-1" id="add-industry-form">
          <input 
            type="text"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            placeholder="Contoh: Hospitality PR, Fintech, Startup, BUMN..."
            className="flex-1 px-3 py-2 border border-slate-250 rounded-xl text-xs bg-slate-50/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 dark:text-slate-100"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-colors"
          >
            + Tambah
          </button>
        </form>
      </div>

      {/* SECTION 6A: HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative overflow-hidden" id="pulse-header-panel">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendUp size={24} className="text-teal-605" /> Apa Yang Industri Cari Minggu Ini?
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Relevan untuk tujuan karir target Anda: <strong className="text-teal-700">{targetIndustries.join(" · ") || "Semua Sektor Kehumasan"}</strong>
            </p>
          </div>
          <div className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-mono select-none">
            Data Sumber: <strong>1.427 Lowongan Aktif Jakarta</strong> · 14 Juni 2026
          </div>
        </div>
      </div>

      {/* SECTION 6B: TOP SKILLS TRENDING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="pulse-grid-main">
        
        {/* Left Column: Trending Skills index */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4" id="trending-skills-index">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Skill Terpopuler Di Sektor Komunikasi &amp; Humas</h3>
            <p className="text-xs text-slate-500 mt-0.5">Persentase lowongan yang mewajibkan keahlian ini sebagai prasyarat utama</p>
          </div>

          <div className="space-y-3.5" id="trending-skills-list-block">
            {trendingSkills.map((item, idx) => {
              const isGap = !item.hasIt && item.scale === "rose";
              const isImprove = !item.hasIt && item.scale === "amber";
              
              // Color coding logic based on students owned skills
              const barColor = isGap ? "bg-rose-500" : isImprove ? "bg-amber-500" : "bg-emerald-500";
              const textColor = isGap ? "text-rose-700" : isImprove ? "text-amber-700" : "text-emerald-700";
              const statusLabel = isGap ? "⚠ GAP S5" : isImprove ? "⚡ Tingkatkan S6" : "✓ Dikuasai S1-4";

              return (
                <div key={idx} className="space-y-1.5" id={`skill-p-bar-${idx}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#0f172a] flex items-center gap-1.5">
                      <span className="font-mono text-slate-400 text-[10px]">0{idx + 1}.</span> {item.name}
                    </span>
                    <div className="flex items-center gap-3 font-semibold text-[11px]">
                      <span className="text-slate-700">{item.value}% lowongan</span>
                      <span className={`px-2 py-0.5 text-[9px] rounded-md font-mono font-bold ${
                        isGap ? "bg-rose-50 text-rose-700 border border-rose-100" : isImprove ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                  {/* Track line */}
                  <div className="w-full h-2.5 bg-slate-50/50 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`} 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Actionable insights */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4" id="pulse-action-insights">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4 h-full">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkle size={16} weight="fill" className="text-teal-605 animate-pulse" /> Radar Akselerasi Karir &amp; Strategi AI
            </h3>

            <div className="space-y-3" id="insight-cards-list-pulse">
              
              {/* Card 1: Social Listening */}
              <div className="p-4 bg-teal-50/40 rounded-xl border border-teal-200 text-xs leading-relaxed flex items-start gap-2.5">
                <Sparkle size={18} weight="fill" className="text-teal-600 shrink-0 mt-0.5" />
                <div className="text-teal-950 font-medium font-sans">
                  <strong className="text-teal-800 block mb-1 font-extrabold text-[#0f172a]">Saran Pelatihan: Social Media Monitoring</strong>
                  Keahlian social monitoring terdaftar pada <span className="font-extrabold text-teal-900">71% lowongan aktif</span>. Mempelajari alat monitoring seperti Brand24/Synthesio merupakan akselerasi keterampilan bernilai tinggi yang dianjurkan untuk memperluas kualifikasi magang Anda.
                </div>
              </div>

              {/* Card 2: Creative Campaign Storytelling */}
              <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-250 text-xs leading-relaxed flex items-start gap-2.5">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-emerald-950 font-medium">
                  <strong className="text-emerald-800 block mb-1 font-extrabold text-[#052e16]">Keunggulan Konseptual Anda</strong>
                  Kemampuan penulisan naskah kampanye, dasar rilis pers, serta strategi komunikasi krisis Anda telah berada pada level prima yang menyamai persyaratan <span className="font-extrabold text-emerald-900">82% lowongan strategis</span>. Pertahankan konsistensi ini!
                </div>
              </div>

              {/* Card 3: ESG Public Relations */}
              <div className="p-4 bg-[#eff6ff] rounded-xl border border-blue-200 text-xs leading-relaxed flex items-start gap-2.5">
                <Info size={18} weight="fill" className="text-blue-550 shrink-0 mt-0.5" />
                <div className="text-blue-950 font-medium">
                  <strong className="text-blue-800 block mb-1 font-extrabold text-[#1e3a8a]">Tren Meningkat: ESG &amp; Sustainability Relations</strong>
                  Lowongan humas korporasi nasional yang mengintegrasikan narasi keberlanjutan (ESG) melonjak sebesar <span className="text-blue-900 font-extrabold">34%</span> kuartal ini. Sangat disarankan menyisipkan teori CSR pada draf portofolio Anda.
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* SECTION 6C: SALARY BENCHMARK */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md" id="pulse-salaries-benchmark">
        <div className="mb-5">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
            <Coins size={22} className="text-teal-605" /> Analisis Tolok Ukur Gaji (Salary Benchmark)
          </h2>
          <p className="text-xs text-slate-500 font-medium font-semibold">Statistik resmi estimasi pendapatan bidang Hubungan Masyarakat &amp; Media Kreatif di kota Jakarta (Fresh Graduate ke Senior)</p>
        </div>

        {/* Custom Visual Salary Bars */}
        <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-200" id="salary-bars-widget">
          
          {/* Level 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold leading-none select-none">
              <span className="text-slate-700">Junior PR Specialist / Social Media Analyst (0 – 1 Tahun Pengalaman)</span>
              <strong className="text-teal-650 font-mono font-extrabold">Rp 5.5 – 7.5 Juta / Bulan</strong>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-slate-100 rounded overflow-hidden mt-1.5">
                <div className="h-full bg-teal-500 rounded" style={{ width: "25%" }}></div>
              </div>
              {/* Marker representing student trajectory */}
              <div className="absolute top-[18px] left-[25%] -translate-x-1/2 flex flex-col items-center z-10" id="trajectory-marker">
                <span className="text-teal-800 font-black text-[9px] animate-bounce bg-white px-2.5 py-1 border border-teal-500 rounded shadow-md leading-none select-none">
                  ↑ Target Jalur Kamu (Freshgrad UNESA)
                </span>
              </div>
            </div>
          </div>

          {/* Level 2 */}
          <div className="space-y-1 pt-4">
            <div className="flex justify-between text-xs font-bold select-none">
              <span className="text-slate-700">Senior PR Consultant / Creative Strategic Planner (1 – 3 Tahun Pengalaman)</span>
              <strong className="text-slate-600 font-mono text-xs font-extrabold">Rp 8.5 – 12 Juta / Bulan</strong>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded overflow-hidden">
              <div className="h-full bg-slate-400 rounded" style={{ width: "45%" }}></div>
            </div>
          </div>

          {/* Level 3 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold select-none">
              <span className="text-slate-700">Corporate Communication Manager / PR Lead (3 – 5 Tahun Pengalaman)</span>
              <strong className="text-slate-600 font-mono text-xs font-extrabold">Rp 12 – 20 Juta / Bulan</strong>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded overflow-hidden">
              <div className="h-full bg-slate-400 rounded" style={{ width: "70%" }}></div>
            </div>
          </div>

          {/* Level 4 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold select-none">
              <span className="text-slate-700">VP of Corporate Communications / Relations Director (5+ Tahun Pengalaman)</span>
              <strong className="text-slate-600 font-mono text-xs font-extrabold">Rp 25 – 45 Juta / Bulan</strong>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded overflow-hidden font-sans">
              <div className="h-full bg-slate-400 rounded" style={{ width: "100%" }}></div>
            </div>
          </div>

        </div>

        <p className="text-[10px] text-slate-400 font-mono text-center mt-3 font-semibold select-none">
          Sari Tolok ukur digenerate dari analisis gabungan 1.247 job vacancy boards dan transkip konversi alumni Universitas Negeri Surabaya (UNESA) di Jakarta · Juni 2026
        </p>
      </div>

    </div>
  );
}
