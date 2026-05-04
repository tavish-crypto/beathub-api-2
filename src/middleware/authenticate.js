const jwt =  require('jsonwebtoken')
const User = require('../models/User')
const authenticate = async (req,res,next)=>{
try {
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
    }
        // ❌ No token

    if(!token){
        return res.status(401).json({
            success: false,
            message:  'You are not logged in. Please log in to get access.'
        })
    }
    // verify token
    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        // ❌ Expired token
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({
                success: false,
                message: "Your token has expired"
            })
        }
        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({
                success:  false,
                message: 'Invalid token'
            })
        }
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        })
        
    }
    const user = await User.findById(decoded.id)
    if(!user){
        return res.status(401).json({
            success: false,
        message: "User no longer exists"
        })
    }
    req.user = user
    next()
} catch (error) {
    res.status(500).json({
    success: false,
    message: "Authentication failed",
    error: error.message
    })
}
}
module.exports = authenticate;