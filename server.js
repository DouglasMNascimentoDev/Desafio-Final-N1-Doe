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

app.post("/pontosColeta", async (req, res) => {
    const {nome_ponto, endereco, cidade, status_necessidade} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO pontosColeta(nome_ponto, endereco, cidade, status_necessidade) VALUES (?, ?, ?, ?)`, [nome_ponto, endereco, cidade, status_necessidade])

    res.send(`Novo ponto de coleta registrado: ${nome_ponto}`)
})



app.put("/pontosColeta/:id", async (req, res) => {
    const {id} = req.params;

    const {status_necessidade} = req.body;

    const db = await criarBanco()

    await db.run(`
        UPDATE pontosColeta
        SET status_necessidade = ?
        WHERE id = ?`, [status_necessidade, id]     
        
        )

        res.send(`A necessidade do ponto de coleta ${id} foi atualizada com sucesso`)
})


//Rota de remoção

app.delete("/pontosColeta/:id", async (req, res) => {
    const {id} = req.params;

    const db =await criarBanco()

    await db.run(`
        DELETE FROM pontosColeta WHERE id = ?`, [id])

        res.send(`O ponto de coleta ${id} foi removido com sucesso`)
})


//Porta do servidor

//Criando uma variavel inteligente para a porta

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://Localhost:${PORT}`)
});