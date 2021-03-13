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

                                          let mongo = conn.db(db.collection);

                                          this.db = mongo;
                                          this.collection = {
                                                            'users':mongo.collection('users')
                                                            }

										                       resolve();
									                     }
								                 );
                            });
    }

    getConnection = ()=>{ return this.connection;}

}
