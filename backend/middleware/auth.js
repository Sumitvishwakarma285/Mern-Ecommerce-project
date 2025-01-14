const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt =require("jsonwebtoken");
const User=require("../models/userModel")

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{

    const { token} =req.coockies;
    if(!token){
        return next(new ErrorHandler("Please login to Access this Resource",401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

   req.user= await User.findById(decodedData._id);
   next();
})

exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403);
        }
next();
    };
};