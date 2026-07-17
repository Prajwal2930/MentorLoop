import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <Toaster richColors closeButton position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
