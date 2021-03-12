const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const port = process.env.PORT || 8080;
const {auth} = require('./api/middleware')

const corsOptions = {
  allowedHeaders:'Content-Type,auth_token'
}
server.use(cors(corsOptions))

module.exports = (api) => {

server.post('/login',jsonParser, (req, res) => {
  let {username, password} = req.body
  api.login(username,password).then(data=>{
    res.send(data)
  })
})



server.listen(port,()=>console.log(`App running at port ${port}...`))
}
