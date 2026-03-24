import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaThLarge, FaUserInjured, FaCalendarAlt, FaFileMedical, FaPlusCircle, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة في الموبايل
  const location = useLocation();

  const menuItems = [
    { name: 'الرئيسية', icon: <FaThLarge />, path: '/' },
    { name: 'المرضى', icon: <FaUserInjured />, path: '/patients' },
    { name: 'المواعيد', icon: <FaCalendarAlt />, path: '/appointments' },
    { name: 'الروشتات', icon: <FaFileMedical />, path: '/prescriptions' },
  ];

  return (
    <>
      {/* زرار الفتح للموبايل فقط */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-[100] bg-blue-600 text-white p-3 rounded-2xl shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* السايدبار */}
      <div className={`
        fixed right-0 top-0 h-screen bg-[#1e293b] text-white z-[90] transition-all duration-300 shadow-2xl flex flex-col
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 translate-x-full lg:translate-x-0'} 
      `}>
        <div className="p-8 text-center border-b border-slate-700/50">
          <h1 className="text-xl font-bold">دكتور كود 🩺</h1>
        </div>

        <nav className="flex-1 mt-6 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // يقفل السايدبار لما تختار صفحة
              className={`flex items-center gap-4 p-4 mb-3 rounded-2xl transition-all ${
                location.pathname === item.path ? 'bg-blue-600 shadow-lg' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-bold">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;