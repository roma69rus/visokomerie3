var express = require('express');
var router = express.Router();


//Controllers
var catalog = require('../controllers/catalog');


router.get('/', catalog.getCatalog);



module.exports = router;
