// CONFIGURAÇÃO DO SERVER
const express = require('express')
const server = express()

const db = require('./database')

// UTILIZANDO ARQUIVOS ESTÁTICOS (CSS, SCRIPTS, IMAGES)
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

// CONFIGURANDO O NUNJUCKS
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// CRIANDO ROTAS
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send(500)
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send(500)
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function (req, res) {
    // INSERIR DADOS NA TABELA
    const query = `
        INSERT INTO ideas(
            title,
            image,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?) ;`

    const values = [
        req.body.title,
        req.body.image,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send(500)
        }

        return res.redirect('/ideias')

    })
})

// PORTA DO SERVIDOR
server.listen(3000)