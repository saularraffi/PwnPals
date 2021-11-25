import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BugReportPage from './components/BugReport'
import HomePage from './components/Home'
import LandingPage from './components/Landing';
import LoginPage from './components/Login'
import ProfilePage from './components/Profile'
import UserAppsPage from './components/UserApps'
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
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/apps' element={<UserAppsPage />}/>
          <Route path='/upload' element={<UserAppUploadPage />}/>
          <Route path='/bug-report' element={<BugReportPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
