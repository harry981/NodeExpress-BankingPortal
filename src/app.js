const fs=require('fs')
const path=require('path')

const express=require('express');
const { Http2ServerRequest } = require('http2');
const { json } = require('express');

const app=express();

app.set('views',path.join(__dirname,'./views'))

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'./public')))

app.use(express.urlencoded({extended:true}))

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

app.get('/transfer',(req,res)=>{
    return res.render('transfer')
})

app.post('/transfer',(req,res)=>{
   accounts[req.body.from].balance=accounts[req.body.from].balance-parseInt(req.body.amount)
  accounts[req.body.to].balance=accounts[req.body.to].balance+parseInt(req.body.amount,10)
   let accountsJSON=JSON.stringify(accounts,null,4)
})

app.listen(3000,(err)=>{
       if(err){
           console.log('Something amiss')
       }

       console.log('Server Running')
})