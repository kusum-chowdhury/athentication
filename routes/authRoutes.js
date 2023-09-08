const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {validateName, validateEmail, validatePassword} =  require("../utils/validators");

router.post("/signup", async(req, res)=> {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({where: {email}});
      if(userExists){
        return res.status(401).json({message: "user already exists"});
      }
      if(!validateName(name)){
        return res.status(401).json({message: "name should be more than 5 words"});
      }
      if(!validateEmail(email)){
        return res.status(401).json({message: "enter a valid email address"});
      }
      if(!validatePassword(password)){
        return res.status(401).json({message: "enter a strong password"});
      }
     
      const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));
      const user = {name, email, password: hashedPassword};
      const createdUser = await User.create(user);
      return res.status(200).send(`Welcome ${createdUser.name}, thanks for signing up`);
    }catch(e){
        return res.status(500).send(e);
    }
})

module.exports = router;