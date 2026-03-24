import React from 'react';

const StatCard = ({ title, count, icon, color, subtext }) => {
  return (
    <div className={`p-6 rounded-3xl shadow-sm text-white flex flex-col justify-between h-40 ${color} transition-transform hover:scale-105 cursor-pointer`}>
      <div className="flex justify-between items-start">
        <div className="text-3xl bg-white/20 p-3 rounded-2xl">
          {icon}
        </div>
        <span className="text-sm font-light opacity-80">{subtext}</span>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-1">{count}</h3>
        <p className="text-lg opacity-90">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;