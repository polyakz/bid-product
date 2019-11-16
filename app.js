const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('assets'));
app.get('/', (req, res) => res.sendFile('views/index.html' , { root : __dirname}));
app.get('/bid/1', (req, res) => res.sendFile('views/single-1.html' , { root : __dirname}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));