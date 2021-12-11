import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BugReportPage from './components/BugReport/report'
import BugReportsListPage from './components/BugReport/reportsList'
import BugReportFormPage from './components/BugReport/reportForm'
import HomePage from './components/Home'
import LandingPage from './components/Landing';
import LoginPage from './components/Login'
import CreateAccountPage from './components/CreateAccount'
import ProfilePage from './components/Profile'
import UserAppPage from './components/UserApp'
import UserAppUploadPage from './components/UserAppUpload'
import NavBar from './components/NavBar';

import { setLoggedInStatus } from './auth/userInfo'

function App() {
  if (localStorage.getItem('loggedIn') === null) {
    setLoggedInStatus(false)
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<LandingPage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<CreateAccountPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/app/:id' element={<UserAppPage />}/>
          <Route path='/upload' element={<UserAppUploadPage />}/>
          <Route path='/bug-reports/:id' element={<BugReportsListPage />}/>
          <Route path='/bug-report/:id' element={<BugReportPage />}/>
          <Route path='/app/:id/bug-report' element={<BugReportFormPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
