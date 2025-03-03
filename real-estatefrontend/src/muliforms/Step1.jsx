import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step1.css';  // Import the CSS file
import { NavLink } from 'react-router-dom';
import boy from "../Images/4939473e84994cd638a8211337bfd40f.png"
export default function Step1() {
    const nav = useNavigate();
    const [step1, setStep1] = useState({
        Name: "",
        Email: "",
        MobileNumber: "",
    });

    const step1Handler = (e) => {
        const { name, value } = e.target;
        setStep1({ ...step1, [name]: value });
    };

    const step1data = (e) => {
        e.preventDefault();
        console.log(step1);
        nav("/step2", { state: step1 });
    };

    return (
      <div>
         <div className='Navrbar'>
        <div className='subnavlogo'>
            <img src={"https://cdn.dribbble.com/userupload/12684044/file/original-e782c45d2bd0e4632a88bafb1e206f0e.png?crop=0x0-1600x1200&format=webp&resize=400x300&vertical=center"} alt='logo' id="im"></img>
            <h3>FlatFinder</h3>
        </div>
        <div className='subnavdetail'>
    <ul id='navdetail'>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/step1">Upload Rooms</NavLink></li>
        <li><NavLink to="/savedrooms">Saved Rooms</NavLink></li>
        <li id='navl4'><NavLink to="/find-room">Find a Room</NavLink></li>
        <li id='navl5'><NavLink to="/images"></NavLink></li>
    </ul>
    <img src={boy}></img>
</div>
</div>
        <div className="step1-container">
            <form onSubmit={step1data} className="step1-form">
                <h2>Fill Your Details</h2>
                <input type="text" name="Name" placeholder="Enter your name" onChange={step1Handler} value={step1.Name} required />
                <input type="email" name="Email" placeholder="Enter your email" onChange={step1Handler} value={step1.Email} required />
                <input type="number" name="MobileNumber" placeholder="Enter your phone number" onChange={step1Handler} value={step1.MobileNumber} required />
                <button type="submit">Next</button>
            </form>
        </div>
        </div>
    );
}
