const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/sobre', (req, res) => {
    res.send('Está é a página sobre');
});

app.use('/', require("./routes"))

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});