import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Searchfilter.css';

export default function Searchfilter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    floors: '',
    bathrooms: '',
    bedRooms: '',
    parking: '',
    area: '',
    price: ''
  });
 const handleViewDetails = (listingId) => {
  navigate(`/full-details/${listingId}`);
};
  const [listings, setListings] = useState([]); 
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/api/alllisting') 
      .then((response) => {
        setListings(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching all listings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const step2handler = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    
    const params = new URLSearchParams(filters);

    axios
      .get(`http://localhost:3000/api/search?${params.toString()}`) // Send filters to backend
      .then((response) => {
        setListings(response.data); // Update listings with filtered data
      })
      .catch((error) => {
        console.error('Error fetching filtered listings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    setFilters({
      city: '',
      state: '',
      floors: '',
      bathrooms: '',
      bedRooms: '',
      parking: '',
      area: '',
      price: ''
    });
    // Fetch all listings again
    setLoading(true);
    axios
      .get('http://localhost:3000/api/alllisting')
      .then((response) => {
        setListings(response.data); // Show all listings
      })
      .catch((error) => {
        console.error('Error fetching all listings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="Searchnav">
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={filters.city}
            onChange={step2handler}
          />
          <button type="submit">Apply Filters</button>
        </div>

        <div className="subfilters">
          <input
            type="text"
            name="state"
            id="state"
            placeholder="Enter State"
            value={filters.state}
            onChange={step2handler}
          />
          <input
            type="number"
            id="floors"
            name="floors"
            placeholder="Enter floors"
            value={filters.floors}
            onChange={step2handler}
          />
          <select
            name="bathrooms"
            value={filters.bathrooms}
            id="bathrooms"
            onChange={step2handler}
          >
            <option value="">Bathrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            name="bedRooms"
            value={filters.bedRooms}
            onChange={step2handler}
            id="bedRooms"
          >
            <option value="">BedRooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            name="parking"
            id="parking"
            value={filters.parking}
            onChange={step2handler}
          >
            <option value="">Parking</option>
            <option value="IsAvailable">Is Available</option>
            <option value="notAvailable">Not Available</option>
          </select>
          <input
            type="number"
            name="area"
            id="area"
            placeholder="Enter Area"
            value={filters.area}
            onChange={step2handler}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={filters.price}
            onChange={step2handler}
          />
           <button onClick={handleReset} id='resetbutton'>Reset Filters</button>
        </div>
       
      </form>

  
      {loading && <p>Loading...</p>}

      <div className="homedetail">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div className="Subhomedetail" key={listing._id}>
              <img
                src={listing.images[0].url}
                alt={listing.Titel}
              />
              <h1>{listing.Titel}</h1>
              <div className="pa">
                <h1>Price: ${listing.Price}</h1>
                <h1>Area: {listing.Area} sq ft</h1>
              </div>
              <button onClick={() => handleViewDetails(listing._id)}>View Details</button>
            </div>
          ))
        ) : (
          <p>No listings found</p>
        )}
      </div>
    </div>
  );
}
