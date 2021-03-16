const express = require('express');
const app = express();

app.use(express.json());

let count = 0;
let livros = [
    {
        "id": 0,
        "titulo": "livro 1",
        "descricao": "Descrição do livro 1",
        "edicao": "edição 1",
        "autor": "Autor 1",
        "ISBN": "Código 1"
    },
    {
        "id": 1,
        "titulo": "livro 2",
        "descricao": "Descrição do livro 2",
        "edicao": "edição 2",
        "autor": "Autor 2",
        "ISBN": "Código 2"
    }
];

app.post('/livros', (req, res, next) => {
    const {titulo, descricao, edicao, autor, ISBN} = req.body;
    const livro = {id: count += 1, titulo, descricao, edicao, autor, ISBN};
    livros.push(livro);

    return res.status(201).json(livros);
});

app.get('/livros', (req, res, next) => {
    return res.status(201).json(livros);
});

app.put('/livros', (req, res, next) => {
    const {id, titulo, descricao, edicao, autor, ISBN} = req.body;
    const livro = livros.find(livro => livro.id == id);

    if (!livro) {
        return res.status(400).send();
    }

    livro.titulo = titulo;
    livro.descricao = descricao;
    livro.edicao = edicao;
    livro.autor = autor;
    livro.ISBN = ISBN;

    return res.status(200).json(livro);

});

app.delete('/livros', (req, res, next) => {
    const {id} = req.body;
    const livroIndex = livros.findIndex(livro => livro.id == id);

    if (livroIndex < 0) {
        return res.status(400).send();
    }

    livros.splice(livroIndex, 1);

    return res.status(200).json(livros);
});

app.listen(3000);