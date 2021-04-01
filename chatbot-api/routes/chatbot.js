let express = require("express");
let router = express.Router();

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['sk']});
manager.describeLanguage('sk', 'Slovak');

manager.addDocument('sk', 'dobrý deň', 'pozdrav.privitanie');
manager.addDocument('sk', 'dobry den', 'pozdrav.privitanie');
manager.addDocument('sk', 'dovidenia', 'pozdrav.odchod');
manager.addDocument('sk', 'majte sa', 'pozdrav.odchod');

manager.addAnswer('sk', 'pozdrav.privitanie', 'Ahoj, môžeme si tykať.');
manager.addAnswer('sk', 'pozdrav.odchod', 'Do skorého videnia.');
manager.train();
manager.save();

router.post("/", (req, res) => {
    (async() => {
        const response = await manager.process('sk', req.body.text);
        if (response.answer == undefined) {
            res.json("Prepac, nerozumiem");
        } else {
            res.json(response.answer);
        }
    })();
});

module.exports = router;