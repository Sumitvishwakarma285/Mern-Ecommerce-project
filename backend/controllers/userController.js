const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    console.log("Request Body:", req.body);

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "public id",
            url: "url",
        },
    });
    sendToken(user,201,res);
});

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!email||!password){
        return next(new ErrorHandler("Please Enter Email or Password",400));
    }
const user = await User.findOne({email}).select("+password");

if(!user){
    return next(new ErrorHandler("Invalid Email or Password"));
}
const isPasswordMatched =user.comparePassword(password);
if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",401));
}

sendToken(user,200,res);
});

exports.logout=catchAsyncErrors(async(req,res,next)=>{
res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
});

    res.status(200).json({
        success:true,
        message:"logged out",
    });
});
