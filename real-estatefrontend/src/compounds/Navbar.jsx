import React from 'react'
import bpng1 from '../images/bpng1.avif';
import download from '../Images/download.jpg'
import pixelcutexport from "../Images/pixelcut-export.jpg"
import Singnup from "../Loginforms/Singnup"
import Searchfilter from '../Filters/Searchfilter';
import { NavLink } from 'react-router-dom';
import boy from "../Images/4939473e84994cd638a8211337bfd40f.png"
import './Navcss.css';
<img src={bpng1} alt="Description" />
export default function Navbar() {
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
        <li><NavLink to="/form">Upload Houses</NavLink></li>
        <li><NavLink to="/savedrooms">Saved Rooms</NavLink></li>
        <li id='navl4'><NavLink to="/Singnup">Login</NavLink></li>
        <li id='navl5'><NavLink to="/images"></NavLink></li>
    </ul>
    <img src={boy}></img>
</div>
      </div>
      <section className='Home'>
        
          <div className='SubHome'>
            <h1 id='Hom1'>Because finding a room shouldn’t 
            <br></br>be a full-time job</h1>
            <p>We make finding your perfect room effortless,<br></br> so you can focus on what matters most</p>
            <button>Know more</button>
          </div>
      </section> 
      <Searchfilter/>
    </div>
  )
}
