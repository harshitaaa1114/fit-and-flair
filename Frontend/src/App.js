import React from 'react';
import FitAndFlair from './component/FitAndFlair.js'; 
import SignUp from './component/user-authentication/SignUp.js';
import SignIn from './component/user-authentication/SignIn.js';
import VerifyOtp from './component/user-authentication/VerifyOtp.js';
import ForgotPassword from './component/user-authentication/ForgotPassword.js';
import ResetPassword from './component/user-authentication/ResetPassword.js';
import Home from './component/Home.js';
import About from './component/About.js';

import {Routes,Route} from "react-router-dom";
import BodyShapeCalculator from './component/BodyShapeCalculator.js';
import Contact from './component/Contact';


import Footer from './component/Footer.js';
import AdminDashboard from './component/AdminDashboard.js';
import AdminContactList from './component/AdminContactList.js'
import AdminCategoryPage from "./component/Admincategorypage.js"; 
import ChooseRole from './component/user-authentication/chooseRole.js';
import AdminSignIn from './component/AdminSignIn.js';
import AdminDressPage from './component/Admindresspage.js'
import AllDressesPage from './component/AllDressesPage.js';
import DressGroupPage from './component/DressGroupPage';


import Result from './component/Result.js';


function App() {
  return <>



     <Routes>
      
        <Route path="/" element={<FitAndFlair/>}/>
        <Route path ="/signup"element={<SignUp/>}/>
        <Route path ="/verify-otp"element={<VerifyOtp/>}/>
       <Route path ="/signin"element={<SignIn/>}/>
       <Route path="/forgot" element={<ForgotPassword/>} />
         <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/role" element={<ChooseRole />} />  {/* 👈 main entry */}
  <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/bodyshapecalculator" element={<BodyShapeCalculator/>}/>
         <Route path="/result" element={<Result/>}/>
         
         <Route path="/admincontact" element={<AdminContactList />} />
         <Route path="/admincategories" element={<AdminCategoryPage />} />
<Route path="/admindresses" element={<AdminDressPage />} />
<Route path="/admin/edit-dress/:id" element={<AdminDressPage />} />
<Route path="/admin/all-dresses" element={<AllDressesPage />} />
         <Route path="/admin/group/:groupKey" element={<DressGroupPage />} />
         <Route path="/admindashboard" element={<AdminDashboard/>} />
     </Routes>
     <Footer/>
    
     </>
}


export default App;
