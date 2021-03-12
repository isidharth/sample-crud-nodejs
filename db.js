const {MongoClient} = require('mongodb'),
        {db} = require('./config'),
        assert 			= require('assert'),
        uri = db.uri

module.exports = () => class Db {
    constructor() {
        this.db = null;
        this.collection = null;
		    this.connection = new Promise((resolve, reject) => {
								                MongoClient.connect(uri, {
                                        useUnifiedTopology: true,
										                    poolSize: 10
									                      },(err, conn) => {
                                          
                                          console.log("Connected to Database...")

                                          assert.equal(null, err);

                                          let db = conn.db(mongo.collection);

                                          this.db = db;
                                          this.collection = {
                                                            'users':db.collection('users')
                                                            }

										                       resolve();
									                     }
								                 );
                            });
    }

    getConnection = ()=>{ return this.connection;}

}
