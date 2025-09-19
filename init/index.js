const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
 

const MONGO_URL = "mongodb://127.0.0.1:27017/Hiper";//connect with database on the server 
     main() //this is main function 
      .then(()=>{
        console.log("connect to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){ // async function are connnect with mongoose document
    await mongoose.connect(MONGO_URL);
}
const initDB= async () =>{
    await Listing.deleteMany({});
   initdata.data = initdata.data.map((obj) =>({
    ...obj,
    owner: "68b416f8d9c36c639b4ceaee",
}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};
initDB();