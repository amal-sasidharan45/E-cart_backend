//1 automatically load .env files into our project

require('dotenv').config()

// 4 import express
const express =require('express')


//import cors
const cors=require('cors')
//import db
require('./db/connection')

//import router

const router=require('./routes/router')

// --------------------------
//3 create a sever application

const server=express()

//to store port number 

const PORT=5000
//use in server application
server.use(cors())
server.use(express.json())
// use router
server.use(router)



//route  -localhost ://5000
// server.get('/',(req,res)=>{
//     res.status(200).json('e-coomerce service response')
// })
//4 to run the server 
server.listen(5000,()=>{
    console.log('server listenig on the port'+PORT);
})