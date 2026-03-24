import React from 'react';
import { FaUserCircle, FaStethoscope, FaHistory, FaPills, FaWeight, FaArrowsAltV } from 'react-icons/fa';

const PatientDetails = () => {
  // بيانات وهمية لمريض (لحد ما نربط الـ Database)
  const patient = {
    name: "أحمد علي حسن",
    age: 34,
    phone: "01012345678",
    gender: "ذكر",
    weight: 85,
    height: 175,
    bmi: 27.8,
    history: [
      { date: "2026-01-10", diagnosis: "ارتفاع بسيط في ضغط الدم", treatment: "Exforge 5/160mg" },
      { date: "2025-12-15", diagnosis: "نزلة برد حادة", treatment: "Panadol + Vitamin C" }
    ]
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header الملف الشخصي */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="text-7xl text-blue-500 bg-blue-50 p-4 rounded-3xl">
          <FaUserCircle />
        </div>
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-3xl font-bold text-slate-800">{patient.name}</h1>
          <p className="text-slate-500 font-medium mt-1">{patient.gender} - {patient.age} سنة</p>
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-xl font-bold text-sm">كود المريض: #1024</span>
            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-xl font-bold text-sm">{patient.phone}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الجانبي: القياسات الحيوية (Vitals) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FaStethoscope className="text-blue-500"/> المؤشرات الحيوية
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600"><FaWeight/> الوزن</div>
                <div className="font-bold text-slate-800">{patient.weight} كجم</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600"><FaArrowsAltV/> الطول</div>
                <div className="font-bold text-slate-800">{patient.height} سم</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-600 font-bold">BMI</div>
                <div className="font-black text-blue-700">{patient.bmi} (Overweight)</div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الرئيسي: السجل الطبي (Medical History) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
              <FaHistory className="text-blue-500"/> السجل الطبي القديم
            </h3>
            <div className="space-y-8 relative before:absolute before:right-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-100">
              {patient.history.map((item, index) => (
                <div key={index} className="relative pr-10">
                  <div className="absolute right-2.5 top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  <p className="text-sm font-bold text-blue-600 mb-1">{item.date}</p>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{item.diagnosis}</h4>
                  <div className="flex items-start gap-2 bg-emerald-50 text-emerald-700 p-4 rounded-2xl">
                    <FaPills className="mt-1"/>
                    <p className="text-sm font-medium">العلاج: {item.treatment}</p>
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

export default PatientDetails;