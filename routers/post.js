module.exports = (app) => {
    const post = require('../services/post.service');
    const auth = require('../middleware/auth');

    app.post('/api/post', auth, post.create);
    app.get('/api/post', auth, post.findAll);
    app.get('/api/post/:id', auth, post.findOne);
    app.put('/api/post/:id', auth, post.update);
    app.delete('/api/post/:id', auth, post.deletePost);
};