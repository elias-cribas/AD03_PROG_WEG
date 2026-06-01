const express = require('express');
const router = express.Router()


const cursos = require('../public/cursos.json')

router.get('/', (req, res) => {
    res.json(cursos)
})

router.get('/:id', (req, res) => {
    const curso = cursos[req.params.id]
    res.json(curso)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição POST para cursos/ chegou: " +req.body.nomeCurso);
})

router.put('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição PUT para cursos/ chegou: " +req.body.params.id);
})

router.delete('/', (req, res) => {
    console.log(req.body)
    res.send("A requisição DELETE para cursos/ chegou: " +req.body.params.id);
})

module.exports = router