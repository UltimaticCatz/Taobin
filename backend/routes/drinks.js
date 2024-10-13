var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  const query = 'SELECT * from beverage';
  console.log('querying from database with this query: ', query);
  req.dbConnection.query(query, (err, results) => {
    if (err) {
        console.error("error querying from database: ", err.stack);
        return res.status(500).send("Error querying from database");
    }
    res.status(201).json(results);  
});
});


//havent test this yet
router.post('/registerDrink', (req, res) => {
    const {drink_name, cost, type_drink, image} = req.body;
    
    const query = `INSERT into beverage (drink_name, price , type_drink, image) values (${drink_name}, ${cost}, ${type_drink}, ${image})`;

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
