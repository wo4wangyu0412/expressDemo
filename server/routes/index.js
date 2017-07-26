module.exports = function (app) {
    app.use('/', require('./user'));
    app.use('/', require('./friend'));
    app.use('/page2', require('./page2'));
};
