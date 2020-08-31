const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json())
app.get('/', (req, res) => res.send('Express + TypeScript Server novo '));

app.get('/users', (req, res) => {

    let users = ["Ema", "Janko", "Petko", "Marko"];
    res.send({
        users: users
    });
});

app.post("/create_user", (req, res) => {
    console.log(req.body);

    res.send(`Created your user ${req.body.name}`);
});

app.listen(PORT, () => {
    console.log(`[server]Server is running at http://localhost:${PORT}`);
});