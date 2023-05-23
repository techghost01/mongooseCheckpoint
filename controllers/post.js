const Person = require("../models/Person");

//Create and Save a Record of a Model:
exports.postInfoPerson = (req, res, next) => {
  // console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const favoriteFood = req.body.favoritefood;

  const person = new Person({
    name: name,
    age: age,
    favoritefood: favoriteFood,
  });
  person.save((err, data) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getInfoPeople = (req, res, next) => {
  res.status(200).send("Welcome to people's page");
};

//Create Many Records with model.create()
exports.postInfoPeople = (req, res, next) => {
  const arrayOfPeople = req.body;
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(data);
    }
  });
};

//Use model.find() to Search Your Database
exports.findPerson = (req, res, next) => {
  const info = req.params.name;
  Person.find({ name: info }, (err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
};

//Use model.findById() to Search Your Database By _id

exports.findById = (req, res, next) => {
  const info = req.body.personId;
  Person.findById(info, (err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
};

//Use model.findOne() to Return a Single Matching Document from Your Database
exports.findOne = (req, res, next) => {
  const searchItem = req.body.food;
  Person.findOne({ favoritefood: { $all: searchItem } }, (err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
};

//Perform Classic Updates by Running Find, Edit, then Save
exports.postFindAndUpdate = (req, res, next) => {
  const personId = req.params.personId;
  const newFood = req.body.newFood;
  Person.findById(personId)
    .then((person) => {
      person.favoritefood.push(newFood);
      return person.save();
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json({ message: err }));
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
exports.postFindOneAndUpdate = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  Person.findOneAndUpdate({ name: name }, { $set: { age: age } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(400).json({ message: err }));
};

//Delete One Document Using model.findByIdAndRemove
exports.postFindAndDelete = (req, res, next) => {
  const personId = req.params.personId;
  Person.findByIdAndDelete(personId, (err, data) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(data);
    }
  });
};

//MongoDB and Mongoose - Delete Many Documents with model.remove()
exports.postRemove = (req, res, next) => {
  const nameToRemove = req.body.name;
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
};

//Chain Search Query Helpers to Narrow Search Results
exports.postChainSearchQuery = (req, res, next) => {
  const searchQuery = req.body.searchQuery;
  Person.find({ favoritefood: { $all: searchQuery } })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .then((result) => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(400).json({ message: err });
    });
};
