// swap later for pino/winston
function info(...args) { console.log(...args); }
function error(...args) { console.error(...args); }
module.exports = { info, error };
