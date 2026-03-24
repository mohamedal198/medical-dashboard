import React, { useState, useEffect } from 'react';
import StatCard from '../Components/StatCard';
import MedicalChart from '../Components/MedicalChart';
import { FaUserPlus, FaClock, FaExclamationTriangle, FaWeight } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, critical: 0, appointments: 0, highRisk: [] });

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const savedAppoints = JSON.parse(localStorage.getItem('appointments') || '[]');
    const highRisk = savedPatients.filter(p => p.bmi >= 30);
    
    setStats({
      total: savedPatients.length,
      critical: savedPatients.filter(p => p.status === 'حرج').length,
      appointments: savedAppoints.length,
      highRisk: highRisk
    });
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800">لوحة التحكم 👋</h1>
        <p className="text-slate-500 text-sm mt-1">ملخص حالة العيادة اليوم، 26 يناير 2026</p>
      </div>

      {/* الكروت: عمود واحد في الموبايل، 2 في التابلت، 4 في الديسكتوب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="إجمالي المرضى" count={stats.total} icon={<FaUserPlus />} color="bg-blue-600" />
        <StatCard title="المواعيد" count={stats.appointments} icon={<FaClock />} color="bg-emerald-500" />
        <StatCard title="حالات حرجة" count={stats.critical} icon={<FaExclamationTriangle />} color="bg-rose-500" />
        <StatCard title="BMI مرتفع" count={stats.highRisk.length} icon={<FaWeight />} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* الرسم البياني */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <MedicalChart />
          {stats.highRisk.length > 0 && (
            <div className="mt-6 bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <p className="text-amber-800 text-xs font-bold mb-2 flex items-center gap-1">
                <FaExclamationTriangle /> تنبيه السمنة المفرطة:
              </p>
              <div className="flex flex-wrap gap-2">
                {stats.highRisk.map(p => (
                  <span key={p.id} className="text-[10px] bg-white px-2 py-1 rounded-lg border border-amber-200 text-amber-700 font-bold">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* قائمة المرضى الأخيرة */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm order-1 lg:order-2 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 border-b pb-2 text-sm">أحدث المسجلين</h3>
          <div className="space-y-4">
            {stats.total === 0 ? (
              <p className="text-center text-slate-400 text-xs italic">لا بيانات</p>
            ) : (
              JSON.parse(localStorage.getItem('patients')).slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{p.name}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold">BMI: {p.bmi || '--'}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;