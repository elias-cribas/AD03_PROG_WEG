const express = require('express');
const router = express.Router()


const professores = require('../public/professores.json')

router.get('/', (req, res) => {
    res.json(professores)
})

router.get('/:id', (req, res) => {
    const professor = professores[req.params.id]
    res.json(professor)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição POST para professores/ chegou: " +req.body.nomeProfessor);
})

router.put('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição PUT para professores/ chegou: " +req.body.params.id);
})

router.delete('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição DELETE para professores/ chegou: " +req.body.params.id);
})

module.exports = router