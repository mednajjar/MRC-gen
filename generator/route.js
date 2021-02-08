const express = require('express');
const router = express.Router();
const thingController = require('../controllers/thingController');


router.post('/', thingController.createOne);
router.get('/:id', thingController.findOne);
router.put('/:id', thingController.updateOne);
router.delete('/:id', thingController.deleteOne);
router.get('/', thingController.getAll);


module.exports= router;