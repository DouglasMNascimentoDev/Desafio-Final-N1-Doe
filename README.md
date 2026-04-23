# 🚀 API Doe

## 📌 Sobre o Projeto

A API Doe foi criada para gerenciar doadores e pontos de coletas de doações.

## 🎯 Objetivo

Ajudar as pessoas que precisam de doações durante as tragédias que assolam o nosso país.

## 🛠️ Tecnologias

- Node.js
- Express
- SQLite
- SQLIte3
- Postman
- Nodemon

---

## 📦 Instalação

# Clone o repositório

```bash
git clone https://github.com/DouglasMNascimentoDev/Desafio-Final-N1-Doe
```
# Acesse a pasta do projeto

```bash
cd Desafio-Final-N1-Doe
```
# Instale as dependências

`npm install`
---

## ▶️ Como Executar

`npm run dev`

`http://localhost:3000`

[Clique Aqui](http://localhost:3000)

---

## 🗄️ Banco de Dados

O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```
## 🧾Tabelas

Tabela usuarios

| Campo               | Descrição                                             |
| --------------------| ------------------------------------------------------|
| id                  | Idenficador único (PK)                                |
| nome                | Nome do usuário                                       |
| telefone            | Telefone do usuário                                   | 
| email               | Email do usuário                                      |
| data_cadastro       | Data de cadastro do usuário                           |
| tipo_usuario        | Tipo de usuário (administrador, doador, voluntário)   |


Tabela pontosColeta

| Campo               | Descrição                                             |
| --------------------| ------------------------------------------------------|
| id                  | Idenficador único (PK)                                |
| nome_ponto          | Nome do ponto de coleta                               |
| endereco            | Endereço do ponto                                     |
| cidade              | Cidade do ponto de coleta                             |
| status_necessidade  | Necessidade de doações do ponto. (baixa, média, alta) |


Tabela itensNecessarios

| Campo               | Descrição                                                          |
| --------------------| -------------------------------------------------------------------|
| id                  | Identificador único (PK)                                           |
| id_ponto            | Chave estrangeira (FK) que faz referência ao id do ponto de coleta |
| tipo_item           | Tipo de item doado                                                 |
| quantidade_desejada | Quantidade desejada de cada item doado                             |
| quantidade_atual    | Quantidade atual de cada item doado                                |


Tabela doacoes

| Campo               | Descrição                                                          |
| --------------------| -------------------------------------------------------------------|
| id                  | Identificador único (PK)                                           |
| id_usuario          | Chave estrangeira (FK) que faz referência ao id do usuário         |
| id_ponto            | Chave estrangeira (FK) que faz referência ao id do ponto de coleta |
| tipo_item           | Tipo de item doado                                                 |
| quantidade          | Quantidade do item doado                                           |
| data_doacao         | Data em que a doação foi realizada                                 |   


## 🔗 Endpoints

### Rota Inicial

```http
GET /
```
Retorna uma página HTML simples com informações sobre a API.


### Rota para listar os usuários

```http
GET /usuarios
```
Retorna todos os usuários registrasdos no banco de dados.


### Rota para buscar um usuário específico (ID)

```
GET /usuarios/:id
```

Ex: /usuarios/2

Retorna um usuário específico.


### Rota para adicionar um novo usuário

```http
POST /usuarios
```

### Body (JSON)

```json
{
    "nome": "Alberto Roberto",
    "telefone": "24 998569743",
    "email": "albertoroberto@email.com",
    "data_cadastro": "12/04/2026",
    "tipo_usuario": "Voluntário"
}
```


## Rota para atualizar um usuário

```json
PUT /usuarios
```

### Body (JSON)

```json
{
    "tipo_usuario": "Doador",
    "id": 13
}
```

### Rota para deletar um usuário específico

```http
DELETE /usuarios/:id
```

### Rota para listar os pontos de coleta

```http
GET /pontosColeta
```

### Rota para buscar um ponto de coleta específico (ID)

```http
GET /pontosColeta/:id
```
Ex: /pontosColeta/3

Retorna um ponto de coleta específico.


### Rota para adicionar um novo ponto de coleta

```http
POST /pontosColeta
```

### Body (JSON)

```json
{
  "nome_ponto": "Secretaria de Assistência Social",
  "endereco": "Rua Clovis Graciosa",
  "cidade": "Valença",
  "status_necessidade": "baixa"  
}
```


### Rota para atualizar a necessidade de doações de um ponto de coleta

```http
PUT /pontosColeta
```

### Body (JSON)

```json
{
    "status_necessidade": "media",
    "id": 6
}
```


### Rota para deletar um ponto de coleta específico

```http
DELETE /pntosColeta/:id
```

## 🔐 Segurança

A API utiliza `?` nas queries SQL:
```sql
WHERE id = ?
SET status_necessidade = ?
SET tipo_usuario = ?
```

Isso evita ataques de SQL Injection.


## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com Express
- Métodos/Verbos HTTP


## 👩‍💻 Autor

Douglas Menezes do Nascimento.
Projeto desenvolvido para fins educaionais.  

---

