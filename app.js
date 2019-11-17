const BidModel = require('./models/Bid.js');
const EventModel = require('./models/Event.js');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('assets'));
mongoose.connect('mongodb+srv://prikolica:1234asdf@bids-ptw3p.gcp.mongodb.net/bids');

app.get('/', (req, res) => res.sendFile('views/index.html' , { root : __dirname}));
app.get('/bid/1', (req, res) => res.sendFile('views/single-1.html' , { root : __dirname}));

app.get("/api/events", function (req, res) {
    EventModel.find().exec(function (error, events) {
        res.json({ data: events });
    });
});

app.get("/api/bids", function (req, res) {
    BidModel.find().exec(function (error, bids) {
        res.json({ data: bids });
    });
});

app.post("/api/bids", function (req, res) {
    var bid = new BidModel(req.body);
    bid.save(function () {
        res.json(bid);
    });
});

app.get("/api/bids/:id", function (req, res) {
    BidModel.findOne({_id: req.params.id}).exec(function (error, bid) {
        if (bid) {
            res.json(bid);
        } else {
            res.json({ error: "Not Found" });
        }
    });
});

app.put("/api/bids/:id", function (req, res) {
    if (!req.body || !req.body.customer || !req.body.value) {
        res.json({ error: "Missing required parameters" });
        return;
    }

    BidModel.findOne({ _id: req.params.id}).exec(function (error, bid) {
        if (bid) {
            if (req.body.value <= bid.highest_bid) {
                res.json({ error: "Invalid bid value" });
                return;
            }

            var event = new EventModel({
                customer: req.body.customer,
                action: "bid_place",
                data: {
                    bid: req.params.id,
                    value: req.body.value,
                },
            });
            event.save();

            bid.customer = req.body.customer;
            bid.highest_bid = req.body.value;
            bid.save();
            res.json(bid);
        } else {
            res.json({ error: "Not Found" });
        }
    });
});

// Update the bid object
app.post("/api/bids/:id", function (req, res) {
    BidModel.findOne({_id: req.params.id}).exec(function (error, bid) {
        if (bid) {
            var body = req.body;

            for (var key in body) {
                bid[key] = body[key];
            }

            bid.save(function () {
                res.json(bid);
            });
        } else {
            res.json({error: "Not Found"});
        }
    });
});

app.delete("/api/bids/:id", function (req, res) {
    BidModel.findOne({_id: req.params.id}).exec(function (error, bid) {
        if (bid) {
            bid.delete(function () {
                res.json({ deleted: true });
            });
        } else {
            res.json({ error: "Not Found" });
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
