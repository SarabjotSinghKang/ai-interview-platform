import { Route, Routes } from "react-router";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreateInterviewPage from "./pages/CreateInterviewPage.jsx";
import InterviewRoomPage from "./pages/InterviewRoomPage.jsx";
import InterviewResultPage from "./pages/InterviewResultPage.jsx";
import InterviewHistoryPage from "./pages/InterviewHistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* All private routes */}
      <Route element={<ProtectedRoute />}>
        {/* Pages that use the dashboard sidebar and header */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/interviews"
            element={<InterviewHistoryPage />}
          />

          <Route
            path="/interviews/create"
            element={<CreateInterviewPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Route>

        {/* Full-screen interview pages */}
        <Route
          path="/interviews/:id"
          element={<InterviewRoomPage />}
        />

        <Route
          path="/interviews/:id/result"
          element={<InterviewResultPage />}
        />
      </Route>

      {/* Any unknown URL */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;