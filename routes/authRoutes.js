const express = require("express");
const router = express.Router();

router.post("/signup", async(req, res)=> {
    try {
      console.log("inside signup router")
    }catch(e){
        return res.status(500).send(e);
    }
})

module.exports = router;