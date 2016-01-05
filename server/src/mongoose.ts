/// <reference path="../typings/nconf/nconf.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import * as nconf from "nconf";
import * as path from "path";
//import * as mongoose from "mongoose";
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

var mongoose = require('mongoose');

/*
var cnn:mongoose.Connection = mongoose.createConnection(config.get("mongodbConfig").serverUrl);
cnn.once('open', function() {
    
    console.log("connected");
    
    
});
*/

mongoose.connect(config.get("mongodbConfig").serverUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    var articoloSchema = new mongoose.Schema(
        {
            titolo: String
        },
        { collection: 'quotidiano' }
    );

    var articolo = mongoose.model('quotidiano', articoloSchema);

    articolo.find(function(err, articoli) {
        if (err) return console.error(err);
        
        articoli.forEach(function(a) {
            console.log(a);
        });
    })
});


