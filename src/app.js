const fs=require('fs')
const path=require('path')

const express=require('express');
const { Http2ServerRequest } = require('http2');

const app=express();

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'./public')))

const accountData=fs.readFileSync(path.join(__dirname,'./json/accounts.json'),{encoding:'utf8'})

const accounts=JSON.parse(accountData)


const userData=fs.readFileSync(path.join(__dirname,'./json/users.json'),{encoding:'utf8'})

const users=JSON.parse(userData)

app.get('/',(req,res)=>{
       return res.render('index',{title:'Account Summary',accounts:accounts})
})

app.get('/savings',(req,res)=>{
     return res.render('account',{account: accounts.savings})
})

app.get('/checking',(req,res)=>{
    return res.render('account',{account: accounts.checking})
})

app.get('/credit',(req,res)=>{
    return res.render('account',{account: accounts.credit})
})

app.get('/profile',(req,res)=>{
    return res.render('profile',{user:users[0]})
})

app.listen(3000,(err)=>{
       if(err){
           console.log('Something amiss')
       }

       console.log('Server Running')
})