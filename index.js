const express = require("express");
const app = express();
const port = 3000;
const multer = require('multer');
const mongoose = require("mongoose");
const cors = require("cors");

const upload = require("./coludinary");  

app.use(cors());
app.use(express.json()); 


mongoose.connect("mongodb://localhost:27017/RealEstateDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to RealEstateDatabase");
}).catch((e) => {
    console.log("Failed to connect: " + e.message);
});

const mySchema = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    MobileNumber: { type: String, required: true },
    Titel: { type: String, required: true },
    City: { type: String, required: true },
    Description: { type: String, required: true },
    State: { type: String, required: true },
    floors: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    bedRooms: { type: Number, required: true },
    Parking: { type: String, required: true },
    Area: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{ url: String }] 
});

const estate = mongoose.model("estate", mySchema);


app.post("/api/upload", upload.array("images", 10), async (req, res) => {
    try {
        if (!req.files || req.files.length < 6) {
            return res.status(400).json({ message: "Please upload at least 6 images." });
        }

        const imageUrls = req.files.map(file => ({ url: file.path }));

        const listingData = new estate({ 
            Name: req.body.Name,
            Email: req.body.Email,
            MobileNumber: req.body.MobileNumber,
            Titel: req.body.Titel,
            City: req.body.City,
            Description: req.body.Description,
            State: req.body.State,
            floors: req.body.floors,
            bathrooms: req.body.bathrooms,
            bedRooms: req.body.bedRooms,
            Parking: req.body.Parking,
            Area: req.body.Area,
            price: req.body.price,
            images: imageUrls 
        });

        await listingData.save();
        res.status(201).json({ message: "Listing created successfully!" });

    } catch (error) {
        console.error("Error:", error);  // Log error for debugging
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/property/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await estate.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property details' });
  }
});

app.get("/api/search", async (req, res) => {
    try {
        const { city, state, floors, bathrooms, bedRooms, parking, area, price } = req.query;
        const filter = {};

      
        if (city) filter.city = city;
        if (state) filter.state = state;
        if (floors) filter.floors = floors;
        if (bathrooms) filter.bathrooms = bathrooms;
        if (bedRooms) filter.bedRooms = bedRooms;
        if (parking) filter.parking = parking;
        if (area) filter.area = area;
        if (price) filter.price = price;

      
        console.log("Filter being applied:", filter);

      
        const listings = await estate.find(filter);
        console.log(listings)
        
        res.status(200).json(listings);
    } catch (error) {
        console.error("Error during search:", error);
        res.status(500).json({ error: error.message });
    }
});

