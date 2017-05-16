var morgan = require('morgan');

morgan.token('status-colored', function getColoredStatus(req, res) {
    var status = res._header ? res.statusCode : undefined;

    // get status color
    var color = status >= 500 ? 31 // red
            : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
            : status >= 200 ? 32 // green
            : 0; // no color

    return '\x1b[' + color + 'm ' + status + '\x1b[0m';
});

module.exports = morgan('\x1b[0m[:date[web]] :remote-addr :method :status-colored :url :response-time ms\x1b[0m');