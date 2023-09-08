const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
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

router.post("/login", async(req, res)=> {
  try{
     const {email, password} = req.body;
     console.log(email)
     const userExists = await User.findOne({where: {email}});
     console.log(userExists);
     if(!userExists){
      return res.status(401).json({message: "user not found"});
     }
     const passwordMatched = bcrypt.compareSync(password, userExists.password);
    if(!passwordMatched){
      return res.status(401).json({Message: "incorrect password of email"})
    }
    const payload = {user: {id: userExists.id}};
    const token = await jwt.sign(payload, "secret message", {
      expiresIn: 450000,
    } )
    res.cookie("t", token, {expire: new Date() + 10000 });
    console.log("success")
    return res.status(201).json({
      token
    })

  }catch(e){
    console.log(e);
    return res.status(500).send(e)
  }
})

module.exports = router;