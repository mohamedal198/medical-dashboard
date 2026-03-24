import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// المكونات والصفحات
import Sidebar from './Components/Sidebar';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/PatientsList';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import Prescriptions from './pages/Prescriptions';
import Appointments from './pages/Appointments';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />

      <div className="flex min-h-screen bg-slate-50 font-sans overflow-x-hidden" dir="rtl">
        {/* السايدبار (الآن يحتوي على منطق الفتح والقفل للموبايل) */}
        <Sidebar />

        {/* منطقة المحتوى: 
            lg:mr-64 تعني أن الهامش يظهر فقط في الشاشات الكبيرة.
            p-4 في الموبايل و p-10 في الشاشات الكبيرة. */}
        <main className="flex-1 lg:mr-64 p-4 md:p-10 w-full transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patient/:id" element={<PatientDetails />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;