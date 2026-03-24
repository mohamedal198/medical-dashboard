import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUserPlus, FaWeight, FaArrowsAltV, FaNotesMedical } from 'react-icons/fa';

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', age: '', phone: '', weight: '', height: '', gender: 'Male', diagnosis: '',
  });

  const [bmi, setBmi] = useState(null);

  // حساب BMI تلقائي (Medical Logic)
  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmiValue = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    }
  }, [formData.weight, formData.height]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.phone) return toast.error('من فضلك أكمل البيانات الأساسية');

    const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const newPatient = {
      ...formData,
      id: Date.now(),
      lastVisit: new Date().toLocaleDateString('ar-EG'),
      status: 'مستقر',
      bmi: bmi
    };

    localStorage.setItem('patients', JSON.stringify([newPatient, ...existingPatients]));
    toast.success('تم إضافة المريض للمنظومة بنجاح');
    setTimeout(() => navigate('/patients'), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">إضافة مريض جديد 🩺</h1>
      
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="اسم المريض" className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="text" placeholder="رقم الهاتف" className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          <div className="flex gap-4">
            <input type="number" placeholder="الوزن" className="flex-1 p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none" onChange={(e) => setFormData({...formData, weight: e.target.value})} />
            <input type="number" placeholder="الطول" className="flex-1 p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none" onChange={(e) => setFormData({...formData, height: e.target.value})} />
          </div>
          <div className="bg-blue-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-200">
            <span className="font-bold">BMI Score:</span>
            <span className="text-2xl font-black">{bmi || '--'}</span>
          </div>
          <textarea placeholder="التشخيص المبدئي..." className="md:col-span-2 p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none h-32" onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}></textarea>
          <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all">حفظ ومتابعة</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;