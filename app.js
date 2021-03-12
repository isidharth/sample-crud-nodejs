'use strict'

const connection 	= require('./db')(),
    query           = require('./api/query')(),
	   host 			= new connection(),
    connect 	    = host.getConnection();

module.exports = connect.then(()=>{
        let filter = new query(host.collection)
        return require("./router")(filter);
    })
