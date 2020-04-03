const sqlite = require("sqlite3").verbose()

const db = new sqlite.Database('./basic.db')

db.serialize(function () {

    // CRIAR TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // INSERIR DADOS NA TABELA
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?) ;`

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci quo non voluptas quos vel? Vel tempore dignissimos consectetur pariatur ea. Temporibus obcaecati vitae voluptatum autem, consequatur ut similique cumque ipsam?",
    //     "https://instagram.com/espelhoinvertido"
    // ]

    // db.run(query, values, function (err) {
    //     if (err) return console.log("Err")

    //     console.log(this)
    // })

    // CONSULTAR DADOS NA TABELA
    // db.all(`SELECT * FROM ideas`, function (err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

    // DELETAR DADOS NA TABELA
    // db.run(`DELETE FROM ideas`, function (err) {
    //     if (err) return console.log(err)

    //     console.log("Deletei tudo sá porra", this)
    // })
})

module.exports = db