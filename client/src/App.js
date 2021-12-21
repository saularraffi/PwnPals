import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BugReportsListPage from './components/BugReports/Table'
import BugReportFormPage from './components/BugReports/reportForm'
import HomePage from './components/Home'
import LandingPage from './components/Landing';
import LoginPage from './components/Login'
import CreateAccountPage from './components/CreateAccount'
import ProfilePage from './components/Profile'
import UserAppUploadPage from './components/UserAppUpload'
import Search from './components/Search'
import NavBar from './components/NavBar';

import { setLoggedInStatus } from './auth/userInfo'

import Box from '@mui/material/Box'

function App() {
  if (localStorage.getItem('loggedIn') === null) {
    setLoggedInStatus(false)
  }
  
  return (
    <Box className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<LandingPage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<CreateAccountPage />}/>
          <Route path='/profile/:id' element={<ProfilePage />}/>
          <Route path='/upload' element={<UserAppUploadPage />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/bug-reports/:id' element={<BugReportsListPage />}/>
          <Route path='/app/:id/bug-report' element={<BugReportFormPage />}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
