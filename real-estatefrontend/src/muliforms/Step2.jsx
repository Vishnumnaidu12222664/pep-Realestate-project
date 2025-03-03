import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import boy from "../Images/4939473e84994cd638a8211337bfd40f.png";
import "./Step2.css"; 

export default function Step2() {
    const nav = useNavigate();
    const loc = useLocation();
    const [step2, setStep2] = useState({
        Titel: "",
        City: "",
        Description: "",
        State: "",
        floors: "",
        bathrooms: "",
        Parking: "",
        Area: "",
        price: ""
    });

    const step2handler = (e) => {
        const { name, value } = e.target;
        setStep2({ ...step2, [name]: value });
        console.log(step2, "hello");
    };

    const step2Data = (e) => {
        e.preventDefault();
        console.log(loc.state, step2);
        nav("/step3", { state: { ...loc.state, step2 } });
    };

    return (
        <div>
            <div className='Navrbar'>
                <div className='subnavlogo'>
                    <img src={"https://cdn.dribbble.com/userupload/12684044/file/original-e782c45d2bd0e4632a88bafb1e206f0e.png?crop=0x0-1600x1200&format=webp&resize=400x300&vertical=center"} alt='logo' id="im" />
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
                    <img src={boy} alt="User" />
                </div>
            </div>

            {/* Form */}
            <div>
                <form onSubmit={step2Data} className="step2-form">
                    <input type='text' onChange={step2handler} name='Titel' placeholder='Enter Property Name' />
                    <input type='text' name='City' placeholder='Enter city' onChange={step2handler} />
                    <input type='text' name='Description' placeholder='Enter Description' onChange={step2handler} />
                    <input type='text' name='State' placeholder='Enter State' onChange={step2handler} />
                    <input type='text' name='floors' placeholder='Enter floors' onChange={step2handler} />
                    
                    <select name='bathrooms' onChange={step2handler}>
                        <option value="">Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <select name='bedRooms' onChange={step2handler}>
                        <option value="">Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <select name='Parking' onChange={step2handler}>
                        <option value="">Parking</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>

                    <input type='number' name='Area' placeholder='Enter Area' onChange={step2handler} />
                    <input type='number' name='price' placeholder='Enter price' onChange={step2handler} />

                    <button type='submit'>Next</button>
                </form>
            </div>
        </div>
    );
}
