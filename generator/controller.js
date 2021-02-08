const Thing = require('../models/Thing');

// *******************
exports.createOne = (req, res, next)=>{
  
    const thing = new Thing({
      ...req.body,
    });
    thing.save()
    .then(() => res.status(201).json({message: 'Vos données bien enregistrer!'}))
    .catch( (error) => res.status(400).json({ error: error }));
   
  };
// *******************
  exports.findOne = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then((thing) => res.status(200).json(thing))
      .catch((error) => res.status(404).json({ error: error }));
  };
//   ******************
exports.updateOne = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch((error) => res.status(400).json({ error: error }));
  };
// ********************
exports.deleteOne = (req, res, next) => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};
// *******************
exports.getAll = (req, res, next) => {
    Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error: error }));
  };

