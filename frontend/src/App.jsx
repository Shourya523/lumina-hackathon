import Signup from './pages/SignUp.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignIn from './pages/SignIn.jsx';
import { useSelector } from 'react-redux';
import './index.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from './pages/StudentsDashboard/Dashboard-students.jsx';
import StudentTimetable from './pages/StudentsDashboard/StudentTimetable.jsx';
import StudentAttendance from './pages/StudentsDashboard/StudentAttendance.jsx';
import StudentNotifications from './pages/StudentsDashboard/StudentNotification.jsx';
import JCafe from './pages/StudentsDashboard/JCafe.jsx';
import Notes from './Pages/StudentsDashboard/Notes.jsx';
import Opportunities from './Pages/StudentsDashboard/StudentOpportunities.jsx';
import Support from './Pages/StudentsDashboard/StudentSupport.jsx';
function App() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/student-dashboard' element={<StudentDashboard />} />
      <Route path='/student/jcafe' element={<JCafe />} />
      <Route path='/student/timetable' element={<StudentTimetable />} />
      <Route path='/student/attendance' element={<StudentAttendance />} />
      <Route path='/student/notifications' element={<StudentNotifications />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student/notes" element={<Notes />} />
      <Route path="/student/opportunities" element={<Opportunities />} />
      <Route path="/student/support" element={<Support />} />
      {currentUser ? (
        <Route path="/profile" element={<ProfilePage />} />
      ) : (
        <Route path="/" element={<HomePage />} />
      )}
    </Routes>
  );
}

export default App;
