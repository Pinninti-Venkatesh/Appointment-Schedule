const sql = require("./db.js");

const Appointments = function (appointment) {
    this.location = appointment.location;
    this.service = appointment.service;
    this.date_time = appointment.date_time;
    this.user = appointment.user;
};

Appointments.create = (newAppointment, result) => {
    sql.query("INSERT INTO appointments SET ?", newAppointment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created appointments: ", { id: res.insertId, ...newAppointment });
        result(null, { id: res.insertId, ...newAppointment });
    });
};

Appointments.findByUser = (user, result) => {
    sql.query(`SELECT * FROM appointments WHERE user = ${user}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Appointments; 