import React, { useState, useRef, useEffect } from 'react';

// --- INLINE ICONS ---
const IconSprout = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>;
const IconRefreshCw = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconMap = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const IconAlertCircle = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconWallet = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const IconPieChart = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>;
const IconTrendingUp = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const IconCpu = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>;
const IconBox = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IconActivity = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconUsers = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCalendar = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconHardHat = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></svg>;
const IconCalculator = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16.01" y2="14"/><line x1="16" y1="18" x2="16.01" y2="18"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="8" y1="18" x2="8.01" y2="18"/><line x1="8" y1="10" x2="8.01" y2="10"/></svg>;
const IconX = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconDelete = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>;

// --- DATABASE ALGORITMA RASIO EKONOMI LENGKAP ---
const BUSINESS_DB = {
  "Pertanian Pangan": {
    "Padi Sawah": { isAnnual: false, margin: 0.60, cycleMonths: 4, breakdown: [ { n: "Buruh (Tanam/Panen/Borong)", r: 0.45, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Pupuk & Nutrisi", r: 0.35, c: "bg-emerald-500", type: "produksi" }, { n: "Benih & Obat", r: 0.15, c: "bg-sky-500", type: "produksi" }, { n: "Pemeliharaan/Air/Irigasi", r: 0.05, c: "bg-blue-500", type: "operasional" } ] },
    "Jagung": { isAnnual: false, margin: 0.62, cycleMonths: 3, breakdown: [ { n: "Pupuk Dasar & Susulan", r: 0.40, c: "bg-emerald-500", type: "produksi" }, { n: "Buruh Tanam & Panen", r: 0.35, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Benih Jagung Hibrida", r: 0.15, c: "bg-amber-500", type: "produksi" }, { n: "Perawatan/Lainnya", r: 0.10, c: "bg-blue-400", type: "operasional" } ] },
    "Kedelai": { isAnnual: false, margin: 0.60, cycleMonths: 3, breakdown: [ { n: "Buruh Harian/Borongan", r: 0.45, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Benih Kedelai Unggul", r: 0.25, c: "bg-amber-500", type: "produksi" }, { n: "Pupuk & Pestisida", r: 0.20, c: "bg-emerald-500", type: "produksi" }, { n: "Akses Air & Perawatan", r: 0.10, c: "bg-blue-400", type: "operasional" } ] },
    "Singkong": { isAnnual: false, margin: 0.65, cycleMonths: 11, breakdown: [ { n: "Buruh Cabut & Olah Lahan", r: 0.60, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Bibit Stek & Pupuk Kompos", r: 0.25, c: "bg-emerald-500", type: "produksi" }, { n: "Transportasi Logistik", r: 0.15, c: "bg-blue-500", type: "operasional" } ] }
  },
  "Hortikultura (Sayur & Buah)": {
    "Cabai Merah / Rawit": { isAnnual: false, margin: 0.60, cycleMonths: 6, breakdown: [ { n: "Pupuk & Pestisida", r: 0.50, c: "bg-rose-500", type: "produksi" }, { n: "Buruh Petik", r: 0.35, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Benih & Mulsa", r: 0.10, c: "bg-amber-500", type: "produksi" }, { n: "Perawatan Alat", r: 0.05, c: "bg-blue-400", type: "operasional" } ] },
    "Bawang Merah": { isAnnual: false, margin: 0.60, cycleMonths: 2.5, breakdown: [ { n: "Benih (Bibit Umbi)", r: 0.40, c: "bg-sky-500", type: "produksi" }, { n: "Pupuk & Obat", r: 0.35, c: "bg-emerald-500", type: "produksi" }, { n: "Buruh Tanam & Siram", r: 0.20, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Pengairan/Perawatan", r: 0.05, c: "bg-blue-500", type: "operasional" } ] },
    "Sayuran Daun (Sawi, Bayam)": { isAnnual: false, margin: 0.65, cycleMonths: 1, breakdown: [ { n: "Pupuk Organik/Urea", r: 0.45, c: "bg-emerald-500", type: "produksi" }, { n: "Buruh Panen", r: 0.40, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Benih", r: 0.10, c: "bg-amber-500", type: "produksi" }, { n: "Air/Penyiraman", r: 0.05, c: "bg-blue-500", type: "operasional" } ] }
  },
  "Perkebunan & Kehutanan": {
    "Kelapa Sawit": { isAnnual: false, margin: 0.60, cycleMonths: 1, breakdown: [ { n: "Pupuk Kalium & Posfat", r: 0.55, c: "bg-emerald-600", type: "produksi" }, { n: "Buruh (Panen/Dodos)", r: 0.30, c: "bg-purple-600", type: "operasional", isLabor: true }, { n: "Sewa Truk / Angkutan TBS", r: 0.10, c: "bg-blue-600", type: "operasional" }, { n: "Perawatan Jalan & Parit", r: 0.05, c: "bg-blue-500", type: "operasional" } ] },
    "Karet": { isAnnual: false, margin: 0.65, cycleMonths: 1, breakdown: [ { n: "Buruh Sadap (Bagi Hasil)", r: 0.65, c: "bg-purple-600", type: "operasional", isLabor: true }, { n: "Pupuk & Obat Jamur", r: 0.25, c: "bg-emerald-500", type: "produksi" }, { n: "Asam Semut/Pembeku", r: 0.10, c: "bg-amber-500", type: "produksi" } ] },
    "Kopi / Kakao": { isAnnual: false, margin: 0.62, cycleMonths: 12, breakdown: [ { n: "Buruh (Rawat & Panen)", r: 0.50, c: "bg-purple-600", type: "operasional", isLabor: true }, { n: "Pupuk Organik/Kimia", r: 0.30, c: "bg-emerald-600", type: "produksi" }, { n: "Pengolahan Pasca Panen", r: 0.15, c: "bg-amber-600", type: "produksi" }, { n: "Perawatan Alat", r: 0.05, c: "bg-blue-500", type: "operasional" } ] }
  },
  "Peternakan & Perikanan": {
    "Ayam Broiler (Pedaging)": { isAnnual: false, margin: 0.60, cycleMonths: 1, breakdown: [ { n: "Pakan Konsentrat", r: 0.70, c: "bg-amber-600", type: "produksi" }, { n: "DOC (Bibit)", r: 0.15, c: "bg-yellow-500", type: "produksi" }, { n: "Karyawan Kandang", r: 0.05, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Obat, Vaksin & Listrik", r: 0.10, c: "bg-rose-500", type: "operasional" } ] },
    "Sapi / Kambing (Penggemukan)": { isAnnual: false, margin: 0.65, cycleMonths: 6, breakdown: [ { n: "Pakan Hijauan & Konsentrat", r: 0.60, c: "bg-emerald-600", type: "produksi" }, { n: "Buruh (Ngarit/Rawat)", r: 0.25, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Kesehatan & Vitamin", r: 0.10, c: "bg-rose-500", type: "produksi" }, { n: "Pemeliharaan Kandang", r: 0.05, c: "bg-blue-500", type: "operasional" } ] },
    "Budidaya Ikan / Tambak": { isAnnual: false, margin: 0.60, cycleMonths: 3, breakdown: [ { n: "Pakan (Pelet)", r: 0.75, c: "bg-amber-500", type: "produksi" }, { n: "Benih Ikan/Udang", r: 0.15, c: "bg-sky-400", type: "produksi" }, { n: "Buruh Tambak", r: 0.05, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Listrik & Air", r: 0.05, c: "bg-blue-500", type: "operasional" } ] }
  },
  "Usaha Umum (Non-Pertanian)": {
    "Warung Makan / Kuliner": { isAnnual: true, margin: 0.60, cycleMonths: 12, breakdown: [ { n: "Bahan Baku (Sembako)", r: 0.70, c: "bg-rose-500", type: "produksi" }, { n: "Gaji Karyawan", r: 0.15, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Listrik, Air & Gas", r: 0.10, c: "bg-blue-500", type: "operasional" }, { n: "Perawatan Alat", r: 0.05, c: "bg-blue-400", type: "operasional" } ] },
    "Toko Kelontong / Grosir": { isAnnual: true, margin: 0.60, cycleMonths: 12, breakdown: [ { n: "Pembelian Barang Dagangan", r: 0.85, c: "bg-sky-500", type: "produksi" }, { n: "Gaji Pegawai", r: 0.05, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Operasional / Listrik", r: 0.10, c: "bg-blue-500", type: "operasional" } ] },
    "Jasa (Bengkel, Salon, dll)": { isAnnual: true, margin: 0.65, cycleMonths: 12, breakdown: [ { n: "Gaji & Bagi Hasil Pegawai", r: 0.55, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Bahan Habis Pakai (Oli, dll)", r: 0.30, c: "bg-rose-400", type: "produksi" }, { n: "Operasional & Perawatan Alat", r: 0.15, c: "bg-blue-400", type: "operasional" } ] },
    "Industri Rumah Tangga": { isAnnual: true, margin: 0.60, cycleMonths: 12, breakdown: [ { n: "Bahan Baku", r: 0.60, c: "bg-rose-500", type: "produksi" }, { n: "Upah Tenaga Kerja", r: 0.25, c: "bg-purple-500", type: "operasional", isLabor: true }, { n: "Kemasan / Packaging", r: 0.10, c: "bg-amber-500", type: "produksi" }, { n: "BBM / Listrik", r: 0.05, c: "bg-blue-500", type: "operasional" } ] }
  }
};

// --- SKELETON COMPONENT (Premium Loading State) ---
const ResultSkeleton = () => (
  <div className="space-y-8 animate-pulse w-full">
    <div className="bg-slate-200/60 rounded-[20px] p-6 sm:p-8 relative overflow-hidden h-40 w-full">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-300/50 pb-4">
        <div className="w-10 h-10 bg-slate-300/70 rounded-xl"></div>
        <div className="w-48 h-6 bg-slate-300/70 rounded-md"></div>
        <div className="w-32 h-6 bg-slate-300/70 rounded-full sm:ml-auto"></div>
      </div>
      <div className="space-y-3">
        <div className="w-full h-3 bg-slate-300/70 rounded"></div>
        <div className="w-5/6 h-3 bg-slate-300/70 rounded"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-36 flex flex-col justify-between">
          <div className="w-10 h-10 bg-slate-200/80 rounded-xl"></div>
          <div>
            <div className="w-24 h-3 bg-slate-200/80 rounded mb-2"></div>
            <div className="w-32 h-6 bg-slate-200/80 rounded"></div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 h-72 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
              <div className="w-10 h-10 bg-slate-200/80 rounded-xl"></div>
              <div>
                <div className="w-28 h-4 bg-slate-200/80 rounded mb-1"></div>
                <div className="w-20 h-2 bg-slate-200/80 rounded"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-2 bg-slate-200/80 rounded-full"></div>
              <div className="w-4/5 h-2 bg-slate-200/80 rounded-full"></div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
            <div className="w-20 h-3 bg-slate-200/80 rounded"></div>
            <div className="w-24 h-5 bg-slate-200/80 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  // --- STATE MAIN APP ---
  const [luasLahan, setLuasLahan] = useState('');
  const [pendapatanKotor, setPendapatanKotor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Pertanian Pangan");
  const [selectedBusiness, setSelectedBusiness] = useState("Padi Sawah");
  const [hasWorkers, setHasWorkers] = useState('tidak'); 
  const [numWorkers, setNumWorkers] = useState('1'); 
  const [wagePerWorker, setWagePerWorker] = useState(''); 
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  // --- STATE FLOATING CALCULATOR ---
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcExpr, setCalcExpr] = useState('');
  const [calcResult, setCalcResult] = useState('0');

  const currentBizConfig = BUSINESS_DB[selectedCategory][selectedBusiness];
  const isAnnual = currentBizConfig.isAnnual;

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
    setHasWorkers('tidak');
    setNumWorkers('1');
    setWagePerWorker('');
    setResult(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CALCULATOR LOGIC (Dynamic Live Evaluation) ---
  useEffect(() => {
    try {
      if (!calcExpr) { setCalcResult('0'); return; }
      const toEval = calcExpr.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[+\-*/.]$/.test(toEval)) return; 
      
      const res = new Function(`return ${toEval}`)();
      if (typeof res === 'number' && isFinite(res)) {
        setCalcResult(new Intl.NumberFormat('id-ID', { maximumFractionDigits: 4 }).format(res));
      }
    } catch (e) {
      // Ignored for live evaluation when typing
    }
  }, [calcExpr]);

  const handleCalcBtnClick = (val) => {
    if (val === 'C') {
      setCalcExpr('');
      setCalcResult('0');
    } else if (val === 'DEL') {
      setCalcExpr(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        const toEval = calcExpr.replace(/×/g, '*').replace(/÷/g, '/');
        const res = new Function(`return ${toEval}`)();
        if (typeof res === 'number' && isFinite(res)) {
          setCalcExpr(res.toString());
        }
      } catch (e) {
        // Prevent crash
      }
    } else {
      setCalcExpr(prev => prev + val);
    }
  };

  // --- ALGORITMA ESTIMASI EKONOMI UTAMA ---
  const generateData = () => {
    if (!pendapatanKotor) {
      setError(`Harap isi Total Pendapatan ${isAnnual ? 'Setahun' : 'Per Siklus'} untuk melakukan estimasi.`);
      return;
    }

    const pendapatan = parseFloat(pendapatanKotor);
    const lahan = parseFloat(luasLahan) || 0;

    if (pendapatan < 50000) {
      setError('Nilai pendapatan terlalu kecil untuk dianalisis.');
      return;
    }

    const inputPekerja = parseInt(numWorkers) || 0;
    if (hasWorkers === 'ada' && inputPekerja <= 0) {
      setError('Harap masukkan jumlah pekerja/karyawan minimal 1 orang.');
      return;
    }

    if (hasWorkers === 'ada' && (!wagePerWorker || parseFloat(wagePerWorker) <= 0)) {
      setError(`Harap masukkan upah/gaji per pekerja yang valid.`);
      return;
    }

    setIsCalculating(true);
    setResult(null); 
    setError('');

    setTimeout(() => {
      const bizLogic = BUSINESS_DB[selectedCategory][selectedBusiness];
      const cycleMonths = bizLogic.cycleMonths || 1; 
      const marginIdeal = bizLogic.margin;
      const basePengeluaran = pendapatan * (1 - marginIdeal);
      const laborItemInDb = bizLogic.breakdown.find(item => item.isLabor);
      const laborRatioDb = laborItemInDb ? laborItemInDb.r : 0.35; 
      const nonLaborRatioTotal = 1 - laborRatioDb;
      const pengeluaranNonLabor = basePengeluaran * nonLaborRatioTotal;

      let actualLaborCost = 0;
      if (hasWorkers === 'ada') {
        const upahPekerja = parseFloat(wagePerWorker) || 0;
        actualLaborCost = inputPekerja * upahPekerja;
      }

      const totalPengeluaranReal = pengeluaranNonLabor + actualLaborCost;
      const labaBersihReal = pendapatan - totalPengeluaranReal;
      const marginAktual = (labaBersihReal / pendapatan) * 100;

      const rincianBiayaMapped = bizLogic.breakdown.map((item, index) => {
        let nominalItem = 0;
        let rasioItemReal = 0;

        if (item.isLabor) {
          nominalItem = actualLaborCost;
        } else {
          const relativeRatio = item.r / nonLaborRatioTotal;
          nominalItem = pengeluaranNonLabor * relativeRatio;
        }

        rasioItemReal = totalPengeluaranReal > 0 ? (nominalItem / totalPengeluaranReal) : 0;

        return {
          id: index + 1,
          kategori: item.isLabor && hasWorkers === 'tidak' ? `${item.n} (Dikerjakan Sendiri)` : item.n,
          rasio: rasioItemReal,
          nominal: nominalItem,
          color: item.color,
          type: item.type,
          isLabor: item.isLabor
        };
      });

      const rincianBuruh = rincianBiayaMapped.filter(item => item.isLabor);
      const rincianProduksi = rincianBiayaMapped.filter(item => item.type === "produksi" && !item.isLabor);
      const rincianOperasional = rincianBiayaMapped.filter(item => item.type === "operasional" && !item.isLabor);

      const subtotalBuruh = rincianBuruh.reduce((acc, curr) => acc + curr.nominal, 0);
      const subtotalProduksi = rincianProduksi.reduce((acc, curr) => acc + curr.nominal, 0);
      const subtotalOperasional = rincianOperasional.reduce((acc, curr) => acc + curr.nominal, 0);

      let insightText = "";
      if (isAnnual) {
        insightText = `Usaha <b>${selectedBusiness}</b> ini dianalisis berdasarkan siklus bisnis dan omzet selama <b>1 Tahun (12 bulan) penuh</b>.<br/><br/>`;
        if (hasWorkers === 'ada') {
          insightText += `Dengan memiliki <b>${inputPekerja} orang karyawan/pegawai</b>, di mana total beban gaji masing-masing adalah <b>${formatRupiah(parseFloat(wagePerWorker))} per tahun</b>, maka total anggaran tenaga kerja selama setahun mencapai <b>${formatRupiah(actualLaborCost)}</b>.<br/><br/>`;
        } else {
          insightText += `Anda memilih operasional usaha <b>Mandiri / Tanpa Karyawan</b>. Anda menjalankan operasional sehari-hari sendiri tanpa mengeluarkan beban gaji tetap, sehingga memaksimalkan Laba Bersih Tahunan.<br/><br/>`;
        }
      } else {
        insightText = `Komoditas <b>${selectedBusiness}</b> memiliki rata-rata siklus tanam/produksi selama <b>${cycleMonths} bulan</b>.<br/><br/>`;
        if (hasWorkers === 'ada') {
          insightText += `Dengan mempekerjakan <b>${inputPekerja} orang buruh/pekerja</b>, di mana upah masing-masing adalah <b>${formatRupiah(parseFloat(wagePerWorker))} per panen/siklus</b>, maka total biaya tenaga kerja khusus untuk siklus ini mencapai <b>${formatRupiah(actualLaborCost)}</b>.<br/><br/>`;
        } else {
          insightText += `Anda memilih metode <b>Dikerjakan Sendiri</b> (Tanpa upah buruh). Seluruh pekerjaan diselesaikan secara mandiri, sehingga meniadakan anggaran pekerja dan memaksimalkan Laba Bersih yang masuk ke kantong Anda!<br/><br/>`;
        }
      }

      if (labaBersihReal < 0) {
        insightText += `<span className="text-rose-400 font-bold">⚠️ Peringatan Defisit:</span> Biaya pengeluaran Anda (terutama dari upah pekerja) terlalu tinggi dibandingkan dengan estimasi pendapatan kotor, mengakibatkan kondisi keuangan defisit/rugi.`;
      } else {
        insightText += `Analisis keuangan menunjukkan Margin Laba Bersih Riil Anda berada pada kisaran <b>${marginAktual.toFixed(1)}%</b> dari pendapatan kotor.`;
      }

      setResult({
        usaha: selectedBusiness,
        isAnnual,
        luasLahan: lahan,
        pendapatanKotor: pendapatan,
        totalPengeluaran: totalPengeluaranReal,
        pendapatanBersih: labaBersihReal,
        margin: marginAktual,
        cycleMonths,
        rincianBuruh,
        rincianProduksi,
        rincianOperasional,
        subtotalBuruh,
        subtotalProduksi,
        subtotalOperasional,
        insight: insightText
      });
      
      setIsCalculating(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans selection:bg-emerald-200 relative pb-32">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetForm}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <IconSprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg md:text-xl leading-tight tracking-tight">AgriSense Core</h1>
              <p className="text-[10px] md:text-xs text-emerald-600 font-bold tracking-wider uppercase mt-0.5">Sistem Analisis SE2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button onClick={resetForm} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-lg transition-all active:scale-95 touch-manipulation relative z-10">
                <IconRefreshCw className="w-3.5 h-3.5" /> Reset Form
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 py-8 lg:py-12 flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">
        
        {/* LEFT COLUMN: Input Form */}
        <div className={`w-full ${result || isCalculating ? 'lg:w-[35%]' : 'max-w-xl mx-auto'} transition-all duration-700 ease-in-out`}>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Kalkulator Cerdas</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Pilih usaha Anda. Sistem otomatis menyesuaikan basis pencatatan (Siklus Panen vs Tahunan) sesuai standar sensus.</p>
          </div>

          {/* PERBAIKAN: Input Container dijamin z-index tinggi agar lolos dari halangan apapun */}
          <div className="bg-white rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 relative z-20">
            {isCalculating && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-30 rounded-3xl"></div>}

            <div className="space-y-6 relative z-20">
              
              <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Usaha</label>
                  <select 
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none cursor-pointer relative z-20"
                  >
                    {Object.keys(BUSINESS_DB).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-extrabold">Komoditas / Jenis Usaha</label>
                  <select 
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-emerald-700 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none cursor-pointer relative z-20"
                  >
                    {Object.keys(BUSINESS_DB[selectedCategory]).map(biz => (
                      <option key={biz} value={biz}>
                        {biz} {BUSINESS_DB[selectedCategory][biz].isAnnual ? '' : `(Siklus: ${BUSINESS_DB[selectedCategory][biz].cycleMonths} Bln)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {!isAnnual && (
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-slate-700 flex justify-between">
                    Luas Lahan Tanam
                    <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">Opsional</span>
                  </label>
                  <div className="relative z-20">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IconMap className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumberWithSeparator(luasLahan)}
                      onChange={(e) => handleInputChange(e, setLuasLahan)}
                      placeholder="Contoh: 10.000"
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none relative z-20"
                    />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                      <span className="text-xs font-semibold text-slate-400">m²</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2.5 pt-1">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Total Pendapatan Kotor
                  <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold flex items-center gap-1 border
                    ${isAnnual ? 'text-blue-700 bg-blue-50 border-blue-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>
                    <IconCalendar className="w-3 h-3" /> 
                    {isAnnual ? 'Setahun Penuh' : `Per Siklus (${currentBizConfig.cycleMonths} Bln)`}
                  </span>
                </label>
                <div className="relative group z-20">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-400 group-focus-within:text-emerald-500 transition-colors">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithSeparator(pendapatanKotor)}
                    onChange={(e) => handleInputChange(e, setPendapatanKotor)}
                    placeholder={isAnnual ? "Omzet kotor selama 1 tahun" : "Hasil panen kotor 1 siklus"}
                    className="w-full pl-12 pr-4 py-3.5 font-bold bg-white border border-slate-300 rounded-xl text-slate-900 text-base shadow-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none relative z-20"
                  />
                </div>
              </div>

              <div className={`space-y-3 p-5 rounded-2xl border transition-colors duration-300
                ${isAnnual ? 'bg-blue-50/30 border-blue-100/50' : 'bg-emerald-50/30 border-emerald-100/50'}`}>
                
                <label className={`text-xs font-extrabold uppercase tracking-wider block ${isAnnual ? 'text-blue-800' : 'text-emerald-800'}`}>
                  Metode Tenaga Kerja
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasWorkers('tidak')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all touch-manipulation relative z-20 ${
                      hasWorkers === 'tidak'
                        ? isAnnual ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isAnnual ? 'Tanpa Karyawan' : 'Dikerjakan Sendiri'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasWorkers('ada')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all touch-manipulation relative z-20 ${
                      hasWorkers === 'ada'
                        ? isAnnual ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isAnnual ? 'Gunakan Karyawan' : 'Gunakan Pekerja'}
                  </button>
                </div>

                {hasWorkers === 'ada' && (
                  <div className={`space-y-4 pt-4 mt-3 border-t transition-all duration-300 ${isAnnual ? 'border-blue-100/50' : 'border-emerald-100/50'}`}>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">
                        {isAnnual ? 'Jumlah Karyawan/Pegawai' : 'Jumlah Pekerja/Buruh'}
                      </label>
                      <div className="relative z-20">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <IconUsers className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="number"
                          min="1"
                          value={numWorkers}
                          onChange={(e) => setNumWorkers(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-emerald-500 relative z-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 flex justify-between">
                        {isAnnual ? 'Total Gaji per Karyawan' : 'Upah Borongan per Pekerja'}
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${isAnnual ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {isAnnual ? 'Per Tahun' : 'Per Siklus'}
                        </span>
                      </label>
                      <div className="relative z-20">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-[10px] font-bold text-slate-400">Rp</span>
                        </div>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatNumberWithSeparator(wagePerWorker)}
                          onChange={(e) => handleInputChange(e, setWagePerWorker)}
                          placeholder={isAnnual ? "Contoh: Gaji 2jt/bln = 24.000.000" : "Total upah 1 siklus panen"}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-emerald-500 relative z-20"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight pt-1">
                        *Masukkan total {isAnnual ? 'gaji 1 karyawan selama 1 Tahun penuh. (Misal gaji Rp2 Juta/Bulan = Input Rp24.000.000)' : 'upah lunas 1 pekerja selama 1 Siklus Tanam secara keseluruhan.'}
                      </p>
                    </div>
                  </div>
                )}
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
                className={`w-full py-3.5 mt-6 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 touch-manipulation relative z-20
                  ${isCalculating 
                    ? 'bg-slate-300 cursor-wait shadow-none text-slate-500' 
                    : (!pendapatanKotor)
                      ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5'
                  }`}
              >
                {isCalculating ? (
                  <><IconRefreshCw className="w-4 h-4 animate-spin" /> Menghitung Algoritma...</>
                ) : (
                  <><IconCpu className="w-4 h-4" /> Proses Estimasi Keuangan</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Skeleton */}
        <div className={`w-full ${result || isCalculating ? 'lg:w-[65%] opacity-100' : 'hidden opacity-0'} transition-all duration-700 relative z-10`} ref={resultRef}>
          {isCalculating && !result && <ResultSkeleton />}

          {result && !isCalculating && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              <div className="bg-slate-800 rounded-[24px] p-1 shadow-xl shadow-slate-900/10 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${result.isAnnual ? 'from-blue-400 to-indigo-400' : 'from-emerald-400 to-teal-400'}`}></div>
                
                <div className="bg-slate-900 rounded-[20px] p-6 sm:p-8 relative z-10 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${result.isAnnual ? 'bg-blue-500/20 border-blue-500/30' : 'bg-emerald-500/20 border-emerald-500/30'}`}>
                        <IconCpu className={`w-5 h-5 ${result.isAnnual ? 'text-blue-400' : 'text-emerald-400'}`} />
                      </div>
                      <h3 className="font-bold text-white text-lg">Proyeksi Model Keuangan</h3>
                    </div>
                    <span className={`sm:ml-auto text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border inline-block text-center
                      ${result.isAnnual ? 'text-blue-300 bg-blue-500/10 border-blue-500/20' : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'}`}>
                      Basis: {result.isAnnual ? 'Tahunan (12 Bulan)' : `Siklus (${result.cycleMonths} Bulan)`}
                    </span>
                  </div>
                  
                  <div 
                    className="text-sm md:text-base text-slate-300 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: result.insight }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center">
                  <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center mb-4">
                    <IconWallet className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mb-1.5">Kotor {result.isAnnual ? 'Setahun' : 'Per Siklus'}</p>
                  <p className="text-lg font-extrabold text-slate-800 tracking-tight">{formatRupiah(result.pendapatanKotor)}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden ring-1 ring-rose-100 flex flex-col justify-center">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full opacity-50 pointer-events-none"></div>
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                    <IconPieChart className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mb-1.5 relative z-10">Total Pengeluaran</p>
                  <p className="text-lg font-extrabold text-rose-600 tracking-tight relative z-10">{formatRupiah(result.totalPengeluaran)}</p>
                </div>

                <div className={`p-6 rounded-3xl shadow-xl relative overflow-hidden text-white transition-colors duration-500 flex flex-col justify-center ${
                  result.pendapatanBersih >= 0 
                    ? result.isAnnual ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20' : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' 
                    : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/20'
                }`}>
                  <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 relative z-10">
                    <IconTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white/90 mb-1.5 relative z-10">
                    Laba Bersih {result.isAnnual ? 'Tahunan' : 'Siklus'}
                  </p>
                  <div className="flex items-end justify-between relative z-10">
                    <p className="text-lg font-extrabold tracking-tight">{formatRupiah(result.pendapatanBersih)}</p>
                    <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-md">
                      Mar: {result.margin.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. BIAYA UPAH BURUH */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                        <IconHardHat className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Tenaga Kerja</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Gaji, Borongan, Karyawan</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {result.rincianBuruh.length > 0 ? result.rincianBuruh.map((item) => (
                          <div key={item.id} className="relative group">
                            <div className="flex justify-between items-end mb-2">
                              <div className="max-w-[55%]">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full shadow-sm ${item.color}`}></span>
                                  <h4 className="font-bold text-slate-700 text-xs truncate" title={item.kategori}>{item.kategori}</h4>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-800 text-xs">{formatRupiah(item.nominal)}</p>
                                <p className="text-[9px] font-semibold text-slate-400">
                                  {result.totalPengeluaran > 0 ? ((item.nominal / result.totalPengeluaran) * 100).toFixed(0) : 0}% 
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${item.rasio * 100}%` }}></div>
                            </div>
                          </div>
                        )) : <p className="text-xs text-slate-400 italic py-2">Tidak ada alokasi gaji/upah.</p>
                      }
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-5 rounded-b-3xl flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500">Subtotal Buruh:</span>
                    <div className="text-right"><span className="text-sm font-extrabold text-purple-600">{formatRupiah(result.subtotalBuruh)}</span></div>
                  </div>
                </div>

                {/* 2. BIAYA PRODUKSI */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                        <IconBox className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Biaya Produksi</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Bahan Baku, Benih & Pupuk</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {result.rincianProduksi.length > 0 ? result.rincianProduksi.map((item) => (
                          <div key={item.id} className="relative group">
                            <div className="flex justify-between items-end mb-2">
                              <div className="max-w-[55%]">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full shadow-sm ${item.color}`}></span>
                                  <h4 className="font-bold text-slate-700 text-xs truncate" title={item.kategori}>{item.kategori}</h4>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-800 text-xs">{formatRupiah(item.nominal)}</p>
                                <p className="text-[9px] font-semibold text-slate-400">
                                  {result.totalPengeluaran > 0 ? ((item.nominal / result.totalPengeluaran) * 100).toFixed(0) : 0}%
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${item.rasio * 100}%` }}></div>
                            </div>
                          </div>
                        )) : <p className="text-xs text-slate-400 italic py-2">Tidak ada alokasi biaya produksi.</p>
                      }
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-5 rounded-b-3xl flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500">Subtotal Produksi:</span>
                    <div className="text-right"><span className="text-sm font-extrabold text-rose-600">{formatRupiah(result.subtotalProduksi)}</span></div>
                  </div>
                </div>

                {/* 3. BIAYA OPERASIONAL */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div>
                    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <IconActivity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">Operasional Umum</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Distribusi, Listrik, Alat</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {result.rincianOperasional.length > 0 ? result.rincianOperasional.map((item) => (
                          <div key={item.id} className="relative group">
                            <div className="flex justify-between items-end mb-2">
                              <div className="max-w-[55%]">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full shadow-sm ${item.color}`}></span>
                                  <h4 className="font-bold text-slate-700 text-xs truncate" title={item.kategori}>{item.kategori}</h4>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-800 text-xs">{formatRupiah(item.nominal)}</p>
                                <p className="text-[9px] font-semibold text-slate-400">
                                  {result.totalPengeluaran > 0 ? ((item.nominal / result.totalPengeluaran) * 100).toFixed(0) : 0}%
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${item.rasio * 100}%` }}></div>
                            </div>
                          </div>
                        )) : <p className="text-xs text-slate-400 italic py-2">Tidak ada alokasi biaya operasional.</p>
                      }
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-5 rounded-b-3xl flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500">Subtotal Operasional:</span>
                    <div className="text-right"><span className="text-sm font-extrabold text-blue-600">{formatRupiah(result.subtotalOperasional)}</span></div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- WORLD-CLASS FLOATING CALCULATOR COMPONENT --- */}
      {/* PERBAIKAN MUTLAK: `pointer-events-none` ditambahkan pada wrapper ini. Hantu/bayangan transparan dari kotak ini TIDAK AKAN PERNAH BISA MEMBLOKIR KLIK KE FORM LAGI! */}
      <div className="fixed bottom-8 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end pointer-events-none">
        
        {/* Calc Panel (Glassmorphism) */}
        {/* Pointer events hanya nyala (auto) jika statusnya terbuka, jika tertutup tembus pandang mutlak */}
        <div 
          className={`mb-4 w-[calc(100vw-3rem)] max-w-[320px] bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right
          ${isCalcOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto visible' : 'scale-75 opacity-0 translate-y-10 pointer-events-none invisible'}`}
        >
          {/* Display */}
          <div className="p-5 pb-4 bg-slate-50/80 border-b border-slate-100 flex flex-col justify-end min-h-[110px]">
            <p className="text-slate-400 text-sm font-medium h-5 truncate w-full text-right" dir="ltr">
              {calcExpr || '0'}
            </p>
            <p className="text-slate-800 text-4xl font-extrabold truncate w-full text-right mt-1 tracking-tight">
              {calcResult}
            </p>
          </div>
          
          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2.5 p-4 bg-white">
            <button onClick={() => handleCalcBtnClick('C')} className="col-span-2 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors active:scale-95 touch-manipulation">C</button>
            <button onClick={() => handleCalcBtnClick('DEL')} className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold flex justify-center items-center hover:bg-slate-200 transition-colors active:scale-95 touch-manipulation"><IconDelete className="w-5 h-5"/></button>
            <button onClick={() => handleCalcBtnClick('÷')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 transition-colors active:scale-95 touch-manipulation">÷</button>
            
            <button onClick={() => handleCalcBtnClick('7')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">7</button>
            <button onClick={() => handleCalcBtnClick('8')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">8</button>
            <button onClick={() => handleCalcBtnClick('9')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">9</button>
            <button onClick={() => handleCalcBtnClick('×')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 transition-colors active:scale-95 touch-manipulation">×</button>

            <button onClick={() => handleCalcBtnClick('4')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">4</button>
            <button onClick={() => handleCalcBtnClick('5')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">5</button>
            <button onClick={() => handleCalcBtnClick('6')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">6</button>
            <button onClick={() => handleCalcBtnClick('-')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 transition-colors active:scale-95 touch-manipulation">-</button>

            <button onClick={() => handleCalcBtnClick('1')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">1</button>
            <button onClick={() => handleCalcBtnClick('2')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">2</button>
            <button onClick={() => handleCalcBtnClick('3')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">3</button>
            <button onClick={() => handleCalcBtnClick('+')} className="py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-100 transition-colors active:scale-95 touch-manipulation">+</button>

            <button onClick={() => handleCalcBtnClick('0')} className="col-span-2 py-3 bg-slate-50 text-slate-800 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">0</button>
            <button onClick={() => handleCalcBtnClick('.')} className="py-3 bg-slate-50 text-slate-800 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors active:scale-95 touch-manipulation">.</button>
            <button onClick={() => handleCalcBtnClick('=')} className="py-3 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 shadow-md shadow-emerald-500/30 transition-colors active:scale-95 touch-manipulation">=</button>
          </div>
        </div>

        {/* Floating Action Button (FAB) */}
        {/* FAB harus disetting auto agar icon mengambang ini tetap bisa diklik */}
        <button 
          onClick={() => setIsCalcOpen(!isCalcOpen)}
          className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 z-50 touch-manipulation
          ${isCalcOpen 
            ? 'bg-rose-500 text-white hover:bg-rose-600 rotate-90' 
            : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:-translate-y-1'}`}
        >
          {isCalcOpen ? <IconX className="w-6 h-6" /> : <IconCalculator className="w-6 h-6" />}
        </button>

      </div>

    </div>
  );
}

