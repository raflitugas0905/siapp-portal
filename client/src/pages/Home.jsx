import { useState, useEffect } from 'react';
import api from '../api/api';
import { ExternalLink, LayoutGrid, Search, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* --- ORNAMEN DEKORATIF BACKGROUND --- */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] right-[0%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      {/* --- NAVBAR --- */}
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
  <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
    <div className="flex items-center gap-3">
      
      {/* KOTAK LOGO DENGAN RATA KIRI */}
      <div className="w-14 h-12 bg-white rounded-xl flex items-center justify-start shadow-md border border-slate-100 p-1.5 pl-2">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Logo_Kementerian_Pertanian_Republik_Indonesia.svg" 
          alt="Logo Kementan" 
          className="h-full object-contain" // Lebar otomatis mengikuti proporsi tinggi agar tidak center-fill
        />
      </div>

      <div>
        <span className="text-xl font-black tracking-tight text-slate-800 uppercase">SIAPP<span className="text-emerald-600">.</span></span>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">PSP Kementan</p>
      </div>
    </div>
    
    <Link to="/login" className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200">
      Console Admin <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
</nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* --- HERO SECTION --- */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-6 border border-emerald-100 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sistem Informasi Alat & Mesin Pertanian
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
            Satu Pintu Untuk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Produktivitas Tani.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Akses cepat ke berbagai aplikasi internal dan layanan publik Direktorat Jenderal Prasarana dan Sarana Pertanian.
          </p>

          {/* SEARCH BAR MODERN */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Cari aplikasi atau layanan..."
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/50 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* --- GRID LAYANAN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((s, index) => (
            <div 
              key={s.id} 
              className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:border-emerald-500/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Dekorasi kartu */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden shadow-inner">
                  {s.image_url ? (
                    <img src={s.image_url} alt={s.title} className="w-full h-full object-cover p-2" />
                  ) : (
                    <LayoutGrid size={28} className="text-slate-400 group-hover:text-emerald-600" />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    s.category === 'aplikasi' 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {s.category}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {s.description || "Hubungkan operasional kerja Anda dengan integrasi sistem yang handal dan terukur."}
                </p>
              </div>

              <div className="relative pt-6 border-t border-slate-50">
                <a 
                  href={s.link_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-slate-900 font-bold group/btn hover:text-emerald-600 transition-colors"
                >
                  Buka Aplikasi 
                  <span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover/btn:bg-emerald-600 group-hover/btn:translate-x-2 transition-all shadow-lg shadow-slate-200 group-hover/btn:shadow-emerald-200">
                    <ExternalLink size={18} />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- FOOTER SECTION --- */}
        <footer className="mt-32 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
              <div className="text-lg font-black text-slate-800 mb-2">SIAPP<span className="text-emerald-600">.</span> Portal</div>
              <p className="text-sm text-slate-400 font-medium italic">Transformasi Digital untuk Kedaulatan Pangan.</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <Globe size={14} /> Jakarta, Indonesia
              </div>
              <div className="text-slate-300">|</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                v1.0.2 Stable
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;