const fakedata = [
    {
        "Name": "John Doe",
        "Email": "john.doe@example.com",
        "MobileNumber": "1234567890",
        "Titel": "2BHK Apartment",
        "City": "New York",
        "Description": "Spacious 2BHK with modern amenities.",
        "State": "NY",
        "floors": 2,
        "bathrooms": 2,
        "bedRooms": 2,
        "Parking": "IsAvailable",
        "Area": 1200,
        "price": "500000",
        "images": [{"url": "https://fakeurl.com/image1.jpg"}]
    },
    {
        "Name": "Jane Smith",
        "Email": "jane.smith@example.com",
        "MobileNumber": "2345678901",
        "Titel": "3BHK House",
        "City": "Los Angeles",
        "Description": "Beautiful family house in a peaceful neighborhood.",
        "State": "CA",
        "floors": 3,
        "bathrooms": 3,
        "bedRooms": 3,
        "Parking": "IsAvailable",
        "Area": 2000,
        "price": "800000",
        "images": [{"url": "https://fakeurl.com/image2.jpg"}]
    },
    {
        "Name": "Michael Brown",
        "Email": "michael.brown@example.com",
        "MobileNumber": "3456789012",
        "Titel": "1BHK Condo",
        "City": "Miami",
        "Description": "Cozy 1BHK condo with ocean views.",
        "State": "FL",
        "floors": 1,
        "bathrooms": 1,
        "bedRooms": 1,
        "Parking": "not Available",
        "Area": 600,
        "price": "250000",
        "images": [{"url": "https://fakeurl.com/image3.jpg"}]
    },
    {
        "Name": "Sophia Davis",
        "Email": "sophia.davis@example.com",
        "MobileNumber": "4567890123",
        "Titel": "4BHK Villa",
        "City": "Chicago",
        "Description": "Luxury 4BHK villa with a private pool.",
        "State": "IL",
        "floors": 2,
        "bathrooms": 4,
        "bedRooms": 4,
        "Parking": "IsAvailable",
        "Area": 3500,
        "price": "1200000",
        "images": [{"url": "https://fakeurl.com/image4.jpg"}]
    },
    {
        "Name": "Lucas Martin",
        "Email": "lucas.martin@example.com",
        "MobileNumber": "5678901234",
        "Titel": "Studio Apartment",
        "City": "San Francisco",
        "Description": "Modern studio apartment with all essential amenities.",
        "State": "CA",
        "floors": 1,
        "bathrooms": 1,
        "bedRooms": 0,
        "Parking": "not Available",
        "Area": 500,
        "price": "300000",
        "images": [{"url": "https://fakeurl.com/image5.jpg"}]
    },
    {
        "Name": "Olivia Taylor",
        "Email": "olivia.taylor@example.com",
        "MobileNumber": "6789012345",
        "Titel": "2BHK Apartment",
        "City": "Boston",
        "Description": "Well-maintained 2BHK apartment in a prime location.",
        "State": "MA",
        "floors": 2,
        "bathrooms": 2,
        "bedRooms": 2,
        "Parking": "IsAvailable",
        "Area": 1400,
        "price": "450000",
        "images": [{"url": "https://fakeurl.com/image6.jpg"}]
    },
    {
        "Name": "Elijah Wilson",
        "Email": "elijah.wilson@example.com",
        "MobileNumber": "7890123456",
        "Titel": "3BHK House",
        "City": "Austin",
        "Description": "Spacious 3BHK house in a quiet neighborhood.",
        "State": "TX",
        "floors": 2,
        "bathrooms": 2,
        "bedRooms": 3,
        "Parking": "IsAvailable",
        "Area": 1800,
        "price": "600000",
        "images": [{"url": "https://fakeurl.com/image7.jpg"}]
    },
    {
        "Name": "Amelia Walker",
        "Email": "amelia.walker@example.com",
        "MobileNumber": "8901234567",
        "Titel": "4BHK Penthouse",
        "City": "Seattle",
        "Description": "Luxury penthouse with a rooftop garden and stunning views.",
        "State": "WA",
        "floors": 2,
        "bathrooms": 3,
        "bedRooms": 4,
        "Parking": "IsAvailable",
        "Area": 4000,
        "price": "1500000",
        "images": [{"url": "https://fakeurl.com/image8.jpg"}]
    },
    {
        "Name": "Benjamin Harris",
        "Email": "benjamin.harris@example.com",
        "MobileNumber": "9012345678",
        "Titel": "2BHK Apartment",
        "City": "Dallas",
        "Description": "Comfortable 2BHK apartment with modern appliances.",
        "State": "TX",
        "floors": 1,
        "bathrooms": 2,
        "bedRooms": 2,
        "Parking": "IsAvailable",
        "Area": 1100,
        "price": "350000",
        "images": [{"url": "https://fakeurl.com/image9.jpg"}]
    },
    {
        "Name": "Mia Thompson",
        "Email": "mia.thompson@example.com",
        "MobileNumber": "1234987654",
        "Titel": "Studio Apartment",
        "City": "Denver",
        "Description": "Affordable studio apartment for city workers.",
        "State": "CO",
        "floors": 1,
        "bathrooms": 1,
        "bedRooms": 0,
        "Parking": "not Available",
        "Area": 450,
        "price": "200000",
        "images": [{"url": "https://fakeurl.com/image10.jpg"}]
    }
]

estate.countDocuments().then(count => {
    if (count === 0) {  
        estate.insertMany(fakeData)
            .then(() => {
                console.log("Fake data inserted");
            })
            .catch((e) => {
                console.log("Error inserting data:", e.message);
            });
    } else {
        console.log("Data already exists in the database");
    }
}).catch((e) => {
    console.log("Error counting documents:", e.message);
});
app.get("/api/alllisting",async(req,res)=>{
    try{
        const data = await estate.find();
        res.status(200).json(data)

    }catch(e){
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: error.message });
    }

})
const fakeEmails = [
    "john.doe@example.com",
    "jane.smith@example.com",
    "michael.brown@example.com",
    "sophia.davis@example.com",
    "lucas.martin@example.com",
    "olivia.taylor@example.com",
    "elijah.wilson@example.com",
    "amelia.walker@example.com",
    "benjamin.harris@example.com",
    "mia.thompson@example.com"
];

estate.deleteMany({ Email: { $in: fakeEmails } })
    .then(result => {
        console.log(`${result.deletedCount} fake listings deleted successfully.`);
    })
    .catch(error => {
        console.error("Error deleting fake listings:", error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
