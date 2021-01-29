const fs = require('fs');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.cities = (req, res) => {
    let cities = fs.readFileSync('./data/cities.json');
    res.status(200).send(cities);
};
