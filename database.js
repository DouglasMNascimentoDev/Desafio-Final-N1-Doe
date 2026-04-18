const sqlite3 = require('sqlite3')
const {open} = require('sqlite')


const criarBanco = async () => {

    const db = await open({

        filename: './database.db',
        driver: sqlite3.Database,

    })


db.run('PRAGMA foreign_keys = ON');    

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
            status_necessidade TEXT DEFAULT 'media'         
        
        ) 
               
        
        `);
        
    await db.exec(`
        CREATE TABLE IF NOT EXISTS itensNecessarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_ponto INTEGER,
            tipo_item TEXT,
            quantidade_desejada INTEGER,
            quantidade_atual INTEGER DEFAULT 0,
            FOREIGN KEY (id_ponto) REFERENCES pontosColeta(id)
        )
        `);
        
    await db.exec(`
        CREATE TABLE IF NOT EXISTS doacoes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER,
            id_ponto INTEGER,
            tipo_item TEXT,
            quantidade INTEGER,
            data_doacao TEXT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
            FOREIGN KEY (id_ponto) REFERENCES pontosColeta(id) 
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
        await db.exec(`INSERT INTO itensNecessarios(id_ponto, tipo_item, quantidade_desejada, quantidade_atual) VALUES
        (1, "Agasalho", 300, 50),
        (2, "Pacote de arroz", 400, 250),
        (3, "Água mineral", 1000, 900),
        (4, "Camisa", 500, 500),
        (4, "Caixa de leite", 1000, 500),
        (3, "Pacote de feijão", 800, 150),
        (1, "Bermuda", 500, 400),
        (2, "Pacote de macarrão", 1000, 300),
        (4, "Calçado", 5000, 2500),
        (3, "Chinelo", 5000, 4000),
        (2, "Cobertor", 1000, 190)       
         
            
            `);
    } else {
        console.log(`Banco pronto com ${checItens.total} de itens necessários`);
    }

    const checDoacoes = await db.get(`SELECT COUNT (*) AS total FROM doacoes`)

    if (checDoacoes.total ===0) {
        await db.exec(`INSERT INTO doacoes(id_usuario, id_ponto, tipo_item, quantidade, data_doacao) VALUES
        (1, 1, "Água mineral", 50, "24/01/2026"),
        (1, 3, "Agasalho", 5, "24/01/2026"),
        (4, 3, "Pacote de arroz", 10, "10/02/2026"),
        (4, 1, "Cobertor", 3, "10/02/2026"),
        (4, 4, "Pacote de macarrão", 50, "10/02/2026")    
            
            
            
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
    console.log('A necessidade de doações do ponto de coleta foi alterada');    

    //DELETE
    
    await db.run(`DELETE FROM usuarios WHERE id = 2`);
    console.log("O usuário do ID 2 foi removido");

    return db;


        



        

    





};

module.exports = {criarBanco}
