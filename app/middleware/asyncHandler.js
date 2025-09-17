// small helper to avoid try/catch in every controller
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = { asyncHandler };