const BidModel = require('./models/Bid.js');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static('assets'));
mongoose.connect('mongodb+srv://prikolica:1234asdf@bids-ptw3p.gcp.mongodb.net/test?retryWrites=true&w=majority');

app.get('/', (req, res) => res.sendFile('views/index.html' , { root : __dirname}));
app.get('/bid/1', (req, res) => res.sendFile('views/single-1.html' , { root : __dirname}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.route("/api/bids")
    .get(function (req, res) {
        BidModel.find().exec(function (error, data) {
            res.json(data);
        })
    .post(function (req, res) {
        var bid = new BidModel({
            product: '',
            bid_step: '',
            highest_bid: '',
            customer: '',
            status: ''
        });

        bid.save();
    })
});
