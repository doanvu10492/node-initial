module.exports = (app) => {
    const product = require('../services/product.service');
    app.post('/api/product', product.create);
    app.get('/api/product', product.findAll);
    app.get('/api/product/:id', product.findOne);
    app.put('/api/product/:id', product.update);
    app.delete('/api/product/:id', product.delete);
};