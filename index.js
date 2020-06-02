const express = require('express');
const app = express();
const port = 3000;


app.get('/', (request, response) => {
    response.send('Welcome')
})

app.get('/api/movies', (request, response) => {
  response.send('Récupération de tous les films')
});

app.get('/api/movies/:id', (request, response) => {
    const { id } = request.params
    response.json({ id })
  });

app.get('/api/employee/', (request, response) => {
    const  { name }  = request.query;
    if (name) {
    response.status(404).send(`Impossible de récupérer l'employé ${name}`);
    } else {
      response.sendStatus(304)
    }
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
