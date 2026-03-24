import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaUserEdit, FaTrashAlt, FaUserSlash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    setPatients(JSON.parse(localStorage.getItem('patients') || '[]'));
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`مسح ملف ${name}؟`)) {
      const updated = patients.filter(p => p.id !== id);
      setPatients(updated);
      localStorage.setItem('patients', JSON.stringify(updated));
      toast.success('تم المسح');
    }
  };

  const handleSaveEdit = () => {
    const updated = patients.map(p => p.id === currentPatient.id ? currentPatient : p);
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    setIsEditModalOpen(false);
    toast.success('تم التحديث');
  };

  const filtered = patients.filter(p => p.name.includes(searchTerm) || p.phone.includes(searchTerm));

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-black text-slate-800">سجل المرضى</h1>
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" />
          <input 
            type="text" 
            placeholder="بحث..." 
            className="w-full pr-12 pl-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* الجدول: جعلناه overflow-x-auto ليعمل على الموبايل */}
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[600px]">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">المريض</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">{p.name[0]}</div>
                      <div className="text-sm font-bold text-slate-700">{p.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{p.phone}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link to={`/patient/${p.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FaEye /></Link>
                      <button onClick={() => {setCurrentPatient(p); setIsEditModalOpen(true)}} className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FaUserEdit /></button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-2 bg-rose-50 text-rose-600 rounded-lg"><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-10 text-center text-slate-400 italic">لا توجد نتائج</div>}
      </div>

      {/* Edit Modal - متجاوب أيضاً */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md animate-in zoom-in duration-300">
            <h2 className="text-xl font-bold mb-6">تعديل البيانات</h2>
            <div className="space-y-4">
              <input 
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none"
                value={currentPatient.name}
                onChange={(e) => setCurrentPatient({...currentPatient, name: e.target.value})}
              />
              <input 
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none"
                value={currentPatient.phone}
                onChange={(e) => setCurrentPatient({...currentPatient, phone: e.target.value})}
              />
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleSaveEdit} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">حفظ</button>
              <button onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-xl font-bold">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsList;