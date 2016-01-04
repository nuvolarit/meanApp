/// <reference path="../typings/mssql/mssql.d.ts" />

import * as sql from "mssql";

var connectionConfig: sql.config = {
    server: 'pflivesqla.prof.gruppo24.net\\dbudea',
    database: 'DEABE',
    user: 'deadsp_login',
    password: 'password',
    connectionTimeout: 5000
}

interface IWorkflow {
    id: number,
    nome: string
}

//var connection: sql.Connection = new sql.Connection(connectionConfig);

new sql.Connection(connectionConfig).connect(function(err) {

    if (err) {
        console.log(`Error: ${err}`);
        return;
    }

    var req: sql.Request = new sql.Request();

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
    req.query<IWorkflow>("select id, nome from workflow order by nome")
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


