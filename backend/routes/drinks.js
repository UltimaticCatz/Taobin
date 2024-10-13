var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const query = 'SELECT * from drinks';

  req.dbConnection.query(query, (err, results) => {
    if (err) {
      console.error("error querying from database: ", err.stack);
      res.status(500).send("Error querying the database");
      return;
    }
    res.json(results);  
  });
});


//havent test this yet
router.post('/registerDrink', (req, res) => {
    const {drink_name, cost} = req.body;
    
    const query = `INSERT into drinks (drink_name, cost) values (${drink_name}, ${cost})`;

    req.dbConnection.query(query, (err, results) => {
        if (err) {
            console.error("error inserting into database: ", err.stack);
            res.status(500).send("Error inserting into database");
            return;
        }
        res.status(201).json(results);  
    });
})

module.exports = router;
