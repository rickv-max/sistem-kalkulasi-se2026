import React, { useState, useRef, useEffect } from 'react';

// --- INLINE ICONS ---
const IconSprout = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>;
const IconRefreshCw = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconMap = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const IconAlertCircle = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconInfo = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconWallet = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const IconPieChart = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>;
const IconTrendingUp = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const IconSparkles = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/></svg>;

export default function App() {
  // --- STATE MANAGEMENT ---
  const [luasLahan, setLuasLahan] = useState('');
  const [pendapatanKotor, setPendapatanKotor] = useState('');
  const [pengeluaranTotal, setPengeluaranTotal] = useState('');
  const [komoditas, setKomoditas] = useState('Padi'); // Tambahan konteks untuk AI
  
  // UI States
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  // AI States
  const [aiInsight, setAiInsight] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const resultRef = useRef(null);

  // --- UTILITIES ---
  const formatRupiah = (number) => {
    if (number === undefined || number === null) return '';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const formatNumberWithSeparator = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const handleInputChange = (e, setter) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setter(rawValue);
    if (error) setError('');
  };

  const resetForm = () => {
    setLuasLahan('');
    setPendapatanKotor('');
    setPengeluaranTotal('');
    setResult(null);
    setAiInsight('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- AI LOGIC (GROQ INTEGRATION) ---
  const fetchGroqInsights = async (calcData) => {
    setIsAiLoading(true);
    setAiInsight('');
    
    // Sesuaikan ini dengan setup framework Anda di Vercel (Next.js/Vite/CRA)
    const apiKey = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GROQ_API_KEY 
      ? process.env.NEXT_PUBLIC_GROQ_API_KEY 
      : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) 
        ? import.meta.env.VITE_GROQ_API_KEY 
        : ''; 

    if (!apiKey) {
      setAiInsight("⚠️ API Key Groq belum diset di Environment Vercel. Silakan tambahkan variabel NEXT_PUBLIC_GROQ_API_KEY.");
      setIsAiLoading(false);
      return;
    }

    const prompt = `Sebagai ahli ekonomi pertanian, berikan analisis singkat (maksimal 3 paragraf) berdasarkan data berikut:
    Komoditas: ${komoditas}
    Luas Lahan: ${calcData.luasLahan} m2
    Pendapatan Kotor: Rp ${calcData.pendapatanKotor}
    Total Pengeluaran: Rp ${calcData.totalPengeluaran}
    Laba Bersih: Rp ${calcData.pendapatanBersih}
    Margin: ${calcData.margin.toFixed(2)}%
    
    Berikan penilaian apakah ini efisien/wajar, dan beri 1-2 saran praktis untuk mengoptimalkan biaya. Gunakan bahasa Indonesia yang profesional namun mudah dipahami.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Model Groq yang cepat dan gratis
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setAiInsight(data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setAiInsight("Terjadi kesalahan saat mengambil analisis AI. Pastikan API key valid dan koneksi stabil.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- CORE LOGIC (SIMULATION ALGORITHM) ---
  const generateData = () => {
    if (!pendapatanKotor || !pengeluaranTotal) {
      setError('Harap isi Pendapatan Kotor dan Total Pengeluaran untuk melanjutkan.');
      return;
    }

    const pendapatan = parseFloat(pendapatanKotor);
    const pengeluaran = parseFloat(pengeluaranTotal);

    if (pendapatan < 100000) {
      setError('Pendapatan kotor tidak wajar (minimal Rp 100.000).');
      return;
    }

    setIsCalculating(true);
    setError('');

    // Simulasi loading UI untuk kalkulasi dasar
    setTimeout(() => {
      const pendapatanBersih = pendapatan - pengeluaran;
      const margin = (pendapatanBersih / pendapatan) * 100;

      const rincianBiaya = [
        { id: 1, kategori: "Pupuk & Nutrisi", desc: "Urea, NPK, Kompos", rasio: 0.32, nominal: pengeluaran * 0.32, color: "bg-emerald-500" },
        { id: 2, kategori: "Tenaga Kerja", desc: "Olah lahan, tanam, panen", rasio: 0.25, nominal: pengeluaran * 0.25, color: "bg-teal-500" },
        { id: 3, kategori: "Transportasi", desc: "Distribusi hasil panen", rasio: 0.21, nominal: pengeluaran * 0.21, color: "bg-cyan-500" },
        { id: 4, kategori: "Pestisida", desc: "Obat-obatan hama", rasio: 0.12, nominal: pengeluaran * 0.12, color: "bg-sky-500" },
        { id: 5, kategori: "Lainnya", desc: "Sewa alat, pengairan", rasio: 0.10, nominal: pengeluaran * 0.10, color: "bg-slate-300" },
      ];

      const calcResult = {
        luasLahan: parseFloat(luasLahan) || 0,
        pendapatanKotor: pendapatan,
        totalPengeluaran: pengeluaran,
        pendapatanBersih: pendapatanBersih,
        margin: margin,
        rincian: rincianBiaya
      };

      setResult(calcResult);
      setIsCalculating(false);
      
      // Panggil AI setelah kalkulasi selesai
      fetchGroqInsights(calcResult);
      
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans selection:bg-emerald-200">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetForm}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <IconSprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-base leading-tight">AgriSense AI</h1>
              <p className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase">Sensus Ekonomi • Groq Powered</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button onClick={resetForm} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-lg transition-all active:scale-95">
                <IconRefreshCw className="w-3.5 h-3.5" /> Reset Data
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Input Form */}
        <div className={`w-full ${result ? 'lg:w-[35%]' : 'max-w-xl mx-auto'} transition-all duration-700 ease-in-out`}>
          
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kalkulator Cerdas</h2>
            <p className="text-slate-500 text-sm mt-1">Masukkan data responden untuk analisis biaya otomatis yang diperkuat oleh Groq AI.</p>
          </div>

          <div className="bg-white rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
            <div className="space-y-5">
              
              {/* Komoditas */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Komoditas</label>
                <select 
                  value={komoditas}
                  onChange={(e) => setKomoditas(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none"
                >
                  <option value="Padi">Padi</option>
                  <option value="Jagung">Jagung</option>
                  <option value="Cabai">Cabai</option>
                  <option value="Bawang Merah">Bawang Merah</option>
                </select>
              </div>

              {/* Input Luas Lahan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Luas Lahan <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Opsional</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <IconMap className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(luasLahan)}
                    onChange={(e) => handleInputChange(e, setLuasLahan)}
                    placeholder="10.000"
                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs font-semibold text-slate-400">m²</span>
                  </div>
                </div>
              </div>

              {/* Input Pendapatan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Pendapatan Kotor (1 Siklus)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-400">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(pendapatanKotor)}
                    onChange={(e) => handleInputChange(e, setPendapatanKotor)}
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-2.5 font-semibold bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Input Pengeluaran */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Total Pengeluaran (1 Siklus)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-400">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(pengeluaranTotal)}
                    onChange={(e) => handleInputChange(e, setPengeluaranTotal)}
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-2.5 font-semibold bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-rose-600 bg-rose-50 p-3 rounded-xl text-sm border border-rose-100">
                  <IconAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="font-medium leading-snug">{error}</p>
                </div>
              )}

              <button
                onClick={generateData}
                disabled={isCalculating || !pendapatanKotor || !pengeluaranTotal}
                className={`w-full py-3 mt-4 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2
                  ${isCalculating 
                    ? 'bg-emerald-400 cursor-wait shadow-emerald-200' 
                    : (!pendapatanKotor || !pengeluaranTotal)
                      ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5'
                  }`}
              >
                {isCalculating ? (
                  <><IconRefreshCw className="w-4 h-4 animate-spin" /> Menganalisis...</>
                ) : (
                  <><IconSparkles className="w-4 h-4" /> Analisis Data dengan AI</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & AI Analysis */}
        <div className={`w-full ${result ? 'lg:w-[65%] opacity-100' : 'hidden opacity-0'} transition-all duration-700`} ref={resultRef}>
          
          {result && (
            <div className="space-y-6">
              
              {/* --- 1. AI INSIGHTS CARD (New Premium Feature) --- */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-1 shadow-xl shadow-indigo-500/10 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-40"></div>
                
                <div className="bg-[#1E293B]/80 backdrop-blur-xl rounded-xl p-5 sm:p-6 relative z-10 h-full border border-white/10">
                  <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
                    <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30">
                      <IconSparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-white text-base">Groq AI Analysis</h3>
                    <span className="ml-auto text-[9px] font-bold tracking-widest text-indigo-300 uppercase bg-indigo-500/10 px-2 py-1 rounded-full">Llama 3</span>
                  </div>
                  
                  {isAiLoading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-3 bg-slate-700 rounded-full w-3/4"></div>
                      <div className="h-3 bg-slate-700 rounded-full w-full"></div>
                      <div className="h-3 bg-slate-700 rounded-full w-5/6"></div>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                      {aiInsight.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* --- 2. SUMMARY METRICS --- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3">
                    <IconWallet className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">Pendapatan Kotor</p>
                  <p className="text-lg font-bold text-slate-800">{formatRupiah(result.pendapatanKotor)}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                  <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mb-3">
                    <IconPieChart className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">Total Pengeluaran</p>
                  <p className="text-lg font-bold text-slate-800">{formatRupiah(result.totalPengeluaran)}</p>
                </div>

                <div className={`p-5 rounded-2xl shadow-lg relative overflow-hidden text-white ${result.pendapatanBersih >= 0 ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/20'}`}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <IconTrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white/80 mb-1">
                    {result.pendapatanBersih >= 0 ? 'Laba Bersih' : 'Rugi Bersih'}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-lg font-bold">{formatRupiah(result.pendapatanBersih)}</p>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md">
                      Mar: {result.margin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* --- 3. DETAILED BREAKDOWN --- */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-5">Distribusi Komponen Biaya (Proporsional)</h3>
                <div className="space-y-5">
                  {result.rincian.map((item) => (
                    <div key={item.id} className="relative group">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full shadow-sm ${item.color}`}></span>
                            <h4 className="font-bold text-slate-700 text-sm">{item.kategori}</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 ml-4">{item.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800 text-sm">{formatRupiah(item.nominal)}</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{(item.rasio * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.rasio * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
