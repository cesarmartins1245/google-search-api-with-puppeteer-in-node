const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

const searchGoogle = require('./searchGoogle');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/search', (request, response) => {

    const searchQuery = request.query.searchquery;
    console.log(searchQuery)

    if (searchQuery != null) {
        searchGoogle(searchQuery)
            .then(results => {
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }
});

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`App listening on port ${port}!`));