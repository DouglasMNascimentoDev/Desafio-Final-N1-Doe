const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const criarBanco = async () => {

    const db = await open({

        filename: './database.db',
        driver: sqlite3.Database,

    })


    //Criando as tabelas do banco de dados

    await db.exec(`
        CREATE TABLE IF usuarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,                                                                           --E-mail do usuário
            telefone TEXT,
            email TEXT,                                   
            data_cadastro TEXT                                
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
            quantidade_atual INTEGER DEFAULT 0,
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
        



        

    





};

criarBanco();