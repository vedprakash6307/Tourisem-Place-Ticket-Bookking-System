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
        type: String,
        default: "https://example.com/default-image.jpg",
        set: v => v === "" ? "https://example.com/default-image.jpg" : v
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"   // ✅ must match review.js model name
        }
    ]
});

listingSchema.post("findOneDelete", async (listing)=>{
    if (listing){
       await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
