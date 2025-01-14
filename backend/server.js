const app =require("./app");
const dotenv=require("dotenv");
const connectDatabase =require("./config/database");


//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"});
//Connecting to database

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working at https://localhost:${process.env.PORT}`)
})

// Unhandle promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting down the server due to Unhandeled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})

