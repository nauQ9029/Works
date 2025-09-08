import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Cập nhật từ Switch sang Routes
import PatientContextProvider from './context/PatientContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadWithDelay } from './utils/loadWithDelay';

const LoginForm = lazy(()=> loadWithDelay(() => import('./components/LoginForm'),2000));
const PatientManagement = lazy(()=> loadWithDelay(() => import('./components/PatientManagement'),2000));

const App = () => {
  return (
    <Router>
      <PatientContextProvider>
        <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>  {/* Sử dụng Routes thay vì Switch */}
            <Route path="/" element={<LoginForm />} />  {/* Sử dụng element thay vì component */}
            <Route path="/patients" element={<PatientManagement />} />  {/* Sử dụng element thay vì component */}
          </Routes>
          </Suspense>
        </div>
      </PatientContextProvider>
    </Router>
  );
};

export default App;
