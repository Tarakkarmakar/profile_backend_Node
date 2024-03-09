const express = require("express");

const bcrypt = require("bcrypt");
const { parse } = require("dotenv");

const userRoute = express.Router();
const { userModel } = require("../Model/userModel");

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    // Hash
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const user = new userModel({
      name,
      email,
      gender,
      password: hashedPassword,
    });

    // Save the user
    await user.save();

    res.send("Successfully Registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find r by email
    const user = await userModel.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).send("User not found");
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }

    // If login successfu
    const userDetails = {
      id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
    };

    res.json(userDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

userRoute.patch("/edit/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, gender } = req.body;

  try {
    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (gender) user.gender = gender;

    await user.save();

    res.send("User details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



userRoute.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find the user by ID 
      const user = await userModel.findById(userId).select('-password');
  
      if (!user) {
      
        return res.status(404).send("User not found");
      }
  
      // If user found
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports={
    userRoute
}