const router = require('express').Router();
const {filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// post requests represent a client requesting the server to accept data.
router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be
    // set id based on what the next indew of the array will be
    req.body.id = animals.length.toString();
    console.log(req.body)

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals)
        console.log("animal", animal)   
        res.json(animal);
    }
});

module.exports = router;