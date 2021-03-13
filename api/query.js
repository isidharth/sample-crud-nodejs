const {ObjectID} = require('mongodb'),
    bcrypt =  require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    {auth} = require('../config'),
    moment = require('moment'),
    salt = bcrypt.genSaltSync(auth.saltRounds);

module.exports = (db)=> class Query {
    constructor(db){
        this.users = db.users;
    }
    async login(email,passkey){
        try{
          console.log("Authenticating User started")
            let user = await this.users.findOne({email})
            if(user){
                let allow = bcrypt.compareSync(passkey,user.password)
                if(allow){
                    const token = jwt.sign(
                        { userId: user._id },
                        auth.secret_key);
                    return {auth:true,token,status:200}
                }
                else{
                    return {auth:false,error:"Authentication Failed",status:401}
                }
            }
            else{
                return {auth:false,error:"User not found, Try again",status:403}
            }
        }
        catch(err){
            return {auth:false,error:"Something Went Wrong",status:500}
        }
    }
    async signup(data){
      try{
        console.log("Creating User started")
        let {name,email,password} = data
        let email_duplicate_check = await this.users.findOne({email})
        if(email_duplicate_check){
            return {auth:false, error:"Email already exists", status:401}
        }
        else{
          password = bcrypt.hashSync(password,salt)
          await this.users.insertOne({email,name,password})
          return {auth:true, message:`Successfully created user with email ${email}`,status:200}
        }
      }
      catch(err){
        console.log(err)
        return {auth:false,error:"Something Went Wrong",status:500}
      }
    }
    async getAllUsers(){
      try{
        console.log("Fetching Users started")
        let users = await this.users.find().toArray()
        users = users.map(user=>{
          delete user.password
          delete user._id
          return user
        })
        return {auth:true,users,status:200}
      }
      catch(err){
        return {auth:false,error:"Something Went Wrong",status:500}
      }
    }
    async getUser(email){
      try{
        console.log("Fetching User started")
        let user = await this.users.findOne({email})
        if(user){
          delete user.password
          delete user._id
          return {auth:true,user,status:200}
        }
        else{
          return {auth:false,error:"User not found",status:404}
        }
      }
      catch(err){
        return {auth:false,error:"Something Went Wrong",status:500}
      }
    }
    async updateUser({userId,email,password,name}){
      try{
        console.log("Update started")
        let user = await this.users.findOne({_id:new ObjectID(userId)})
        let data = {};
        if(user){
          if(email){
            data.email = email
          }
          if(password){
            data.password = bcrypt.hashSync(password,salt)
          }
          if(name){
            data.name = name
          }
          if(email || name || password){
            await this.users.updateOne({_id:new ObjectID(userId)},{$set:data})
            return {auth:true,message:"Updated User",status:200}
          }
          else{
            return {auth:true,message:"Nothing to Update User",status:200}
          }
        }
        else{
          return {auth:false,error:"User not found",status:404}
        }
      }
      catch(err){
        console.log(err)
        return {auth:false,error:"Something Went Wrong",status:500}
      }
    }
}
