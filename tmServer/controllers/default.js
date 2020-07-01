var moment = require('moment');
const version = '1.0.0';

function help(req, res) {
    res.status(200).send({
        message: 'Welcome Back! API Version: ' + version + ' ;-)'
    });
}

function status(req, res) {
    res.status(200).send({
        message: {
            'api': 'social',
            'status': 'OK',
            'version': version,
            'time': moment().unix()
        }
    });
}

module.exports = {
    help,
    status
};
