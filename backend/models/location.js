const sql = require("./db.js");

const Locations = function (location) {
    this.location = location.location;
    this.service = location.service;
};

Locations.create = (newAppointment, result) => {
    sql.query("INSERT INTO locations SET ?", newAppointment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created locations: ", { id: res.insertId, ...newAppointment });
        result(null, { id: res.insertId, ...newAppointment });
    });
};

Locations.findByServices = (services, result) => {
    sql.query(`SELECT * FROM locations WHERE service = ${services}`, (err, res) => {
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
Locations.getAllServices = (result) => {
    sql.query(`select distinct service from locations `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found services: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

module.exports = Locations; 