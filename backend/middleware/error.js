const ErrorHandler=require("../utils/errorhandler");

module.exports =(err,req,res,next)=>{
    err.statusCode =err.statusCode||500;
    err.message=err.message||"Internal Server Error";

//wrong mongodb Id error
if(err.name ==="CastError"){
    const message =`Resourse not found.Invalid:${err.path}`;
    err =new ErrorHandler(message,400);
}


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};