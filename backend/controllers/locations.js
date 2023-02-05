const Locations = require('../models/location')
exports.create = (req, res) => {
    const body = req.body;
    const appointment = {
        location: body.location,
        service: body.service,
    }
    Locations.create(appointment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};

exports.getLocationsByService = (req, res) => {
    const service = `'${req.params.service}'`;
    Locations.findByServices(service, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting locations."
            });
        else res.send(data);
    });
}
exports.getServices = (req, res) => {
    Locations.getAllServices((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting servies the Tutorial."
            });
        else res.send(data);
    });
}