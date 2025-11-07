import Signup from './Pages/SignUp.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import SignIn from './Pages/SignIn.jsx';
import { useSelector } from 'react-redux';
import './index.css';
import HomePage from './Pages/HomePage/HomePage.jsx';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from './Pages/StudentsDashboard/Dashboard-students.jsx';
import StudentTimetable from './Pages/StudentsDashboard/StudentTimetable.jsx';
import StudentAttendance from './Pages/StudentsDashboard/StudentAttendance.jsx';
import StudentNotifications from './Pages/StudentsDashboard/StudentNotification.jsx';
import JCafe from './Pages/StudentsDashboard/JCafe.jsx';
import Notes from './Pages/StudentsDashboard/Notes.jsx';
import Opportunities from './Pages/StudentsDashboard/StudentOpportunities.jsx';
import Support from './Pages/StudentsDashboard/StudentSupport.jsx';
import AdminDashboard from './Pages/AdminDashBoard.jsx';
import Campaigns from './Pages/Campaigns.jsx';
import AdminOpportunities from './Pages/Opportunities.jsx';
import AdminSignUp from './Pages/AdminSignUp.jsx';
function App() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/admin/campaigns' element={<Campaigns />} />
      <Route path='/admin/opportunities' element={<AdminOpportunities />} />
      <Route path='/admin/signup' element={<AdminSignUp />} />
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
