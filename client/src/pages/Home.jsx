import { useState, useEffect } from 'react';
import api from '../api/api';
import { ExternalLink, LayoutGrid, Search, ArrowRight, Globe, Monitor, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  // Filter Search & Normalisasi Kategori
  const searchedItems = services.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  // PEMISAHAN DATA - Gunakan .trim() untuk menghindari error spasi di DB
  const aplikasiList = searchedItems.filter(item => 
    item.category?.toLowerCase().trim() === 'aplikasi'
  );
  const layananList = searchedItems.filter(item => 
    item.category?.toLowerCase().trim() === 'layanan'
  );

  // Komponen Card yang lebih "Clean" & Elegan
  const ServiceCard = ({ item }) => (
    <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:border-emerald-500/30 hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.1)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors duration-500" />
      
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-full object-contain p-3" />
          ) : (
            <LayoutGrid size={28} className="text-slate-300 group-hover:text-emerald-600" />
          )}
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {item.description || "Akses layanan terpadu prasarana dan sarana pertanian untuk efisiensi kerja yang lebih baik."}
        </p>
      </div>

      <div className="relative pt-6 border-t border-slate-50 flex items-center justify-between">
        <a 
          href={item.link_url} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-slate-900 font-bold text-sm group/btn hover:text-emerald-600 transition-all"
        >
          Buka Layanan
          <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </a>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          item.category?.toLowerCase().trim() === 'aplikasi' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {item.category}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      {/* DEKORASI BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Logo_Kementerian_Pertanian_Republik_Indonesia.svg" 
              alt="Logo Kementan" 
              className="h-12 w-auto drop-shadow-sm" 
            />
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block" />
            <div>
              <span className="text-xl font-black tracking-tighter text-slate-800">SIAPP<span className="text-emerald-600">.</span></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">PSP Kementan</p>
            </div>
          </div>
          <Link to="/login" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 hover:shadow-emerald-200 flex items-center gap-2 group">
            Console Admin <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* HERO SECTION */}
        <section className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
            Digitalisasi <br />
            <span className="text-emerald-600">Pertanian.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 font-medium">
            Gerbang utama akses layanan aplikasi dan data Prasarana dan Sarana Pertanian dalam satu platform terpadu.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Cari nama aplikasi atau layanan data..."
              className="w-full pl-16 pr-8 py-6 bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-lg placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* --- SECTION 1: APLIKASI --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Monitor size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Layanan Aplikasi PSP</h2>
              <p className="text-sm text-slate-400 font-bold tracking-widest uppercase">Internal Systems & Tools</p>
            </div>
            <div className="flex-1 h-[1px] bg-slate-100 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {aplikasiList.length > 0 ? (
              aplikasiList.map(item => <ServiceCard key={item.id} item={item} />)
            ) : (
              <div className="col-span-full py-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center text-slate-300 font-bold uppercase tracking-widest">
                Tidak ada data aplikasi
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 2: LAYANAN DATA --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Layanan Data & Informasi</h2>
              <p className="text-sm text-slate-400 font-bold tracking-widest uppercase">Statistics & Geographic Data</p>
            </div>
            <div className="flex-1 h-[1px] bg-slate-100 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {layananList.length > 0 ? (
              layananList.map(item => <ServiceCard key={item.id} item={item} />)
            ) : (
              <div className="col-span-full py-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center text-slate-300 font-bold uppercase tracking-widest">
                Tidak ada data layanan data
              </div>
            )}
          </div>
        </div>

        <footer className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-sm font-black text-slate-800 mb-1 tracking-tighter uppercase">Direktorat Jenderal Prasarana dan Sarana Pertanian</div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">Kementerian Pertanian Republik Indonesia</p>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Globe size={12}/> Jakarta</span>
            <span>v1.0.2 Stable</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;