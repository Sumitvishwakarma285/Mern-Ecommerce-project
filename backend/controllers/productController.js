const Product =require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createProduct =catchAsyncErrors(
    async(req,res,next)=>{
        const product =await Product.create(req.body);
    
        res.status(200).json({
            success:true,
            product
        })
    }
);

exports.getAllProducts = catchAsyncErrors(async(req,res) =>{

    const resultPerPage =5;
    const productCount =await Product.countDocuments()
    
    const apifeatures= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    
        const products =await apifeatures.query;
        res.status(200).json({
          success:true,
          products
        })
    });

exports.getProductDetails= catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    res.status(200).json({
        success:true,
        product,
        productCount,
      })
});


exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })

});

exports.deleteProducts= catchAsyncErrors(async (req,res,next)=>{
 const product = await Product.findById(req.params.id);

 if(!product){
    return next(new ErrorHandler("Product not Found",404));
}
 await product.deleteOne();
res.status(200).json({
    success:true,
    message:"Product deleted successfully"
})

});