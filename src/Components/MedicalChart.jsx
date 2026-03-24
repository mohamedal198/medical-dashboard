import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'السبت', patients: 12 },
  { name: 'الأحد', patients: 18 },
  { name: 'الاثنين', patients: 15 },
  { name: 'الثلاثاء', patients: 25 },
  { name: 'الأربعاء', patients: 20 },
  { name: 'الخميس', patients: 30 },
  { name: 'الجمعة', patients: 10 },
];

const MedicalChart = () => {
  return (
    // هنا حددنا الارتفاع بوضوح h-[400px] عشان الـ ResponsiveContainer يقرأ مساحة حقيقية
    <div className="w-full h-[400px] bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <h3 className="text-xl font-black text-slate-800 mb-6">معدل نشاط العيادة الأسبوعي</h3>
      
      {/* ضفنا debounce={100} عشان يستنى المتصفح يظبط الأبعاد قبل ما يرسم */}
      <ResponsiveContainer width="99%" height="100%" debounce={100}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12}} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              direction: 'rtl'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="patients" 
            stroke="#3b82f6" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorPatients)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicalChart;