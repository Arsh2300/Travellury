require('dotenv').config()

const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

// Connect to MongoDB using environment variable
const dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);  // Added missing semicolon
});

async function main() {
    await mongoose.connect(dbUrl);
}

const initDb=async ()=>{
    // Clear existing listings from the database
   await Listing.deleteMany({});
    // Set a fixed owner ID for each listing
   initdata.data= initdata.data.map((obj)=>({
    ...obj,
    owner:"677a30350b2c230769cbed3c"
   }))
    
    // Insert the modified data into the database
    Listing.insertMany(initdata.data);
    console.log("data Initialized");
}

initDb();
