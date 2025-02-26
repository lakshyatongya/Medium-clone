import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const JWT_SECRET = 'lakshyajain';

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'coder5871@gmail.com',
      pass: 'ncxa wjki tjbi fuuu',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Lakshya Jain" <lakshya@gmail.com>',
      to: email,
      subject: 'Email Verification - OTP',
      text: `Please verify your email address. Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });

    console.log('OTP sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const signup = async (req, res) => {
  let { name, email, password } = req.body;

  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (!name || !email || !password) {
    return res.json({
      status: 'FAILED',
      message: 'All fields are required!',
    });
  }

  if (!/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(email)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid email',
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        status: 'FAILED',
        message: 'User with the provided email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const result = await newUser.save();

    const otp = crypto.randomInt(1000, 9999);
    await sendMail(email, otp);

    newUser.otp = otp;
    newUser.otpExpires = Date.now() + 10 * 60 * 1000;
    await newUser.save();

    return res.json({
      status: 'SUCCESS',
      message: 'Signup successful. OTP sent to your email. ',
      data: {
        _id: result._id,
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: 'FAILED',
      message: 'An error occurred ',
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 'FAILED',
      message: 'Email and password are required!',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: 'FAILED',
        message: 'User not found',
      });
    }

    if (!user.password) {
      return res.json({
        status: 'FAILED',
        message: 'Password is missing for this user. Try resetting your password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: 'FAILED',
        message: 'Incorrect password',
      });
    }

    return res.json({
      status: 'SUCCESS',
      message: 'Signin successful',
      data: user,
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.json({
      status: 'FAILED',
      message: 'An error occurred while signing in',
    });
  }
};

export const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({
      status: 'FAILED',
      message: 'Email and OTP are required!',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: 'FAILED',
        message: 'User not found',
      });
    }

    if (user.otp !== otp) {
      return res.json({
        status: 'FAILED',
        message: 'Invalid OTP',
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.json({
        status: 'FAILED',
        message: 'OTP has expired. Please request a new OTP.',
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.json({
      status: 'SUCCESS',
      message: 'Email verified successfully',
      data: { _id: user._id },
    });


    // return res.json({
    //   status: 'SUCCESS',
    //   message: 'Email verified successfully',

    // });
  } catch (err) {
    return res.json({
      status: 'FAILED',
      message: 'An error occurred while verifying the OTP',
    });
  }
};








  export const getName= async (req, res) => {
   const { userId } = req.query;
   
   try {
      const user = await User.findById(userId).select('name'); 
      if (user) {
         return res.json({ name: user.name });
      } else {
         return res.status(404).json({ error: 'User not found' });
      }
   } catch (err) {
      return res.status(500).json({ error: 'Server error' });
   }
};
