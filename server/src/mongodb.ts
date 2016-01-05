/// <reference path="../typings/nconf/nconf.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/nconf/nconf.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mongodb/mongodb.d.ts" />

import * as nconf from "nconf";
import * as path from "path";
import * as mongodb from "mongodb";
import * as assert from "assert";

var mongoConfigOption: nconf.IOptions = {
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, 'config.json')
    }
}
var config: nconf.Provider = new nconf.Provider(mongoConfigOption);

var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;

var url = config.get("mongodbConfig").serverUrl; //'mongodb://localhost:27017/dea';

function findArticles (db: mongodb.Db, callback: any) : void {
    db.collection('quotidiano').find(function(err: Error, result: mongodb.Cursor) {
        result.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(JSON.stringify(doc));
            } else {
                callback();
            }
        });
    });
}

mongodb.MongoClient.connect(url, function(err: Error, db: mongodb.Db) {
    assert.equal(null, err);
    findArticles(db, function() {
        db.close();
    });
});