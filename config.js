module.exports = {
    db:{
        uri:'mongodb+srv://dbUser:sample_Project@cluster0.kbqmm.mongodb.net',
        collection:'Sample'
    },
    auth:{
        secret_key:'S@mple!_AuTh1',
        expiry_time:'24h',
        saltRounds:10
    }
}
