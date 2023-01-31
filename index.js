const express = require('express')
const router = require('./controllers')

const app = express()
const PORT = process.env.PORT || 3005;

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api",router)


app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html', function (err) {
        if (err) {
            res.status(500).send(err);
        }
        // else {res.status(200)}
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html', function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, () =>{
console.log(`Listening at http://localhost:${PORT}`)
})


