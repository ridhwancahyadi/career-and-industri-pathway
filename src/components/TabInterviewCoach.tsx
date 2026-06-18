import React, { useState, useEffect } from "react";
import { 
  Sparkle, 
  ChevronRight, 
  AlertCircle, 
  Send, 
  User, 
  Compass, 
  Activity, 
  Volume2, 
  VolumeX,
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  BarChart2,
  RefreshCw,
  Clock,
  ExternalLink,
  BrainCircuit,
  MessageSquare,
  Building2,
  Lock,
  Mic,
  Video,
  Briefcase,
  Radio,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Persona {
  id: string;
  nameHR: string;
  nameUser: string;
  roleHR: string;
  roleUser: string;
  company: string;
  culture: string;
  style: "tough" | "supportive" | "analytical" | "conservative";
  avatarInitialsHR: string;
  avatarInitialsUser: string;
  avatarBgClass: string;
  avatarUrlHR: string;
  avatarUrlUser: string;
  descHR: string;
  descUser: string;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
}

const companyPersonas: Persona[] = [
  {
    id: "p1",
    nameHR: "Evi Lestari",
    nameUser: "Yudi Prasetyo",
    roleHR: "Senior Executive HR Talent Partner",
    roleUser: "Creative Director of PR & Campaign Strategy",
    company: "PT Ogilvy PR Indonesia",
    culture: "Mengutamakan kreativitas kampanye digital, loyalitas klien high-profile, viralitas strategis, serta ketahanan mental di bawah tekanan tinggi agensi.",
    style: "analytical",
    avatarInitialsHR: "EL",
    avatarInitialsUser: "YP",
    avatarBgClass: "from-amber-500 to-rose-600",
    avatarUrlHR: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    avatarUrlUser: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    descHR: "Menguji ketahanan mental bekerja lintas tim kreatif, inisiatif kerja taktis, serta adaptabilitas budaya agensi dinamis.",
    descUser: "Menantang kecakapan merangcang draf kampanye, rumus konversi khalayak, serta taktik pemulihan krisis citra brand klien.",
    difficulty: "Sulit"
  },
  {
    id: "p2",
    nameHR: "Rina Astuti",
    nameUser: "Hendra Wijaya",
    roleHR: "Corporate Talent Development Lead",
    roleUser: "Head of Corporate Relations & Sustainability",
    company: "PT Unilever Indonesia Tbk",
    culture: "Sangat berorientasi pada reputasi keberlanjutan (ESG), etika komunikasi global, stabilitas citra khalayak, dan kepatuhan standar korporasi.",
    style: "conservative",
    avatarInitialsHR: "RA",
    avatarInitialsUser: "HW",
    avatarBgClass: "from-blue-600 to-indigo-800",
    avatarUrlHR: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    avatarUrlUser: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    descHR: "Membahas kesesuaian nilai kepemimpinan pribadi dengan pilar etis kerelapan Unilever serta kontribusi masyarakat.",
    descUser: "Menantang analisis Anda mengenai komunikasi mitigasi rumor, keterwakilan ESG korporat, dan relasi komunitas akar rumput.",
    difficulty: "Sangat Sulit"
  },
  {
    id: "p3",
    nameHR: "Andito Siregar",
    nameUser: "Amalia Putri",
    roleHR: "Lead HR Business Partner GoTo Campaign",
    roleUser: "VP of Digital Communication & Audience Analytics",
    company: "PT GoTo Gojek Tokopedia Tbk",
    culture: "Agile, mengutamakan keputusan berbasis big-data sentimen, kelincahan berpindah platform taktis, dan pemikiran berorientasi hasil.",
    style: "tough",
    avatarInitialsHR: "AS",
    avatarInitialsUser: "AP",
    avatarBgClass: "from-emerald-500 to-teal-700",
    avatarUrlHR: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    avatarUrlUser: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    descHR: "Fokus pada kelincahan kerja mandiri, prioritas saat krisis melanda multi-bisnis startup teknologi, dan motivasi orisinal.",
    descUser: "Analisis monitoring media sosial, data listening (Brand24), segmentasi khalayak Gen-Z, dan prioritas konversi campaign.",
    difficulty: "Sangat Sulit"
  },
  {
    id: "p4",
    nameHR: "Dra. Endang Wardhani",
    nameUser: "Dr. Siti Rahayu Pertiwi, M.I.Kom",
    roleHR: "Senior Advisor Kemahasiswaan & PA",
    roleUser: "Koordinator Program Studi Ilmu Komunikasi",
    company: "Universitas Negeri Surabaya (UNESA)",
    culture: "Mengedepankan basis teoretis komunikasi yang kokoh, kesiapan kode etik profesi, integrasi riset ilmiah, serta bimbingan akademik yang terstruktur.",
    style: "supportive",
    avatarInitialsHR: "EW",
    avatarInitialsUser: "SR",
    avatarBgClass: "from-teal-400 to-[#1e3a8a]",
    avatarUrlHR: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    avatarUrlUser: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
    descHR: "Evaluasi kesesuaian akademik magang MBKM, kesiapan etis di lingkungan luar kampus, dan motivasi belajar.",
    descUser: "Menguji argumentasi teoretis (semiotika, agenda setting, analisis isi), metodologi riset digital, dan landasan tugas akhir.",
    difficulty: "Mudah"
  }
];

interface Message {
  role: "system" | "interviewer" | "user";
  text: string;
  weaknessTriggered?: string;
  stressSignal?: boolean;
}

export default function TabInterviewCoach() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(companyPersonas[0]);
  const [pov, setPov] = useState<"hr" | "user">("user"); // POV state: hr / user
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes timer
  const [anxietyLevel, setAnxietyLevel] = useState<number>(15); // Percentage
  const [wordCount, setWordCount] = useState<number>(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState<number>(Date.now());
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [sessionReport, setSessionReport] = useState<any>(null);

  // Virtual Assistant UI specific states
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isAssistantTalking, setIsAssistantTalking] = useState<boolean>(false);

  // Sinyal titik lemah riil bidang komunikasi & humas (SIAKAD & Audit)
  const studentWeaknesses = [
    "Social Listening Tool Gap - Belum terbiasa melacak sentiment noise (Brand24)",
    "Crisis Communications Reputational Risk - Kurangnya draf kontinjensi taktis",
    "Semiotics & Core Comms Theory - Kelemahan landasan teoretis analisis pesan khalayak"
  ];

  // Dynamic set of questions structured for both HR and User Points of View!
  const interviewQuestions: { [key: string]: { hr: string[]; user: string[] } } = {
    p1: {
      hr: [
        "Halo Rizky. Di dunia agensi sekreatif Ogilvy, jam kerja seringkali sangat dinamis dengan tingkat tuntutan klien yang tinggi. Bagaimana Anda secara personal mengelola tingkat stres pribadi saat menghadapi deadline dadakan?",
        "Deskripsikan situasi di saat Anda harus berkolaborasi dengan rekan satu kelompok di UNESA yang memiliki gaya komunikasi bertolak belakang. Cara persuasif apa yang Anda ambil?",
        "Sebagai calon pekerja magang, apa motivasi terbesar Anda mengajukan diri di Ogilvy Indonesia dibandingkan agensi humas lokal skala kecil?",
        "Pertanyaan penutup HR: Jika terjadi benturan tajam antara objektivitas riset Anda dengan keinginan visual sepihak dari klien, opsi kompromi komunikasi apa yang akan Anda ajukan?"
      ],
      user: [
        "Wah Rizky, menyambung draf portofoliomu. Dalam menyusun perencanaan kampanye digital, formula atau matriks komunikasi khalayak seperti apa yang Anda gunakan untuk mengukur keberhasilan narasi pesan?",
        "Menarik. Jika tingkat sentimen positif terhadap klien kita tiba-tiba ansor akibat cuitan blunder dari influencer berbayar, tindakan taktis reputasional apa yang Anda tawarkan pada 2 jam pertama?",
        "Mari lebih teoretis. Bagaimana Anda mengaplikasikan model semiotika sosial atau pembedahan wacana kritis secara praktis untuk mendeteksi agenda terselubung dari media pesaing?",
        "Studi kasus akhir: Bagaimana Anda membuktikan efektivitas taktis rilis pers yang Anda buat ke hadapan jurnalis media nasional yang cenderung skeptis untuk meliput?"
      ]
    },
    p2: {
      hr: [
        "Selamat pagi, Rizky. Di Unilever, kami sangat menjunjung tinggi integritas keberlanjutan dan etika publik yang sehat (ESG). Bagaimana pemahaman pribadi Anda terkait kontribusi nyata program humas terhadap kelestarian lingkungan?",
        "Saat terjadi ketegangan atau friksi pendapat dalam organisasi kemahasiswaan Anda di kampus, peran komunikasi apa yang biasanya Anda ambil untuk memitigasi eskalasi konflik?",
        "Unilever adalah korporat multinasional berstruktur formal. Sejauh mana Anda siap beradaptasi dengan birokrasi komunikasi korporasi yang berlapis namun sistematis?",
        "Terakhir dari sisi HR: Ceritakan satu kesalahan strategis komunikasi terbaik Anda selama kuliah dan pelajaran kepemimpinan berharga apa yang berhasil Anda petik?"
      ],
      user: [
        "Selamat pagi, Rizky. Di divisi Corporate Relations Unilever, perlindungan reputasi korporat pasca isu sensitif adalah hal krusial. Bagaimana Anda merancang draf rencana audit reputasi menggunakan media listening?",
        "Jika kita dituntut meluncurkan program CSR (Corporate Social Responsibility) baru untuk mengimbangi sentimen negatif khalayak luar, indikator keberhasilan (KPI) media relations apa yang Anda tetapkan?",
        "Jelaskan perbedaan sosiologis esensial antara strategi komunikasi krisis yang bersifat defensif reaktif vs komunikatif proaktif dalam mempertahankan ekuitas merek Unilever!",
        "Studi kasus akhir: Bagaimana Anda merumuskan langkah dialog konstruktif menghadapi kelompok komunitas eksternal yang melakukan aksi demonstrasi di depan pintu gerbang pabrik?"
      ]
    },
    p3: {
      hr: [
        "Halo Rizky. Di ekosistem startup terintegrasi seperti GoTo, inisiatif mandiri tanpa instruksi detail adalah kunci. Ceritakan satu contoh proyek mandiri digital kehumasan yang pernah Anda buat!",
        "Bagaimana Anda menyikapi target kuantitatif konversi kampanye yang berubah sangat dinamis setiap bulannya? Apakah Anda merasa nyaman belajar di bawah ketidakpastian?",
        "Bagaimana Anda menyeimbangkan alokasi waktu magang bersertifikat yang intensif di Jakarta dengan tanggung jawab akademik sisa SKS Anda di Ilmu Komunikasi UNESA?",
        "Pertanyaan pamungkas HR: Nilai orisinalitas apa yang membuat Anda merasa jauh lebih layak meloloskan seleksi kami dibanding puluhan pendaftar unggulan lainnya?"
      ],
      user: [
        "Halo Rizky. Di tim kampanye GoFood, kita memanfaatkan analitika big data platform sosial secara intensif. Coba paparkan bagaimana Anda melakukan operasionalisasi data sentimen sebelum meluncurkan draf kampanye?",
        "Bagaimana Anda membagi taktik pengemasan pesan di Instagram vs TikTok saat menargetkan konversi retensi Gen-Z yang secara ilmiah memiliki attention span di bawah 8 detik?",
        "Di portofoliomu Anda menyebutkan tools listening. Bagaimana Anda secara metodologis memilah noise data atau bot di media sosial saat melacak pembicaraan viral terkait GoTo?",
        "Jika diberikan budget komunikasi terbatas, bagaimana Anda menghitung rasio media mix ideal antara earned media (pemberitaan media gratis) dan paid media (iklan media luar ruang)?"
      ]
    },
    p4: {
      hr: [
        "Halo Rizky Aditya. Di program bimbingan akademik, Ibu ingin tahu apa visi karir utama yang ingin Anda kejar dalam 2 tahun pasca lulus dari prodi Ilmu Komunikasi UNESA ini?",
        "Etika keprofesian humas adalah pilar moral lulusan kita. Bagaimana Anda menerapkan komitmen kode etik Perhumas Indonesia dalam kehidupan berorganisasi Anda sehari-hari?",
        "Mengapa Anda bertekad kuat mendalami pemetaan karir Social Media & Digital PR ini sejak semester satu, dan topik mata kuliah riset apa yang paling melandasi ketertarikan Anda?",
        "Sebelum Ibu tandatangani rekomendasimu ke program MBKM, komitmen konkret apa yang bisa Anda janjikan untuk menjaga nama baik almamater prodi kita di dunia agensi profesional?"
      ],
      user: [
        "Rizky, dalam menyusun draf portofolio analisis taktis kehumasan, bagaimana Anda memastikan bahwa teori komunikasi yang Anda gunakan tidak sebatas hafalan melainkan terserap logis dalam naskah?",
        "Ibu ingin menguji pemahaman metodologi penelitian Anda: Coba jabarkan desain uji kuesioner skala Likert untuk mengukur pengaruh terpaan pesan rilis krisis publik di lingkungan kampus!",
        "Seberapa jauh draf artikel jurnal atau analisis studi kasus yang Anda bantu susun bersama asisten dosen telah mencerminkan penyelesaian problem riil kehumasan di jawa timur?",
        "Terakhir: Bagaimana Anda mendesain bab ulasan pembahasan riset Anda agar tajam secara semiotika sosiologis dalam menyingkap rekayasa persepsi media digital?"
      ]
    }
  };

  // Sound TTS speech engine utilizing window.speechSynthesis
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    
    // Cancel any ongoing speaking
    window.speechSynthesis.cancel();
    
    if (!voiceEnabled) {
      setIsAssistantTalking(false);
      return;
    }
    
    // Filter tags/placeholders to make the spoken audio clear and human
    const cleanForSpeech = text
      .replace(/M\d+\.\d+/g, "") // clear M6.6 labels
      .replace(/SIAKAD/gi, "Siakad")
      .replace(/UNESA/gi, "U nesa")
      .replace(/[^a-zA-Z0-9\s.,?!-]/g, " ");

    const utterance = new SpeechSynthesisUtterance(cleanForSpeech);
    
    // Choose Indonesian voice if possible
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(v => v.lang.includes("id") || v.lang.includes("ID"));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }
    
    // Match pitch variations slightly to sound female for Persona Siti/Dra. Endang or male/etc
    const isFemale = selectedPersona.id === "p4" || (selectedPersona.id === "p1" && pov === "hr") || (selectedPersona.id === "p2" && pov === "hr");
    utterance.pitch = isFemale ? 1.15 : 0.95;
    utterance.rate = 1.0;
    
    utterance.onstart = () => {
      setIsAssistantTalking(true);
    };
    utterance.onend = () => {
      setIsAssistantTalking(false);
    };
    utterance.onerror = () => {
      setIsAssistantTalking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Re-trigger voice read
  const replayVoice = () => {
    const interviewerMessages = messages.filter(m => m.role === "interviewer");
    if (interviewerMessages.length > 0) {
      const lastQ = interviewerMessages[interviewerMessages.length - 1].text;
      speakText(lastQ);
    }
  };

  const startSession = () => {
    setIsSessionActive(true);
    setHasCompleted(false);
    setSessionReport(null);
    setAnxietyLevel(12);
    setResponseTimes([]);
    setLastMessageTime(Date.now());
    
    const firstBotQuestion = interviewQuestions[selectedPersona.id][pov][0];
    const initialText = `Halo Rizky Aditya Pratama! Terima kasih sudah hadir dalam sesi seleksi ${selectedPersona.company}. ${firstBotQuestion}`;
    
    setMessages([
      {
        role: "system",
        text: `Briefing Sesi: Anda sedang diwawancarai dari ${pov === "hr" ? "Sisi HR (Evaluasi Budaya & Karakter)" : "Sisi User (Evaluasi Teknis Kampanye & Krisis)"} oleh ${pov === "hr" ? selectedPersona.nameHR : selectedPersona.nameUser} mewakili ${selectedPersona.company}.`
      },
      {
        role: "interviewer",
        text: initialText
      }
    ]);
    setTimeRemaining(300);
    
    // Delay speech slightly to allow components to mount and voice list load
    setTimeout(() => {
      speakText(initialText);
    }, 200);
  };

  // Dynamic Stress Signature Simulator
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCurrentInput(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);

    const timeDelta = (Date.now() - lastMessageTime) / 1000;
    let computedStress = 12;
    if (timeDelta > 45) {
      computedStress += 25; // delay penalty
    } else if (timeDelta > 25) {
      computedStress += 12;
    }
    if (words > 0 && words < 12) {
      computedStress += 15; // too short penalty
    }
    setAnxietyLevel(Math.min(95, Math.max(8, computedStress)));
  };

  const submitAnswer = () => {
    if (!currentInput.trim()) return;

    // Stop speaking currently to answer
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsAssistantTalking(false);

    const currentMsgIndex = messages.filter(m => m.role === "interviewer").length;
    const questionsList = interviewQuestions[selectedPersona.id][pov];
    const timeTaken = (Date.now() - lastMessageTime) / 1000;
    setResponseTimes(prev => [...prev, timeTaken]);

    const userMessage: Message = {
      role: "user",
      text: currentInput,
      stressSignal: anxietyLevel > 40
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput("");
    setWordCount(0);
    setLoadingAI(true);

    setTimeout(() => {
      setLoadingAI(false);
      setLastMessageTime(Date.now());

      if (currentMsgIndex < questionsList.length) {
        // Next adaptive adaptive question
        const nextQ = questionsList[currentMsgIndex];
        const weaknessRef = studentWeaknesses[currentMsgIndex % studentWeaknesses.length];
        
        let prefQuote = "";
        if (selectedPersona.style === "tough" && userMessage.stressSignal) {
          prefQuote = "Saya perhatikan jawaban Anda singkat atau sempat berhenti lama. Mari ulas sudut ini: ";
        } else if (selectedPersona.style === "supportive" && userMessage.stressSignal) {
          prefQuote = "Tenang saja Rizky, tidak usah terburu-buru. Kita sedang berdiskusi secara konstruktif. Ibu ingin Anda menjelaskan tentang: ";
        }

        const fullResponse = `${prefQuote}${nextQ}`;
        setMessages(prev => [
          ...prev,
          {
            role: "interviewer",
            text: fullResponse,
            weaknessTriggered: weaknessRef
          }
        ]);
        
        setAnxietyLevel(prev => Math.max(10, Math.floor(prev * 0.5)));
        speakText(fullResponse);
      } else {
        // Complete interview
        setIsSessionActive(false);
        setHasCompleted(true);
        generateReport(messages.concat(userMessage));
      }
    }, 1200);
  };

  const generateReport = (finalMessages: Message[]) => {
    const score = Math.min(97, Math.max(48, Math.floor(
      (selectedPersona.style === "supportive" ? 83 : 70) + 
      (finalMessages.filter(m => m.role === 'user' && m.text.length > 70).length * 7) - 
      (finalMessages.filter(m => m.stressSignal).length * 5)
    )));

    const resultReport = {
      overallScore: score,
      strengths: [
        "Kemampuan mengaitkan teori semiotika kehumasan ke dalam taktik meredam rumor cukup baik.",
        "Menunjukkan kesadaran tinggi terkait perlindungan citra keberlanjutan (ESG UNESA).",
        selectedPersona.id === "p1" ? "Ketajaman logika taktis menyusun draf rilis pers yang informatif." : "Memiliki inisiatif tinggi berbaur dengan kultur dinamis korporat."
      ],
      gaps: [
        "Masih belum terampil menjelaskan pola kuantitatif monitoring alat s0cial listening (Brand24).",
        "Pola intonasi struktur teks terdeteksi defensif saat ditantang krisis mendadak.",
        "Argumen pemisahan segmentasi saluran komunikasi krisis digital masih perlu didalami."
      ],
      shapFactors: [
        { name: "SIAKAD Komunikasi Krisis Boost", share: 24, desc: "Pendorong nilai berdasarkan performa UAS teori media (Nilai: 88)", negative: false },
        { name: "Social Listening Deficit", share: -14, desc: "Penentu negatif akibat keraguan menjawab studi kasus instrumen monitoring", negative: true },
        { name: "Anxiety Spike Signal", share: -7, desc: "Skor melemah akibat text-reply di bawah 15 kata pada pertanyaan krusial", negative: true },
        { name: "Brand Reputational Alignment", share: 15, desc: "Nilai tambah berdasarkan draf portofolio analisis kampanye MBKM (Nilai SKS: 3.5)", negative: false }
      ],
      recommendation: "Kerangka dasar PR Anda kuat, namun pastikan meluangkan waktu mempelajari operasional instrumen s0cial listening radar di bawah ini.",
      recomResource: {
        title: "Social Listening Tools, Big Data Trends & Reputation Management",
        platform: "Asosiasi Humas Indonesia (Indonesia PR Pass)",
        url: "#"
      },
      nextSuggestedSession: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    };

    setSessionReport(resultReport);
  };

  const handleForceEnd = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsAssistantTalking(false);
    setIsSessionActive(false);
    setHasCompleted(true);
    generateReport(messages);
  };

  // Speak when window synthesizes list of voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in" id="interview-coach-root">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-teal-900/60 via-slate-900/80 to-blue-950 p-5 rounded-2xl border border-teal-800/30 relative overflow-hidden shadow-md" id="coach-header">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BrainCircuit size={100} className="text-teal-400 animate-pulse" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-600 text-white shadow-sm flex items-center gap-1">
                <Sparkle size={10} className="animate-spin-slow" /> M6.6 - M6.10 INTERACTION PORTAL
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 font-mono">
                PERSPEKTIF: {pov === "hr" ? "HR SPECIALIST" : "SPECIALIST/USER LEAD"}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1.5 font-sans tracking-tight">
              Virtual Assistant Interview Coach &amp; Employer POV Simulator
            </h2>
            <p className="text-xs text-slate-350 mt-1 leading-relaxed max-w-2xl">
              Simulasi wawancara kerja adaptif interaktif. Didukung **Audio Speech-to-Ear**, video visual companion, serta peralihan sudut pandang **Sisi HRD (Budaya Korporasi)** vs **Sisi User (Kompetensi Komunikasi &amp; PR)**.
            </p>
          </div>
          {!isSessionActive && (
            <button
              onClick={startSession}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-black rounded-xl cursor-pointer flex items-center gap-2 transition-all self-start md:self-center shadow-lg shadow-teal-600/20"
              id="start-interview-btn"
            >
              <Activity size={15} className="animate-pulse" /> Mulai Simulasi Baru
            </button>
          )}
        </div>
      </div>

      {/* ADJUSTABLE INTERVIEW PERSPECTIVE selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm" id="global-pov-controller">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl border border-teal-100">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Konfigurasi Perspektif Wawancara (Interview POV)</span>
              <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded font-bold text-[8px] uppercase">Pilihan Bebas</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Tentukan arah pertanyaan simulator: HR (Soft skills, kesiapan mental) atau User (Studi kasus kehumasan riil).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto" id="pov-buttons-container">
          <button
            type="button"
            disabled={isSessionActive}
            onClick={() => setPov("hr")}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              pov === "hr"
                ? "bg-white text-teal-750 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-900 bg-transparent border-0"
            } ${isSessionActive ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isSessionActive ? "Selesaikan wawancara aktif untuk merubah parameter" : "Uji ketahanan psikologis & budaya korporasi"}
          >
            <Briefcase size={14} /> Sisi HR Specialist
          </button>
          <button
            type="button"
            disabled={isSessionActive}
            onClick={() => setPov("user")}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              pov === "user"
                ? "bg-white text-teal-750 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-900 bg-transparent border-0"
            } ${isSessionActive ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isSessionActive ? "Selesaikan wawancara aktif untuk merubah parameter" : "Uji kemampuan teknis media & kampanye PR"}
          >
            <User size={14} /> Sisi User / Line Manager
          </button>
        </div>
      </div>

      {/* PARENT INTERACTIVE SIMULATION CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="interact-layout">
        
        {/* LEFT COLUMN: SELECTED RECRUITER COHORT */}
        <div className="lg:col-span-4 space-y-4" id="left-controls-col">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4" id="persona-selector">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-700 flex items-center gap-1">
              <span>📋 Pilih Target Perusahaan</span>
            </h3>
            <p className="text-[11px] text-slate-550 leading-relaxed font-semibold">
              Kultur dan jenis pertanyaan otomatis mengadaptasi kurikulum komunikasi serta prasyarat rekrutmen perusahaan.
            </p>
            
            <div className="space-y-3 pt-1" id="persona-list">
              {companyPersonas.map((p) => {
                const isSelected = selectedPersona.id === p.id;
                const activeInterviewerName = pov === "hr" ? p.nameHR : p.nameUser;
                const activeRoleName = pov === "hr" ? p.roleHR : p.roleUser;
                const activeDesc = pov === "hr" ? p.descHR : p.descUser;
                const initials = pov === "hr" ? p.avatarInitialsHR : p.avatarInitialsUser;

                return (
                  <button
                    key={p.id}
                    disabled={isSessionActive}
                    onClick={() => setSelectedPersona(p)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                      isSessionActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    } ${
                      isSelected 
                        ? "bg-teal-50/50 border-teal-600 text-teal-900 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-350"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0 bg-gradient-to-br ${p.avatarBgClass} shadow`}>
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-[11px] font-black leading-tight text-slate-900 truncate">{activeInterviewerName}</h4>
                        <span className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded ${
                          p.difficulty === "Mudah" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          p.difficulty === "Sedang" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}>
                          {p.difficulty}
                        </span>
                      </div>
                      <p className="text-[10px] text-teal-700 font-bold mt-0.5">{p.company}</p>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5 font-bold">{activeRoleName}</p>
                      <p className="text-[9px] text-slate-400 leading-tight mt-1 line-clamp-2">{activeDesc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Disclaimer BR-EPS-02 Banner */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2 text-[9px] text-slate-400 font-medium leading-normal" id="disclaimer-banner">
              <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>BR-EPS-02 Disclaimer:</strong> Agen bimbingan virtual ini berpatokan pada ulasan taktis publik Ilmu Komunikasi UNESA &amp; industri terkait.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE DIALOG OR REPORT VIEW */}
        <div className="lg:col-span-8 flex flex-col justify-between" id="right-interact-col">
          
          {/* SIMULATION SESSION COMPONENT */}
          <AnimatePresence mode="wait">
            {isSessionActive ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm min-h-[550px]"
                id="interview-session-box"
              >
                {/* Upper Status Panel */}
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping"></span>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                        Sesi Wawancara Aktif
                      </h4>
                      <p className="text-[9px] text-slate-400">
                        Target: {pov === "hr" ? selectedPersona.nameHR : selectedPersona.nameUser} ({selectedPersona.company})
                      </p>
                    </div>
                  </div>

                  {/* Anxiety Stress Indication */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Indeks Ketegangan (EC-AIC-02)</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              anxietyLevel > 60 ? "bg-rose-500" : anxietyLevel > 35 ? "bg-amber-500" : "bg-teal-500"
                            }`}
                            style={{ width: `${anxietyLevel}%` }}
                          ></div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold ${
                          anxietyLevel > 60 ? "text-rose-500" : anxietyLevel > 35 ? "text-amber-500" : "text-teal-600"
                        }`}>{anxietyLevel}% {anxietyLevel > 60 ? "Tinggi" : anxietyLevel > 35 ? "Sedang" : "Normal"}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleForceEnd}
                      className="px-2.5 py-1.5 border border-slate-200 hover:bg-rose-50 text-[10px] text-rose-600 rounded-lg cursor-pointer transition-colors font-bold"
                    >
                      Hentikan
                    </button>
                  </div>
                </div>

                {/* VISUAL COMPANION VIRTUAL ASSISTANT AVATAR CONSOLE */}
                <div className="bg-slate-900 text-white p-4 border-b border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center justify-between" id="virtual-companion-view">
                  
                  {/* Left: Interactive Avatar Frame with glowing states */}
                  <div className="md:col-span-5 flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 relative overflow-hidden">
                    
                    {/* Blinking camera light */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[7px] text-slate-450 font-mono tracking-widest">LIVE_FEED</span>
                    </div>

                    {/* Camera grid background effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-teal-500/5 to-transparent pointer-events-none opacity-40"></div>

                    {/* The glowing avatar ring with real photo picture - M6.2 virtual assistant */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center font-black text-sm text-white bg-gradient-to-br ${selectedPersona.avatarBgClass} shadow-xl transition-all duration-300 relative z-10 ${
                        isAssistantTalking 
                          ? "ring-4 ring-teal-400 ring-offset-2 ring-offset-slate-950 scale-105" 
                          : loadingAI 
                            ? "ring-4 ring-indigo-500 animate-pulse" 
                            : "ring-2 ring-blue-550/50"
                      }`}>
                        <img 
                          src={pov === "hr" ? selectedPersona.avatarUrlHR : selectedPersona.avatarUrlUser} 
                          alt={pov === "hr" ? selectedPersona.nameHR : selectedPersona.nameUser}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform scale-110 hover:scale-125 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = "0";
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black tracking-wider leading-none z-0">
                          {pov === "hr" ? selectedPersona.avatarInitialsHR : selectedPersona.avatarInitialsUser}
                        </span>
                      </div>
                      
                      {/* Interactive visual radar sonar wave */}
                      {isAssistantTalking && (
                        <div className="absolute -inset-1.5 rounded-full border-2 border-teal-400 animate-ping opacity-45 z-0"></div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="p-0.5 bg-teal-500 rounded text-[7px] text-slate-905 font-black uppercase">Interviewer</span>
                        <span className="text-[8px] text-slate-400 font-mono font-bold">POV: {pov.toUpperCase()}</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-100 truncate mt-1">
                        {pov === "hr" ? selectedPersona.nameHR : selectedPersona.nameUser}
                      </h4>
                      <p className="text-[9px] text-slate-400 leading-none truncate font-semibold mt-0.5">
                        {pov === "hr" ? selectedPersona.roleHR : selectedPersona.roleUser}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Speech Waves Generator */}
                  <div className="md:col-span-4 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 h-full flex flex-col justify-center text-center space-y-1">
                    <span className="text-[8px] text-slate-450 uppercase font-bold tracking-widest block">Sound Waveform</span>
                    
                    {/* Animated voice bar bars */}
                    <div className="flex items-end justify-center gap-1 h-5 mt-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar, i) => {
                        const defaultHeights = [15, 6, 12, 18, 9, 11, 19, 13, 7, 14, 16, 5];
                        const ht = isAssistantTalking 
                          ? `${Math.sin(bar * 0.6) * 12 + 13}px` 
                          : loadingAI 
                            ? `${defaultHeights[i] * 0.4}px`
                            : "3px";
                        return (
                          <span
                            key={i}
                            className={`w-1 rounded-full transition-all duration-200 ${
                              isAssistantTalking ? "bg-teal-400" : loadingAI ? "bg-indigo-500 animate-pulse" : "bg-slate-700"
                            }`}
                            style={{ 
                              height: ht,
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    <span className="text-[8px] text-teal-400 font-bold tracking-wider font-mono uppercase block pt-1.5">
                      {isAssistantTalking ? "• Asisten Sedang Berbicara" : loadingAI ? "• Asisten Menganalisis Jawaban" : "• Menunggu Suara Anda"}
                    </span>
                  </div>

                  {/* Right: Audio Synthesizer Controller Options */}
                  <div className="md:col-span-3 flex flex-col justify-between h-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-[9px] text-slate-400">
                      <span className="font-bold flex items-center gap-1">
                        <Video size={11} className="text-teal-500" /> Web-Voice TTS
                      </span>
                      <span className="px-1 bg-teal-950 text-teal-400 rounded text-[7px] font-bold">ONLINE</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const newState = !voiceEnabled;
                          setVoiceEnabled(newState);
                          if (!newState && "speechSynthesis" in window) {
                            window.speechSynthesis.cancel();
                            setIsAssistantTalking(false);
                          } else {
                            replayVoice();
                          }
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-[9px] font-black cursor-pointer transition-colors flex items-center justify-center gap-1 ${
                          voiceEnabled 
                            ? "bg-teal-600 hover:bg-teal-700 text-white" 
                            : "bg-slate-800 hover:bg-slate-750 text-slate-350"
                        }`}
                        title="Aktifkan atau matikan suara asisten"
                      >
                        {voiceEnabled ? (
                          <>
                            <Volume2 size={11} /> Suara Aktif
                          </>
                        ) : (
                          <>
                            <VolumeX size={11} /> Suara Senyap
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={replayVoice}
                        disabled={loadingAI}
                        className="p-1 px-2 border border-slate-800 hover:bg-slate-900 border-0 bg-slate-850 rounded-lg text-slate-300 ml-auto cursor-pointer transition-colors text-[9px] font-bold flex items-center justify-center gap-1"
                        title="Ulangi perkataan asisten"
                      >
                        <RefreshCw size={10} /> Ulangi
                      </button>
                    </div>
                  </div>

                </div>

                {/* Dialog Messages Loop */}
                <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[300px]" id="dialog-wrapper">
                  {messages.map((m, i) => {
                    if (m.role === "system") {
                      return (
                        <div key={i} className="bg-teal-50/50 p-3 rounded-lg border border-teal-100/50 text-[10px] text-slate-500 flex items-start gap-2">
                          <MessageSquare size={14} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{m.text}</span>
                        </div>
                      );
                    }
                    const isBot = m.role === "interviewer";
                    const initials = pov === "hr" ? selectedPersona.avatarInitialsHR : selectedPersona.avatarInitialsUser;
                    return (
                      <div key={i} className={`flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2.5`}>
                        {isBot && (
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedPersona.avatarBgClass} text-white font-black text-xs flex items-center justify-center shrink-0 shadow`}>
                            {initials}
                          </div>
                        )}
                        <div className={`max-w-[75%] p-3.5 rounded-2xl text-[11px] leading-relaxed relative ${
                          isBot 
                            ? "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none" 
                            : "bg-teal-600 text-white rounded-tr-none shadow-sm"
                        }`}>
                          
                          {/* Inner weakness mapping tags */}
                          {m.weaknessTriggered && isBot && (
                            <span className="absolute -top-2 right-3 px-1.5 py-0.2 bg-teal-50 text-teal-700 font-extrabold font-mono text-[7px] border border-teal-100 rounded uppercase tracking-wider block">
                              SIAKAD PEAK: Area Terdeteksi
                            </span>
                          )}

                          <p>{m.text}</p>
                          
                          {i === messages.length - 1 && isBot && (
                            <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[8.5px] text-slate-400">
                              <Volume2 size={11} className="text-teal-600 animate-pulse" />
                              <span>Dynamic calibration: Tone asisten {selectedPersona.style} diaktifkan.</span>
                            </div>
                          )}
                        </div>
                        {!isBot && (
                          <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm font-mono border border-teal-500">
                            ME
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {loadingAI && (
                    <div className="flex items-center gap-2 text-[10px] text-slate-405 font-mono">
                      <RefreshCw size={12} className="animate-spin text-teal-500" />
                      <span>{pov === "hr" ? selectedPersona.nameHR : selectedPersona.nameUser} sedang mengulas landasan argumen kehumasan Anda...</span>
                    </div>
                  )}
                </div>

                {/* Bottom Input Area */}
                <div className="p-4 border-t border-slate-205 space-y-3 bg-slate-50/50">
                  <div className="flex items-center justify-between text-[9px] text-slate-450 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} className="text-teal-600" />
                      Estimasi Batas Mengetik: <strong>45 Detik</strong> (Anxiety Trigger: {wordCount < 12 && wordCount > 0 ? "Spike" : "Normal"})
                    </span>
                    <span>Jumlah kata: <strong>{wordCount} kata</strong> (Respons minimal 15 kata untuk kualitas narasi kokoh)</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <textarea
                      value={currentInput}
                      onChange={handleInputChange}
                      placeholder="Ketik draf argumen / naskah kehumasan Anda secara rinci di sini untuk dinilai..."
                      className="flex-1 min-h-[50px] p-2.5 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-800 outline-none focus:border-teal-500 font-sans shadow-inner focus:bg-white"
                    />
                    <button
                      onClick={submitAnswer}
                      disabled={loadingAI || !currentInput.trim()}
                      className="px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-md shadow-teal-600/10"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>

              </motion.div>
            ) : hasCompleted && sessionReport ? (
              /* REPORT MODULE */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 shadow-md space-y-6"
                id="interview-report"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-850 font-black uppercase tracking-wider block bg-emerald-50 px-2 py-0.5 rounded w-fit">
                        Sesi Selesai (AC-AIC-04)
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-1 font-sans">
                        Sesi Rekomendasi &amp; Evaluasi Kompetensi Riil
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Skor Nilai Magang</span>
                    <strong className="text-3xl font-mono text-emerald-600 block mt-0.5">
                      {sessionReport.overallScore} <span className="text-xs text-slate-500 font-sans font-bold">/ 100</span>
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Report Panel */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-[11px] font-black uppercase text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Kekuatan Jawaban (Strengths)
                      </h5>
                      <ul className="mt-2 space-y-2 text-[10.5px] text-slate-650 leading-relaxed list-disc list-inside">
                        {sessionReport.strengths.map((s: string, i: number) => (
                           <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-[11px] font-black uppercase text-rose-700 flex items-center gap-1">
                        <AlertCircle size={13} /> Area Perbaikan Kritis (Weakness Gaps)
                      </h5>
                      <ul className="mt-2 space-y-2 text-[10.5px] text-slate-650 leading-relaxed list-disc list-inside">
                        {sessionReport.gaps.map((g: string, i: number) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Explainability Panel - SHAP Factors */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-205 space-y-3">
                    <h5 className="text-[11px] font-black uppercase text-slate-550 tracking-wider flex items-center gap-1.5">
                      <BarChart2 size={14} className="text-teal-600" /> Profil Atribusi Kontribusi (SHAP Explainability)
                    </h5>
                    <p className="text-[9.5px] text-slate-400 leading-normal">
                      Evaluasi faktor yang melandasi perolehan nilai, ditarik dari gabungan data akademik komunikasi (SIAKAD) dan pola kecepatan draf.
                    </p>

                    <div className="space-y-3 pt-2">
                      {sessionReport.shapFactors.map((factor: any, idx: number) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-[9.5px] font-bold">
                            <span className="text-slate-700">{factor.name}</span>
                            <span className={factor.negative ? "text-rose-600" : "text-emerald-600"}>
                              {factor.negative ? "-" : "+"}{Math.abs(factor.share)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden block">
                            <div 
                              className={`h-full ${factor.negative ? "bg-rose-500" : "bg-emerald-500"}`}
                              style={{ width: `${Math.min(100, Math.abs(factor.share) * 3)}%` }}
                            ></div>
                          </div>
                          <span className="text-[8.5px] text-slate-450 leading-none mt-0.5 block">{factor.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Resource Panel */}
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-emerald-800 font-black uppercase tracking-wider block">
                      Aksi Rekomendasi Belajar
                    </span>
                    <h6 className="text-[11px] font-black text-slate-800">
                      Selesaikan modul: {sessionReport.recomResource.title}
                    </h6>
                    <p className="text-[9.5px] text-slate-500 leading-normal">
                      Direkomendasikan langsung guna menutup defisit kualifikasi riset listening s0cial media di portofoliomu.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-[10px] text-slate-500 font-mono font-black">Platform: {sessionReport.recomResource.platform}</span>
                    <a
                      href={sessionReport.recomResource.url}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-black cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      Mulai Belajar <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Footer details prompt */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-slate-200 gap-4 text-[10px] text-slate-400">
                  <span className="font-mono">
                    Sesi Wawancara Berikutnya yang Disarankan: <strong>{sessionReport.nextSuggestedSession}</strong>
                  </span>
                  <button
                    onClick={startSession}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-black rounded-lg cursor-pointer transition-colors"
                  >
                    Mulai Ulang Simulasi
                  </button>
                </div>
              </motion.div>
            ) : (
              /* IDLE PREVIEW VIEW COMPONENT */
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center space-y-6 shadow-sm" id="idle-preview">
                <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                  <BrainCircuit size={32} />
                </div>
                <div className="space-y-2 max-w-lg">
                  <h3 className="text-base font-black text-slate-900">
                    Mulai Sesi Virtual Wawancara {pov === "hr" ? "Humas (Sisi HRD)" : "PR (Sisi User)"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sistem asisten virtual cerdas akan membaca performas SKS akademik Ilmu Komunikasi Anda, mendeteksi hambatan taktis bimbingan, lalu melontarkan skenario rilis pers atau mitigasi krisis sesuai target perusahaan.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl text-left pt-2.5">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-[10px] text-teal-650 block uppercase font-mono">1. Pilih Perspektif</span>
                    <strong className="text-xs text-slate-800 mt-1 block">HRD atau User Line</strong>
                    <p className="text-[9.5px] text-slate-450 leading-tight mt-0.5">HRD fokus pada kultur &amp; empati komunikasi; User fokus pada studi kasus rilis &amp; teori semiotika.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-[10px] text-teal-650 block uppercase font-mono">2. Asisten Bersuara</span>
                    <strong className="text-xs text-slate-800 mt-1 block">Audio TTS &amp; Waveform</strong>
                    <p className="text-[9.5px] text-slate-450 leading-tight mt-0.5">Asisten virtual membaca tulisan secara lisan disertai visualisasi spektrum suara.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-[10px] text-teal-650 block uppercase font-mono">3. Analisis Riil</span>
                    <strong className="text-xs text-slate-800 mt-1 block">Skor &amp; Atribusi SHAP</strong>
                    <p className="text-[9.5px] text-slate-450 leading-tight mt-0.5">Temukan pemetaan akurat korelasi nilai UTS teoritis dengan kecepatan draf Anda.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setPov("hr");
                      setTimeout(() => startSession());
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-xl cursor-pointer transition-all border border-slate-350"
                  >
                    Mulai Wawancara: Sisi HRD
                  </button>
                  <button
                    onClick={() => {
                      setPov("user");
                      setTimeout(() => startSession());
                    }}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black rounded-xl cursor-pointer shadow-lg shadow-teal-500/15 transition-all"
                  >
                    Mulai Wawancara: Sisi User (Technical PR)
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}

