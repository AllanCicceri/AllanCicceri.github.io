const express = require('express')
const app = express()


app.use(express.static('.'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/teste', function(req, res){
    res.send('Hello there... :)')
})

app.get('/teste2', function(req, res){
    res.send({
        id: 1,
        nome: 'Mari',
        sexo: 'feminino'
    })
})

app.post('/gameConfig', function(req, res){
    res.send({
        ...req.players,
    })
})

app.listen(8080)

