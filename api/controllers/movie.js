"use strict";
// Include our db
const db = require("../../config/db")();
// Exports al the functions to perform on the db
module.exports = { getAll, save, getOne, update, delMovie };

// GET /movie operationId
function getAll(req, res, next) {
  res.json({ movies: db.find() });
}

// POST /movie operationId
function save(req, res, next) {
  res.json({
    success: db.save(req.body),
    description: "Movie added to the list"
  });
}

// GET /movie/{id} operationId
function getOne(req, res, next) {
  const id = req.swagger.params.id.value;
  const movie = db.find(id);
  if(movie) {
    res.json(movie);
  } else {
    res.status(204).send();
  }
}

// PUT /movie/{id} operationId
function update(req, res, next) {
  const id = req.swagger.params.id.value;
  const movie = req.body;
  if(db.update(id, movie)) {
    res.json({
      success: 1,
      description: "Movie Updated"
    });
  } else {
    res.status(204).send();
  }
}

// DELETE /movie/{id} operationId
function delMovie(req, res, next) {
  const id = req.swagger.params.id.value;
  if(db.remove(id)) {
    res.json({
      success: 1,
      description: "Movie Deleted"
    });
  } else {
    res.status(204).send();
  }
}
