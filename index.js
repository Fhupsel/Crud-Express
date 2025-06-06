const express = require('express');
const { v4: uuidv4 } = require('uuid'); // ID dinâmico
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

let filmes = [];

// Listar todos os filmes (GET sem filtro de ID)
app.get('/', (req, res) => {
  res.status(200).json(filmes);
});

// Listar um filme por ID (GET com filtro de ID)
app.get('/:id', (req, res) => {
  const filme = filmes.find(i => i.id === req.params.id);
  if (filme) {
    res.status(200).json(filme);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Adicionar um filme (POST)
app.post('/', (req, res) => {
  const { name } = req.body;
  const filme = { id: uuidv4(), name };
  filmes.push(filme);
  res.status(201).json(filme);
});

// Atualizar um filme (PUT -> Atualiza o recurso completo)
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    filmes[index] = { id, name };
    res.status(200).json(filmes[index]);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Excluir um filme (DELETE)
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    const deleted = filmes.splice(index, 1)[0];
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
