import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Sprout, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw, 
  DollarSign, 
  Map, 
  ChevronRight,
  PieChart,
  Wallet,
  ArrowLeft,
  Download,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [luasLahan, setLuasLahan] = useState('');
  const [pendapatanKotor, setPendapatanKotor] = useState('');
  
  // UI States
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const resultRef = useRef(null);

  // --- UTILITIES ---
  const formatRupiah = (number) => {
    if (number === undefined || number === null) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
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
    setResult(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveData = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // --- CORE LOGIC (SIMULATION ALGORITHM) ---
  const generateSimulationData = () => {
    if (!luasLahan || !pendapatanKotor) {
      setError('Harap isi Luas Lahan dan Pendapatan Kotor untuk melanjutkan.');
      return;
    }

    const luas = parseFloat(luasLahan);
    const pendapatan = parseFloat(pendapatanKotor);

    if (luas < 10) {
      setError('Luas lahan terlalu kecil (minimal 10 m²).');
      return;
    }
    if (pendapatan < 100000) {
      setError('Pendapatan kotor tidak wajar (minimal Rp 100.000).');
      return;
    }

    setIsCalculating(true);
    setError('');

    // Simulasi SPA Loading & Network request (1.5s for professional feel)
    setTimeout(() => {
      const baseCostLahan = luas * 2500;
      
      let calculatedCost = (baseCostLahan * 0.3) + (pendapatan * 0.45);

      const maxCost = pendapatan * 0.85;
      const minCost = pendapatan * 0.20;
      
      if (calculatedCost > maxCost) calculatedCost = maxCost;
      if (calculatedCost < minCost) calculatedCost = minCost;

      const pendapatanBersih = pendapatan - calculatedCost;
      const margin = (pendapatanBersih / pendapatan) * 100;

      const rincianBiaya = [
        { id: 1, kategori: "Pupuk & Nutrisi", desc: "Urea, Phonska, ZA, Organik", rasio: 0.32, nominal: calculatedCost * 0.32, color: "bg-emerald-500" },
        { id: 2, kategori: "Tenaga Kerja", desc: "Pengolahan, Tanam, Tebang", rasio: 0.38, nominal: calculatedCost * 0.38, color: "bg-blue-500" },
        { id: 3, kategori: "Transportasi", desc: "Angkutan truk ke pabrik gula", rasio: 0.16, nominal: calculatedCost * 0.16, color: "bg-amber-500" },
        { id: 4, kategori: "Obat-obatan", desc: "Herbisida & pengendalian hama", rasio: 0.08, nominal: calculatedCost * 0.08, color: "bg-purple-500" },
        { id: 5, kategori: "Biaya Lainnya", desc: "Sewa traktor, irigasi, iuran", rasio: 0.06, nominal: calculatedCost * 0.06, color: "bg-slate-400" },
      ];

      setResult({
        luasLahan: luas,
        pendapatanKotor: pendapatan,
        totalPengeluaran: calculatedCost,
        pendapatanBersih: pendapatanBersih,
        margin: margin,
        rincian: rincianBiaya
      });
      
      setIsCalculating(false);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-200 flex flex-col relative overflow-x-hidden">
      
      {/* --- NOTIFICATION TOAST --- */}
      <div className={`fixed top-16 right-4 md:right-6 z-50 transition-all duration-500 transform ${showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <p className="font-medium text-xs sm:text-sm">Laporan berhasil disimpan!</p>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={resetForm}>
            <div className="bg-blue-600 p-1.5 rounded-md">
              <Sprout className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-sm leading-tight tracking-tight">Sensus Ekonomi</h1>
              <p className="text-[9px] text-blue-600 font-semibold tracking-wider uppercase">SE2026 • Modul Validasi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Online
            </span>
            {result && (
              <button 
                onClick={resetForm}
                className="md:hidden flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-5">
        
        {/* LEFT COLUMN: Input Form */}
        <div className={`w-full ${result || isCalculating ? 'md:w-1/3' : 'md:w-1/2 md:mx-auto'} transition-all duration-500 ease-in-out`}>
          
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 mb-1 tracking-tight">
              Alat Cepat Kalkulasi SE2026
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Kalkulator proporsional untuk memvalidasi struktur biaya produksi berdasarkan luas lahan dan pendapatan kotor.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="space-y-4">
              
              {/* Input Luas Lahan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  Luas Lahan Pertanian
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(luasLahan)}
                    onChange={(e) => handleInputChange(e, setLuasLahan)}
                    placeholder="10.000"
                    className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-[11px] font-medium text-slate-400">m²</span>
                  </div>
                </div>
              </div>

              {/* Input Pendapatan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  Pendapatan Kotor
                  <span className="text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">1 Musim</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-xs font-semibold text-slate-400 group-focus-within:text-blue-600 transition-colors">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(pendapatanKotor)}
                    onChange={(e) => handleInputChange(e, setPendapatanKotor)}
                    placeholder="85.000.000"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex items-start gap-2 text-red-700 bg-red-50 p-2.5 rounded-lg text-xs border border-red-100">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <p className="font-medium leading-tight">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={generateSimulationData}
                disabled={isCalculating || (!luasLahan && !pendapatanKotor)}
                className={`w-full py-2.5 mt-2 rounded-lg font-semibold text-xs text-white transition-all flex items-center justify-center gap-1.5
                  ${isCalculating 
                    ? 'bg-blue-400 cursor-wait' 
                    : (!luasLahan && !pendapatanKotor)
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
                  }`}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Memproses Data...
                  </>
                ) : (
                  <>
                    <Calculator className="w-3.5 h-3.5" />
                    Kalkulasi Profil Biaya
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Info Card */}
          {(!result && !isCalculating) && (
            <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-slate-600 text-xs">
              <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Gunakan alat ini untuk memvalidasi proporsi kewajaran struktur biaya operasional.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Results & Skeleton */}
        <div className={`w-full ${result || isCalculating ? 'md:w-2/3 block' : 'hidden'} transition-all duration-500`} ref={resultRef}>
          
          {/* --- SKELETON LOADING UI --- */}
          {isCalculating && (
            <div className="space-y-4 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-[90px] flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
                      <div className="w-12 h-3 bg-slate-100 rounded-md"></div>
                    </div>
                    <div>
                      <div className="h-2 bg-slate-200 rounded w-16 mb-1.5"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-xl border border-slate-100 p-5 h-[320px]">
                <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-50">
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-40 mb-1.5"></div>
                    <div className="h-2 bg-slate-100 rounded w-24"></div>
                  </div>
                  <div className="w-20 h-8 bg-slate-100 rounded-lg"></div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <div className="flex justify-between items-end">
                          <div>
                            <div className="h-3 bg-slate-200 rounded w-28 mb-1"></div>
                            <div className="h-2 bg-slate-100 rounded w-20"></div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="h-3 bg-slate-200 rounded w-24 mb-1"></div>
                          </div>
                       </div>
                       <div className="h-1.5 bg-slate-100 rounded-full w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- ACTUAL RESULT UI --- */}
          {!isCalculating && result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              
              <div className="md:hidden flex items-center justify-between mb-1">
                <h3 className="font-bold text-slate-800 text-sm">Hasil Kalkulasi</h3>
                <button onClick={resetForm} className="text-blue-600 flex items-center gap-1 text-[11px] font-semibold">
                  <ArrowLeft className="w-3 h-3" /> Kembali
                </button>
              </div>

              {/* Top Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="w-7 h-7 bg-slate-50 text-slate-600 rounded flex items-center justify-center border border-slate-100">
                      <Wallet className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">Input</span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-medium text-slate-500 mb-0.5">Pendapatan Kotor</p>
                    <p className="text-base font-bold text-slate-900 tracking-tight">{formatRupiah(result.pendapatanKotor)}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="w-7 h-7 bg-red-50 text-red-600 rounded flex items-center justify-center">
                      <PieChart className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Estimasi</span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-medium text-slate-500 mb-0.5">Total Operasional</p>
                    <p className="text-base font-bold text-red-600 tracking-tight">{formatRupiah(result.totalPengeluaran)}</p>
                  </div>
                </div>

                <div className="bg-blue-600 p-4 rounded-xl shadow-sm relative overflow-hidden text-white sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="w-7 h-7 bg-white/20 rounded flex items-center justify-center border border-white/10">
                      <TrendingUp className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                      Mar: {result.margin.toFixed(0)}%
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-medium text-blue-100 mb-0.5">Estimasi Laba Bersih</p>
                    <p className="text-base font-bold tracking-tight">{formatRupiah(result.pendapatanBersih)}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Rincian Komponen Biaya</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">Skala lahan {formatNumberWithSeparator(result.luasLahan)} m²</p>
                  </div>
                  <button 
                    onClick={handleSaveData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[11px] font-semibold transition-all active:scale-95"
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Simpan</span>
                  </button>
                </div>
                
                <div className="p-4 space-y-4">
                  {result.rincian.map((item, index) => (
                    <div key={item.id} className="relative">
                      <div className="flex justify-between items-end mb-1.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span>
                            <h4 className="font-semibold text-slate-800 text-xs">{item.kategori}</h4>
                          </div>
                          <p className="text-[9px] text-slate-500 mt-0.5 ml-3">{item.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-xs">{formatRupiah(item.nominal)}</p>
                          <p className="text-[9px] font-medium text-slate-400 mt-0.5">{(item.rasio * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.color} transition-all duration-[1000ms] ease-out`}
                          style={{ width: `${item.rasio * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:flex bg-slate-50/80 px-4 py-2.5 border-t border-slate-100 items-center justify-between">
                  <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Algoritma sukses.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Mulai Baru <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </main>
      
      {/* --- FOOTER --- */}
      <footer className="mt-auto py-3 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <p className="text-[10px] text-slate-400">
            &copy; 2026 Modul Validasi
          </p>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="cursor-pointer">Panduan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

