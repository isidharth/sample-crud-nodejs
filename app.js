'use strict'

const connection 	= require('./db')(),
      query           = require('./api/query')(),
	    host 			= new connection(),
      connect 	    = host.getConnection();

module.exports.handler = connect.then(() => {
  let filter = new query(host.collection)
  let router = require("./router")(filter);
  return router
})
