const mysql = require("../node_modules/mysql");

class MysqlClient {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "onur",
            waitForConnection: true,
            connectLimit: 10,
            queueLimit: 0
        });

        this.connect();
    }

    connect(){
        this.con.connect((err) => {
            if(err)
                console.log("MySql connection error: ", err);
            else
                console.log("MySql connected!");
        })
    }

    query(sql, callback){
        this.con.query(sql, callback);
    }
}

module.exports = MysqlClient;