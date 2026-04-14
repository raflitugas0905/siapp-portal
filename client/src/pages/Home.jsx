import { useState, useEffect } from 'react';
import api from '../api/api';
import { 
  ExternalLink, LayoutGrid, Search, ArrowRight, Monitor, Database,
  Sparkles, ChevronRight, Sun, Moon,
  Instagram, Twitter, Facebook, Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const searchedItems = services.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const aplikasiList = searchedItems.filter(item => item.category?.toLowerCase().trim() === 'aplikasi');
  const layananList = searchedItems.filter(item => item.category?.toLowerCase().trim() === 'layanan');

  // --- SERVICE CARD DENGAN ANIMASI SCROLL ---
  const ServiceCard = ({ item, index }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] p-10 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-500/40 hover:shadow-[0_50px_100px_-20px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_50px_100px_-20px_rgba(16,185,129,0.25)] transition-all duration-700 flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-50 dark:bg-emerald-950/40 rounded-full blur-[80px] group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/50 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/40 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-full object-contain p-3" />
          ) : (
            <LayoutGrid size={28} className="text-slate-200 dark:text-slate-700 group-hover:text-emerald-500" />
          )}
        </div>

        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-12 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {item.description || "Inovasi digital untuk optimalisasi sarana dan prasarana pertanian nasional."}
        </p>
      </div>

      <div className="relative z-10 pt-8 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between">
        <a 
          href={item.link_url} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] group/btn hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          Explore Platform
          <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform text-emerald-500" />
        </a>
        <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-emerald-500 transition-colors" />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-white selection:bg-emerald-100 selection:text-emerald-900 dark:selection:bg-emerald-950 overflow-x-hidden font-sans">
      
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-emerald-50/60 dark:bg-emerald-950/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-50/50 dark:bg-blue-950/20 rounded-full blur-[120px]" />
      </div>

    
      <nav className="sticky top-0 z-[100] bg-white/40 dark:bg-[#080B10]/40 backdrop-blur-2xl border-b border-slate-200/40 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Logo_Kementerian_Pertanian_Republik_Indonesia.svg" className="h-12 w-auto drop-shadow-sm" alt="Kementan" />
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none">SIAPP<span className="text-emerald-600">.</span></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Portal Terpadu PSP</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-white/60 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-48 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] -z-10 overflow-hidden rounded-[5rem]">
            <img 
              src="https://siapp.psp.pertanian.go.id/assets/img/preview.webp" 
              className="w-full h-full object-cover grayscale opacity-25 dark:opacity-15 scale-105"
              alt="Background Pertanian"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] dark:from-[#080B10] via-transparent to-[#F8FAFC] dark:to-[#080B10]" />
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-12"
            >
              <Sparkles size={14} /> Ecosystem Digitalization 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-[-0.05em] leading-[0.9] mb-12"
            >
              SISTEM <br />
              <span className="text-emerald-600 dark:text-emerald-500 relative inline-block">
                TERPADU
                <svg className="absolute -bottom-4 left-0 w-full h-8 text-emerald-200 dark:text-emerald-800 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 25 20 50 10 T 100 10" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </motion.h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-20 font-medium tracking-tight leading-relaxed opacity-90">
              Integrasi cerdas seluruh layanan infrastruktur dan sarana pertanian dalam satu genggaman digital.
            </p>

            <div className="max-w-3xl mx-auto relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={28} />
              <input 
                type="text" 
                placeholder="Cari ekosistem layanan..."
                className="relative w-full pl-20 pr-10 py-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 focus:ring-0 focus:border-emerald-500 outline-none transition-all text-2xl font-bold text-slate-900 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-8 pb-40 relative z-10">
       
          <section className="mb-40">
            <div className="flex items-center gap-6 mb-16 px-2">
              <div className="p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl shadow-xl shadow-slate-200 dark:shadow-slate-950/30">
                <Monitor size={32} />
              </div>
              <div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Layanan Aplikasi</h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] mt-1">Core Operational Systems</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {aplikasiList.map((item, i) => <ServiceCard key={item.id} item={item} index={i} />)}
            </div>
          </section>

         
          <section className="mb-40">
            <div className="flex items-center gap-6 mb-16 px-2">
              <div className="p-4 bg-emerald-600 text-white rounded-3xl shadow-xl shadow-emerald-200 dark:shadow-emerald-950/50">
                <Database size={32} />
              </div>
              <div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Layanan Data</h2>
                <p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mt-1">Strategic Information Resources</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {layananList.map((item, i) => <ServiceCard key={item.id} item={item} index={i} />)}
            </div>
          </section>
        </div>

        
        <footer className="bg-slate-950 py-32 px-8 text-white rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
              <div>
                <div className="text-5xl font-black tracking-[-0.05em] mb-8 leading-none">SIAPP<span className="text-emerald-500">.</span></div>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed font-medium">
                  Platform digitalisasi resmi Direktorat Jenderal Prasarana dan Sarana Pertanian - Kementerian Pertanian RI.
                </p>
                
                {/* SOSIAL MEDIA CLUSTER */}
                <div className="flex gap-6 mt-10">
                  <a href="https://www.instagram.com/pspkementan/?hl=id" target="_blank" rel="noreferrer" 
                     className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://x.com/pspkementanri" target="_blank" rel="noreferrer" 
                     className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Twitter size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://www.facebook.com/PSPKementan/" target="_blank" rel="noreferrer" 
                     className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Facebook size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCRix43uVhaUhq-s7ik9NUOw" target="_blank" rel="noreferrer" 
                     className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Youtube size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-4">Developed By</div>
                <div className="text-2xl font-black tracking-tighter uppercase leading-none">IT Team Ditjen PSP</div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              <p>© 2026 KEMENTERIAN PERTANIAN INDONESIA</p>
              <div className="flex gap-10">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <span className="text-white bg-emerald-950 px-3 py-1 rounded-full">v1.2.6 Stable</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;