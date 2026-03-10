import { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Debug: Cek data yang dikirim di console browser
    console.log("Mencoba login dengan:", creds.username);

    try {
      // Menggunakan '/login' karena baseURL di api.js biasanya sudah mengandung '/api'
      const res = await api.post('/login', creds);
      
      // Simpan token
      localStorage.setItem('token', res.data.token);
      
      // Opsional: Simpan nama user untuk dipajang di Admin Dashboard
      if (res.data.user && res.data.user.name) {
        localStorage.setItem('adminName', res.data.user.name);
      }

      navigate('/admin');
    } catch (err) {
      // Debug error lebih mendalam
      console.error("Login Error Detail:", err.response || err.message);
      
      if (err.message === "Network Error") {
        alert("Gagal terhubung ke server. Pastikan backend jalan di port 5000!");
      } else {
        alert("Username atau Password Salah!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-6 font-sans relative overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>

        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-100 border border-slate-50 p-3 mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Logo_Kementerian_Pertanian_Republik_Indonesia.svg" 
                alt="Logo Kementan" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight text-center">
              Console Admin<span className="text-emerald-600">.</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest text-center">Portal SIAPP</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username</label>
              <input 
                type="text" 
                placeholder="Masukkan username" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm" 
                onChange={e => setCreds({...creds, username: e.target.value})} 
                required 
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group/pass">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm pr-12" 
                  onChange={e => setCreds({...creds, password: e.target.value})} 
                  required 
                />
                
                {/* TOMBOL TOGGLE MATA */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600 transition-colors p-1 flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200 flex items-center justify-center gap-2 group mt-4 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyambungkan..." : "Masuk Sekarang"}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Direktorat Jenderal PSP © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;