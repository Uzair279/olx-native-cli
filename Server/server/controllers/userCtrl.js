const User = require("../models/userSchema");
const Otp = require("../models/otpSchema");
const bcrypt = require("bcryptjs");
const otpGenerator = require("../Helpers/OtpGenerator");
const tokenGenerator = require("../Helpers/TokenGenerator");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const sgEmail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const ClIENT_URL = process.env.ClIENT_URL;

const userCtrl = {
  signup: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ msg: "Please enter missing fields" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters Long" });
      }
      const check = await User.findOne({ email: email });
      if (check) {
        return res.status(400).json({ msg: "This email is already exist!" });
      }
      const user = { fullName, email, password };
      const otp = otpGenerator();
      const token = tokenGenerator(user);
      sgEmail.setApiKey(SENDGRID_API_KEY);

      const message = {
        to: email,
        from: "hamzambf@gmail.com",
        subject: "Email verification",
        html: `
        <h3>Activate your account using below OTP</h3>
        <p>${otp}</p>`,
      };

      sgEmail.send(message);

      const newOtp = new Otp({
        otp: otp,
        token: token,
      });
      await newOtp.save();
      res.json({
        msg: "OTP has been sent for verification. Check your email.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  accountActivation: async (req, res) => {
    try {
      const { otp } = req.body;
      if (!otp) {
        return res.status(400).json({ msg: "Please enter OTP" });
      }
      const check = await Otp.findOne({ otp: otp });
      if (!check) {
        return res.status(400).json({ msg: "Invalid OTP" });
      }
      const user = jwt.verify(check.token, SECRET);
      const { fullName, email, password } = user;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        fullName: fullName,
        email: email,
        password: hashPassword,
      });
      await newUser.save();
      res.json({ msg: "Your account has been verified. Login Now..!!" });
      await Otp.findOneAndDelete({ otp: otp });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Please enter missing fields" });
      }
      const check = await User.findOne({ email: email });

      if (!check) {
        return res.status(400).json({ msg: "Email does not exist!" });
      }
      const match = await bcrypt.compare(password, check.password);
      if (!match) {
        return res.status(400).json({ msg: "Password Incorrect" });
      }
      const token = tokenGenerator({ id: check._id });
      res.json({ msg: "Login Successfully", token: token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist!" });
      }
      const token = tokenGenerator({ id: user._id });
      const url = `${ClIENT_URL}/user/reset/${token}`;
      sgEmail.setApiKey(SENDGRID_API_KEY);
      const message = {
        to: email,
        from: "hamzambf@gmail.com",
        subject: "Email verification",
        html: `
        <h3>Reset your password by clicking on following link</h3>
        <p>${url}</p>`,
      };
      sgEmail.send(message);
      res.json({ msg: "Email has been sent. Check your inbox" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      const id = req.user.id;
      await User.findOneAndUpdate({ _id: id }, { password: passwordHash });
      res.json({ msg: "Password has been changed successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
