import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
    <Navbar />
    <div className="flex min-h-[calc(100vh-4.5rem)]">
      <Sidebar />
      <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="surface-grid min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </motion.main>
    </div>
  </div>
);

export default DashboardLayout;
