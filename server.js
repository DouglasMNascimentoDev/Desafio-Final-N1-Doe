const express = require('express')
const {criarBanco} = require('./database')

const cors = require('cors')


const app = express()

app.use(cors())

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

app.get('/usuarios', async (req, res) => {
    const db = await criarBanco()

    const listaUsuarios = await db.all(`SELECT * FROM usuarios`)

    res.json(listaUsuarios)
});

app.get('/doacoes', async (req, res) => {
    const db = await criarBanco()

    const listaDoacoes = await db.all(`SELECT * FROM doacoes`)

    res.json(listaDoacoes)
})

app.get('/itensNecessarios', async (req, res) => {
    const db = await criarBanco()

    const listaItens = await db.all(`SELECT * FROM itensNecessarios`)

    res.json(listaItens)
})


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

app.post('/usuarios', async (req, res) => {
    const {nome, telefone, email, data_cadastro, tipo_usuario} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO usuarios(nome, telefone, email, data_cadastro, tipo_usuario) VALUES (?, ?, ?, ?, ?)`, [nome, telefone, email, data_cadastro, tipo_usuario])

    res.send(`Novo usuário registrado: ${nome}`)
})

app.post('/doacoes', async (req, res) => {
    const {id_usuario, id_ponto, tipo_item, quantidade, data_doacao} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO doacoes(id_usuario, id_ponto, tipo_item, quantidade, data_doacao)`, [id_usuario, id_ponto, tipo_item, quantidade, data_doacao])

    res.send(`Nova doação registrada: ${tipo_item} Quantidade: ${quantidade}`)
})

app.post('/itensNecessarios', async (req, res) => {
    const {id_ponto, tipo_item, quantidade_desejada, quantidade_atual} = req.body

    const db = await criarBanco()

    await db.run(`INSERT INTO itensNecessarios(id_ponto, tipo_item, quantidade_desejada, quantidade_atual)`, [id_ponto, tipo_item, quantidade_desejada, quantidade_atual])

    res.send()
})


//Rota para atualizar


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

