const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

let filmes = []

// Listar todos os filmes
app.get('/', (req, res) => {
  res.json(filmes).status(200)
})

// Listar um filme por id
app.get('/:id', (req, res) => {
  const filme = filmes.find(i => i.id === req.params.id);
  if (filme) {
    res.json(filme).status(200);
  } else {
    res.status(404).json({ error: 'filme não encontrado' });
  }
});

// Adicionar um filme
app.post('/', (req, res) => {
  const filme = req.body;
  const existe = filmes.some(f => f.id === filme.id)
  if (existe) {
    return res.status(400).json({ error: 'Já existe um filme com esse ID, insira um ID diferente' });
  } else{
    filmes.push(filme);
    res.status(201).json(filme);
  }
});

// Atualizar um filme
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    filmes[index] = req.body;
    res.json(filmes[index]).status(200);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Exluir um filme (Consertar)
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    const deleted = filmes.splice(index, 1);
    res.json(deleted[0]).status(200);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`)
})