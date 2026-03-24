import React, { useState, useEffect } from 'react';

import { FaCalendarPlus, FaClock, FaUser, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Appointments = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppoint, setNewAppoint] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'كشف'
  });

  // تحميل البيانات من LocalStorage
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const savedAppoints = JSON.parse(localStorage.getItem('appointments') || '[]');
    setPatients(savedPatients);
    setAppointments(savedAppoints);
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppoint.patientId || !newAppoint.date || !newAppoint.time) {
      return toast.error('من فضلك أكمل بيانات الموعد');
    }

    const patient = patients.find(p => p.id === parseInt(newAppoint.patientId));
    const appointment = {
      ...newAppoint,
      id: Date.now(),
      patientName: patient ? patient.name : 'مريض غير معروف',
      status: 'قادم'
    };

    const updatedAppoints = [appointment, ...appointments];
    setAppointments(updatedAppoints);
    localStorage.setItem('appointments', JSON.stringify(updatedAppoints));
    toast.success('تم حجز الموعد بنجاح 📅');
    setNewAppoint({ patientId: '', date: '', time: '', type: 'كشف' });
  };

  const deleteAppoint = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    toast.error('تم إلغاء الموعد');
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">إدارة المواعيد 📅</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* فورم حجز موعد جديد */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
            <FaCalendarPlus className="text-blue-500" /> حجز موعد جديد
          </h2>
          <form onSubmit={handleAddAppointment} className="space-y-4 text-right">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">اختر المريض</label>
              <select 
                className="w-full p-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                value={newAppoint.patientId}
                onChange={(e) => setNewAppoint({...newAppoint, patientId: e.target.value})}
              >
                <option value="">-- اختر مريض --</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">التاريخ</label>
              <input 
                type="date" 
                className="w-full p-3 rounded-2xl border border-slate-200 outline-none bg-slate-50"
                onChange={(e) => setNewAppoint({...newAppoint, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">الوقت</label>
              <input 
                type="time" 
                className="w-full p-3 rounded-2xl border border-slate-200 outline-none bg-slate-50"
                onChange={(e) => setNewAppoint({...newAppoint, time: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all mt-4">
              تأكيد الحجز
            </button>
          </form>
        </div>

        {/* قائمة المواعيد القادمة */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-700 mb-6">جدول مواعيد اليوم</h2>
            <div className="space-y-4">
              {appointments.length === 0 && <p className="text-center text-slate-400 italic py-10">لا توجد مواعيد محجوزة بعد...</p>}
              {appointments.map(app => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                      <FaUser />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{app.patientName}</h4>
                      <div className="flex gap-3 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><FaCalendarPlus /> {app.date}</span>
                        <span className="flex items-center gap-1"><FaClock /> {app.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">{app.type}</span>
                    <button onClick={() => deleteAppoint(app.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;