const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../model/usermodel");
const transporter = require("../config/nodemailer")

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        // Sending welcome email 

        const mailOptions = ({
            from : process.env.SENDER_EMAIL,
            to: email,
            subject : "Welcome to OlumattyTech",
            text: `Welcome to olumattyTech website. Your account has been created with email id : ${email}`
        })

        await transporter.sendMail(mailOptions)

        return res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({ success: true });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        });

        return res.json({ success: true, message: 'Logged Out' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const sendVerifyOtp = async(req, res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified){
            return res.json({success: false, message:"Account Already Verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;

        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 *1000

        await user.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to : user.email,
            subject:'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your acccount using this OTP. `
        }
        await transporter.sendMail(mailOption)

        res.json({success: true, message:'Verification OTP sent on Email'})
    }
    catch(error){
        return res.json({success: false, message:error.message})      
    }
}

const verifyEmail = async(req, res) => {
    const {userId, otp} = req.body 

    if (!userId || !otp){
        return res.json ({success:false, message: 'Missing Details'});
    }
    try{

    }
    catch(error){
        return res.json ({success:false, message: error.message});
    }
}
module.exports = { register, login, logout, sendVerifyOtp };
