import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BugReportFormPage from './components/BugReport/reportForm'
import HomePage from './components/Home'
import LandingPage from './components/Landing';
import LoginPage from './components/Login'
import CreateAccountPage from './components/CreateAccount'
import ProfilePage from './components/Profile'
import UserAppsPage from './components/UserApps'
import UserAppPage from './components/UserApp'
import UserAppUploadPage from './components/UserAppUpload'
import NavBar from './components/NavBar';

function App() {
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
          <Route path='/apps' element={<UserAppsPage />}/>
          <Route path='/app/:id' element={<UserAppPage />}/>
          <Route path='/upload' element={<UserAppUploadPage />}/>
          <Route path='/bug-report/:id' element={<BugReportFormPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
