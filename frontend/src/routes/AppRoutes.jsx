import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AnalyticsPage from '../pages/AnalyticsPage';
import AnalyzeCodePage from '../pages/AnalyzeCodePage';
import DashboardPage from '../pages/DashboardPage';
import GitHubReviewPage from '../pages/GitHubReviewPage';
import InterviewHistoryPage from '../pages/InterviewHistoryPage';
import InterviewResultsPage from '../pages/InterviewResultsPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import MockInterviewPage from '../pages/MockInterviewPage';
import NotFoundPage from '../pages/NotFoundPage';
import OnboardingPage from '../pages/OnboardingPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import RoadmapDetailsPage from '../pages/RoadmapDetailsPage';
import RoadmapPage from '../pages/RoadmapPage';
import SkillsPage from '../pages/SkillsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/github-review" element={<GitHubReviewPage />} />
      <Route path="/analyze-code" element={<AnalyzeCodePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/interview" element={<MockInterviewPage />} />
      <Route path="/interview/history" element={<InterviewHistoryPage />} />
      <Route path="/interview/results/:id" element={<InterviewResultsPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/roadmap/:id" element={<RoadmapDetailsPage />} />
      <Route path="/skills" element={<SkillsPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
