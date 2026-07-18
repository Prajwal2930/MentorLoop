import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import { subscribeToRequestState } from './services/api';

const NetworkActivityIndicator = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => subscribeToRequestState((requestCount) => setIsRequesting(requestCount > 0)), []);

  return (
    <AnimatePresence>
      {isRequesting && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-lg shadow-slate-950/10 backdrop-blur dark:border-indigo-500/25 dark:bg-slate-900/95 dark:text-indigo-300">
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Syncing your workspace...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <NetworkActivityIndicator />
        <Toaster richColors closeButton position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
