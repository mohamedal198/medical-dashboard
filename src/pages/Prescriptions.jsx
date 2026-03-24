import React, { useState } from 'react';
import { FaPlus, FaPrint, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Prescriptions = () => {
  const [meds, setMeds] = useState([{ name: '', dose: '', duration: '' }]);
  const [patientName, setPatientName] = useState('');

  const addMed = () => setMeds([...meds, { name: '', dose: '', duration: '' }]);
  
  const handlePrint = () => {
    if (!patientName) return toast.error('من فضلك اختر المريض أولاً');
    window.print(); // دي هتفتح نافذة الطباعة للمتصفح
  };

  return (
    <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">إنشاء روشتة إلكترونية 📝</h1>
        <button onClick={handlePrint} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg hover:bg-emerald-700 transition-all">
          <FaPrint /> طباعة الروشتة
        </button>
      </div>

      <div className="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm print:shadow-none print:border-none">
        {/* الهيدر بتاع الروشتة (زي الحقيقية) */}
        <div className="flex justify-between border-b-2 border-blue-600 pb-6 mb-10">
          <div className="text-right">
            <h2 className="text-2xl font-black text-blue-600">د. محمد أحمد</h2>
            <p className="text-slate-500 font-bold">أخصائي الجراحة العامة وتجميل الحروق</p>
          </div>
          <div className="text-left text-slate-400 text-sm italic">
            <p>Cairo, Egypt</p>
            <p>+20 123 456 789</p>
          </div>
        </div>

        {/* بيانات المريض */}
        <div className="mb-10">
          <input 
            type="text" 
            placeholder="اسم المريض بالكامل..." 
            className="w-full text-xl font-bold border-b-2 border-dashed border-slate-200 py-2 outline-none focus:border-blue-400 transition-all"
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        {/* منطقة الأدوية (Rx) */}
        <div className="space-y-6">
          <h3 className="text-3xl font-serif italic text-blue-600 mb-4">Rx:</h3>
          {meds.map((med, index) => (
            <div key={index} className="flex gap-4 items-center group">
              <input 
                type="text" 
                placeholder="اسم الدواء (Drug Name)" 
                className="flex-[2] p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-blue-500 outline-none font-bold"
              />
              <input 
                type="text" 
                placeholder="الجرعة (Dosage)" 
                className="flex-1 p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-blue-500 outline-none"
              />
              <button 
                onClick={() => setMeds(meds.filter((_, i) => i !== index))}
                className="p-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          
          <button 
            onClick={addMed}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <FaPlus /> إضافة دواء جديد
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between text-slate-400 text-xs italic">
          <p>تاريخ الروشتة: {new Date().toLocaleDateString('ar-EG')}</p>
          <p>الإمضاء: ............................</p>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;