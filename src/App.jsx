import React, { useState, useRef } from 'react';

// --- INLINE ICONS ---
const IconSprout = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>;
const IconRefreshCw = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconMap = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const IconAlertCircle = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconWallet = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const IconPieChart = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>;
const IconTrendingUp = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const IconCpu = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>;
const IconBuilding = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;

// --- DATABASE ALGORITMA RASIO EKONOMI ---
const BUSINESS_DB = {
  "Pertanian Pangan": {
    "Padi Sawah": { margin: 0.60, breakdown: [{ n: "Tenaga Kerja (Tanam/Panen)", r: 0.45, c: "bg-teal-500" }, { n: "Pupuk & Nutrisi", r: 0.35, c: "bg-emerald-500" }, { n: "Benih & Obat", r: 0.15, c: "bg-sky-500" }, { n: "Pemeliharaan/Air", r: 0.05, c: "bg-cyan-500" }] },
    "Jagung": { margin: 0.62, breakdown: [{ n: "Pupuk Dasar & Susulan", r: 0.40, c: "bg-emerald-500" }, { n: "Tenaga Kerja", r: 0.35, c: "bg-teal-500" }, { n: "Benih", r: 0.15, c: "bg-amber-500" }, { n: "Perawatan/Lainnya", r: 0.10, c: "bg-slate-400" }] },
    "Kedelai / Kacang": { margin: 0.60, breakdown: [{ n: "Tenaga Kerja", r: 0.45, c: "bg-teal-500" }, { n: "Benih", r: 0.25, c: "bg-amber-500" }, { n: "Pupuk & Obat", r: 0.20, c: "bg-emerald-500" }, { n: "Perawatan", r: 0.10, c: "bg-slate-400" }] },
    "Singkong / Ubi": { margin: 0.65, breakdown: [{ n: "Tenaga Kerja (Panen & Olah)", r: 0.60, c: "bg-teal-500" }, { n: "Pupuk Dasar", r: 0.25, c: "bg-emerald-500" }, { n: "Transportasi/Angkut", r: 0.15, c: "bg-blue-500" }] }
  },
  "Hortikultura (Sayur & Buah)": {
    "Cabai Merah / Rawit": { margin: 0.60, breakdown: [{ n: "Pupuk & Pestisida", r: 0.50, c: "bg-rose-500" }, { n: "Tenaga Kerja (Panen Rutin)", r: 0.35, c: "bg-orange-500" }, { n: "Benih & Mulsa", r: 0.10, c: "bg-amber-500" }, { n: "Perawatan Alat", r: 0.05, c: "bg-slate-400" }] },
    "Bawang Merah": { margin: 0.60, breakdown: [{ n: "Benih (Bibit Umbi)", r: 0.40, c: "bg-purple-500" }, { n: "Pupuk & Obat", r: 0.35, c: "bg-emerald-500" }, { n: "Tenaga Kerja", r: 0.20, c: "bg-teal-500" }, { n: "Pengairan/Perawatan", r: 0.05, c: "bg-cyan-500" }] },
    "Tomat / Kentang": { margin: 0.62, breakdown: [{ n: "Pupuk & Obat Jamur", r: 0.45, c: "bg-emerald-500" }, { n: "Tenaga Kerja", r: 0.35, c: "bg-teal-500" }, { n: "Benih & Turus/Ajir", r: 0.15, c: "bg-amber-500" }, { n: "Transportasi", r: 0.05, c: "bg-slate-400" }] },
    "Sayuran Daun (Sawi, Bayam)": { margin: 0.65, breakdown: [{ n: "Pupuk Organik/Urea", r: 0.45, c: "bg-emerald-500" }, { n: "Tenaga Kerja", r: 0.40, c: "bg-teal-500" }, { n: "Benih", r: 0.10, c: "bg-amber-500" }, { n: "Air/Penyiraman", r: 0.05, c: "bg-cyan-500" }] },
    "Buah-buahan (Jeruk, Mangga)": { margin: 0.65, breakdown: [{ n: "Pemeliharaan & Pupuk", r: 0.45, c: "bg-emerald-500" }, { n: "Tenaga Kerja Panen", r: 0.35, c: "bg-teal-500" }, { n: "Pestisida/Bungkus Buah", r: 0.10, c: "bg-rose-400" }, { n: "Distribusi", r: 0.10, c: "bg-blue-500" }] }
  },
  "Perkebunan & Kehutanan": {
    "Kelapa Sawit": { margin: 0.60, breakdown: [{ n: "Pupuk", r: 0.55, c: "bg-emerald-600" }, { n: "Tenaga Kerja (Panen/Dodos)", r: 0.30, c: "bg-teal-600" }, { n: "Transportasi (Truk)", r: 0.10, c: "bg-blue-600" }, { n: "Perawatan Kebun/Jalan", r: 0.05, c: "bg-slate-500" }] },
    "Karet": { margin: 0.65, breakdown: [{ n: "Tenaga Kerja (Sadap)", r: 0.65, c: "bg-teal-600" }, { n: "Pupuk & Obat Jamur", r: 0.25, c: "bg-emerald-500" }, { n: "Asam Semut/Pembeku", r: 0.10, c: "bg-amber-500" }] },
    "Kopi / Kakao": { margin: 0.62, breakdown: [{ n: "Tenaga Kerja (Rawat & Panen)", r: 0.50, c: "bg-teal-600" }, { n: "Pupuk Organik/Kimia", r: 0.30, c: "bg-emerald-600" }, { n: "Pengolahan Pasca Panen", r: 0.15, c: "bg-amber-600" }, { n: "Perawatan Alat", r: 0.05, c: "bg-slate-500" }] },
    "Tebu": { margin: 0.60, breakdown: [{ n: "Biaya Tebang & Angkut", r: 0.50, c: "bg-blue-500" }, { n: "Pupuk", r: 0.35, c: "bg-emerald-500" }, { n: "Bibit & Pemeliharaan", r: 0.15, c: "bg-amber-500" }] }
  },
  "Peternakan & Perikanan": {
    "Ayam Broiler (Pedaging)": { margin: 0.60, breakdown: [{ n: "Pakan Konsentrat", r: 0.75, c: "bg-amber-600" }, { n: "DOC (Bibit)", r: 0.15, c: "bg-yellow-500" }, { n: "Obat & Vaksin", r: 0.05, c: "bg-rose-500" }, { n: "Perawatan Kandang & Listrik", r: 0.05, c: "bg-slate-500" }] },
    "Ayam Petelur": { margin: 0.62, breakdown: [{ n: "Pakan", r: 0.75, c: "bg-amber-600" }, { n: "Tenaga Kerja", r: 0.15, c: "bg-teal-500" }, { n: "Vitamin & Vaksin", r: 0.10, c: "bg-rose-500" }] },
    "Sapi / Kambing": { margin: 0.65, breakdown: [{ n: "Pakan Hijauan & Konsentrat", r: 0.60, c: "bg-emerald-600" }, { n: "Tenaga Kerja (Ngarit/Rawat)", r: 0.25, c: "bg-teal-500" }, { n: "Kesehatan & Vitamin", r: 0.10, c: "bg-rose-500" }, { n: "Pemeliharaan Kandang", r: 0.05, c: "bg-slate-500" }] },
    "Budidaya Ikan (Lele/Nila)": { margin: 0.60, breakdown: [{ n: "Pakan (Pelet)", r: 0.75, c: "bg-amber-500" }, { n: "Benih Ikan", r: 0.15, c: "bg-blue-400" }, { n: "Listrik & Air", r: 0.05, c: "bg-cyan-500" }, { n: "Tenaga Kerja", r: 0.05, c: "bg-teal-500" }] },
    "Tambak Udang / Bandeng": { margin: 0.60, breakdown: [{ n: "Pakan", r: 0.55, c: "bg-amber-500" }, { n: "Benur / Nener", r: 0.20, c: "bg-blue-400" }, { n: "Bahan Kimia & Probiotik", r: 0.15, c: "bg-emerald-400" }, { n: "BBM/Perawatan Kincir", r: 0.10, c: "bg-slate-600" }] }
  },
  "Usaha Umum (Non-Pertanian)": {
    "Warung Makan / Kuliner": { margin: 0.60, breakdown: [{ n: "Bahan Baku (Sembako)", r: 0.70, c: "bg-rose-500" }, { n: "Gaji Karyawan", r: 0.15, c: "bg-teal-500" }, { n: "Listrik, Air & Gas", r: 0.10, c: "bg-cyan-500" }, { n: "Perawatan Alat", r: 0.05, c: "bg-amber-500" }] },
    "Toko Kelontong / Grosir": { margin: 0.60, breakdown: [{ n: "Pembelian Barang Dagangan", r: 0.85, c: "bg-blue-500" }, { n: "Operasional / Listrik", r: 0.10, c: "bg-slate-500" }, { n: "Gaji Pegawai", r: 0.05, c: "bg-teal-500" }] },
    "Jasa (Bengkel, Salon, dll)": { margin: 0.65, breakdown: [{ n: "Gaji & Bagi Hasil Pegawai", r: 0.55, c: "bg-teal-500" }, { n: "Bahan Habis Pakai (Oli, Sampo)", r: 0.30, c: "bg-rose-400" }, { n: "Operasional & Perawatan Alat", r: 0.15, c: "bg-slate-400" }] },
    "Industri Rumah Tangga": { margin: 0.60, breakdown: [{ n: "Bahan Baku", r: 0.60, c: "bg-rose-500" }, { n: "Upah Tenaga Kerja", r: 0.25, c: "bg-teal-500" }, { n: "Kemasan / Packaging", r: 0.10, c: "bg-amber-500" }, { n: "BBM / Listrik", r: 0.05, c: "bg-cyan-500" }] }
  }
};

