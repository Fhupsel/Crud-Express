const express = require('express');
const { v4: uuidv4 } = require('uuid'); // ID dinâmico
const app = express();
const port = 3000;

// Estrutura de logs
const log = (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`);
const error = (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`);

// Middleware para parsear JSON
app.use(express.json());

let filmes = [];

// Listar todos os filmes (GET sem filtro de ID)
app.get('/', (req, res) => {
  log('Listando todos os filmes');
  res.status(200).json(filmes);
});

// Listar um filme por ID (GET com filtro de ID)
app.get('/:id', (req, res) => {
  const filme = filmes.find(i => i.id === req.params.id);
  if (filme) {
    log(`Filme encontrado: ${filme.id}`);
    res.status(200).json(filme);
  } else {
    error(`Filme não encontrado: ${req.params.id}`);
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Adicionar um filme (POST)
app.post('/', (req, res) => {
  const { name } = req.body;
  const filme = { id: uuidv4(), name };
  filmes.push(filme);
  log(`Filme adicionado: ${JSON.stringify(filme)}`);
  res.status(201).json(filme);
});

// Atualizar um filme (PUT -> Atualiza o recurso completo)
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    filmes[index] = { id, name };
    log(`Filme atualizado: ${JSON.stringify(filmes[index])}`);
    res.status(200).json(filmes[index]);
  } else {
    error(`Falha ao atualizar - Filme não encontrado: ${id}`);
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Excluir um filme (DELETE)
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(f => f.id === id);
  if (index !== -1) {
    const deleted = filmes.splice(index, 1)[0];
    log(`Filme deletado: ${JSON.stringify(deleted)}`);
    res.status(200).json(deleted);
  } else {
    error(`Falha ao deletar - Filme não encontrado: ${id}`);
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  log(`Servidor rodando em: http://localhost:${port}`);
});
