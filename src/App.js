import React from 'react';
import './App.css';

import { AuthProvider } from './utilities/Auth';
import { Login } from "./components/Login/Login"
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import Alluser from './components/Alluser/Alluser';
 
import Register from './components/Register/Register';
import { Navbar } from './components/Navbar/Navbar';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { RequireAuth } from './utilities/RequireAuth';
import Forgotpassword from './components/Forgotpassword/Forgotpassword';
import {Footer} from './components/Footer';
import Tweet from './components/Tweet/Tweet';
import Reply from './components/Reply/Reply';
import NewTweet from './components/NewTweet/NewTweet';
 

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar/>
     

      <Routes>

        <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
        <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>} />
        <Route path="alluser" element={<RequireAuth><Alluser/></RequireAuth>} />
        <Route path="post/tweet" element={<RequireAuth><NewTweet/></RequireAuth>} />
        <Route path="/new" element={<NewTweet/>} />

        <Route path="/signup" element={<Register />}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="/tweet" element={<RequireAuth><Tweet/></RequireAuth>} />
        <Route path="/reply" element={<RequireAuth><Reply/></RequireAuth>} />
        
      
        
      </Routes>

      
      </Router>
      
      <Footer/>
      
    </AuthProvider>

  );
}

export default App;
