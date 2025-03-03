import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Step1 from './muliforms/Step1';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Step2 from './muliforms/Step2';
import Step3 from './muliforms/Step3';
import Login from "./Loginforms/Login"
import Singnup from "./Loginforms/Singnup"
import FullDetails from './compounds/Fulldetails';

import Navbar from './compounds/Navbar';
function App() {
  
  return (<>
<BrowserRouter>
<Routes>
<Route path="/" element={<Navbar />} />
<Route path="/full-details/:id" element={<FullDetails />}/>
<Route path="/form" element={<Step1 />} />
<Route path="/Singnup" element={<Singnup />} />
<Route path="/step2" element={<Step2 />} />
<Route path="/step3" element={<Step3 />} />
<Route path="/Login" element={<Login />} />
</Routes>
</BrowserRouter>
  </>);
}

export default App
