const User = require('../models/User')
const jwt = require('jsonwebtoken')
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

}

const register = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                error: {message: 'All fields are required'}
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                error:{message: 'User alerady exists'}
            })
        }
        const user = await User.create({username,email,password})
        const token  = generateToken(user._id)
        res.status(201).json({
            success: true,
            message:  'User registered successfully',
            token,
            user:{
                id: user._id,
                name: user.username,
                email: user.email
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error:{message: 'Server error'},
            err:error.message
        })
    }
}

const login  = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                error:{message: 'Please provide email and password'}
            })
        }
        const user = await User.findOne({email}).select('+password')
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                success: false,
                error: { message: 'Invalid email or password' }
            })
        }
        const token = generateToken(user._id)
        res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      } 
        })
    } catch (error) {
        console.error("LOGIN ERROR 👉", error);
        // console.log("🔥 MESSAGE:", error.message);
        res.status(500).json({
            success: false,
            error: {message: error.message}
        })
    }
}


module.exports = { register, login };