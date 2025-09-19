const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: { 
    type: String,
     required: true,
      trim: true
     },
  description: String,
  image: {
     url: String,
      filename: String
     },
  price: {
     type: Number,
      required: true,
       min: 0 
    },
  location: { 
    type: String, 
    trim: true 
},
  country: { 
    type: String, 
    trim: true 
},
  geometry: {
    type: {
         type: String,
          enum: ["Point"],
           default: "Point"
         },
    coordinates: {
         type: [Number], 
         default: [77.2090, 28.6139] }, // [lng, lat]
  },
  reviews: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Review"
 }],
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: "User"
 },
});

// Delete all reviews if listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);









// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");
// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true, 
//         trim: true
//     },
//     description: String,
//     image: {
//         url: String,
//         filename: String,
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     location: {
//         type: String,
//         trim: true
//     },
//     country: {
//         type: String,
//         trim: true
//     },
//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review"   // ✅ must match review.js model name
//         }
//     ],
//     owner:{
//         type: Schema.Types.ObjectId,
//         ref: "User",
//     },
// });

// listingSchema.post("findOneDelete", async (listing)=>{
//     if (listing){
//        await Review.deleteMany({_id : {$in: listing.reviews}});
//     }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
