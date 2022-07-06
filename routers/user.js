module.exports = (app) => {
    const user = require('../services/user.service');

    app.post('/api/users/login', user.login);
    app.post('/api/users', user.create);
    app.get('/api/users', user.findAll);
    app.get('/api/users/:id', user.findOne);
    app.put('/api/users/:id', user.update);
    app.delete('/api/users/:id', user.delete);
};