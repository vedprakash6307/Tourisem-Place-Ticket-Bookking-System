const express = require("express");
const router = express.Router();

//index
router.get("/", (rq, res)=>{
    res.send("Get for post");

});
//show 
router.get("/:id", (req, res)=>{
    res.send("Get for post id ");
});
//Post
router.post("/", (req, res)=>{
    res.send("post is done ");
});
//Delete 
router.delete("/:id", (req, res)=>{
    res.send("Delete for post id ");
});
module.exports = router;
