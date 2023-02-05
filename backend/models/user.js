const sql = require("./db.js");

const User = function (location) {
    this.location = location.location;
    this.service = location.service;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};
User.findOne = (username, password,result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}' and password='${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found service: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
User.findEmail = (username,result) => {
    sql.query(`SELECT email FROM users WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found service: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = User; 