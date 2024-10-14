var express = require('express');
var router = express.Router();
var multer = require('multer');
var sharp = require('sharp');

// multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//get all drinks from database
router.get('/', (req, res, next) => {
    const query = 'SELECT * from beverage';
    console.log('querying from database with this query: ', query);
    req.dbConnection.query(query, (err, results) => {
        if (err) {
            console.error("error querying from database: ", err.stack);
            return res.status(500).send("Error querying from database");
        }

        const processedResult = results.map((drink) => {
            if (drink.image) {
                drink.image = `data:image/png;base64,${drink.image.toString('base64')}`
            }
            return drink;
        })

        res.status(200).json(processedResult);  
        });
});

//get a drink from the id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = 'SELECT * from beverage where id = ?';
    console.log('querying from database with this query: ', query);
    req.dbConnection.query(query, [id], (err, results) => {
        if (err) {
            console.error("error querying from database: ", err.stack);
            return res.status(500).send("Error querying from database");
        }

        const processedResult = results.map((drink) => {
            if (drink.image) {
                drink.image = `data:image/png;base64,${drink.image.toString('base64')}`
            }
            return drink;
        })

        res.status(200).json(processedResult[0]);  
        });
});

//save a new drink to database
router.post('/registerDrink', upload.single("image"), async (req, res, next) => {
    const {drink_name, price, type_drink} = req.body;

    let compressedImageBuffer;
    if (req.file) {
        try {
        compressedImageBuffer = await sharp(req.file.buffer).png({quality: 60}).toBuffer();
        } catch (err) {
        return res.status(500).send("Error Processing image");
        }
    } else {
        return res.status(400).send("Image is required");
    }
    const data = {
        drink_name: drink_name,
        price: price,
        type_drink: type_drink,
        image: compressedImageBuffer,
    };

    const query = `INSERT into beverage (drink_name, price , type_drink, image) values (?, ?, ?, ?)`;

    req.dbConnection.query(query, [data.drink_name, data.price, data.type_drink, data.image], (err, results) => {
        if (err) {
            console.error("error inserting into database: ", err.stack);
            res.status(500).send("Error inserting into database");
            return;
        }
        res.status(201).json(data);  
    });
})

module.exports = router;
