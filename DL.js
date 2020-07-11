const express = require('express');
const bodyParser = require('body-parser');
require('custom-env').env(true)
var MongoClient = require('mongodb').MongoClient;
var dbConnection = "mongodb://"
if (process.env.DB_USER) dbConnection += process.env.DB_USER + ":" + process.env.DB_PASS
dbConnection+=process.env.DB_HOST+":"+process.env.DB_PORT+"/";
if (process.env.DB_USER) dbConnection += process.env.DB_USER

const DBNAME = process.env.DB_NAME

class EchoDL {

    static connect(callback) {
        var options = {poolSize: 100,bufferMaxEntries: 0, useNewUrlParser: true, useUnifiedTopology: true}
        MongoClient.connect(dbConnection, options, async function(err, db) {
            if (err) throw err;
            var dbo = db.db(DBNAME);
            callback(dbo)
        })
    }

    static initializeDB() {
        this.connect(dbo => {
            dbo.collection("messages").createIndex( { time: 1, timstamp: 1 } )
        })
    }

    static async registerMsg(msg, time) {
        var result = true
        await new Promise((resolve, reject) =>  {
            this.connect(dbo => {
                const rec = {
                    msg: msg,
                    time: time,
                    timestamp : new Date().getTime()
                }
                dbo.collection("messages").insertOne(rec, function(err, res) {
                    if (err)
                        reject(err)
                    else
                        resolve()
                })
            })
        }).catch(err => result = false)

        return result
    }

}

module.exports = EchoDL;