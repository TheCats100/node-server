const connection = require('./conf');
const express = require('express');
const app = express();
const port = 3000;

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

  
app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${port}`);
});


// écoute de l'url "/api/movies"
app.get('/api/movies/:id', (req, res) => {

    const { id } = req.params

    // connection à la base de données, et sélection des films
    connection.query(`SELECT * from movie WHERE id=?`, [id], (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des films');
        } else {
            if (res.length !== 0) {
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
            } else {
                res.status(404).send('Movie not found')
            }
        }
    });
});

app.get('/api/movies', (req, res) => {

    let sql = 'SELECT * FROM movie';
    const sqlValues = [];

    if (req.query.rating) {
        sql += ' WHERE rating = ?';
        sqlValues.push(req.query.rating);
    }

    if (req.query.genre) {
        sql += ' WHERE genre =?';
        sqlValues.push(req.query.genre)
    }
    
    // connection à la base de données, et sélection des films
    connection.query(sql, sqlValues, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send(`An error occurred: ${err.message}`);
        } else {
            res.json(results)
        }
    });
})

app.get('/api/movies/names', (req, res) => {
    connection.query('SELECT name from movie', (err, results) =>{
        if(err) {
            res.status(500).send('No body was here..')
        } else {
            res.json(results);
        }
    })
})




app.post('/api/movies', (req, res) => {

    // Données stockées dans req.body
    const formData = req.body;

    //INSERT INTO employee (lastname, firstname, email) VALUES (mysql.escape(formData.lastname), mysql.escape(formData.firstname), mysql.escapeformData.email); => ?
    connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});





// écoute de l'url "/api/movies"
app.put('/api/movies/:id', (req, res) => {

    // récupération des données envoyées
    const idMovie = req.params.id;
    const formData = req.body;
  
    // connection à la base de données, et insertion du film
    connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovie], err => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
  
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
});





// écoute de l'url "/api/movies"
app.delete('/api/movies/:id', (req, res) => {

    // récupération des données envoyées
    const idMovie = req.params.id;
  
    // connexion à la base de données, et suppression du film
    connection.query('DELETE FROM movie WHERE id = ?', [idMovie], err => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un film");
      } else {
  
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });
