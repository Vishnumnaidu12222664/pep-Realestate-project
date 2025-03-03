import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import boy from "../Images/4939473e84994cd638a8211337bfd40f.png";
import "./Step3.css"; // Import CSS file

export default function Step3() {
    const loc = useLocation();
    console.log(loc.state);

    const [images, setImages] = useState([]);

    const imageHandler = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };

    const submitData = async () => {
        const formData = new FormData();

       
        const step1AndStep2 = { ...loc.state, ...loc.state.step2 };
        delete step1AndStep2.step2;

        
        Object.entries(step1AndStep2).forEach(([key, value]) => {
            formData.append(key, value);
        });

       
        if (images.length < 6) {
            alert("Please upload at least 6 images.");
            return;
        }
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        try {
            const response = await axios.post("http://localhost:3000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
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

        <div className="step3-container">
            <input type='file' name="images" multiple onChange={imageHandler} />
            
            
            <div className="image-preview">
                {images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                ))}
            </div>
                <h1>Upload atleast 6 images </h1>
            <button onClick={submitData}>Submit</button>
        </div>
        </div>
    );
}
