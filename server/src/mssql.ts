/// <reference path="../typings/mssql/mssql.d.ts" />
/// <reference path="../typings/nconf/nconf.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import * as nconf from "nconf";
import * as sql from "mssql";
import * as path from "path";
import * as fs from "fs";

var configOption: nconf.IOptions = {
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, 'config.json')
    }
}
var config: nconf.Provider = new nconf.Provider(configOption);

interface IWorkflow {
    id: number,
    nome: string
}

var connection: sql.Connection = new sql.Connection(config.get("mssqlConfig"));

connection.connect(function(err) {

    if (err) {
        console.log(`Error: ${err}`);
        return;
    }

    var req: sql.Request = new sql.Request(connection);

    // Callback 
    /*
    req.query<IWorkflow>("select id, nome from workflow", (err: Error, recordset: IWorkflow[]) => {

        if (err != null) {
            console.log(`query error: ${err}`);
        } else {
            console.log(`${recordset[0].id}, ${recordset[0].nome}`);
        }
    });
    */

    // Promise
    //var p: Promise<IWorkflow[]> = req.query<IWorkflow>("select id, nome from workflows");
    req.query<IWorkflow>("select top 10 id, nome from workflow order by id")
        .then((recordset: IWorkflow[]) => {

            recordset.forEach((r: IWorkflow) => {
                console.log(` - ${r.id}. ${r.nome}`);
            });

            //console.log(`${recordset[0].id}, ${recordset[0].nome}`);
        })
        .catch((err: Error) => {
            console.log(`query error: ${err}`);
        });
});


