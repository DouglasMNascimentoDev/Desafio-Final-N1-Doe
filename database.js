const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const criarBanco = async () => {

    const db = await open({

        filename: './database.db',
        driver: sqlite3.Database,

    })


    //Criando as tabelas do banco de dados

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,                                                                          
            telefone TEXT,
            email TEXT,                                   
            data_cadastro TEXT,                                
            tipo_usuario TEXT DEFAULT 'doador'               
            
        
        
        )       
        
        `);

        


    await db.exec(`
        CREATE TABLE IF NOT EXISTS pontosColeta(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_ponto TEXT,                                 
            endereco TEXT,                                   
            cidade TEXT,                                     
            status_necessidade, TEXT DEFAULT 'media'         
        
        ) 
               
        
        `);
        
    await db.exec(`
        CREATE TABLE IF NOT EXISTS itensNecessarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_ponto INTEGER REFERENCES pontosColeta(id_ponto),
            tipo_item TEXT,
            quantidade_desejada INTEGER,
            quantidade_atual INTEGER DEFAULT 0
        )
        `);
        
    await db.exec(`
        CREATE TABLE IF NOT EXISTS doacoes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER REFERENCES usuarios(id_usuario),
            id_ponto INTEGER REFERENCES pontosColeta(id_ponto),
            tipo_item TEXT,
            quantidade INTEGER,
            data_doacao TEXT
        )
        `);

    console.log("O banco de dados está configurado e as tabelas estão prontas.");


    //Insert - C do CRUD - CREATE

    const checagem = await db.get(`SELECT COUNT (*) AS total FROM usuarios`)

    if (checagem.total ===0) {
        await db.exec(`
            INSERT INTO usuarios(nome, telefone, email, data_cadastro, tipo_usuario) VALUES
            ("José Carlos", "24 999987796", "josecarlos@email.com", "24/01/2026", "Doador"),
            ("Maria Rita", "24 998759561", "mrita@email.com", "23/02/2026", "Voluntário"),
            ("Renato Silva", "24 988561234", "renato@email.com", "20/01/2026", "Administrador"),
            ("Roberto Carlos", "24 997784567", "rcarlos@email.com", "10/02/2026", "Doador"),
            ("Luciana Silveira", "24 998554321", "lusilveira@email.com", "05/03/2026", "Voluntário")
            `);

    } else {
        console.log(`Banco pronto com ${checagem.total} de usuarios`);
    }
    
    const checPontos = await db.get(`SELECT COUNT (*) AS total FROM pontosColeta`)

    if (checPontos.total ===0) {
        await db.exec(`INSERT INTO pontosColeta(nome_ponto, endereco, cidade, status_necessidade) VALUES
        ("Escola Municipal Nossa Senhora Aparecida", "Rua da Aparecida", "Valença", "média"),
        ("UBS - Centro", "Rua dos Mineiros", "Valença", "baixa"),
        ("Prefeitura Municipal de Valença", "Rua Dr. Figueiredo", "Valença", "alta"),
        ("Colégio Estadual Theodorico Fonseca", "Praça Visconde do Rio Preto", "Valença", "média")
        
        
        
            `);
    } else {
        console.log(`Banco pronto com ${checPontos.total} de pontos de coleta`);
    }

    const checItens = await db.get(`SELECT COUNT (*) AS total FROM itensNecessarios`)

    if (checItens.total ===0) {
        await db.exec(`INSERT INTO itensNecessarios(tipo_item, quantidade_desejada, quantidade_atual) VALUES
        ("Agasalho", 300, 50),
        ("Pacote de arroz", 400, 250),
        ("Água mineral", 1000, 900),
        ("Camisa", 500, 500),
        ("Caixa de leite", 1000, 500),
        ("Pacote de feijão", 800, 150),
        ("Bermuda", 500, 400),
        ("Pacote de macarrão", 1000, 300),
        ("Calçado", 5000, 2500),
        ("Chinelo", 5000, 4000),
        ("Cobertor", 1000, 190)       
         
            
            `);
    } else {
        console.log(`Banco pronto com ${checItens.total} de itens necessários`);
    }

    const checDoacoes = await db.get(`SELECT COUNT (*) AS total FROM doacoes`)

    if (checDoacoes.total ===0) {
        await db.exec(`INSERT INTO doacoes(tipo_item, quantidade, data_doacao) VALUES
        ("Água mineral", 50, "24/01/2026"),
        ("Agasalho", 5, "24/01/2026"),
        ("Pacote de arroz", 10, "10/02/2026"),
        ("Cobertor", 3, "10/02/2026"),
        ("Pacote de macarrão", 50, "10/02/2026")    
            
            
            
            `);
    } else {
        console.log(`Banco pronto com ${checDoacoes.total} doações`)
    }



    //Select - R do CRUD - READ

    const pontoEspecifico = await db.all(`SELECT * FROM pontosColeta WHERE nome_ponto = "UBS - Centro"`);
    console.table(pontoEspecifico);

    //UPDATE

    await db.run(`
        UPDATE pontosColeta
        SET status_necessidade = "media"
        WHERE nome_ponto = "UBS - Centro"
        
        
        `);


    //DELETE
    
    await db.run(`DELETE FROM pontosColeta WHERE id = 2`);
    console.log("O registro do ID 2 foi removido");

    return db;


        



        

    





};

module.exports = {criarBanco}