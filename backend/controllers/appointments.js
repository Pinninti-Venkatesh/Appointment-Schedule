const Appointments = require('../models/appointments.model');
const { findEmail } = require('../models/user');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const mailData = (username, email, date, city, service) => {
    return {
        from: 'no.reply.depv@outlook.com',
        to: email,
        subject: 'Appointment Confirmation',
        html: `<div style="font-family:\'Arial, Helvetica, sans-serif\'; font-size: 22px;margin-bottom:20px" >
            <p>Dear ${username} </p>
            <p>Your ${service} appointment has been scheduled on ${date} in ${city} </p>
            <div>Regards,</div>
            <div>Dreamstone Appointments</div>
            </div>
            
            `
    };
}
let transporter = nodemailer.createTransport(new SMTPTransport({
    service: 'hotmail',
    auth: {
        user: 'no.reply.depv@outlook.com',
        pass: 'HogWarts909'
    },
}));
function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('error in sending mail to ', err);
        }
        else {
            console.log('Mail sent to:', info);
        }
    });
}
exports.create = (req, res) => {
    const body = req.body;
    const appointment = {
        location: body.location,
        service: body.service,
        date_time: body.date_time,
        user: body.user
    }
    Appointments.create(appointment, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        }
        else {
            findEmail(body.user, (err, response) => {
                if (response) {
                    sendEmail(mailData(body.user, response[0].email, body.date_time, appointment.location, body.service));
                    res.send(data)
                }
            });
        };
    });
}

exports.getAppointments = (req, res) => {
    const user = `'${req.params.user}'`;
    Appointments.findByUser(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
}