// backend/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const { sign } = jwt;
const { hashSync, compareSync } = bcrypt;

export async function signup(req, res) {
  try {
    const { fullName, email, role, password } = req.body;

    // Hash the password
    const hashedPassword = hashSync(password, 8);

    // Create a new user
    const user = new User({
      fullName,
      email,
      role,
      password: hashedPassword,
      created: new Date()
    });

    // Save the user to the database
    await user.save();

    res.status(200).send({ message: 'User Registered successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);

    // Find the user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    // Compare passwords
    const passwordIsValid = compareSync(password, user.password);
    if (!passwordIsValid) {
      console.log('Invalid password for email:', email);
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }
    console.log('Login successful for email:', email);
    // Sign the token with user ID
    const token = sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName
      },
      message: 'Login successful',
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
