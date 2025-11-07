import Signup from './tempPages/SignUp.jsx';
import ProfilePage from './tempPages/ProfilePage.jsx';
import SignIn from './tempPages/SignIn.jsx';
import { useSelector } from 'react-redux';
import './index.css';
import HomePage from './tempPages/HomePage/HomePage.jsx';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from './tempPages/StudentsDashboard/Dashboard-students.jsx';
import StudentTimetable from './tempPages/StudentsDashboard/StudentTimetable.jsx';
import StudentAttendance from './tempPages/StudentsDashboard/StudentAttendance.jsx';
import StudentNotifications from './tempPages/StudentsDashboard/StudentNotification.jsx';
import JCafe from './tempPages/StudentsDashboard/JCafe.jsx';
import Notes from './tempPages/StudentsDashboard/Notes.jsx';
import Opportunities from './tempPages/StudentsDashboard/StudentOpportunities.jsx';
import Support from './tempPages/StudentsDashboard/StudentSupport.jsx';
import AdminDashboard from './tempPages/AdminDashBoard.jsx';
import Campaigns from './tempPages/Campaigns.jsx';
import AdminOpportunities from './tempPages/Opportunities.jsx';
import AdminSignUp from './tempPages/AdminSignUp.jsx';
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
