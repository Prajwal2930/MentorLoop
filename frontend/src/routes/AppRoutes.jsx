import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AnalyzeCodePage from '../pages/AnalyzeCodePage';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import OnboardingPage from '../pages/OnboardingPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import SkillsPage from '../pages/SkillsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/analyze-code" element={<AnalyzeCodePage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/skills" element={<SkillsPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