export default function App() {
  // --- STATE MANAGEMENT ---
  const [luasLahan, setLuasLahan] = useState('');
  const [pendapatanKotor, setPendapatanKotor] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState("Pertanian Pangan");
  const [selectedBusiness, setSelectedBusiness] = useState("Padi Sawah");
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    setSelectedBusiness(Object.keys(BUSINESS_DB[newCat])[0]);
  };

  const resetForm = () => {
    setLuasLahan('');
    setPendapatanKotor('');
    setResult(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- ALGORITMA ESTIMASI EKONOMI ---
  const generateData = () => {
    if (!pendapatanKotor) {
      setError('Harap isi Total Pendapatan untuk melakukan estimasi.');
      return;
    }

    const pendapatan = parseFloat(pendapatanKotor);
    const lahan = parseFloat(luasLahan) || 0;

    if (pendapatan < 50000) {
      setError('Nilai pendapatan terlalu kecil untuk dianalisis.');
      return;
    }

    setIsCalculating(true);
    setError('');

    setTimeout(() => {
      const bizLogic = BUSINESS_DB[selectedCategory][selectedBusiness];
      
      const marginIdeal = bizLogic.margin;
      const labaEstimasi = pendapatan * marginIdeal;
      const pengeluaranEstimasi = pendapatan - labaEstimasi;

      const rincianBiaya = bizLogic.breakdown.map((item, index) => ({
        id: index + 1,
        kategori: item.n,
        rasio: item.r,
        nominal: pengeluaranEstimasi * item.r,
        color: item.c
      }));

      const persentasePengeluaran = ((1 - marginIdeal) * 100).toFixed(0);
      let insightText = `Analisis sistem untuk sektor <b>${selectedBusiness}</b> mengasumsikan tempat/lahan operasional adalah <b>milik sendiri</b> (tanpa beban biaya sewa).<br/><br/>Oleh karena itu, total rasio pengeluaran dapat ditekan menjadi sekitar <b>${persentasePengeluaran}%</b> saja dari total pendapatan, menghasilkan margin laba bersih optimal di level <b>${(marginIdeal * 100).toFixed(0)}%</b>.<br/><br/>`;
      
      if (lahan > 0) {
        const pendapatanPerM2 = pendapatan / lahan;
        insightText += `Dengan luasan ${formatNumberWithSeparator(lahan)} m², produktivitas aset Anda mencapai <b>${formatRupiah(pendapatanPerM2)} per m²</b>. `;
      }
      
      insightText += `Sistem mengalokasikan komponen biaya terbesar pada <b>${rincianBiaya[0].kategori}</b>. Model ini sangat relevan untuk memvalidasi ekonomi masyarakat yang sudah memiliki aset tetap secara mandiri.`;

      setResult({
        usaha: selectedBusiness,
        luasLahan: lahan,
        pendapatanKotor: pendapatan,
        totalPengeluaran: pengeluaranEstimasi,
        pendapatanBersih: labaEstimasi,
        margin: marginIdeal * 100,
        rincian: rincianBiaya,
        insight: insightText
      });
      
      setIsCalculating(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans selection:bg-emerald-200">
      
      {/* --- NAVBAR --- */}
      {/* UPDATE: px-6 md:px-12 lg:px-16 untuk memberikan jarak kanan-kiri yang sangat lega */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetForm}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <IconSprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg md:text-xl leading-tight tracking-tight">AgriSense Core</h1>
              <p className="text-[10px] md:text-xs text-emerald-600 font-bold tracking-wider uppercase mt-0.5">Sistem Estimasi Otomatis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button onClick={resetForm} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-lg transition-all active:scale-95">
                <IconRefreshCw className="w-3.5 h-3.5" /> Reset Form
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      {/* UPDATE: max-w-7xl, px-6 md:px-12 lg:px-16, dan gap-10 lg:gap-16 untuk memisahkan form & result */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 py-8 lg:py-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: Input Form */}
        <div className={`w-full ${result ? 'lg:w-[35%]' : 'max-w-xl mx-auto'} transition-all duration-700 ease-in-out`}>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Kalkulator Cerdas</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Pilih jenis usaha dan masukkan total pendapatan. Sistem akan memecah biaya dengan asumsi <span className="font-semibold text-emerald-600">lahan milik sendiri</span> (tanpa sewa).</p>
          </div>

          <div className="bg-white rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
            <div className="space-y-6">
              
              <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Usaha</label>
                  <select 
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  >
                    {Object.keys(BUSINESS_DB).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Spesifik Usaha</label>
                  <select 
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-emerald-700 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  >
                    {Object.keys(BUSINESS_DB[selectedCategory]).map(biz => (
                      <option key={biz} value={biz}>{biz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Luas Lahan / Tempat <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">Opsional</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {["Pertanian Pangan", "Hortikultura (Sayur & Buah)", "Perkebunan & Kehutanan"].includes(selectedCategory) 
                      ? <IconMap className="w-4 h-4 text-slate-400" />
                      : <IconBuilding className="w-4 h-4 text-slate-400" />
                    }
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(luasLahan)}
                    onChange={(e) => handleInputChange(e, setLuasLahan)}
                    placeholder={selectedCategory.includes("Usaha Umum") ? "Contoh: 50 (luas ruko)" : "Contoh: 10.000"}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <span className="text-xs font-semibold text-slate-400">m²</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Total Pendapatan
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-semibold">Satu Siklus/Bulan</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-400 group-focus-within:text-emerald-500 transition-colors">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(pendapatanKotor)}
                    onChange={(e) => handleInputChange(e, setPendapatanKotor)}
                    placeholder="Contoh: 50.000.000"
                    className="w-full pl-12 pr-4 py-3.5 font-bold bg-white border border-slate-300 rounded-xl text-slate-900 text-base shadow-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-rose-600 bg-rose-50 p-4 rounded-xl text-sm border border-rose-100">
                  <IconAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="font-medium leading-snug pt-0.5">{error}</p>
                </div>
              )}

              <button
                onClick={generateData}
                disabled={isCalculating || !pendapatanKotor}
                className={`w-full py-3.5 mt-6 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5
                  ${isCalculating 
                    ? 'bg-emerald-400 cursor-wait shadow-emerald-200' 
                    : (!pendapatanKotor)
                      ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5'
                  }`}
              >
                {isCalculating ? (
                  <><IconRefreshCw className="w-4 h-4 animate-spin" /> Mengkalkulasi Rasio...</>
                ) : (
                  <><IconCpu className="w-4 h-4" /> Proses Estimasi (Pemilik Lahan)</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Algorithmic Analysis */}
        <div className={`w-full ${result ? 'lg:w-[65%] opacity-100' : 'hidden opacity-0'} transition-all duration-700`} ref={resultRef}>
          
          {result && (
            <div className="space-y-8">
              
              <div className="bg-slate-800 rounded-3xl p-1 shadow-xl shadow-slate-900/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                
                <div className="bg-slate-900 rounded-[20px] p-6 sm:p-8 relative z-10 h-full">
                  <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                    <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                      <IconCpu className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Sistem Analisis Pakar</h3>
                    <span className="ml-auto text-[10px] font-bold tracking-widest text-emerald-300 uppercase bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">Algoritma Aktif</span>
                  </div>
                  
                  <div 
                    className="text-sm md:text-base text-slate-300 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: result.insight }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <IconWallet className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mb-1.5">Pendapatan Input</p>
                  <p className="text-xl font-bold text-slate-800 tracking-tight">{formatRupiah(result.pendapatanKotor)}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden ring-1 ring-rose-100">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full opacity-50 pointer-events-none"></div>
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                    <IconPieChart className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mb-1.5 relative z-10">Estimasi Pengeluaran</p>
                  <p className="text-xl font-bold text-rose-600 tracking-tight relative z-10">{formatRupiah(result.totalPengeluaran)}</p>
                </div>

                <div className="p-6 rounded-3xl shadow-xl relative overflow-hidden text-white bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20">
                  <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 relative z-10">
                    <IconTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white/80 mb-1.5 relative z-10">
                    Estimasi Laba Bersih
                  </p>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="text-xl font-bold tracking-tight">{formatRupiah(result.pendapatanBersih)}</p>
                    <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-md">
                      Mar: {result.margin.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-3">
                  <h3 className="text-base font-bold text-slate-800">Pemecahan Otomatis Komponen Biaya</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                    Model: {result.usaha}
                  </span>
                </div>

                <div className="space-y-6">
                  {result.rincian.map((item) => (
                    <div key={item.id} className="relative group">
                      <div className="flex justify-between items-end mb-2.5">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-3 h-3 rounded-full shadow-sm ${item.color}`}></span>
                            <h4 className="font-bold text-slate-700 text-sm md:text-base">{item.kategori}</h4>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800 text-sm md:text-base">{formatRupiah(item.nominal)}</p>
                          <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-0.5">{(item.rasio * 100).toFixed(0)}% dari biaya</p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
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
