const router = require('express').Router();
const bodyParser = require('body-parser')
const database = require('../db')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.post('/add', async (req, res) => {
    try{
        const data = req.body;
    
        await database.save(data)
        res.send('Recommendation received')
    }catch (error) {
        console.log(error)
        res.status(500).json(error.toString());
    }
    
})

router.get('/recent', async (req, res) => {
    try{
        const data = await database.getRecommendations();

     res.send(data)
    } catch (error) {
        console.log(error) 
        res.status(500).json(error.toString())
    }
})


module.exports = router;