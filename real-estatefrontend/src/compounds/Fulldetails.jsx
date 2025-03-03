import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import boy from "../Images/4939473e84994cd638a8211337bfd40f.png"
import { NavLink } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './FullDetails.css'; 
import { FaBed, FaBath, FaCar, FaMapMarkerAlt, FaDollarSign, FaExpandArrowsAlt } from 'react-icons/fa';  

export default function FullDetails() {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/property/${id}`) 
      .then((response) => {
        setProperty(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching property details:', error);
      });
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  const { latitude = 51.505, longitude = -0.09 } = property; 
  const mainImage = property.images && property.images[0] ? property.images[0].url : ''; 
  const smallImages = property.images ? property.images.slice(1) : []; 

  return (
    <div className='main-container'> 
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

      <div className="full-details-container">
        <div className="property-details-box">
          <h1 className="property-title">{property.Titel}</h1>
          <p className="property-location">{property.location}</p>
        </div>

        <div className='imageform'>
          <div className="image-form-container">
            <div className="images-box">
              {mainImage && <img src={mainImage} alt={property.Titel} className="main-image" />}
              <div className="small-images">
                {smallImages.length > 0 &&
                  smallImages.map((img, index) => (
                    <img key={index} src={img.url} alt={`small-${index}`} />
                  ))}
              </div>
            </div>

            <div className="form-box">
              <h2>Contact Us</h2>
              <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message"></textarea>
                <button type="submit" id='formbutton'>Send Message</button>
              </form>
            </div>
          </div>
        </div>

        {latitude && longitude ? (
          <div style={{ height: '400px', width: '100%' }}>
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[latitude, longitude]}>
                <Popup>{property.Titel}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <p>Location data is unavailable.</p>
        )}

        <div className="more-details-box">
          <h2>More Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <FaDollarSign size={20} /> <strong>Price:</strong> <span>${property.Price}</span>
            </div>
            <div className="detail-item">
              <FaExpandArrowsAlt size={20} /> <strong>Area:</strong> <span>{property.Area} sq ft</span>
            </div>
            <div className="detail-item">
              <FaBed size={20} /> <strong>Bedrooms:</strong> <span>{property.bedRooms}</span>
            </div>
            <div className="detail-item">
              <FaBath size={20} /> <strong>Bathrooms:</strong> <span>{property.bathrooms}</span>
            </div>
            <div className="detail-item">
              <FaCar size={20} /> <strong>Parking:</strong> <span>{property.Parking}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

