const express = require('express')
const {criarBanco} = require('./database')


const app = express()

app.use(express.json())


//Criando a Rota Principal /Rota Raiz
app.get('/', (req, res) => {
    res.send(`
        <body>
            <h1>Doe</h1>
            <h2>Gestão de doações e pontos de coletas</2>
        </body>    
        
        `)
});


app.get('/pontosColeta', async (req, res) => {
    const db = await criarBanco()

    const listaPontos = await db.all(`SELECT * FROM pontosColeta`)

    res.json(listaPontos)
});


//Rota Específica

app.get("/pontosColeta/:id", async (req, res) => {
    const {id} = req.params

    const db = await criarBanco()

    const pontoEspecifico = await db.all(`SELECT * FROM pontosColeta WHERE id = ?`, [id])

    res.json(pontoEspecifico)
})


//Rota POST - Para novos registros/Endpoints

