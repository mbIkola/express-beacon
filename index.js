const express = require('express');
const SizeLimitedStack = require("./storage");
const app = express();
const port = process.env.PORT || 3000;

const storage = new SizeLimitedStack(1e5);

app.get('/data', (req, res) => {
   res.send(storage.toString());
});

app.post('/data', (req, res) => {
    storage.clear();
    res.send('cleared');
});

app.delete('/data', (req, res) => {
    storage.clear();
    res.send('cleared');
});

app.all('/*', (req, res) => {
    storage.push({
        t: + new Date(),
        u: req.url,
        h: req.headers.host,
        c: req.headers.cookie,
        i: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    res.send('OK');
});

app.listen(port, () => console.log(`Example app listening on port ${port}`))
