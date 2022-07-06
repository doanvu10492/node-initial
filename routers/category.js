module.exports = (app) => {
    const category = require('../services/category.service');
    app.post('/api/category', category.create);
    app.get('/api/category', category.findAll);
    app.get('/api/category/:id', category.findOne);
    app.put('/api/category/:id', category.update);
    app.delete('/api/category/:id', category.delete);
};