const express = require('express');
const serverless = require('serverless-http');
const server = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const {validate} = require('./api/middleware')
const port = process.env.PORT || 3000

const corsOptions = {
  allowedHeaders:'Content-Type,auth_token'
}
server.use(cors(corsOptions))

module.exports = (api) => {

server.post('/login',jsonParser, (req, res) => {
  let {email, password} = req.body
  api.login(email,password).then(data=>{
    res.status(data.status)
    if(data.auth){
      res.send({token:data.token})
    }
    else{
      res.send({error:data.error})
    }
  })
})

server.post('/signup',jsonParser, (req, res) => {
  let {name, email, password} = req.body
  api.signup({name, email, password}).then(data=>{
    res.status(data.status)
    if(data.auth){
      res.send({message:data.message})
    }
    else{
      res.send(data.error)
    }
  })
})

server.get('/users',(req, res) => {
  api.getAllUsers().then(data=>{
    res.status(data.status)
    if(data.auth){
      res.send({users:data.users})
    }
    else{
      res.send({error:data.error})
    }
  })
})
server.get('/user',(req, res) => {
  api.getUser(req.query.email).then(data=>{
    res.status(data.status)
    if(data.auth){
      res.send({user:data.user})
    }
    else{
      res.send({error:data.error})
    }
  })
})
server.post('/update',jsonParser,validate, (req, res) => {
  let {userId,name, email, password} = req.body
  api.updateUser({userId, name, email, password}).then(data=>{
    res.status(data.status)
    if(data.auth){
      res.send({message:data.message})
    }
    else{
      res.send(data.error)
    }
  })
})

server.listen(port)

console.log(`App started running at port ${port} ...`)

return server
}
