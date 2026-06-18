import React, { useState } from "react";
import { 
  Sliders, 
  Sparkle, 
  Lock, 
  Bell, 
  User, 
  Save, 
  TrendingUp, 
  BookOpen, 
  Layers
} from "lucide-react";

interface AcademicPengaturanProps {
  isDarkMode: boolean;
}

export default function AcademicPengaturan({ isDarkMode }: AcademicPengaturanProps) {
  const [warningThreshold, setWarningThreshold] = useState<number>(75);
  const [useAiDraft, setUseAiDraft] = useState<boolean>(true);
  const [emailDigest, setEmailDigest] = useState<boolean>(true);

  const handleSaveSettings = () => {
    alert("⚙ Pengaturan sistem akademik berhasil diperbarui dan disimpan dalam server lokal ACIP UNESA.");
  };

  return (
    <div className="space-y-6 animate-fade-in" id="academic-settings-root">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight font-sans">⚙ Pengaturan Sistem & Rubrik AI</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kustomisasi konfigurasi asisten AI, ambang batas sistem peringatan dini, dan parameter sinkronisasi data dilingkup bursa kerja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Panel 1 — Ambang Batas Evaluasi & Status */}
        <div 
          className={`rounded-2xl border p-6 space-y-5 transition-all duration-300 shadow-sm ${
            isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
          }`}
          id="evalboundary-settings-panel"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sliders size={16} className="text-blue-500" />
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Konfigurasi Nilai Berisiko</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="space-y-2">
              <label className="text-slate-500 block">Ambang Batas Kehadiran Peringatan Dini</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min={50} 
                  max={90} 
                  value={warningThreshold} 
                  onChange={(e) => setWarningThreshold(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-blue-500 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm w-12 text-center bg-slate-50 dark:bg-slate-900 border border-slate-150 p-1.5 rounded-lg text-slate-705 block">{warningThreshold}%</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block">
                Peringatan dini merah secara otomatis diaktifkan apabila rasio presensi mahasiswa menyentuh batas ini.
              </span>
            </div>

            <div className="pt-3 space-y-3">
              <label className="text-slate-500 block">Otomasi Rekomendasi Grade Rubrik</label>
              <label className="flex items-center gap-3 cursor-pointer select-none text-[11px] text-slate-705">
                <input 
                  type="checkbox" 
                  checked={useAiDraft} 
                  onChange={(e) => setUseAiDraft(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-350 accent-blue-500"
                />
                <span>Aktifkan asisten otomatis draft respon saran umpan balik pertama</span>
              </label>
            </div>
          </div>
        </div>

        {/* Panel 2 — Akun & Notifikasi */}
        <div 
          className={`rounded-2xl border p-6 space-y-5 transition-all duration-300 shadow-sm ${
            isDarkMode ? "bg-[#090e1b] border-[#1e293b]" : "bg-white border-slate-200"
          }`}
          id="account-profile-settings"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User size={16} className="text-teal-500" />
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Profil Akademik Pengguna</h3>
          </div>

          <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Nama Lengkap</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block">Dr. Siti Rahayu Pertiwi, M.I.Kom</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Nomor NIDN</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block font-mono">198203142006042001</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Gelar / Jabatan Utama</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block">Koordinator Prodi Ilmu Komunikasi</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Kampus Afiliasi</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block">Universitas Negeri Surabaya</span>
                </div>
              </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-3 cursor-pointer select-none text-[11px] text-slate-705">
                <input 
                  type="checkbox" 
                  checked={emailDigest} 
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-350 accent-blue-500"
                />
                <span>Kirim intisari mingguan IKU-2 prodi ke email UNESA saya</span>
              </label>
            </div>
          </div>
        </div>

      </div>

      {/* Save action block */}
      <div className="pt-4 text-right">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md ml-auto cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <Save size={15} />
          <span>Simpan Seluruh Pengaturan</span>
        </button>
      </div>

    </div>
  );
}
