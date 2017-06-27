'use strict';
// Include crypto to generate the movie id
const crypto = require("crypto");

module.exports = function () {
  return {
    movieList: [],
    // Save the movie inside the db
    save(movie) {
      movie.id = crypto.randomBytes(20).toString('hex');
      this.movieList.push(movie);
      return 1;
    },
    // Retrieve a movie with a given id or return all movies if id is undefined
    find(id) {
      if(id) {
        return this.movieList.find(element => element.id === id)
      } else {
        return this.movieList;
      }
    },
    // Delete a movie with the given id
    remove(id) {
      let found = 0;
      this.movieList = this.movieList.filter(element => {
        if (element.id === id) {
          found = 1;
        } else {
          return element.id !== id;
        }
      });
      return found;
    },
    // Update a movie with the given id
    update(id, movie) {
      let found = 0;
      this.movieList = this.movieList.map(element => {
        if(element.id === id) {
          movie.id = id;
          found = 1;
          return movie;
        }
        return element;
      });
      return found;
    }
  }
};
