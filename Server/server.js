const express = require('express');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
})

//app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors);

app.post('/testing', function(req, res) {
    console.log(req.body);
    res.status(200).send({"message": "Data received"});
})

app.listen(PORT, function() {
    console.log("Running on localhost: " + PORT);
});