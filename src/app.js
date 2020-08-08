const fs=require('fs')
const path=require('path')

const express=require('express');
const { Http2ServerRequest } = require('http2');

const app=express();

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static('./public'))

app.get('/',(req,res)=>{
       return res.render('index',{title:'Index'})
})

app.listen(3000,(err)=>{
       if(err){
           console.log('Something amiss')
       }

       console.log('Server Running')
})