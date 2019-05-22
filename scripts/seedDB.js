const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Intersections collection and inserts the intersections below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dangerousintersectionslist"
);

const intersectionSeed = [

  {
    address: "43593 barretts Sq",
    city: "ashburn",
    State: "VA",
    rating: 1,
    date: new Date(Date.now())
  },
  {
    address: "22058-22040 Pacific Blvd",
    city: "sterling",
    State: "VA",
    rating: 1,
    date: new Date(Date.now())
  },


];

db.Intersection
  .remove({})
  .then(() => db.Intersection.collection.insertMany(intersectionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
