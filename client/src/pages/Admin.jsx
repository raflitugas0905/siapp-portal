import { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Trash2, PlusCircle, LogOut, Link as LinkIcon, Image as ImageIcon, Edit3, X, CheckCircle2 } from 'lucide-react';

const Admin = () => {
  const [services, setServices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', link_url: '', image_url: '', description: '', category: 'aplikasi' });
  const [editForm, setEditForm] = useState({ id: null, title: '', link_url: '', image_url: '', description: '', category: 'aplikasi' });
  
  const navigate = useNavigate();

  const loadData = () => api.get('/services').then(res => setServices(res.data));

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    loadData();
  }, []);

  // --- LOGIKA TAMBAH (CREATE) ---
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', form);
      alert("Layanan Berhasil Ditambahkan!");
      setForm({ title: '', link_url: '', image_url: '', description: '', category: 'aplikasi' });
      loadData();
    } catch (err) { alert("Gagal menambah data."); }
  };

  // --- LOGIKA EDIT (UPDATE) ---
  const openEditModal = (service) => {
    setEditForm(service);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Pastikan backend kamu mendukung rute PUT /api/services/:id
      await api.put(`/services/${editForm.id}`, editForm);
      alert("Layanan Berhasil Diperbarui!");
      setIsEditModalOpen(false);
      loadData();
    } catch (err) { alert("Gagal memperbarui data."); }
  };

  // --- LOGIKA HAPUS (DELETE) ---
  const handleDelete = async (id) => {
    if(confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      await api.delete(`/services/${id}`);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans selection:bg-emerald-100">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">Admin<span className="text-emerald-600">Console.</span></h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">SIAPP Management System</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} 
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut size={16} /> Logout Sesi
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: FORM TAMBAH */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 sticky top-28">
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <PlusCircle className="text-emerald-500" size={24} /> Registrasi Baru
              </h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <input 
                  className="w-full border-slate-200 border p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-sm" 
                  placeholder="Nama Aplikasi" value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} required 
                />
                <select 
                  className="w-full border-slate-200 border p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-sm bg-white"
                  value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                >
                  <option value="aplikasi">Aplikasi Internal</option>
                  <option value="layanan">Layanan Data</option>
                </select>
                <input 
                  type="url" className="w-full border-slate-200 border p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-sm" 
                  placeholder="Link URL (https://...)" value={form.link_url} 
                  onChange={e => setForm({...form, link_url: e.target.value})} required 
                />
                <input 
                  type="url" className="w-full border-slate-200 border p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-sm" 
                  placeholder="URL Icon Gambar" value={form.image_url} 
                  onChange={e => setForm({...form, image_url: e.target.value})} 
                />
                <textarea 
                  className="w-full border-slate-200 border p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-sm" 
                  placeholder="Deskripsi singkat..." rows="3" value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                />
                <button className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-100">
                  Simpan Data
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: TABEL DATA */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Info Layanan</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kategori</th>
                    <th className="p-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-6">
                        <div className="font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">{s.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">{s.link_url}</div>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          s.category === 'aplikasi' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-purple-50 text-purple-500 border-purple-100'
                        }`}>
                          {s.category}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openEditModal(s)} className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18}/>
                          </button>
                          <button onClick={() => handleDelete(s.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={18}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL EDIT (UPDATE) --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 italic">Edit<span className="text-emerald-600">Layanan.</span></h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nama Layanan</label>
                    <input className="w-full border-slate-100 bg-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Kategori</label>
                    <select className="w-full border-slate-100 bg-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                      <option value="aplikasi">Aplikasi</option>
                      <option value="layanan">Layanan</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Link Aplikasi (URL)</label>
                  <input type="url" className="w-full border-slate-100 bg-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" value={editForm.link_url} onChange={e => setEditForm({...editForm, link_url: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Link Icon Gambar</label>
                  <input type="url" className="w-full border-slate-100 bg-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" value={editForm.image_url} onChange={e => setEditForm({...editForm, image_url: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Deskripsi</label>
                  <textarea className="w-full border-slate-100 bg-slate-50 p-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" rows="3" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                </div>
                <button className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100 mt-4 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;